/**
 * Main Controller Script
 */
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
// Fitur Lightbox / Modal Galeri Sertifikat
// ==========================================
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.modal__close');
// Pastikan gambar di HTML Anda memiliki class "gallery__img"
const galleryImages = document.querySelectorAll('.gallery__img'); 

if (modal && galleryImages.length > 0) {
    // Beri fungsi klik ke setiap gambar di galeri
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.classList.add('show');
            modalImg.src = this.src; // Salin foto yang diklik ke modal pop-up
        });
    });

    // Fungsi tutup modal saat klik tombol (X)
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Fungsi tutup modal jika area luar gambar (background hitam) diklik
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

    // 1. Loading Screen Handler
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) loadingScreen.classList.add('hidden');
        }, 500); // Tahan 0.5s agar transisi mulus
    });

    // 2. Inisialisasi Typing Effect
    new TypingEffect('.typing-text', [
        'Web Developer',
        'Front-End Developer',
        'Fresh Graduate Teknik Informatika ','UI/UX Designer'
    ]);

    // 3. Inisialisasi Dark Mode & Form Validation
    initDarkMode();
    initFormValidation();
    initScrollObserver();
    initProjectFilter();
    initRippleEffect();

    // 4. Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
        });
    }
    if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

    // Tutup mobile menu saat link diklik
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('show-menu');
        });
    });

    // 5. Scroll Events (Header Class, Progress Bar, Active Section Link, Back To Top)
    const header = document.getElementById('header');
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollUp = document.getElementById('scroll-up');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Sticky Navbar Effect
        if (scrollY > 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }

        // Top Progress Bar Calculator
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollY / height) * 100;
        if (scrollProgress) scrollProgress.style.width = `${progress}%`;

        // Back to top button visibility
        if (scrollY >= 350) {
            scrollUp.classList.add('show-scroll');
        } else {
            scrollUp.classList.remove('show-scroll');
        }

        // Active Navigation Highlight saat Scroll
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) navLink.classList.add('active-link');
            } else {
                if (navLink) navLink.classList.remove('active-link');
            }
        });
    });
    // Logika Slideshow Foto Profil
setInterval(() => {
    const activeImg = document.querySelector('.slide-img.active');
    let nextImg = activeImg.nextElementSibling;
    
    // Jika tidak ada gambar selanjutnya, kembali ke gambar pertama
    if (!nextImg || !nextImg.classList.contains('slide-img')) {
        nextImg = document.querySelector('.slideshow-container .slide-img:first-child');
    }
    
    activeImg.classList.remove('active');
    nextImg.classList.add('active');
}, 4000); // Ganti foto setiap 4 detik (4000 ms)
    // 6. Auto-Scale Semua Foto Hero agar Ukurannya Sama Persis
    function autoFitHeroImages() {
        const container = document.querySelector('.hero__img-box.slideshow-container');
        const heroImgs = document.querySelectorAll('.hero__img-box .hero__img');
        if (!container || heroImgs.length === 0) return;

        const W = container.clientWidth || 380;
        const H = container.clientHeight || 400;

        heroImgs.forEach((img) => {
            const fitSingleImage = () => {
                try {
                    const natW = img.naturalWidth;
                    const natH = img.naturalHeight;
                    if (!natW || !natH) return;

                    const scanW = 160;
                    const scanH = Math.round((scanW * natH) / natW);
                    const canvas = document.createElement('canvas');
                    canvas.width = scanW;
                    canvas.height = scanH;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, scanW, scanH);
                    const data = ctx.getImageData(0, 0, scanW, scanH).data;

                    let minX = scanW, minY = scanH, maxX = 0, maxY = 0;
                    let found = false;

                    for (let y = 0; y < scanH; y++) {
                        for (let x = 0; x < scanW; x++) {
                            const alpha = data[(y * scanW + x) * 4 + 3];
                            if (alpha > 25) {
                                if (x < minX) minX = x;
                                if (x > maxX) maxX = x;
                                if (y < minY) minY = y;
                                if (y > maxY) maxY = y;
                                found = true;
                            }
                        }
                    }

                    if (!found || maxY <= minY) return;

                    const fitScale = Math.min(W / natW, H / natH);
                    const dispW = natW * fitScale;
                    const dispH = natH * fitScale;
                    const offX = (W - dispW) / 2;
                    const offY = (H - dispH) / 2;

                    const subjTopPx = offY + (minY / scanH) * dispH;
                    const subjHeightPx = ((maxY - minY) / scanH) * dispH;
                    const subjCenterXPx = offX + (((minX + maxX) / 2) / scanW) * dispW;

                    const targetHeight = H * 0.88;
                    const targetTop = H * 0.06;
                    const scale = Math.min(2.6, Math.max(1.1, targetHeight / subjHeightPx));

                    const originX = Math.abs(scale - 1) > 0.01
                        ? (subjCenterXPx * scale - W / 2) / (scale - 1)
                        : W / 2;
                    const originY = Math.abs(scale - 1) > 0.01
                        ? (subjTopPx * scale - targetTop) / (scale - 1)
                        : H / 2;

                    img.style.transformOrigin = `${originX.toFixed(1)}px ${originY.toFixed(1)}px`;
                    img.style.scale = scale.toFixed(2);
                } catch (err) {
                    // Tetap memakai ukuran default dari atribut style HTML jika gagal membaca piksel
                }
            };

            if (img.complete) {
                fitSingleImage();
            } else {
                img.addEventListener('load', fitSingleImage);
            }
        });
    }

    autoFitHeroImages();
    window.addEventListener('resize', autoFitHeroImages);
});