document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    const heroSlides = document.querySelectorAll('#heroSlider .slide');
    let currentHeroSlide = 0;
    if (heroSlides.length > 0) {
        setInterval(() => {
            heroSlides[currentHeroSlide].classList.remove('active');
            
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            
            heroSlides[currentHeroSlide].classList.add('active');
        }, 5000);
    }
    const skillsSection = document.getElementById('skillsSection');
    const progressFills = document.querySelectorAll('.progress-fill');
    if (skillsSection && progressFills.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.15
        };
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressFills.forEach(fill => {
                        const targetWidth = fill.getAttribute('data-width');
                        fill.style.width = targetWidth;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        skillsObserver.observe(skillsSection);
    }
    const filterButtons = document.querySelectorAll('#projectsFilters .filter-btn');
    const projectCards = document.querySelectorAll('#projectsGrid .project-card');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || category === cardCategory) {
                    card.classList.remove('hide');
                    card.classList.remove('fade-in');
                    void card.offsetWidth;
                    card.classList.add('fade-in');
                } else {
                    card.classList.add('hide');
                    card.classList.remove('fade-in');
                }
            });
        });
    });