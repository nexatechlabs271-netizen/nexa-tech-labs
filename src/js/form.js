/**
 * =======================================================================
 * NEXA TECH LABS - FORM VALIDATION & INTELLIGENT WHATSAPP REDIRECT
 * =======================================================================
 * Refined by: CTO NEXA Studio
 * Goal: Melindungi Mirza dari spam & memberikan data berkualitas tinggi.
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('nexaContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 1. VALIDASI INPUT (Mencegah pengiriman data kosong)
            const inputs = {
                nama: document.getElementById('nama').value.trim(),
                perusahaan: document.getElementById('perusahaan').value.trim(),
                skala: document.getElementById('skala').value,
                layanan: document.getElementById('layanan').value,
                pesan: document.getElementById('pesan').value.trim()
            };

            if (!inputs.nama || !inputs.pesan) {
                alert("Zan, ingatkan user: Nama dan Pesan itu wajib diisi!");
                return;
            }

            // 2. UI FEEDBACK (Loading State)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyiapkan Enkripsi...
            `;
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');

            // 3. KONFIGURASI TARGET & TRACKING
            const nomorWAMirza = "6285697916845"; // Ganti dengan nomor Mirza yang aktif
            const sourcePage = window.location.pathname; // Melacak user klik dari halaman mana

            // 4. GENERASI PESAN (Clean & Structured)
            // Menggunakan encodeURIComponent jauh lebih aman daripada %0A manual
            const messageHeader = `*LEAD BARU - NEXA TECH LABS*\n`;
            const messageBody = 
                `------------------------------------------\n` +
                `👤 *Nama:* ${inputs.nama}\n` +
                `🏢 *Bisnis:* ${inputs.perusahaan || '-'}\n` +
                `📈 *Skala:* ${inputs.skala}\n` +
                `🎯 *Layanan:* ${inputs.layanan}\n` +
                `📍 *Source:* ${sourcePage}\n\n` +
                `*KENDALA OPERASIONAL:*\n` +
                `_"${inputs.pesan}"_\n` +
                `------------------------------------------\n\n` +
                `Mohon segera direspon, Mirza.`;

            const waLink = `https://wa.me/${nomorWAMirza}?text=${encodeURIComponent(messageHeader + messageBody)}`;

            // 5. REDIRECT WITH DELAY
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');

                window.open(waLink, '_blank');
                
                // UX: Reset form dan berikan feedback ke user
                contactForm.reset();
                console.log("Lead berhasil diteruskan ke Mirza.");
            }, 1200);
        });
    }
});