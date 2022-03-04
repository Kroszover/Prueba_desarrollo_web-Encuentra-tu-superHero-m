/*
    Autor: Camilo Lavado
    Fecha: 04-03-2022
    version: 1.0.0.0
*/
/*
.- 3. Una vez ingresado el número del héroe a buscar y después de realizar un click sobre el botón de búsqueda, se debe capturar y validar la información para evitar búsquedas que contengan algún texto diferente a números y mostrar la información dinámicamente mediante la librería jQuery y CanvasJS con un gráfico de pastel. Para lograr todo esto se debe: (8 Puntos)

.- 3.1 Capturar la información ingresada mediante eventos del DOM con jQuery. (1 Punto) 

.- 3.2 Implementar funciones para separar la captura de la información ingresada por el usuario con la consulta a la API. (1 Punto) 

.- 3.3 Comprobar la información ingresada por el usuario, la cual, solo debe ser un número. (0.5 Puntos)

.- 3.4 Consultar la API mediante AJAX con la sintaxis de jQuery. (1 Punto) 

.- 3.5 Renderizar la información recibida por la API dinámicamente utilizando tarjetas (card) de Bootstrap. (1 Punto)

.- 3.6 Utilizar ciclos y métodos para arreglos u objetos que permitan recorrer, ordenar y mostrar la información. (1 Punto) 

.- 3.7 Emplear la librería de gráficos CanvasJS, para mostrar dinámicamente información específica de cada superhéroe. (2 Puntos) 

.- 3.8 Implementar estructuras condicionales para generar alertas cuando existan errores en la búsqueda. (0.5 Punto)*/

//*DESARROLLO*

//.- 3.1 Capturar la información ingresada mediante eventos del DOM con jQuery. (1 Punto)
//Captura del Click
$(document).ready(function(){
    //Funcion para musica
    var audi = document.getElementById("au");
audi.play();
    //Funcion para ocultar el sector del contenido mientras esta vacio.
$('#muestrApi').hide();
    //Capturamos el click
$('#botonConsulta').click
    //Se añade función para que el boton no regrese por default 
(function(e){e.preventDefault();
    //Tomamos el id para buscar en la API
    let id = $("#heroInput").val();

    //.- 3.3 Comprobar la información ingresada por el usuario, la cual, solo debe ser un número. (0.5 Puntos)
    //Validamos que lo ingresado sea un número.
    if (validar(id)) {
       // .- 3.2 Implementar funciones para separar la captura de la información ingresada por el usuario con la consulta a la API. (1 Punto) 
        //Ejecutamos la consulta a la api
      llamarApi(id);
        //Mostramos el contenido que habiamos ocultado previamente
      $('#muestrApi').show();  
    }
});

//Funciones Usadas.-

//.- 3.7 Emplear la librería de gráficos CanvasJS, para mostrar dinámicamente información específica de cada superhéroe. (2 Puntos) 
function revela_grafico(elemento) {
    //Creamos un arreglo que aparecerá en el grafico
    let estadisticas = [];
    //Iteramos por cada elemento
    Object.keys(elemento.powerstats).forEach(function(elem){
        //Insertamos el elemento
        estadisticas.push ({y: elemento.powerstats[elem], label: elem});
    });

    var chart = new CanvasJS.Chart("chartContainer", {
        //Asignamos los atributos de la tabla y el como se mostrara la informacion.-
        theme: "dark1",
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Atributos de personaje para: " + elemento.name
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            LegendText: "{label}",
            indexLabelFontsize: 17,
            indexLabel: "{label} - ({y})",
            dataPoints: estadisticas

        }]
    });
    //Renderizamos el grafico.
    chart.render();
}

//.- 3.8 Implementar estructuras condicionales para generar alertas cuando existan errores en la búsqueda. (0.5 Punto)*/
//Funcion para validar que lo ingresado sea un numero
function validar (input){
    if (input == ''){
        $("#error1").text("Debe ingresar un número");
        return false;
    } else if (!isNaN(parseInt(input))){
        $("error1").text("");
        return true;
    } else{
        $("#error1").text("Solo puede ingresar números");
        return false;
    }
}

//.- 3.4 Consultar la API mediante AJAX con la sintaxis de jQuery. (1 Punto) 
//Funcion para consultar o llamar a la api con el mentodo AJAX
function llamarApi(id){
    //Ingresamos el token para poder realizar la consulta.
    const token = "4905856019427443";
    //Invocamos al metodo AJAX
    $.ajax({
        type: "GET",
            url:        "https://www.superheroapi.com/api.php/"+token+"/"+id ,
            success:    function(data) {
                
                //se verifica que no tenga error
                if (data.response=="error") {
                    alert(data.error);
                } else {
                    let nombre      = data.name;
                    let conexiones  = data.connections['group-affiliation'];


                    //se leen variables y crea el parrafo
                    let parrafo1    = `
                        <h5>Nombre: ${nombre}</h5>
                        <p>conexiones: ${conexiones}</p>
                    `;

                    //se inserta al html
                    $("#infoHero1").html(parrafo1);

                    let publicado           = data.biography.publisher;
                    let ocupacion           = data.work.occupation;
                    let primera_aparicion   = data.biography["first-appearance"];
                    let altura              = data.appearance.height['0']+ " - "+data.appearance.height['1'];
                    let peso                = data.appearance.weight['0']+ " - "+data.appearance.weight['1'];
                    let alianzas            = "";
                    

                    //.- 3.6 Utilizar ciclos y métodos para arreglos u objetos que permitan recorrer, ordenar y mostrar la información. (1 Punto) 
                    //se recorre el objeto para obtener alianzas
                    for (const property in data.biography.aliases) {
                        alianzas = alianzas+` ${data.biography.aliases[property]}`;
                    }
                    
                    //se crea el segundo parrafo con las variables
                    let parrafo2    = `
                    <small>
                        <p>publicado por: ${publicado}</p>
                        <p>ocupacion: ${ocupacion}</p>
                        <p>primera_aparicion: ${primera_aparicion}</p>
                        <p>altura: ${altura}</p>
                        <p>peso: ${peso}</p>
                        <p>alianzas: ${alianzas}</p>
                    </small>
                    `;
                    //se inserta el parrrafo
                    $("#infoHero2").html(parrafo2);
                    //se inserta la imagen
                    $("#imagenSuper").attr("src",data.image.url);

                    //se muestra el grafico.
                    revela_grafico(data);
                }
                
            },
            error: ()=> alert("Conexión no disponible")

    });

}

});