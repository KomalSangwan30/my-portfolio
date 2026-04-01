/* ══════════════════════════════════════════
   Komal Kumari Portfolio v3 — Script
   Teal-Gold theme · Light/Dark toggle
   No custom cursor · Clean & fast
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── THEME TOGGLE ───────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('dk-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('dk-theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            themeIcon.className = 'fa-solid fa-sun';
        }
    }

    // ─── PARTICLE SYSTEM ────────────────────────
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h;
        const particles = [];
        const PARTICLE_COUNT = 70;
        const CONNECT_DISTANCE = 110;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        function createParticles() {
            particles.length = 0;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    size: Math.random() * 2 + 0.5,
                    alpha: Math.random() * 0.35 + 0.1
                });
            }
        }

        function getParticleColor() {
            const theme = html.getAttribute('data-theme');
            return theme === 'dark'
                ? { r: 20, g: 184, b: 166 }   // teal
                : { r: 13, g: 148, b: 136 };   // darker teal for light mode
        }

        function drawParticles() {
            ctx.clearRect(0, 0, w, h);
            const color = getParticleColor();
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.alpha})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECT_DISTANCE) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.05 * (1 - dist / CONNECT_DISTANCE)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(drawParticles);
        }

        resize();
        createParticles();
        drawParticles();
        window.addEventListener('resize', () => { resize(); createParticles(); });
    }

    // ─── TYPING EFFECT ──────────────────────────
    const typingEl = document.getElementById('heroTyping');
    if (typingEl) {
        const roles = [
            'Software Developer',
            'Data Science Enthusiast',
            'CS Engineering Student',
            'Continuous Learner'
        ];
        let roleIndex = 0, charIndex = 0, isDeleting = false;

        function type() {
            const current = roles[roleIndex];
            if (isDeleting) {
                typingEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === current.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                speed = 500;
            }

            setTimeout(type, speed);
        }
        setTimeout(type, 1000);
    }

    // ─── NAVBAR SCROLL ──────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ─── HAMBURGER ──────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ─── ACTIVE NAV ─────────────────────────────
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const h = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (scrollY >= top && scrollY < top + h) {
                navItems.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { passive: true });

    // ─── SCROLL REVEAL ──────────────────────────
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // ─── STAGGER SKILL CHIPS ────────────────────
    const skillCategories = document.querySelectorAll('.skill-category');
    const chipObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.skill-chip').forEach((chip, i) => {
                    chip.style.opacity = '0';
                    chip.style.transform = 'translateY(10px) scale(0.92)';
                    setTimeout(() => {
                        chip.style.transition = 'all 0.4s ease';
                        chip.style.opacity = '1';
                        chip.style.transform = 'translateY(0) scale(1)';
                    }, i * 50);
                });
                chipObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    skillCategories.forEach(el => chipObs.observe(el));

    // ─── STAGGER ACHIEVEMENT ROWS ───────────────
    const achCols = document.querySelectorAll('.ach-col');
    const achObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.ach-row').forEach((row, i) => {
                    row.style.opacity = '0';
                    row.style.transform = 'translateX(-15px)';
                    setTimeout(() => {
                        row.style.transition = 'all 0.45s ease';
                        row.style.opacity = '1';
                        row.style.transform = 'translateX(0)';
                    }, i * 70);
                });
                achObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    achCols.forEach(el => achObs.observe(el));

    // ─── STAGGER HIGHLIGHT CARDS ────────────────
    const highlightCards = document.querySelectorAll('.about-highlights');
    const hlObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.highlight-card').forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(18px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.55s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 130);
                });
                hlObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    highlightCards.forEach(el => hlObs.observe(el));

    // ─── GALLERY STAGGER ────────────────────────
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        const galObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    galleryGrid.querySelectorAll('.gallery-card').forEach((card, i) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(25px) scale(0.95)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, i * 200);
                    });
                    galObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        galObs.observe(galleryGrid);
    }

    // ─── LIGHTBOX ───────────────────────────────
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery-img-wrap').forEach(wrap => {
        wrap.addEventListener('click', () => {
            const img = wrap.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    document.querySelectorAll('.cert-eye').forEach(btn => {
        btn.addEventListener('click', () => {
            const imgSrc = btn.getAttribute('data-img');
            if (imgSrc && imgSrc !== 'PATH_TO_CERTIFICATE_IMAGE.jpg') {
                lightboxImg.src = imgSrc;
                lightboxImg.alt = "Certificate";
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                alert("Certificate image not yet uploaded! Please replace 'PATH_TO_CERTIFICATE_IMAGE.jpg' with the actual image path.");
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    if (lightbox) {
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ─── SMOOTH SCROLL ──────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ─── PARALLAX ON PROFILE IMAGE ──────────────
    if (window.innerWidth > 768) {
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            window.addEventListener('mousemove', e => {
                const x = (e.clientX / window.innerWidth - 0.5) * 15;
                const y = (e.clientY / window.innerHeight - 0.5) * 15;
                heroVisual.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    }

    // ─── FORCE DOWNLOAD FOR PDF ─────────────────
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const url = link.href;
                const filename = link.getAttribute('download');

                // Optional: Show loading state
                const originalHTML = link.innerHTML;
                link.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

                const response = await fetch(url);
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);

                const tempLink = document.createElement('a');
                tempLink.href = blobUrl;
                tempLink.download = filename;
                document.body.appendChild(tempLink);
                tempLink.click();

                document.body.removeChild(tempLink);
                window.URL.revokeObjectURL(blobUrl);

                // Restore icon
                link.innerHTML = originalHTML;
            } catch (err) {
                console.error('Download failed:', err);
                // Fallback
                window.open(link.href, '_blank');
            }
        });
    });
});
