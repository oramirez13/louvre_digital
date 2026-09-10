/* ============================================================
   main.js - Louvre Digital
   Description: builds the artwork cards and the lightbox viewer.
   Built with jQuery.
   ============================================================ */

// Waits until the HTML document is fully loaded before running
$(document).ready(function () {
  // ------------------------------------------------------------------
  // DATA: the artwork collection shown in the gallery
  // ------------------------------------------------------------------
  const paintings = [
    {
      id: 1,
      title: "The Starry Night",
      author: "Vincent van Gogh",
      year: 1889,
      movement: "Post-Impressionism",
      image: "img/vincent_van_gogh.webp",
      description:
        "One of the most recognized works of Western art, painted during the author's stay in Saint-Remy."
    },
    {
      id: 2,
      title: "The Mona Lisa",
      author: "Leonardo da Vinci",
      year: 1503,
      movement: "Renaissance",
      image: "img/monalisa.webp",
      description:
        "Iconic Renaissance portrait, admired for its serene expression and its sfumato technique."
    },
    {
      id: 3,
      title: "The Scream",
      author: "Edvard Munch",
      year: 1893,
      movement: "Expressionism",
      image: "img/edvard_munch.webp",
      description:
        "Symbolic image of human anxiety, turned into a universal reference of expressionism."
    },
    {
      id: 4,
      title: "Guernica",
      author: "Pablo Picasso",
      year: 1937,
      movement: "Cubism",
      image: "img/pablo_picasso.webp",
      description:
        "Monumental painting that denounces the violence of war and civilian suffering."
    },
    {
      id: 5,
      title: "The Persistence of Memory",
      author: "Salvador Dalí",
      year: 1931,
      movement: "Surrealism",
      image: "img/salvador_dali.webp",
      description:
        "Emblematic work of surrealism, famous for its soft clocks and dreamlike atmosphere."
    },
    {
      id: 6,
      title: "Las Meninas",
      author: "Diego Velázquez",
      year: 1656,
      movement: "Baroque",
      image: "img/diego_velazquez.webp",
      description:
        "Complex composition that plays with the gaze, perspective and the representation of power."
    },
    {
      id: 7,
      title: "The Birth of Venus",
      author: "Sandro Botticelli",
      year: 1486,
      movement: "Renaissance",
      image: "img/sandro_botticelli.webp",
      description:
        "Mythological scene of great elegance, considered a key work of the Italian Renaissance."
    },
    {
      id: 8,
      title: "The Kiss",
      author: "Gustav Klimt",
      year: 1908,
      movement: "Art Nouveau",
      image: "img/gustav_klimt.webp",
      description:
        "Golden and ornamental painting that represents amorous intimacy with a unique decorative style."
    },
    {
      id: 9,
      title: "Girl with a Pearl Earring",
      author: "Johannes Vermeer",
      year: 1665,
      movement: "Baroque",
      image: "img/johannes_vermeer.webp",
      description:
        "Portrait famous for its delicate lighting and the silent expressiveness of its character."
    },
    {
      id: 10,
      title: "Impression, Sunrise",
      author: "Claude Monet",
      year: 1872,
      movement: "Impressionism",
      image: "img/claude_monet_2.webp",
      description:
        "Painting that gave its name to impressionism thanks to its study of light and atmosphere."
    }
  ];

  // ------------------------------------------------------------------
  // CACHED ELEMENTS: jQuery references used across the code
  // ------------------------------------------------------------------
  const $gallery = $("#gallery");               // container of the artwork cards
  const $lightbox = $("#lightbox");             // lightbox wrapper
  const $lightboxImage = $("#lightbox-image");  // image shown enlarged
  const $lightboxClose = $("#lightbox-close");  // close button of the lightbox
  const $lightboxBackdrop = $("#lightbox-backdrop"); // dark layer behind the image
  const $btnTop = $("#btn-top");                // "back to top" button

  // Remembers the card that opened the lightbox to restore focus later
  let lastFocus = null;

  // ------------------------------------------------------------------
  // CARDS
  // ------------------------------------------------------------------

  // Builds one card (article) for a painting
  function createCard(painting) {
    const $card = $("<article>", { class: "card" });

    // The image box is a button so the lightbox can open with the keyboard
    const $imageButton = $("<button>", {
      class: "card__image-box",
      type: "button",
      "aria-label": "Enlarge " + painting.title + " by " + painting.author
    });
    const $image = $("<img>", {
      class: "card__image",
      src: painting.image,
      alt: painting.title + " by " + painting.author,
      loading: "lazy"
    });
    const $content = $("<div>", { class: "card__content" });
    const $tag = $("<p>", { class: "card__tag", text: painting.movement });
    const $title = $("<h3>", { class: "card__title", text: painting.title });
    const $author = $("<p>", {
      class: "card__meta",
      text: "Author: " + painting.author
    });
    const $year = $("<p>", {
      class: "card__meta",
      text: "Year: " + painting.year
    });
    const $description = $("<p>", {
      class: "card__text",
      text: painting.description
    });

    // Saves the data needed to open the lightbox later
    $imageButton.data("image", painting.image);
    $imageButton.data("alt", painting.title + " by " + painting.author);
    $imageButton.append($image);
    $content.append($tag, $title, $author, $year, $description);
    $card.append($imageButton, $content);
    return $card;
  }

  // ------------------------------------------------------------------
  // RENDERING
  // ------------------------------------------------------------------

  // Renders every artwork card into the gallery container
  function renderGallery() {
    $gallery.empty();
    paintings.forEach(function (painting) {
      $gallery.append(createCard(painting));
    });
  }

  // ------------------------------------------------------------------
  // LIGHTBOX
  // ------------------------------------------------------------------

  // Opens the lightbox with the clicked artwork image
  function openImage(src, alt) {
    // Remembers which card opened the lightbox to restore focus on close
    lastFocus = document.activeElement;
    $lightboxImage.attr("src", src);
    $lightboxImage.attr("alt", alt);
    $lightbox.prop("hidden", false);
    // Locks the scroll of the page behind the lightbox
    $("body").css("overflow", "hidden");
    $lightboxClose.trigger("focus");
  }

  // Closes the lightbox and restores the focus to the opened card
  function closeImage() {
    $lightbox.prop("hidden", true);
    $lightboxImage.attr("src", "");
    $lightboxImage.attr("alt", "");
    $("body").css("overflow", "");
    if (lastFocus) {
      $(lastFocus).trigger("focus");
    }
    lastFocus = null;
  }

  // ------------------------------------------------------------------
  // BACK TO TOP
  // ------------------------------------------------------------------

  // Shows or hides the button depending on the scroll position
  function showBackToTop() {
    if ($(window).scrollTop() > 260) {
      $btnTop.fadeIn(200);
    } else {
      $btnTop.fadeOut(200);
    }
  }

  // Scrolls to the top respecting the user's motion preference
  function scrollToTop() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  // ------------------------------------------------------------------
  // INITIALIZATION
  // ------------------------------------------------------------------
  renderGallery();
  $("#year").text(new Date().getFullYear());

  // ------------------------------------------------------------------
  // EVENTS
  // ------------------------------------------------------------------

  // Opens the lightbox when an image button is clicked
  $(document).on("click", ".card__image-box", function () {
    openImage($(this).data("image"), $(this).data("alt"));
  });

  // Closes the lightbox with its close button
  $lightboxClose.on("click", closeImage);

  // Closes the lightbox when the dark backdrop is clicked
  $lightboxBackdrop.on("click", closeImage);

  // Closes the lightbox when the Escape key is pressed
  $(document).on("keydown", function (event) {
    if (event.key === "Escape" && !$lightbox.prop("hidden")) {
      closeImage();
    }
  });

  // Shows or hides the "back to top" button while scrolling
  $(window).on("scroll", showBackToTop);

  // Scrolls to the top when the button is clicked
  $btnTop.on("click", scrollToTop);
});
