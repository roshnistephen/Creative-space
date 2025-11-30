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
  var navCloseBtn = document.getElementById('navCloseBtn');

  if (menuToggle && navLinks) {
    // Handle both click and touch for menu toggle
    function toggleMenu(e) {
      e.preventDefault();
      e.stopPropagation();
      if (navLinks.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    }
    
    function openMenu() {
      navLinks.classList.add('active');
      menuToggle.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
    
    function closeMenu() {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Menu toggle button events
    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('touchend', function(e) {
      e.preventDefault();
      toggleMenu(e);
    });
    
    // Close button inside nav
    if (navCloseBtn) {
      navCloseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      });
      navCloseBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Handle nav link clicks
    var links = navLinks.querySelectorAll('a');
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var href = this.getAttribute('href');
        
        // Close menu
        closeMenu();
        
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
      });
    });
  }

  // Gallery Lightbox functionality
  initGalleryLightbox();

  // Instagram-like heart animation on gallery items
  initGalleryLikeButtons();

  // WhatsApp tooltip
  initWhatsAppTooltip();

  // Contact form validation
  initContactFormValidation();

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

// Gallery Like Buttons - Instagram Style
function initGalleryLikeButtons() {
  var likeButtons = document.querySelectorAll('.gallery-like-btn');
  
  likeButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent lightbox from opening
      
      var heartIcon = this.querySelector('.heart-icon');
      var isLiked = this.classList.contains('liked');
      
      if (isLiked) {
        // Unlike
        this.classList.remove('liked');
        heartIcon.textContent = '🤍';
      } else {
        // Like with heartbeat animation
        this.classList.add('liked');
        heartIcon.textContent = '❤️';
        
        // Trigger animation
        this.classList.remove('liked');
        void this.offsetWidth; // Force reflow
        this.classList.add('liked');
      }
    });
    
    // Touch support
    btn.addEventListener('touchend', function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.click();
    });
  });
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

// Form handling with validation
function initContactFormValidation() {
  var contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  var nameInput = document.getElementById('name');
  var phoneInput = document.getElementById('phone');
  var detailsInput = document.getElementById('details');
  var nameError = document.getElementById('nameError');
  var phoneError = document.getElementById('phoneError');
  var detailsError = document.getElementById('detailsError');
  
  // Validation functions
  function validateName() {
    var value = nameInput.value.trim();
    if (!value) {
      nameInput.classList.add('error');
      nameInput.classList.remove('success');
      nameError.textContent = 'Please enter your name';
      return false;
    } else if (value.length < 2) {
      nameInput.classList.add('error');
      nameInput.classList.remove('success');
      nameError.textContent = 'Name must be at least 2 characters';
      return false;
    } else {
      nameInput.classList.remove('error');
      nameInput.classList.add('success');
      nameError.textContent = '';
      return true;
    }
  }
  
  function validatePhone() {
    var value = phoneInput.value.trim();
    var phoneRegex = /^[0-9]{10,15}$/;
    if (!value) {
      phoneInput.classList.add('error');
      phoneInput.classList.remove('success');
      phoneError.textContent = 'Please enter your phone number';
      return false;
    } else if (!phoneRegex.test(value.replace(/[\s\-\+]/g, ''))) {
      phoneInput.classList.add('error');
      phoneInput.classList.remove('success');
      phoneError.textContent = 'Please enter a valid phone number (10-15 digits)';
      return false;
    } else {
      phoneInput.classList.remove('error');
      phoneInput.classList.add('success');
      phoneError.textContent = '';
      return true;
    }
  }
  
  function validateDetails() {
    var value = detailsInput.value.trim();
    if (!value) {
      detailsInput.classList.add('error');
      detailsInput.classList.remove('success');
      detailsError.textContent = 'Please enter gift details';
      return false;
    } else if (value.length < 10) {
      detailsInput.classList.add('error');
      detailsInput.classList.remove('success');
      detailsError.textContent = 'Please provide more details (at least 10 characters)';
      return false;
    } else {
      detailsInput.classList.remove('error');
      detailsInput.classList.add('success');
      detailsError.textContent = '';
      return true;
    }
  }
  
  // Real-time validation on blur
  nameInput.addEventListener('blur', validateName);
  phoneInput.addEventListener('blur', validatePhone);
  detailsInput.addEventListener('blur', validateDetails);
  
  // Clear error on input
  nameInput.addEventListener('input', function() {
    if (this.classList.contains('error')) validateName();
  });
  phoneInput.addEventListener('input', function() {
    if (this.classList.contains('error')) validatePhone();
  });
  detailsInput.addEventListener('input', function() {
    if (this.classList.contains('error')) validateDetails();
  });
  
  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var isNameValid = validateName();
    var isPhoneValid = validatePhone();
    var isDetailsValid = validateDetails();
    
    if (isNameValid && isPhoneValid && isDetailsValid) {
      var name = nameInput.value.trim();
      var phone = phoneInput.value.trim();
      var details = detailsInput.value.trim();
      
      var message = encodeURIComponent(
        'Hi! I\'m ' + name + '.\n\nPhone: ' + phone + '\n\nGift Details:\n' + details
      );
      
      window.open('https://wa.me/917012716657?text=' + message, '_blank');
    }
  });
}

// Form handling - Legacy support (kept for backwards compatibility)
var contactForm = document.querySelector('.contact-form');
if (contactForm && !document.getElementById('contactForm')) {
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
