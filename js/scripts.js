/**
 * PORTAFOLIO - BRADY ALEXANDER
 * Motor Visual 2026 - Versión Optimizada
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Motor de Partículas (Fondo) ---
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 50;
    
    function initCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateCanvas);
    }
    
    window.addEventListener('resize', initCanvas);
    initCanvas();
    createParticles();
    animateCanvas();

    // --- 2. Brillo Seguidor en Tarjetas ---
    document.querySelectorAll('.project-card').forEach(card => {
        const glow = document.createElement('div');
        glow.className = 'card-glow';
        card.prepend(glow);
        
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // --- 3. Coreografía de Entrada (Reveal) ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .timeline-item, .study-card, .hero-text, .avatar-wrapper, .sobre-card, .info-item, .skills-card').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // --- 4. Efecto de Scroll en Navbar ---
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('#mainNav');
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

});
