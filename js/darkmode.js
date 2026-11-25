/**
 * Dark Mode Controller (Default: Dark Mode)
 */
const THEME_STORAGE_KEY = 'portfolio-theme-v2';

function applyPortfolioTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeButton = document.getElementById('theme-button');
    if (!themeButton) return;

    if (theme === 'dark') {
        themeButton.classList.remove('fa-moon');
        themeButton.classList.add('fa-sun');
    } else {
        themeButton.classList.remove('fa-sun');
        themeButton.classList.add('fa-moon');
    }
}

// Langsung aktifkan dark mode sebelum halaman selesai dimuat
applyPortfolioTheme(localStorage.getItem(THEME_STORAGE_KEY) || 'dark');

function initDarkMode() {
    const themeButton = document.getElementById('theme-button');
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';

    applyPortfolioTheme(savedTheme);

    if (themeButton) {
        themeButton.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            applyPortfolioTheme(newTheme);
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        });
    }
}