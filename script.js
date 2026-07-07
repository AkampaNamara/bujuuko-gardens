// ============================================================
//  BUJUKO MIRACLE PARK & GARDENS - COMPLETE JAVASCRIPT
//  Pages: Home | About | Contact
// ============================================================

(function () {
    // ---- Dynamic greeting rotation ----
    const msgEl = document.getElementById('dynamic-greeting');
    if (msgEl) {
        const messages = [
            '📍 Bujuko Miracle Park · follow the signpost',
            '🚗 Mityana road · 1.5 km from main road',
            '👉 turn right at the signpost · 200m to paradise',
            '🌳 Relax, Celebrate and Create Memories',
            '📞 Book now: 0757576806 / 0782230255',
        ];
        let index = 0;
        setInterval(() => {
            index = (index + 1) % messages.length;
            msgEl.textContent = messages[index];
        }, 4500);
    }

    // ---- Lightbox functionality ----
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.getElementById('closeLightbox');

    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach((img) => {
        img.addEventListener('click', function () {
            if (lightbox) {
                lightbox.classList.add('show');
                lightboxImage.src = this.src;
                const captionText = this.alt || this.src.split('/').pop();
                lightboxCaption.textContent = captionText;
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightboxFn() {
        if (lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxFn);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) {
                closeLightboxFn();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
            closeLightboxFn();
        }
    });

    // ---- Contact Form Handler (UPDATED - Works with Formspree) ----
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Get form values for validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate required fields
            if (!name || !email || !message) {
                e.preventDefault(); // Only prevent submission if validation fails
                formStatus.className = 'form-status error';
                formStatus.textContent = '⚠️ Please fill in all required fields.';
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                e.preventDefault(); // Only prevent submission if validation fails
                formStatus.className = 'form-status error';
                formStatus.textContent = '⚠️ Please enter a valid email address.';
                return;
            }
            
            // If validation passes, DO NOT use e.preventDefault()
            // Let the form submit naturally to Formspree!
            
            // Show sending status
            formStatus.className = 'form-status sending';
            formStatus.textContent = '⏳ Sending your message...';
            
            // Disable button to prevent double submission
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }
            
            // The form will now submit to Formspree automatically
            // You'll be redirected to Formspree's thank you page
            // No need to reset or show success message here - Formspree handles that
        });
    }

    // ---- Highlight current page in nav ----
    document.addEventListener('DOMContentLoaded', function () {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
            }
        });
    });

    // ============================================================
    // MENU CAROUSEL / SLIDESHOW (AUTO-PLAY EVERY 5 SECONDS)
    // ============================================================
    const slides = document.querySelectorAll('.menu-slide');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let autoPlayInterval;

    // Only run if there are slides on the page
    if (slides.length > 0) {
        // Create dots
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('data-index', index);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        function goToSlide(index) {
            // Remove active class from all slides
            slides.forEach(slide => slide.classList.remove('active'));
            // Remove active class from all dots
            document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            slides[index].classList.add('active');
            const dots = document.querySelectorAll('.dot');
            if (dots[index]) dots[index].classList.add('active');

            currentSlide = index;
            resetAutoPlay();
        }

        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        }

        function resetAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
            autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        // Event listeners for buttons
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            // Only if carousel is visible on the page
            const carousel = document.querySelector('.menu-carousel');
            if (carousel) {
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
            }
        });

        // Pause autoplay on hover
        const carousel = document.querySelector('.menu-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                if (autoPlayInterval) clearInterval(autoPlayInterval);
            });
            carousel.addEventListener('mouseleave', resetAutoPlay);
        }

        // Start autoplay
        resetAutoPlay();
    }

    console.log('🌿 Bujuko Miracle Park & Gardens · 3-Page Website');
    console.log('📄 Pages: Home | About | Contact');
    console.log('📍 Mityana road, 1.5km · signpost on right, 200m from main road.');
    console.log('📞 Bookings: 0757576806 / 0782230255');
    console.log('✨ Relax, Celebrate and Create Memories');
})();
