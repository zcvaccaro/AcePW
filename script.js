document.addEventListener('DOMContentLoaded', function() {
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

    // Form Submission Handler (Placeholder for now)
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Here you would typically send the data to your Python backend
            // For now, we will show a success alert
            const name = document.getElementById('name').value;
            alert(`Thank you, ${name}! We have received your message and will contact you shortly at ${document.getElementById('phone').value || document.getElementById('email').value}.`);

            contactForm.reset();
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
