document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("nU2k5LSJf56eC-GLb");
    }

    // Function to set hero section to viewport height minus navs
    function setHeroHeight() {
        const topBar = document.querySelector('.top-bar');
        const navbar = document.querySelector('.navbar');
        const hero = document.querySelector('.hero-section');

        if (hero) {
            const topBarHeight = topBar ? topBar.offsetHeight : 0;
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            hero.style.height = `calc(100vh - ${topBarHeight + navbarHeight}px)`;
        }
    }

    // Set hero height on load and resize
    setHeroHeight();
    window.addEventListener('resize', setHeroHeight);

    // Dynamic Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetId === '#contact') {
                // Scroll to the very bottom of the page for contact links
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            } else if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values and trim whitespace
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple validation to ensure required fields are not empty
            if (!name || !email || !message) {
                formStatus.innerHTML = `<div class="alert alert-warning" role="alert">Please fill out all required fields: Name, Email, and Message.</div>`;
                return; // Stop the function if validation fails
            }

            // Visual feedback: Change button text to indicate processing
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const templateParams = {
                from_name: name,
                from_email: email,
                phone_number: document.getElementById('phone').value,
                property_address: document.getElementById('address').value,
                message: message
            };

            emailjs.send('service_sdd65u4', 'template_nij9cjd', templateParams)
                .then(function() {
                    const cardBody = contactForm.parentElement;
                    const originalHeight = cardBody.offsetHeight;
                    cardBody.style.minHeight = `${originalHeight}px`;
                    cardBody.style.display = 'flex';
                    cardBody.style.alignItems = 'center';
                    cardBody.style.justifyContent = 'center';
                    cardBody.innerHTML = `<div class="text-center">
                                            <i class="fas fa-check-circle fa-4x text-success mb-3"></i>
                                            <h4>Message Sent!</h4>
                                            <p class="text-muted">Thank you for contacting us. We will be in touch shortly.</p>
                                          </div>`;
                }, function(error) {
                    formStatus.innerHTML = `<div class="alert alert-danger" role="alert">Failed to send message. Please call us directly at 845-401-1871.</div>`;
                    console.error('EmailJS Error:', error);
                    // Reset button on failure so the user can try again
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    // Clear the status message after 5 seconds
                    setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
                });
        });
    }

    // Phone Number Auto-formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navbar = document.getElementById('navbarNav');
        const toggler = document.querySelector('.navbar-toggler');

        if (navbar && toggler && navbar.classList.contains('show') && !navbar.contains(event.target) && !toggler.contains(event.target)) {
            toggler.click();
        }
    });
});
