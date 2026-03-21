// ============================================
//  PORTAFOLIO - BRADY ALEXANDER
//  scripts.js  (jQuery + Bootstrap)
// ============================================

$(document).ready(function () {

  // --- 1. Navbar: agregar clase "scrolled" al hacer scroll ---
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('#mainNav').addClass('scrolled');
    } else {
      $('#mainNav').removeClass('scrolled');
    }
  });

  // --- 2. Modales de video con jQuery ---
  // Cuando se hace clic en cualquier botón "Ver Video"
  $('.btn-ver-video').on('click', function () {
    var videoUrl = $(this).data('video');   // URL del iframe
    var titulo   = $(this).data('titulo');  // Título del proyecto

    // Actualizar el título del modal
    $('#modalLabel1').text('▶ ' + titulo);

    // Inyectar la URL del video en el iframe
    // Se agrega autoplay=1 para que arranque automáticamente
    $('#videoFrame').attr('src', videoUrl + '?autoplay=1&rel=0');
  });

  // --- 3. Al cerrar el modal, detener el video ---
  $('#modalVideo1').on('hidden.bs.modal', function () {
    // Vaciar el src para detener la reproducción
    $('#videoFrame').attr('src', '');
  });

  // --- 4. Animación de entrada para las cards (scroll suave) ---
  // Se usa IntersectionObserver para revelar elementos al hacer scroll
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar cards y timeline items
  $('.project-card, .study-card, .timeline-item, .skills-card, .sobre-card, .info-item').each(function () {
    $(this).addClass('fade-up');
    observer.observe(this);
  });

});
