document.addEventListener('DOMContentLoaded', () => {
    
    const pageClass = document.body.className;

    // --- V2 INDEX PAGE SCRIPT ---
    if (pageClass.includes('home-body-v2')) {
        // Katana Animation
        const katana = document.querySelector('.katana-svg');
        const particlesContainer = document.getElementById('katana-particles');

        anime({
            targets: katana,
            translateX: [-50, 50],
            direction: 'alternate',
            loop: true,
            duration: 3000,
            easing: 'easeInOutSine'
        });

        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particlesContainer.appendChild(particle);

            const size = anime.random(2, 8);
            const color = Math.random() > 0.5 ? '#FFFFFF' : '#C084FC';

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            anime({
                targets: particle,
                translateX: anime.random(-50, 50),
                translateY: anime.random(-50, 50),
                opacity: [1, 0],
                duration: anime.random(800, 1500),
                easing: 'easeOutExpo',
                complete: () => {
                    particle.remove();
                }
            });
        }

        katana.addEventListener('mousemove', (e) => {
            const rect = katana.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (Math.random() > 0.5) { // Throttle particle creation
                 createParticle(e.clientX, e.clientY);
            }
        });
    }

    // --- V3 ANIME.JS REPLICA SCRIPT ---
    if (pageClass.includes('anime-replica-body')) {
        // Hero Morphing Animation
        const morphing = anime({
            targets: '.ar-logo-svg path',
            d: [
                { value: 'M 50 0 L 100 50 L 50 100 L 0 50 Z' }, // Diamond
                { value: 'M 50 0 L 100 100 L 0 100 Z' }, // Triangle
                { value: 'M 0 0 L 100 0 L 100 100 L 0 100 Z' }, // Square
                { value: 'M 50 0 L 100 50 L 50 100 L 0 50 Z' }  // Back to Diamond
            ],
            duration: 4000,
            easing: 'easeInOutQuad',
            loop: true
        });

        // Hero Text Animation
        anime.timeline({ loop: true })
            .add({
                targets: '.ar-title .ar-title-word',
                scale: [14, 1],
                opacity: [0, 1],
                easing: "easeOutCirc",
                duration: 800,
                delay: (el, i) => 800 * i
            }).add({
                targets: '.ar-title',
                opacity: 0,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 1000
            });

        // Stagger Grid Animation
        const staggerGrid = document.querySelector('.ar-stagger-grid');
        for (let i = 0; i < 100; i++) {
            staggerGrid.innerHTML += '<div class="el"></div>';
        }
        anime({
            targets: '.ar-stagger-grid .el',
            scale: [
                { value: .1, easing: 'easeOutSine', duration: 500 },
                { value: 1, easing: 'easeInOutQuad', duration: 1200 }
            ],
            loop: true,
            delay: anime.stagger(200, { grid: [10, 10], from: 'center' })
        });

        // Scroll Animation
        const scrollBox = document.querySelector('.ar-scroll-box');
        const scrollObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                anime({
                    targets: scrollBox,
                    translateX: [0, 200, 0],
                    rotate: 360,
                    duration: 3000,
                    loop: true,
                    easing: 'easeInOutSine'
                });
            }
        });
        scrollObserver.observe(document.querySelector('.ar-scroll'));

        // Draggable Animation
        const draggableBox = document.querySelector('.ar-draggable-box');
        let isDragging = false;
        draggableBox.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                anime.set(draggableBox, {
                    translateX: e.clientX - draggableBox.offsetWidth / 2,
                    translateY: e.clientY - draggableBox.offsetHeight / 2
                });
            }
        });
    }

    // --- V3 MANGA PAGE SCRIPT ---
    if (pageClass.includes('manga-body-v3')) {
        const panels = document.querySelectorAll('.manga-panel');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.2 });

        panels.forEach(panel => {
            observer.observe(panel);
        });
    }
    
    // --- MINDSET (MAC OS) SCRIPT ---
    if (pageClass.includes('macos-body')) {
        const windows = document.querySelectorAll('.macos-window');
        windows.forEach(win => makeDraggable(win));

        function makeDraggable(element) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            const header = element.querySelector('.window-header');
            header.onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
                windows.forEach(w => w.style.zIndex = '10');
                element.style.zIndex = '20';
            }

            function elementDrag(e) {
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                element.style.top = (element.offsetTop - pos2) + "px";
                element.style.left = (element.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }
});