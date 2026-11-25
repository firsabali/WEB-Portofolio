/**
 * Typing Effect untuk Hero Section
 */
class TypingEffect {
    constructor(elementSelector, words, speed = 100, delayBetween = 2000) {
        this.element = document.querySelector(elementSelector);
        this.words = words;
        this.speed = speed;
        this.delayBetween = delayBetween;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        if (this.element) {
            this.type();
        }
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            // Hapus karakter
            this.charIndex--;
        } else {
            // Tambah karakter
            this.charIndex++;
        }

        this.element.textContent = currentWord.substring(0, this.charIndex);

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2; // Menghapus lebih cepat daripada mengetik
        }

        // Jika kata selesai diketik
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            typeSpeed = this.delayBetween; // Pause sebentar
            this.isDeleting = true;
        } 
        // Jika kata selesai dihapus
        else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length; // Lanjut ke kata berikutnya
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Inisialisasi dijalankan nanti dari script.js