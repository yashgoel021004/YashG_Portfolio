// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Animate elements when they come into view
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.about-image, .about-text, .skills-box, .project-card, .contact-info, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });

    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
});

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      mode: 'no-cors'
    })
    .then(() => {
      alert('Message sent successfully!');
      form.reset();
    })
    .catch(() => {
      alert('Error sending message. Please try again.');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'SEND MESSAGE';
    });
  });