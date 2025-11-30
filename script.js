// Creative Space - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Update year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Gallery Lightbox functionality
  initGalleryLightbox();

  // Smooth scroll for navigation links
  initSmoothScroll();

  // Heart animation on gallery items
  initHeartAnimation();

  // WhatsApp tooltip
  initWhatsAppTooltip();
});

// Gallery Lightbox
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (!lightbox || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox on close button click
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Close lightbox on background click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close lightbox on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Smooth scroll for navigation
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Heart animation effect on gallery hover
function initHeartAnimation() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const heart = this.querySelector('.gallery-heart');
      if (heart) {
        heart.style.animation = 'none';
        // Trigger reflow
        heart.offsetHeight;
        heart.style.animation = 'heartBeat 0.6s ease-in-out';
      }
    });
  });
}

// WhatsApp tooltip visibility
function initWhatsAppTooltip() {
  const whatsappFloat = document.querySelector('.whatsapp-float');
  
  if (whatsappFloat) {
    // Show tooltip after a short delay on page load
    setTimeout(() => {
      const tooltip = whatsappFloat.querySelector('.whatsapp-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        setTimeout(() => {
          tooltip.style.opacity = '0';
        }, 3000);
      }
    }, 2000);
  }
}

// Form handling (optional enhancement)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const details = document.getElementById('details').value;
    
    // Create WhatsApp message
    const message = encodeURIComponent(
      `Hi! I'm ${name}.\n\nPhone: ${phone}\n\nGift Details:\n${details}`
    );
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/917012716657?text=${message}`, '_blank');
  });
}

// Intersection Observer for scroll animations (optional)
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .gallery-item, .business-item').forEach(el => {
    observer.observe(el);
  });
}

// Initialize scroll animations if supported
if ('IntersectionObserver' in window) {
  initScrollAnimations();
}
