/**
 * =======================================================================
 * [NEXA.SYS] - SECURE UPLINK & TELEMETRY ROUTING
 * =======================================================================
 * Architect : M. Fauzan Al Farikhi (Node.01)
 * Protocol  : ENCRYPTED_WA_RELAY_V2
 * Objective : Mencegah spam, memvalidasi input, dan merutekan 
 * dossier klien langsung ke Node.06 (Mirza).
 * =======================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // [EASTER EGG] System Boot Sequence in Console
    console.log("%c[NEXA_SYS] System initialized.", "color: #38E4DA; font-family: monospace; font-size: 12px;");
    console.log("%c[NEXA_SYS] Secure routing protocol active.", "color: #38E4DA; font-family: monospace; font-size: 12px;");
    console.log("%c[WARNING] Unauthorized data interception will be traced.", "color: #ef4444; font-family: monospace; font-size: 12px; font-weight: bold;");

    const contactForm = document.getElementById('nexaContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 1. DATA EXTRACTION (Menarik data dari Terminal UI)
            // Note: Fallback ID disesuaikan jika element tidak ditemukan
            const inputs = {
                nama: document.getElementById('nama')?.value.trim() || '',
                perusahaan: document.getElementById('perusahaan')?.value.trim() || 'N/A',
                skala: document.getElementById('skala')?.value || 'UNDEFINED',
                layanan: document.getElementById('layanan')?.value || 'UNDEFINED',
                pesan: document.getElementById('pesan')?.value.trim() || ''
            };

            // 2. STRICT VALIDATION PROTOCOL
            if (!inputs.nama || !inputs.pesan) {
                console.warn("[SYS.ERR] Mandatory payload missing. Aborting transmission.");
                alert("[SYS.ERR] Transmisi ditolak. Entity_Name (Nama) dan System_Bottleneck (Pesan) wajib diisi untuk membuka jalur komunikasi.");
                return;
            }

            // 3. GENERATE TRANSMISSION HASH (Simulasi Enkripsi Keren)
            const generateHash = () => {
                const chars = '0123456789ABCDEF';
                let hash = '0x';
                for (let i = 0; i < 8; i++) hash += chars[Math.floor(Math.random() * chars.length)];
                return hash;
            };
            const txHash = generateHash();

            // 4. UI FEEDBACK (Cyberpunk Loading State)
            const submitBtn = contactForm.querySelector('button[type="submit"]') || document.getElementById('submitBtn');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.classList.add('cursor-not-allowed', 'opacity-80');
            
            // Animasi teks tombol (Encrypting -> Routing)
            submitBtn.innerHTML = `<span class="font-mono animate-pulse tracking-widest">[ ENCRYPTING PAYLOAD... ]</span>`;
            
            setTimeout(() => {
                submitBtn.innerHTML = `<span class="font-mono text-[#38E4DA] animate-pulse tracking-widest">[ ROUTING TO RELAY... ]</span>`;
            }, 800);

            // 5. SECURE ROUTING CONFIGURATION
            const nomorWAMirza = "6285697916845"; // Node.06 Target Comms
            const sourcePage = window.location.pathname.replace('/', '') || 'root_index'; 
            const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

            // 6. DOSSIER COMPILATION (Format WA ala Intelijen Militer)
            const messageHeader = `*[ SECURE UPLINK ESTABLISHED ]*\n`;
            const messageBody = 
                `> TX_HASH  : ${txHash}\n` +
                `> TIMESTAMP: ${timestamp}\n` +
                `> ORIGIN   : /${sourcePage}\n` +
                `=============================\n` +
                `*// CLIENT_DOSSIER //*\n` +
                `👤 *Entity:* ${inputs.nama}\n` +
                `🏢 *Corp_ID:* ${inputs.perusahaan}\n` +
                `📊 *Scale:* ${inputs.skala}\n` +
                `🛠️ *Module:* ${inputs.layanan}\n\n` +
                `*// SYSTEM_BOTTLENECK //*\n` +
                `_"${inputs.pesan}"_\n` +
                `=============================\n` +
                `*[ END_OF_TRANSMISSION ]*\n` +
                `_Mohon inisiasi sinkronisasi, Node.06 (Mirza)._`;

            const waLink = `https://wa.me/${nomorWAMirza}?text=${encodeURIComponent(messageHeader + messageBody)}`;

            // 7. EXECUTE UPLINK (Redirect dengan Delay untuk efek visual)
            setTimeout(() => {
                // Restore Button State
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('cursor-not-allowed', 'opacity-80');

                // Execute Redirect
                window.open(waLink, '_blank');
                
                // UX: Reset form & reset char counter if exists
                contactForm.reset();
                const charCount = document.getElementById('charCount');
                if(charCount) charCount.innerText = '0';

                console.log(`[NEXA_SYS] Payload ${txHash} successfully routed to Node.06.`);
            }, 1800); // 1.8s delay untuk efek "Hacking/Encrypting" yang dramatis
        });
    }
});