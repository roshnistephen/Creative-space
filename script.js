// Creative Space - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Update year in footer
  var yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Menu Toggle - Initialize immediately
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    // Handle both click and touch
    function toggleMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      } else {
        navLinks.classList.add('active');
        menuToggle.classList.add('active');
      }
    }
    
    menuToggle.onclick = toggleMenu;
    menuToggle.ontouchend = function(e) {
      e.preventDefault();
      toggleMenu(e);
    };

    // Close menu when clicking outside
    document.onclick = function(e) {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    };

    // Handle nav link clicks
    var links = navLinks.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
      links[i].onclick = function(e) {
        e.preventDefault();
        var href = this.getAttribute('href');
        
        // Close menu
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        
        // Scroll to section
        if (href && href.indexOf('#') === 0) {
          var target = document.querySelector(href);
          if (target) {
            var header = document.querySelector('header');
            var headerHeight = header ? header.offsetHeight : 0;
            var targetPosition = target.offsetTop - headerHeight - 10;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      };
    }
  }

  // Gallery Lightbox functionality
  initGalleryLightbox();

  // Heart animation on gallery items
  initHeartAnimation();

  // WhatsApp tooltip
  initWhatsAppTooltip();

  // Add floating decorations
  addFloatingDecorations();
});

// Add floating decorations
function addFloatingDecorations() {
  // Don't add floating decorations on mobile
  if (window.innerWidth <= 600) return;
  
  var decorations = ['🎁', '💝', '🎈', '🍬', '💖', '🎀'];
  var body = document.body;
  
  for (var i = 0; i < 6; i++) {
    var deco = document.createElement('span');
    deco.className = 'floating-deco';
    deco.textContent = decorations[i % decorations.length];
    deco.style.cssText = 
      'position: fixed;' +
      'font-size: ' + (1 + Math.random() * 1.5) + 'rem;' +
      'opacity: 0.06;' +
      'pointer-events: none;' +
      'z-index: 0;' +
      'left: ' + (Math.random() * 100) + '%;' +
      'top: ' + (Math.random() * 100) + '%;' +
      'animation: floatDeco ' + (8 + Math.random() * 4) + 's ease-in-out infinite ' + (Math.random() * 5) + 's;';
    body.appendChild(deco);
  }
}

// Gallery Lightbox
function initGalleryLightbox() {
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.querySelector('.lightbox-close');

  if (!lightbox || !lightboxImg) return;

  for (var i = 0; i < galleryItems.length; i++) {
    galleryItems[i].onclick = function() {
      var img = this.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };
  }

  // Close lightbox on close button click
  if (lightboxClose) {
    lightboxClose.onclick = closeLightbox;
  }

  // Close lightbox on background click
  lightbox.onclick = function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  };

  // Close lightbox on escape key
  document.onkeydown = function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  };

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Heart animation effect on gallery hover
function initHeartAnimation() {
  var galleryItems = document.querySelectorAll('.gallery-item');
  
  for (var i = 0; i < galleryItems.length; i++) {
    galleryItems[i].onmouseenter = function() {
      var heart = this.querySelector('.gallery-heart');
      if (heart) {
        heart.style.animation = 'none';
        heart.offsetHeight;
        heart.style.animation = 'heartBeat 0.6s ease-in-out';
      }
    };
  }
}

// WhatsApp tooltip visibility
function initWhatsAppTooltip() {
  var whatsappFloat = document.querySelector('.whatsapp-float');
  
  if (whatsappFloat) {
    setTimeout(function() {
      var tooltip = whatsappFloat.querySelector('.whatsapp-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        setTimeout(function() {
          tooltip.style.opacity = '0';
        }, 3000);
      }
    }, 2000);
  }
}

// Form handling
var contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.onsubmit = function(e) {
    e.preventDefault();
    
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var details = document.getElementById('details').value;
    
    var message = encodeURIComponent(
      'Hi! I\'m ' + name + '.\n\nPhone: ' + phone + '\n\nGift Details:\n' + details
    );
    
    window.open('https://wa.me/917012716657?text=' + message, '_blank');
  };
}
