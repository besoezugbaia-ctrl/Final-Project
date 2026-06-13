document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       MOBILE MENU / HAMBURGER
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }
    /* ==========================================================================
       ACTIVE LINK ON SCROLL
       ========================================================================== */
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
    /* ==========================================================================
       HERO AUTO IMAGE SLIDER
       ========================================================================== */
    const heroSlides = document.querySelectorAll('#heroSlider .slide');
    let currentHeroSlide = 0;
    if (heroSlides.length > 0) {
        setInterval(() => {
            // Remove active class from current slide
            heroSlides[currentHeroSlide].classList.remove('active');
            
            // Increment index
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            
            // Add active class to new slide
            heroSlides[currentHeroSlide].classList.add('active');
        }, 5000); // 5 seconds interval
    }
    /* ==========================================================================
       SKILL PROGRESS BARS (ON SCROLL)
       ========================================================================== */
    const skillsSection = document.getElementById('skillsSection');
    const progressFills = document.querySelectorAll('.progress-fill');
    if (skillsSection && progressFills.length > 0) {
        const observerOptions = {
            root: null,
            threshold: 0.15 // Trigger when 15% of the section is visible
        };
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressFills.forEach(fill => {
                        const targetWidth = fill.getAttribute('data-width');
                        fill.style.width = targetWidth;
                    });
                    // Unobserve after animating once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        skillsObserver.observe(skillsSection);
    }
    /* ==========================================================================
       PROJECTS FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('#projectsFilters .filter-btn');
    const projectCards = document.querySelectorAll('#projectsGrid .project-card');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                // Toggle hide/show classes with transition animation
                if (category === 'all' || category === cardCategory) {
                    card.classList.remove('hide');
                    // Add animation class after a tiny delay to reset transition
                    card.classList.remove('fade-in');
                    void card.offsetWidth; // Trigger reflow
                    card.classList.add('fade-in');
                } else {
                    card.classList.add('hide');
                    card.classList.remove('fade-in');
                }
            });
        });
    });
    /* ==========================================================================
       TESTIMONIALS SLIDER
       ========================================================================== */
    const testimonials = [
        {
            text: "აბესალომი არის შესანიშნავი პროფესიონალი. მან ჩვენი იდეები აქცია მომხიბვლელ და სრულად ფუნქციურ ციფრულ პლატფორმად. მისი პასუხისმგებლობის გრძნობა და დეტალებზე ორიენტირებულობა უმაღლეს დონეზეა.",
            name: "გიორგი მახარაძე",
            role: "CEO, TechGeorgia",
            image: "assets/user.jpg"
        },
        {
            text: "უზომოდ კმაყოფილი ვართ აბესალომის მიერ შესრულებული სამუშაოთი. ვებ-გვერდის ახალი დიზაინი არა მხოლოდ ლამაზია, არამედ საგრძნობლად გაზარდა ჩვენი კონვერსია. მუშაობს სწრაფად და პროფესიონალურად.",
            name: "ნინო დევდარიანი",
            role: "პროდუქტის მენეჯერი, SmartWeb",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&q=80"
        },
        {
            text: "ძალიან კომფორტული იყო აბესალომთან მუშაობა. მან ზუსტად გაიგო ჩვენი მოთხოვნები და წარმოადგინა იმაზე უკეთესი შედეგი, ვიდრე ველოდით. მობილური აპლიკაციის ინტერფეისი გამოვიდა ძალიან მოსახერხებელი.",
            name: "დავით ბერიძე",
            role: "დამფუძნებელი, DeliveryCo",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&q=80"
        },
        {
            text: "აბესალომის ტექნიკური და დიზაინერული უნარების კომბინაცია იშვიათია. მან შექმნა ჩვენი ბრენდის ახალი იდენტობა და ვებ-გვერდი. აუცილებლად ვითანამშრომლებთ მომავალშიც.",
            name: "ელენე ყიფიანი",
            role: "მარკეტინგის ხელმძღვანელი, CreativeSpace",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces&q=80"
        }
    ];
    const testimonialCard = document.getElementById('testimonialCard');
    const testimonialAvatar = document.getElementById('testimonialAvatar');
    const testimonialText = document.getElementById('testimonialText');
    const testimonialAuthor = document.getElementById('testimonialAuthor');
    const testimonialRole = document.getElementById('testimonialRole');
    const testimonialDots = document.querySelectorAll('#testimonialDots .dot-btn');
    if (testimonialCard && testimonialDots.length > 0) {
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                
                // Update active dot
                testimonialDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                // Fade out card content
                testimonialCard.classList.add('fade-out');
                setTimeout(() => {
                    // Update content
                    const currentTestimonial = testimonials[index];
                    testimonialAvatar.src = currentTestimonial.image;
                    testimonialAvatar.alt = `${currentTestimonial.name} - ${currentTestimonial.role}`;
                    testimonialText.textContent = currentTestimonial.text;
                    testimonialAuthor.textContent = currentTestimonial.name;
                    testimonialRole.textContent = currentTestimonial.role;
                    // Fade in content
                    testimonialCard.classList.remove('fade-out');
                    testimonialCard.classList.add('fade-in');
                }, 300); // Wait for fade-out transition to complete
            });
        });
    }
    /* ==========================================================================
       CONTACT FORM SUBMISSION (API POST)
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalOkBtn = document.getElementById('modalOkBtn');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Form data
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const website = document.getElementById('formWebsite').value || 'არ არის მითითებული';
            const message = document.getElementById('formMessage').value;
            // Start loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            try {
                // Perform POST request
                const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        website: website,
                        message: message
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Submission Success:', data);
                    
                    // Show success modal
                    successModal.classList.add('open');
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    alert('გაგზავნისას დაფიქსირდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით.');
                }
            } catch (error) {
                console.error('Submission Error:', error);
                alert('ქსელის შეცდომა. გთხოვთ შეამოწმოთ ინტერნეტთან კავშირი.');
            } finally {
                // End loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }
    // Modal closing logic
    if (successModal) {
        const closeModal = () => {
            successModal.classList.remove('open');
        };
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
        if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
        // Close when clicking backdrop
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });
    }
});
