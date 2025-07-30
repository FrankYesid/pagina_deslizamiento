// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Header background on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Enhanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animations for stats
                if (entry.target.classList.contains('stat-number')) {
                    const target = parseInt(entry.target.textContent);
                    animateCounter(entry.target, target);
                }
                
                // Trigger progress bar animations
                if (entry.target.classList.contains('progress-fill')) {
                    entry.target.style.width = '100%';
                }
                
                // Trigger timeline animations
                if (entry.target.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('timeline-visible');
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .tech-item, .goal-item, .section-header, .feature-list li, .expertise-list li, .stat-number, .progress-fill, .timeline-item, .source-link, .map-placeholder');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add enhanced animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .project-card, .tech-item, .goal-item, .section-header, .feature-list li, .expertise-list li, .source-link, .map-placeholder {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.animate-in, .tech-item.animate-in, .goal-item.animate-in, .section-header.animate-in, .feature-list li.animate-in, .expertise-list li.animate-in, .source-link.animate-in, .map-placeholder.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat-number {
            opacity: 0;
            transform: scale(0.5);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .stat-number.animate-in {
            opacity: 1;
            transform: scale(1);
        }
        
        .progress-fill {
            width: 0% !important;
            transition: width 1.5s ease;
        }
        
        .timeline-item {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .timeline-item.timeline-visible {
            opacity: 1;
            transform: translateX(0);
        }
        
        .nav-menu.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 20px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Enhanced hover effects */
        .project-card:hover, .tech-item:hover, .goal-item:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .card-icon:hover {
            transform: rotate(360deg) scale(1.1);
        }
        
        .tech-icon:hover {
            transform: scale(1.2);
        }
        
        .map-placeholder:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        /* Staggered animations for lists */
        .feature-list li:nth-child(1) { transition-delay: 0.1s; }
        .feature-list li:nth-child(2) { transition-delay: 0.2s; }
        .feature-list li:nth-child(3) { transition-delay: 0.3s; }
        .feature-list li:nth-child(4) { transition-delay: 0.4s; }
        
        .expertise-list li:nth-child(1) { transition-delay: 0.1s; }
        .expertise-list li:nth-child(2) { transition-delay: 0.2s; }
        .expertise-list li:nth-child(3) { transition-delay: 0.3s; }
        .expertise-list li:nth-child(4) { transition-delay: 0.4s; }
        
        /* Interactive elements */
        .source-link {
            position: relative;
            overflow: hidden;
        }
        
        .source-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        
        .source-link:hover::before {
            left: 100%;
        }
        
        /* Pulse animation for icons */
        .card-icon, .tech-icon {
            transition: all 0.3s ease;
        }
        
        .card-icon:hover i, .tech-icon:hover i {
            animation: icon-pulse 0.6s ease;
        }
        
        @keyframes icon-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        /* Floating animation for map placeholder */
        .map-placeholder {
            animation: float-gentle 4s ease-in-out infinite;
        }
        
        @keyframes float-gentle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        /* Glow effect for interactive elements */
        .btn:hover {
            box-shadow: 0 0 20px rgba(168, 213, 186, 0.5);
        }
        
        .project-card:hover, .tech-item:hover {
            box-shadow: 0 10px 30px rgba(44, 85, 48, 0.2);
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Enhanced counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Enhanced hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .source-link, .project-card, .tech-item, .goal-item, .map-placeholder');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects for cards
    const cards = document.querySelectorAll('.project-card, .tech-item, .goal-item');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add interactive map placeholder
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><p>Cargando visualización...</p>';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-map"></i><p>Visualización Interactiva de Riesgos</p>';
            }, 2000);
        });
    }

    // Add map controls functionality
    const mapButtons = document.querySelectorAll('.map-btn');
    const satelliteLayers = document.querySelectorAll('.satellite-layer');
    const layers = ['risk', 'vegetation', 'terrain'];
    let currentLayerIndex = 0;
    let autoCycleInterval;

    function switchLayer(layerIndex) {
        // Remove active class from all buttons and layers
        mapButtons.forEach(btn => btn.classList.remove('active'));
        satelliteLayers.forEach(layerEl => layerEl.classList.remove('active'));
        
        // Add active class to current layer and button
        const currentLayer = layers[layerIndex];
        const activeButton = document.querySelector(`[data-layer="${currentLayer}"]`);
        const activeLayer = document.querySelector(`.satellite-layer[data-layer="${currentLayer}"]`);
        
        if (activeButton) activeButton.classList.add('active');
        if (activeLayer) activeLayer.classList.add('active');
        
        // Add animation effect
        const mapPlaceholder = document.querySelector('#interactive-map');
        if (mapPlaceholder) {
            mapPlaceholder.style.transform = 'scale(1.05)';
            setTimeout(() => {
                mapPlaceholder.style.transform = 'scale(1)';
            }, 200);
        }
    }

    function startAutoCycle() {
        autoCycleInterval = setInterval(() => {
            currentLayerIndex = (currentLayerIndex + 1) % layers.length;
            switchLayer(currentLayerIndex);
        }, 4000); // Change every 4 seconds
    }

    function stopAutoCycle() {
        if (autoCycleInterval) {
            clearInterval(autoCycleInterval);
            autoCycleInterval = null;
        }
    }

    // Start automatic cycling
    startAutoCycle();

    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Stop auto cycle when user manually clicks
            stopAutoCycle();
            
            // Get the layer index for the clicked button
            const layer = this.getAttribute('data-layer');
            currentLayerIndex = layers.indexOf(layer);
            
            // Switch to the selected layer
            switchLayer(currentLayerIndex);
            
            // Restart auto cycle after 10 seconds of inactivity
            setTimeout(() => {
                if (!autoCycleInterval) {
                    startAutoCycle();
                }
            }, 10000);
        });
    });

    // Add goal progress animations
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach(goal => {
        const progressFill = goal.querySelector('.goal-progress-fill');
        if (progressFill) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = progressFill.style.width;
                        progressFill.style.width = '0%';
                        setTimeout(() => {
                            progressFill.style.width = width;
                        }, 500);
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(goal);
        }
    });

    // Add card click interactions
    const projectCards = document.querySelectorAll('.project-card[data-card]');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardType = this.getAttribute('data-card');
            const stats = this.querySelectorAll('.stat-number');
            
            // Animate stats on click
            stats.forEach(stat => {
                const originalText = stat.textContent;
                stat.style.transform = 'scale(1.2)';
                stat.style.color = '#2c5530';
                setTimeout(() => {
                    stat.style.transform = 'scale(1)';
                    stat.style.color = '#4a7c59';
                }, 300);
            });
            
            // Show card type info
            console.log(`Card clicked: ${cardType}`);
        });
    });

    // Add tech item interactions
    const techItems = document.querySelectorAll('.tech-item[data-tech]');
    techItems.forEach(item => {
        item.addEventListener('click', function() {
            const techType = this.getAttribute('data-tech');
            const icon = this.querySelector('.tech-icon i');
            
            // Animate icon
            icon.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }, 600);
            
            // Show tech details
            const details = this.querySelector('.tech-details');
            if (details) {
                details.style.background = 'rgba(168, 213, 186, 0.2)';
                setTimeout(() => {
                    details.style.background = 'transparent';
                }, 1000);
            }
            
            console.log(`Tech clicked: ${techType}`);
        });
    });

    // Add goal item interactions
    const goalItemsWithData = document.querySelectorAll('.goal-item[data-goal]');
    goalItemsWithData.forEach(item => {
        item.addEventListener('click', function() {
            const goalType = this.getAttribute('data-goal');
            const icon = this.querySelector('i');
            const progressFill = this.querySelector('.goal-progress-fill');
            
            // Animate icon and progress
            icon.style.transform = 'scale(1.3)';
            if (progressFill) {
                progressFill.style.background = 'linear-gradient(90deg, #2c5530, #4a7c59)';
            }
            
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
                if (progressFill) {
                    progressFill.style.background = 'linear-gradient(90deg, #4a7c59, #6b9c7a)';
                }
            }, 300);
            
            console.log(`Goal clicked: ${goalType}`);
        });
    });

    // Add typing effect to section headers
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    sectionHeaders.forEach(header => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    entry.target.textContent = '';
                    
                    let i = 0;
                    function typeWriter() {
                        if (i < text.length) {
                            entry.target.textContent += text.charAt(i);
                            i++;
                            setTimeout(typeWriter, 50);
                        }
                    }
                    
                    setTimeout(typeWriter, 200);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(header);
    });

    // Lazy loading for images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add CSS for loading animation
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        .hero-image {
            animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add particle effect to hero section
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#a8d5ba';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.opacity = '0.6';
        particle.style.animation = 'particle-float 3s linear infinite';
        
        document.querySelector('.hero').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }

    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particle-float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Create particles periodically
    setInterval(createParticle, 200);
    
    // Add scroll-triggered animations for sections
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add CSS for section animations
    const sectionStyle = document.createElement('style');
    sectionStyle.textContent = `
        .section {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section.section-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(sectionStyle);
}); 