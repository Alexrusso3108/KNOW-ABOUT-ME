// Enhanced Loader Elements
const pageLoader = document.getElementById('page-loader');
const loaderProgress = document.querySelector('.loader-progress');
const loaderPercentage = document.querySelector('.loader-percentage');
const loaderStatus = document.querySelector('.loader-status');

// Simulate loading progress
function simulateLoading() {
    let width = 0;
    const statusMessages = [
        'Initializing Portfolio...',
        'Loading Assets...',
        'Preparing Content...',
        'Almost There...',
        'Ready to Explore!'
    ];
    
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                hideLoader();
            }, 500);
            return;
        }
        
        width++;
        loaderProgress.style.width = width + '%';
        loaderPercentage.textContent = width + '%';
        
        // Update status message based on progress
        if (width < 30) {
            loaderStatus.textContent = statusMessages[0];
        } else if (width < 60) {
            loaderStatus.textContent = statusMessages[1];
        } else if (width < 80) {
            loaderStatus.textContent = statusMessages[2];
        } else if (width < 95) {
            loaderStatus.textContent = statusMessages[3];
        } else {
            loaderStatus.textContent = statusMessages[4];
        }
        
        // Random speed variation for more natural feel
    }, 20 + Math.random() * 30);
}

// Function to hide loader with smooth transition
function hideLoader() {
    pageLoader.classList.add('hidden');
    
    // Remove loader from DOM after animation completes
    setTimeout(() => {
        if (pageLoader && pageLoader.parentNode) {
            pageLoader.parentNode.removeChild(pageLoader);
        }
    }, 800); // Match this with the CSS transition duration
}

// Start the loading simulation after a small delay to allow initial render
setTimeout(simulateLoading, 300);

// Fallback in case something goes wrong
setTimeout(hideLoader, 8000); // Hide after 8 seconds no matter what

document.addEventListener('DOMContentLoaded', function() {

    // Vanta.js Fog initialization
    VANTA.FOG({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      highlightColor: 0x525252,
      midtoneColor: 0x3c3c3c,
      lowlightColor: 0x282828,
      baseColor: 0x121212,
      blurFactor: 0.60,
      speed: 1.20,
      zoom: 0.40
    });

    // Typed.js initialization for the hero section
    const typedOptions = {
        strings: ['a Passionate Developer.', 'a Creative Thinker.', 'a Problem Solver.'],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    };
    const typed = new Typed('#typed-text', typedOptions);

    // Scroll reveal animation for sections
    const revealElements = document.querySelectorAll('section');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        for (let i = 0; i < revealElements.length; i++) {
            // We don't want to animate the hero section itself
            if (revealElements[i].id === 'hero') continue;

            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 100; // Distance from bottom of viewport to trigger animation

            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('visible');
            }
        }
    };

    // Add the reveal class to the sections that need animation
    document.querySelectorAll('#about, #skills, #projects, #contact').forEach(section => {
        section.classList.add('reveal');
    });

    window.addEventListener('scroll', revealOnScroll);
    // Initial check to reveal elements already in view on page load
    revealOnScroll();

    // --- EmailJS form submission ---
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    // EmailJS Credentials
    const serviceID = 'service_okmp77f';
    const templateID = 'template_ogux0z5';
    const publicKey = 'YnaT_XIFAAmXxhQ63';

    emailjs.init(publicKey);

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const btn = this.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;
        formFeedback.innerHTML = ''; // Clear previous messages

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // Success: show Lottie animation
                contactForm.reset();
                
                const lottiePlayer = document.createElement('lottie-player');
                lottiePlayer.setAttribute('src', 'https://assets1.lottiefiles.com/packages/lf20_oaw8ruqf.json');
                lottiePlayer.setAttribute('background', 'transparent');
                lottiePlayer.setAttribute('speed', '1');
                lottiePlayer.style.width = '150px';
                lottiePlayer.style.height = '150px';
                lottiePlayer.setAttribute('autoplay', '');

                formFeedback.appendChild(lottiePlayer);

                // Reset after a delay
                setTimeout(() => {
                    formFeedback.innerHTML = '';
                    btn.textContent = 'Send Message';
                    btn.disabled = false;
                }, 4000); // Hide animation after 4 seconds

            }, (err) => {
                // Error: show text message
                formFeedback.innerHTML = `<p style="color: #e74c3c;">Failed to send. Error: ${err.text}</p>`;
                btn.textContent = 'Send Message';
                btn.disabled = false;
            });
    });

    // Custom cursor logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    const interactiveElements = document.querySelectorAll('a, button');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseout', () => {
            cursorOutline.classList.remove('hover');
        });
    });
});
