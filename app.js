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
                
                testimonialDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                testimonialCard.classList.add('fade-out');
                setTimeout(() => {
                    const currentTestimonial = testimonials[index];
                    testimonialAvatar.src = currentTestimonial.image;
                    testimonialAvatar.alt = `${currentTestimonial.name} - ${currentTestimonial.role}`;
                    testimonialText.textContent = currentTestimonial.text;
                    testimonialAuthor.textContent = currentTestimonial.name;
                    testimonialRole.textContent = currentTestimonial.role;
                    testimonialCard.classList.remove('fade-out');
                    testimonialCard.classList.add('fade-in');
                }, 300);
    }