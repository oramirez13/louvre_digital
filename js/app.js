let pinturas = [];
let indice = 0;

$(document).ready(function() {

    $.getJSON("pinturas.json", function(data){
        pinturas = data;
        cargarGaleria();
    });

    function cargarGaleria() {
        pinturas.forEach((p, i) => {
            $("#galeria").append(
                `<img src="${p.imagen}" data-id="${i}">`
            );
        });
    }

    $(document).on("click", ".galeria img", function(){
        indice = $(this).data("id");
        mostrarPintura(indice);
        $("#lightbox").fadeIn(500);
    });

    function mostrarPintura(i) {
        $("#imagen").fadeOut(200, function(){
            $(this).attr("src", pinturas[i].imagen).fadeIn(500);
        });

        $("#titulo").text(pinturas[i].titulo);
        $("#descripcion").text(pinturas[i].descripcion);
    }

    $("#next").click(function(){
        indice = (indice + 1) % pinturas.length;
        mostrarPintura(indice);
    });

    $("#prev").click(function(){
        indice = (indice - 1 + pinturas.length) % pinturas.length;
        mostrarPintura(indice);
    });

    $(".cerrar").click(function(){
        $("#lightbox").fadeOut(400);
    });

});