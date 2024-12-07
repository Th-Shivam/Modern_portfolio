function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for smooth acceleration and deceleration
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

document.addEventListener('DOMContentLoaded', () => {
    // Create transition elements
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading-animation';
    loadingElement.innerHTML = '<div class="loading-circle"></div>';
    
    document.body.appendChild(transitionElement);
    document.body.appendChild(loadingElement);

    // Update the smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Start transition effects
            transitionElement.classList.add('active');
            loadingElement.classList.add('active');
            
            // Fade out current section
            document.querySelectorAll('section').forEach(section => {
                section.classList.add('fade-out');
            });
            
            // Wait for transition
            setTimeout(() => {
                // Use custom smooth scroll instead of scrollIntoView
                smoothScroll(targetSection, 1000); // 1000ms duration
                
                // Reset transitions
                setTimeout(() => {
                    transitionElement.classList.remove('active');
                    loadingElement.classList.remove('active');
                    document.querySelectorAll('section').forEach(section => {
                        section.classList.remove('fade-out');
                    });
                }, 600);
            }, 600);
        });
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // Add hover effect for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
            link.style.textShadow = `0 0 8px ${getComputedStyle(link).color}`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
            link.style.textShadow = 'none';
        });
    });

    // Scroll Indicator Functionality
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    const dots = document.querySelectorAll('.scroll-dot');

    // Update active dot based on scroll position
    function updateActiveDot() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    dots.forEach(dot => dot.classList.remove('active'));
                    dots[index].classList.add('active');
                }
            }
        });
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const targetSection = document.getElementById(sections[index]);
            if (targetSection) {
                smoothScroll(targetSection, 1000);
            }
        });

        // Add hover effect
        dot.addEventListener('mouseenter', () => {
            const sectionName = dot.getAttribute('data-section');
            const tooltip = document.createElement('div');
            tooltip.className = 'dot-tooltip';
            tooltip.textContent = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
            dot.appendChild(tooltip);
        });

        dot.addEventListener('mouseleave', () => {
            const tooltip = dot.querySelector('.dot-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Update active dot on scroll
    window.addEventListener('scroll', updateActiveDot);
    // Initial update
    updateActiveDot();
});

    // Typing animation for hero section
    const textElement = document.querySelector('.typing-text');
    const texts = ["Software Developer", "Problem Solver", "Tech Enthusiast", "Proud Hindu"];
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[textIndex].length) {
            textElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            textElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }

    // Start typing animation
    document.addEventListener('DOMContentLoaded', () => {
        if(textElement) {
            setTimeout(type, 1000);
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.observe(element);
    });

    // Particle background
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#00f3ff", "#ff00ff", "#00ff9d"]
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.6,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00f3ff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "grab"
                },
                onClick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Initialize AOS
    document.addEventListener('DOMContentLoaded', function() {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false
        });
    });
