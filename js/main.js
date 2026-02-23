$(document).ready(function () {
  const pinturas = [
    { titulo: "La noche estrellada", autor: "Vincent van Gogh", year: "1889", movimiento: "Postimpresionismo", imagen: "img/vincent_van_gogh.png" },
    { titulo: "La Mona Lisa", autor: "Leonardo da Vinci", year: "1503", movimiento: "Renacimiento", imagen: "img/monalisa.png" },
    { titulo: "El Grito", autor: "Edvard Munch", year: "1893", movimiento: "Expresionismo", imagen: "img/edvard_munch.png" },
    { titulo: "Guernica", autor: "Pablo Picasso", year: "1937", movimiento: "Cubismo", imagen: "img/pablo_picasso.png" },
    { titulo: "La persistencia de la memoria", autor: "Salvador Dalí", year: "1931", movimiento: "Surrealismo", imagen: "img/salvador_dali.png" },
    { titulo: "Las Meninas", autor: "Diego Velázquez", year: "1656", movimiento: "Barroco", imagen: "img/diego_velazquez.png" },
    { titulo: "El nacimiento de Venus", autor: "Sandro Botticelli", year: "1486", movimiento: "Renacimiento", imagen: "img/sandro_botticelli.png" },
    { titulo: "El beso", autor: "Gustav Klimt", year: "1908", movimiento: "Modernismo", imagen: "img/gustav_klimt.png" },
    { titulo: "La joven de la perla", autor: "Johannes Vermeer", year: "1665", movimiento: "Barroco", imagen: "img/johannes_vermeer.png" },
    { titulo: "Impresión, sol naciente", autor: "Claude Monet", year: "1872", movimiento: "Impresionismo", imagen: "img/claude_monet_2.png" },
  ];

  let contenido = "";
  pinturas.forEach(p => {
    contenido += `
      <div class="obra">
        <img src="${p.imagen}">
        <h3>${p.titulo}</h3>
        <p><strong>Autor:</strong> ${p.autor}</p>
        <p><strong>Año:</strong> ${p.year}</p>
        <p><strong>Movimiento:</strong> ${p.movimiento}</p>
      </div>`;
  });
  $("#galeria").html(contenido);

  // Preview
  let previewAbierto = false;
  let temporizador = null;

  $("body").append('<div id="overlay"></div>');
  $("body").append('<div id="preview"></div>');

  function cerrarPreview() {
    $("#preview").css("transform", "translate(-50%, -50%) scale(0.8)");
    $("#overlay").fadeOut(300, function () {
      $("#preview").hide();
      previewAbierto = false;
    });
    clearTimeout(temporizador);
  }

  $(".obra img").on("mouseenter", function () {
    if (previewAbierto) return;
    previewAbierto = true;

    let srcImagen = $(this).attr("src");
    $("#preview").html(`<img src="${srcImagen}" style="max-width:70vw; max-height:80vh;">`);

    $("#overlay").fadeIn(300);
    $("#preview").show();
    requestAnimationFrame(() => {
      $("#preview").css("transform", "translate(-50%, -50%) scale(1)");
    });

    temporizador = setTimeout(() => cerrarPreview(), 1000);
  });

  $("#overlay").on("mouseleave", function () {
    cerrarPreview();
  });

  // Footer year
  $("#year").text(new Date().getFullYear());

  // Volver arriba
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $("#btnTop").fadeIn(400);
    } else {
      $("#btnTop").fadeOut(400);
    }
  });

  $("#btnTop").click(() => $("html, body").animate({ scrollTop: 0 }, 800));
});
