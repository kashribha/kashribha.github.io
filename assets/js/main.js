/**
 * main.js — K Shrinidhi Bhagavath Portfolio
 * ES6+ — no jQuery, no var, no inline event handlers
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. Scroll fade-in animations (IntersectionObserver)
    ---------------------------------------------------------- */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    /* ----------------------------------------------------------
       2. Active nav link highlight
    ---------------------------------------------------------- */
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    /* ----------------------------------------------------------
       3. Grid trail (mouse effect)
    ---------------------------------------------------------- */
    const gridContainer = document.getElementById('grid-trail');

    if (gridContainer) {
        let cols = 0;

        const buildGrid = () => {
            gridContainer.innerHTML = '';
            const size = 50;
            cols = Math.ceil(window.innerWidth / size);
            const rows = Math.ceil(window.innerHeight / size);
            gridContainer.style.setProperty('--columns', cols);
            gridContainer.style.setProperty('--rows', rows);

            const frag = document.createDocumentFragment();
            for (let i = 0; i < cols * rows; i++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                frag.appendChild(cell);
            }
            gridContainer.appendChild(frag);
        };

        buildGrid();
        window.addEventListener('resize', buildGrid);

        document.addEventListener('mousemove', e => {
            const size = 50;
            const col = Math.floor(e.clientX / size);
            const row = Math.floor(e.clientY / size);
            const idx = row * cols + col;
            const cell = gridContainer.children[idx];
            if (cell) {
                cell.classList.add('active');
                setTimeout(() => cell.classList.remove('active'), 800);
            }
        });
    }

    /* ----------------------------------------------------------
       4. Floating parallax shapes
    ---------------------------------------------------------- */
    const shapes = document.querySelectorAll('.floating-shape');

    if (shapes.length > 0) {
        document.addEventListener('mousemove', e => {
            const x = (e.clientX / window.innerWidth  - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            shapes.forEach((shape, i) => {
                const speed = (i + 1) * 0.8;
                shape.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${x * 1.5}deg)`;
            });
        });
    }

    /* ----------------------------------------------------------
       5. Modal system
    ---------------------------------------------------------- */
    let activeModal = null;

    window.openModal = (id) => {
        const modal = document.getElementById(`modal-${id}`);
        if (!modal || activeModal) return;
        activeModal = modal;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    };

    window.closeModal = (modalId, event) => {
        if (event) event.stopPropagation();
        const modal = document.getElementById(modalId);
        if (!modal) return;
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        activeModal = null;
    };

    // Close on backdrop click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) {
                closeModal(overlay.id);
            }
        });
        // Prevent wheel events from bubbling to page behind modal
        overlay.addEventListener('wheel', e => e.stopPropagation(), { passive: false });
        overlay.addEventListener('touchmove', e => e.stopPropagation(), { passive: false });
    });

    // Stop clicks inside modal content from closing modal
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', e => e.stopPropagation());
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && activeModal) {
            closeModal(activeModal.id);
        }
    });

    /* ----------------------------------------------------------
       6. Pagination (3D fold animation via CSS max-height)
    ---------------------------------------------------------- */
    const grid = document.getElementById('portfolio-grid');
    const btnMore = document.getElementById('btn-show-more');
    const btnLess = document.getElementById('btn-show-less');

    if (grid && btnMore && btnLess) {
        const cards = Array.from(grid.querySelectorAll('.project-card'));
        const STEP = 4;
        const MIN  = 4;
        let visible = MIN;

        const syncButtons = () => {
            btnMore.style.display = visible >= cards.length ? 'none' : 'inline-block';
            btnLess.style.display = visible <= MIN ? 'none' : 'inline-block';
        };

        const applyVisibility = () => {
            cards.forEach((card, i) => {
                if (i < visible) {
                    card.classList.remove('hide-card');
                } else {
                    card.classList.add('hide-card');
                }
            });
            syncButtons();
        };

        btnMore.addEventListener('click', () => {
            visible = Math.min(visible + STEP, cards.length);
            applyVisibility();
            setTimeout(() => window.scrollBy({ top: 600, behavior: 'smooth' }), 100);
        });

        btnLess.addEventListener('click', () => {
            const prev = visible;
            visible = Math.max(
                visible % STEP !== 0 ? visible - (visible % STEP) : visible - STEP,
                MIN
            );
            cards.forEach((card, i) => {
                if (i >= visible && i < prev) card.classList.add('hide-card');
            });
            syncButtons();
            window.scrollBy({ top: -800, behavior: 'smooth' });
        });

        applyVisibility();
    }

    /* ----------------------------------------------------------
       7. Contact form AJAX submission (Formspree)
    ---------------------------------------------------------- */
    const form = document.querySelector('.contact-form');
    const msgBox = document.querySelector('.form-message');

    if (form && msgBox) {
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = 'Sending…';

            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' }
                });

                if (res.ok) {
                    msgBox.textContent = 'Message sent! I will get back to you soon.';
                    msgBox.className = 'form-message success';
                    form.reset();
                } else {
                    throw new Error('Server error');
                }
            } catch {
                msgBox.textContent = 'Something went wrong. Please email me directly.';
                msgBox.className = 'form-message error';
            }

            msgBox.style.display = 'block';
            btn.disabled = false;
            btn.textContent = 'Send Message';
        });
    }
});
