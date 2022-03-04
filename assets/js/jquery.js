/*
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
        //Ejecutamos la consulta a la api
      llamarApi(id);
        //Mostramos el contenido que habiamos ocultado previamente
      $('#muestrApi').show();  
    }
});

//Funciones Usadas.-

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
//Funcion para consultar o llamar a la api con el mentodo AJAX
function llamarApi(id){
    //Ingresamos el token para poder realizar la consulta.
    const token = "4905856019427443";
    //Invocamos al metodo AJAX
    $.ajax({
        
    })

}

});