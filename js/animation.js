/**
 * Scroll Animations, Counter, Filter Projects, Ripple Effect
 */

// 1. Intersection Observer untuk Scroll Reveal & Progress Bar
function initScrollObserver() {
    const revealElements = document.querySelectorAll('.section, .glass-card');
    
    // Tambahkan class reveal awal
    revealElements.forEach(el => el.classList.add('reveal'));

    const observerOptions = {
        root: null,
        threshold: 0.15 // Animasi aktif saat 15% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Jika elemen mengandung counter, jalankan animasi angka
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => animateCounter(counter));

                // Unobserve agar animasi hanya jalan sekali (performa optimal)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

// 2. Animasi Angka Counter (About Section)
function animateCounter(counterElement) {
    const target = +counterElement.getAttribute('data-target');
    const speed = 200; // Semakin kecil semakin cepat

    const updateCount = () => {
        const count = +counterElement.innerText;
        const inc = target / speed;

        if (count < target) {
            counterElement.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 20);
        } else {
            counterElement.innerText = target + "+";
        }
    };

    updateCount();
}

// 3. Project Filtering (Vanilla JS)
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.projects__item');
    const projectCards = document.querySelectorAll('.projects__card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Ubah class active button
            filterButtons.forEach(b => b.classList.remove('active-project'));
            btn.classList.add('active-project');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue.replace('.', ''))) {
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

// 4. Button Ripple Effect (Micro-interaction)
function initRippleEffect() {
    const buttons = document.querySelectorAll('.ripple');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}