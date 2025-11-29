// Hamburger Menu Toggle
function toggleMenu() {
    const menu = document.querySelector(".menulinks");
    const icon = document.querySelector(".hamburgericon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const hamburgerNav = document.querySelector('#hamburgernav');
    const menu = document.querySelector('.menulinks');
    const icon = document.querySelector('.hamburgericon');
    
    if (hamburgerNav && !hamburgerNav.contains(event.target) && menu.classList.contains('open')) {
        menu.classList.remove('open');
        icon.classList.remove('open');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.menulinks a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('.menulinks');
        const icon = document.querySelector('.hamburgericon');
        menu.classList.remove('open');
        icon.classList.remove('open');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for sequential animations
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .experience-card, .education-card, .contact-card'
    );
    animatedElements.forEach(el => observer.observe(el));
});

// Typing animation with cursor
const text = "Ananya Devraj";
const typewriter = document.getElementById('typewriter');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typewriter.innerHTML += text.charAt(i);
        i++;
        // Vary typing speed slightly for more natural effect
        const speed = Math.random() * 100 + 50;
        setTimeout(typeWriter, speed);
    } else {
        // After typing is complete, make cursor blink
        document.querySelector('.cursor').style.animation = 'blink 1s step-end infinite';
    }
}

// Start typewriter animation after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 800);
});

// Parallax effect for stickers
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const stickers = document.querySelectorAll('.sticker');
    
    stickers.forEach((sticker, index) => {
        const speed = (index + 1) * 0.2;
        const yPos = -(scrolled * speed);
        sticker.style.transform = `translateY(${yPos}px)`;
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .menulinks a');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Copy email to clipboard functionality (optional enhancement)
const emailElement = document.querySelector('a[href^="mailto:"]');
if (emailElement) {
    emailElement.addEventListener('dblclick', (e) => {
        e.preventDefault();
        const email = emailElement.textContent;
        navigator.clipboard.writeText(email).then(() => {
            // Create temporary notification
            const notification = document.createElement('div');
            notification.textContent = 'Email copied to clipboard!';
            notification.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 1rem 2rem;
                border-radius: 50px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        });
    });
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-links a.active {
        color: var(--text-primary);
        font-weight: 600;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Prevent flash of unstyled content
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
