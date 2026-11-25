/**
 * Form Validation
 */
function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('form-message');

    // Helper: Validasi format email menggunakan RegEx
    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Helper: Tampilkan pesan error
    const showError = (input, text) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = text;
        }
        input.style.borderColor = '#ef4444';
    };

    // Helper: Bersihkan pesan error
    const clearError = (input) => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        input.style.borderColor = 'var(--border-color)';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah reload page
        let isValid = true;

        // Validasi Nama
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Nama wajib diisi');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Validasi Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email wajib diisi');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Format email tidak valid');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Validasi Subject
        if (subjectInput.value.trim() === '') {
            showError(subjectInput, 'Subject wajib diisi');
            isValid = false;
        } else {
            clearError(subjectInput);
        }

        // Validasi Pesan
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Pesan wajib diisi');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        // Jika semua valid
       // Jika semua valid
        if (isValid) {

            formMessage.textContent = "Mengirim pesan...";
            formMessage.style.color = "#2563eb";

            emailjs.send("service_5cs9ued", "template_utjv8km", {
                from_name: nameInput.value.trim(),
                from_email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            })
                .then(() => {

                    formMessage.textContent = "Pesan berhasil dikirim!";
                    formMessage.style.color = "#10b981";

                    form.reset();

                    setTimeout(() => {
                        formMessage.textContent = "";
                    }, 5000);

                })
                .catch((error) => {

                    console.log(error);

                    formMessage.textContent = "Gagal mengirim pesan.";
                    formMessage.style.color = "#ef4444";

                });

        } else {

            formMessage.textContent = "Harap perbaiki kesalahan di atas.";
            formMessage.style.color = "#ef4444";

        }
    });
}