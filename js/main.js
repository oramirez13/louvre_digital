$(document).ready(function () {
  var pinturas = [
    {
      id: 1,
      titulo: "La noche estrellada",
      autor: "Vincent van Gogh",
      year: 1889,
      movimiento: "Postimpresionismo",
      imagen: "img/vincent_van_gogh.png",
      descripcion: "Una de las obras mas reconocidas del arte occidental, pintada durante la estancia del autor en Saint-Remy."
    },
    {
      id: 2,
      titulo: "La Mona Lisa",
      autor: "Leonardo da Vinci",
      year: 1503,
      movimiento: "Renacimiento",
      imagen: "img/monalisa.png",
      descripcion: "Retrato iconico del Renacimiento, admirado por su expresion serena y su tecnica de sfumato."
    },
    {
      id: 3,
      titulo: "El Grito",
      autor: "Edvard Munch",
      year: 1893,
      movimiento: "Expresionismo",
      imagen: "img/edvard_munch.png",
      descripcion: "Imagen simbolica de la angustia humana, convertida en un referente universal del expresionismo."
    },
    {
      id: 4,
      titulo: "Guernica",
      autor: "Pablo Picasso",
      year: 1937,
      movimiento: "Cubismo",
      imagen: "img/pablo_picasso.png",
      descripcion: "Pintura monumental que denuncia la violencia de la guerra y el sufrimiento civil."
    },
    {
      id: 5,
      titulo: "La persistencia de la memoria",
      autor: "Salvador Dali",
      year: 1931,
      movimiento: "Surrealismo",
      imagen: "img/salvador_dali.png",
      descripcion: "Obra emblemática del surrealismo, famosa por sus relojes blandos y su atmosfera onirica."
    },
    {
      id: 6,
      titulo: "Las Meninas",
      autor: "Diego Velazquez",
      year: 1656,
      movimiento: "Barroco",
      imagen: "img/diego_velazquez.png",
      descripcion: "Composicion compleja que juega con la mirada, la perspectiva y la representacion del poder."
    },
    {
      id: 7,
      titulo: "El nacimiento de Venus",
      autor: "Sandro Botticelli",
      year: 1486,
      movimiento: "Renacimiento",
      imagen: "img/sandro_botticelli.png",
      descripcion: "Escena mitologica de gran elegancia, considerada una obra clave del Renacimiento italiano."
    },
    {
      id: 8,
      titulo: "El beso",
      autor: "Gustav Klimt",
      year: 1908,
      movimiento: "Modernismo",
      imagen: "img/gustav_klimt.png",
      descripcion: "Pintura dorada y ornamental que representa la intimidad amorosa con un estilo decorativo unico."
    },
    {
      id: 9,
      titulo: "La joven de la perla",
      autor: "Johannes Vermeer",
      year: 1665,
      movimiento: "Barroco",
      imagen: "img/johannes_vermeer.png",
      descripcion: "Retrato celebre por su iluminacion delicada y la expresividad silenciosa del personaje."
    },
    {
      id: 10,
      titulo: "Impresion, sol naciente",
      autor: "Claude Monet",
      year: 1872,
      movimiento: "Impresionismo",
      imagen: "img/claude_monet_2.png",
      descripcion: "Pintura que dio nombre al impresionismo gracias a su estudio de la luz y la atmosfera."
    }
  ];

  var filtros = {
    texto: "",
    movimiento: "all",
    orden: "title"
  };

  var $gallery = $("#gallery");
  var $emptyState = $("#empty-state");
  var $resultCount = $("#result-count");
  var $movementFilter = $("#movement-filter");
  var $sortSelect = $("#sort-select");
  var $searchInput = $("#search-input");
  var $activeFilters = $("#active-filters");
  var $lightbox = $("#lightbox");
  var $lightboxImage = $("#lightbox-image");
  var $lightboxClose = $("#lightbox-close");
  var $lightboxBackdrop = $("#lightbox-backdrop");
  var $btnTop = $("#btn-top");
  var $heroCount = $("#hero-count");
  var $heroMovements = $("#hero-movements");

  function quitarAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function normalizarTexto(texto) {
    return quitarAcentos(texto.toLowerCase());
  }

  function obtenerMovimientos() {
    var movimientos = [];
    var i;

    for (i = 0; i < pinturas.length; i++) {
      if (movimientos.indexOf(pinturas[i].movimiento) === -1) {
        movimientos.push(pinturas[i].movimiento);
      }
    }

    movimientos.sort();
    return movimientos;
  }

  function cargarMovimientos() {
    var movimientos = obtenerMovimientos();
    var i;

    $heroMovements.text(movimientos.length);

    for (i = 0; i < movimientos.length; i++) {
      $movementFilter.append(
        $("<option>", {
          value: movimientos[i],
          text: movimientos[i]
        })
      );
    }
  }

  function compararObras(a, b) {
    if (filtros.orden === "author") {
      return a.autor.localeCompare(b.autor);
    }

    if (filtros.orden === "year-asc") {
      return a.year - b.year;
    }

    if (filtros.orden === "year-desc") {
      return b.year - a.year;
    }

    return a.titulo.localeCompare(b.titulo);
  }

  function coincideConBusqueda(obra) {
    var texto = normalizarTexto(filtros.texto);
    var contenido = normalizarTexto(obra.titulo + " " + obra.autor + " " + obra.movimiento);

    if (!texto) {
      return true;
    }

    return contenido.indexOf(texto) !== -1;
  }

  function coincideConMovimiento(obra) {
    if (filtros.movimiento === "all") {
      return true;
    }

    return obra.movimiento === filtros.movimiento;
  }

  function obtenerObrasFiltradas() {
    var resultado = [];
    var copia;
    var i;

    for (i = 0; i < pinturas.length; i++) {
      if (coincideConBusqueda(pinturas[i]) && coincideConMovimiento(pinturas[i])) {
        resultado.push(pinturas[i]);
      }
    }

    copia = resultado.slice();
    copia.sort(compararObras);
    return copia;
  }

  function crearTarjeta(obra) {
    var $card = $("<article>", { "class": "card" });
    var $imageBox = $("<div>", { "class": "card__image-box" });
    var $image = $("<img>", {
      "class": "card__image",
      src: obra.imagen,
      alt: obra.titulo + " de " + obra.autor,
      loading: "lazy"
    });
    var $content = $("<div>", { "class": "card__content" });
    var $tag = $("<p>", { "class": "card__tag", text: obra.movimiento });
    var $title = $("<h3>", { "class": "card__title", text: obra.titulo });
    var $author = $("<p>", { "class": "card__meta", text: "Autor: " + obra.autor });
    var $year = $("<p>", { "class": "card__meta", text: "Ano: " + obra.year });
    var $description = $("<p>", { "class": "card__text", text: obra.descripcion });

    $imageBox.data("imagen", obra.imagen);
    $imageBox.data("alt", obra.titulo + " de " + obra.autor);
    $imageBox.append($image);
    $content.append($tag, $title, $author, $year, $description);
    $card.append($imageBox, $content);

    return $card;
  }

  function actualizarContador(total) {
    $heroCount.text(pinturas.length);

    if (total === 1) {
      $resultCount.text("1 obra");
      return;
    }

    $resultCount.text(total + " obras");
  }

  function renderGaleria() {
    var obras = obtenerObrasFiltradas();
    var i;

    $gallery.empty();
    actualizarContador(obras.length);
    renderFiltrosActivos();

    if (!obras.length) {
      $emptyState.prop("hidden", false);
      return;
    }

    $emptyState.prop("hidden", true);

    for (i = 0; i < obras.length; i++) {
      $gallery.append(crearTarjeta(obras[i]));
    }
  }

  function renderFiltrosActivos() {
    var chips = [];

    $activeFilters.empty();

    if (filtros.texto) {
      chips.push("Busqueda: " + filtros.texto);
    }

    if (filtros.movimiento !== "all") {
      chips.push("Movimiento: " + filtros.movimiento);
    }

    if (filtros.orden !== "title") {
      if (filtros.orden === "author") {
        chips.push("Orden: Autor");
      } else if (filtros.orden === "year-asc") {
        chips.push("Orden: Ano ascendente");
      } else if (filtros.orden === "year-desc") {
        chips.push("Orden: Ano descendente");
      }
    }

    if (!chips.length) {
      return;
    }

    $.each(chips, function (_, texto) {
      $activeFilters.append($("<span>", { "class": "filter-chip", text: texto }));
    });
  }

  function limpiarFiltros() {
    filtros.texto = "";
    filtros.movimiento = "all";
    filtros.orden = "title";

    $searchInput.val("");
    $movementFilter.val("all");
    $sortSelect.val("title");
    renderGaleria();
  }

  function abrirImagen(src, alt) {
    $lightboxImage.attr("src", src);
    $lightboxImage.attr("alt", alt);
    $lightbox.prop("hidden", false);
    $("body").css("overflow", "hidden");
    $lightboxClose.trigger("focus");
  }

  function cerrarImagen() {
    $lightbox.prop("hidden", true);
    $lightboxImage.attr("src", "");
    $lightboxImage.attr("alt", "");
    $("body").css("overflow", "");
  }

  function mostrarBotonArriba() {
    if ($(window).scrollTop() > 260) {
      $btnTop.fadeIn(200);
    } else {
      $btnTop.fadeOut(200);
    }
  }

  cargarMovimientos();
  renderGaleria();
  $("#year").text(new Date().getFullYear());

  $searchInput.on("input", function () {
    filtros.texto = $(this).val().trim();
    renderGaleria();
  });

  $movementFilter.on("change", function () {
    filtros.movimiento = $(this).val();
    renderGaleria();
  });

  $sortSelect.on("change", function () {
    filtros.orden = $(this).val();
    renderGaleria();
  });

  $("#reset-btn").on("click", function () {
    limpiarFiltros();
  });

  $(document).on("click", ".card__image-box", function () {
    abrirImagen($(this).data("imagen"), $(this).data("alt"));
  });

  $lightboxClose.on("click", function () {
    cerrarImagen();
  });

  $lightboxBackdrop.on("click", function () {
    cerrarImagen();
  });

  $(document).on("keydown", function (event) {
    if (event.key === "Escape" && !$lightbox.prop("hidden")) {
      cerrarImagen();
    }
  });

  $(window).on("scroll", function () {
    mostrarBotonArriba();
  });

  $btnTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 700);
  });
});
