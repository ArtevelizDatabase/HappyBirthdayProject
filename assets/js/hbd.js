// Global Variables
let currentQuizIndex = 0;
let quizScore = 0;
let gameScore = 0;
let gameInterval;
let countdownInterval;
let musicPlaying = false; // Track music state
let currentLoveQaIndex = 0; // For new Q&A feature
let messageHasBeenTyped = false; // <-- TAMBAHKAN BARIS INI

// Sound Objects (Pre-load for better performance)
// PENTING: GANTI URL DUMMY INI DENGAN PATH KE FILE AUDIO SFX ANDA YANG SEBENARNYA!
// Contoh: new Audio('sounds/click.mp3');
// Jika Anda tidak memiliki file SFX, biarkan saja new Audio() tanpa path.
// Ini akan membuat objek audio yang tidak memutar suara apa pun, menghindari error.
const audioClick = new Audio('sounds/click.mp3'); 
const audioPop = new Audio('sounds/pop.mp3'); 
const audioCorrect = new Audio('sounds/correct.mp3'); 
const audioWrong = new Audio('sounds/wrong.mp3'); 
const audioSuccess = new Audio('sounds/success.mp3'); 
const audioDing = new Audio('sounds/ding.mp3'); 
const audioFlowerBloom = new Audio('sounds/flower_bloom.mp3');


// =================================================================================
// == KODE TYPEWRITER ==
// =================================================================================

// Teks yang akan ditampilkan oleh typewriter
var aText = new Array(
"Halo, Aulia tersayang.",
"", // baris kosong
"Di hari ulang tahunmu yang ke-19 ini, aku ingin bilang terima kasih sudah hadir di hidupku dan jadi sosok yang selalu bikin hari-hariku lebih berwarna.",
"Kamu bukan cuma seseorang yang aku sayangi, tapi juga sahabat yang paling bisa aku andalkan.",
"",
"Usiamu yang sekarang semoga membawa banyak kebaikan dan berkah.",
"Semoga semua doa-doamu dikabulkan, langkahmu selalu dimudahkan, hatimu dijaga untuk selalu bahagia,",
"dan masa depanmu penuh dengan hal-hal indah yang kamu cita-citakan.",
"",
"Tetaplah jadi Aulia yang hangat, baik, dan selalu punya senyum manis itu.",
"Aku akan selalu ada buat kamu, bukan cuma di hari ini, tapi di setiap harimu.",
"",
"Selamat ulang tahun yang ke-19, ya, sayang. Semoga kita bisa merayakan banyak tahun-tahun lagi bersama.",
"",
);


// Pengaturan typewriter
var iSpeed = 100; // Kecepatan ketik (milidetik)
var iIndex = 0;
var iArrLength = aText[0].length;
var iScrollAt = 20; 
var iTextPos = 0;
var sContents = '';
var iRow;

function typewriter() {
 sContents =  ' ';
 iRow = Math.max(0, iIndex - iScrollAt);
 var destination = document.getElementById("typedtext");
 
 if (!destination) return; // Mencegah error jika elemen tidak ditemukan

 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br />';
 }
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";

 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout(typewriter, 500); 
  } else {
    // Menghapus kursor "_" setelah selesai
    destination.innerHTML = destination.innerHTML.replace("_", "");
  }
 } else {
  setTimeout(typewriter, iSpeed);
 }
}

// Gallery Global Variables
const galleryImages = [
    { src: "assets/images/pic1.jpg", caption: "Foto Mungil bocil Aul kuuu 🐱💕" },
    { src: "assets/images/pic2.JPG", caption: "Ingat liburan kita ini? Banyak banget cerita lucu di sana! awal kita deket juga 😂" },
    { src: "assets/images/pic3.JPG", caption: "Kalo di inget-inget ini momen kmu jealous, wkwkkw lucu bgt" },
    { src: "assets/images/pic4.JPG", caption: "wkwkkw momen kita masih vc an hitam putih an, masih malu-malu, btw cemberut aja neng" },
    { src: "assets/images/pic5.JPG", caption: "awww pacarku dah selesai magang, bangga dapet penghargaan anak rajin wkwk" },
    { src: "assets/images/pic6.JPG", caption: "inget gak kalo aku dulu pernah pakek background ini, karena lucukk bgt kmuu 😂" },
    { src: "assets/images/pic7.JPG", caption: "ingett foto ini nggak? foto momen aku mudik ikut hari raya ke mbah" },
    { src: "assets/images/pic8.JPG", caption: "momen kamu wisuda,maap ya waktu itu aku gak beri kamu apa-apa🥺🥀❤️‍🩹" },
    { src: "assets/images/pic9.mp4", caption: "Bonuss yanggg wkwk" },
    { src: "assets/images/pic10.jpg", caption: "Bukan kosong, hanya sedang menunggu cerita-cerita baru yang akan menjadi favorit. 💞" }
];
let currentImageIndex = 0;

// Word Cloud Data
const sweetWords = [
    "Senyum Manis", "Lucu", "Ngambek Gemes", "Adek", "Penyayang",
    "Partner Terbaik", "Cinta Sejatiku", "Unik", "Menggemaskan", "Istana Hatiku",
    "Pacalkuu Cantik", "Bidadari", "Penghibur", "Kesayanganku",
    "Juara", "Segalanya", "Dunia Ku"
];

// Quiz Questions
const quizQuestions = [
    {
        question: "Warna kesukaanku yang paling kamu ingat? 🤔",
        options: ["Hitam seperti hatiku kalau kamu lupa chat", "Tentu Saja Pink kyute", "Hijau Greenscreen", "Merah PDI"],
        correct: 0,
        wrongResponse: "Salah! Aku tuh suka warna Hitam kayak hatiku kalau kamu lupa chat 😜"
    },
    {
        question: "Kalau aku cemburu, aku biasanya...? 😤",
        options: ["Ngomel kayak bude-bude", "Pura-pura gak peduli tapi ngambek", "Diem-diem sinis", "Ngambek 3 hari 3 malam"],
        correct: 1,
        wrongResponse: "Salah~ Aku tuh pura-pura gak peduli padahal hatiku rusuh 🫣"
    },
    {
        question: "Apa yang paling aku suka dari kamu? 😍",
        options: ["Senyumanmu", "Cara kamu ketawa", "Semuanya!", "Mata kamu yang cantik"],
        correct: 2,
        wrongResponse: "Hampir bener sih, tapi aku suka semuanya dari kamu! apalagi mata kamu 🥰"
    },
    {
        question: "Kenapa aku milih kamu?",
        options: ["Karena kamu lucu banget", "Karena kamu baik dan sabar", "Karena kamu bikin aku nyaman", "Ya karena itu kamu"],
        correct: 3,
        wrongResponse: "Iya sih bener semua, tapi yang D paling tepat! 😘"
    }
];

// New: Love Q&A Questions
const loveQaQuestions = [
    {
        question: "Apa tempat yang paling ingin kamu kunjungi bersamaku di masa depan? 🗺️",
        hint: "Tempat impian kita berdua..."
    },
    {
        question: "Sebutkan satu lagu yang paling mengingatkanmu padaku! 🎶",
        hint: "Lagu yang bikin senyum-senyum sendiri kalau dengar..."
    },
    {
        question: "Apa hal kecil yang paling kamu suka dari kebiasaan randomku? 🤏",
        hint: "Mungkin kebiasaan aneh, tapi bikin gemes..."
    },
    {
        question: "Jika aku jadi superhero, aku akan punya kekuatan apa? 🦸‍♂️",
        hint: "Kekuatan untuk selalu membuatmu bahagia?"
    }
];

// New: Array of heart and cute emojis for background particles
const particleEmojis = ['❤️', '💖', '💝', '💗', '💓', '🧸', '🐻', '✨', '🌟'];


// Sound Effects Function (Using Audio Objects)
function playSound(type) {
    console.log(`Playing ${type} sound effect`);
    try {
        switch (type) {
            case 'click': audioClick.currentTime = 0; audioClick.play(); break;
            case 'pop': audioPop.currentTime = 0; audioPop.play(); break;
            case 'correct': audioCorrect.currentTime = 0; audioCorrect.play(); break;
            case 'wrong': audioWrong.currentTime = 0; audioWrong.play(); break;
            case 'success': audioSuccess.currentTime = 0; audioSuccess.play(); break;
            case 'start': audioDing.currentTime = 0; audioDing.play(); break; // Using ding for game start
            case 'catch': audioPop.currentTime = 0; audioPop.play(); break; // Reusing pop for catch
            case 'flower': audioFlowerBloom.currentTime = 0; audioFlowerBloom.play(); break;
            default: break;
        }
    } catch (e) {
        console.warn(`Could not play sound ${type}:`, e);
        // Fallback for autoplay restrictions or missing files
    }
}

// Music Control Functions
function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicButton = document.getElementById('musicToggleButton');
    
    if (music.paused) {
        // Try to play music
        music.play().then(() => {
            musicPlaying = true;
            musicButton.innerHTML = '🎶'; // Music playing icon
            musicButton.classList.remove('muted');
            console.log('Music started playing');
        }).catch(error => {
            console.error('Failed to play music:', error);
            musicPlaying = false;
            musicButton.innerHTML = '🔇'; // Keep muted icon
            musicButton.classList.add('muted');
            
            // Show user-friendly message
            alert('Tidak bisa memutar musik. Coba refresh halaman dan klik tombol musik lagi! 🎵');
        });
    } else {
        // Pause music
        music.pause();
        musicPlaying = false;
        musicButton.innerHTML = '🔇'; // Music muted icon
        musicButton.classList.add('muted');
        console.log('Music paused');
    }
}

// Ensure music plays when page becomes visible (to handle autoplay restrictions)
document.addEventListener('visibilitychange', () => {
    const music = document.getElementById('backgroundMusic');
    if (document.visibilityState === 'visible' && musicPlaying && music.paused) {
        music.play().catch(e => console.log("Failed to resume music:", e));
    }
});

// Add event listeners for audio element
document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('backgroundMusic');
    
    // When audio can start playing
    music.addEventListener('canplaythrough', function() {
        console.log('Audio is ready to play');
    });
    
    // When audio starts playing
    music.addEventListener('play', function() {
        musicPlaying = true;
        const musicButton = document.getElementById('musicToggleButton');
        musicButton.innerHTML = '🎶';
        musicButton.classList.remove('muted');
        console.log('Audio play event fired');
    });
    
    // When audio is paused
    music.addEventListener('pause', function() {
        musicPlaying = false;
        const musicButton = document.getElementById('musicToggleButton');
        musicButton.innerHTML = '🔇';
        musicButton.classList.add('muted');
        console.log('Audio pause event fired');
    });
    
    // When audio encounters an error
    music.addEventListener('error', function(e) {
        console.error('Audio error:', e);
        musicPlaying = false;
        const musicButton = document.getElementById('musicToggleButton');
        musicButton.innerHTML = '❌';
        musicButton.classList.add('muted');
    });
});


// Create floating particles with varied properties (now using new emojis)
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const heartColors = ['#FF69B4', '#FF1493', '#E6E6FA', '#FFC0CB']; // A few shades of pink/purple
    const confettiColors = ['#FFD700', '#FF69B4', '#FF1493', '#8A2BE2', '#ADFF2F', '#00FFFF']; // More varied confetti colors

    // Hearts/Emojis that float DOWNWARDS (changed from upward)
    for (let i = 0; i < 25; i++) { // Slightly increased count for richer effect
        const particle = document.createElement('div');
        particle.className = 'heart'; // Still use 'heart' class for basic styles
        
        // Pilih emoji secara acak dari array particleEmojis
        const randomEmoji = particleEmojis[Math.floor(Math.random() * particleEmojis.length)];
        particle.innerHTML = randomEmoji;
        
        // Random size (smaller range for downward hearts to avoid being too big)
        const size = Math.random() * 0.8 + 0.8; // From 0.8rem to 1.6rem
        particle.style.fontSize = `${size}rem`;

        // Random starting X position
        particle.style.left = Math.random() * 100 + '%';
        // Random starting Y position (from above the viewport)
        particle.style.top = `${Math.random() * -100}px`; // Start from above viewport

        // Random animation delay and duration for varied, slow movement
        particle.style.animationDelay = Math.random() * 8 + 's'; // Delay up to 8 seconds
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's'; // Duration from 5s to 15s (slower, longer float)
        
        // Use downward floating animation instead of upward
        particle.style.animationName = 'floatDown'; // Changed from 'floatUp' to 'floatDown'
        
        // Random color for heart-like emojis (teddy bears will keep their default emoji color)
        if (randomEmoji === '❤️' || randomEmoji === '💖' || randomEmoji === '💝' || randomEmoji === '💗' || randomEmoji === '💓') {
            particle.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        } else {
            // For teddy bears, ensure default emoji color is used, override the .heart color
            particle.style.color = 'inherit'; /* Atau 'unset', agar browser pakai warna default emoji */
        }

        container.appendChild(particle);
    }

    // Confetti that falls downwards (original behavior)
    for (let i = 0; i < 15; i++) { 
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random size for confetti
        const confettiSize = Math.random() * 8 + 5; // From 5px to 13px
        confetti.style.width = `${confettiSize}px`;
        confetti.style.height = `${confettiSize}px`;

        // Random starting position (top)
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = `${Math.random() * -100}px`; // Start slightly above viewport

        // Random animation delay and duration
        confetti.style.animationDelay = Math.random() * 6 + 's'; // Delay up to 6 seconds
        confetti.style.animationDuration = (Math.random() * 6 + 6) + 's'; // Duration from 6s to 12s (slower fall)
        
        // Random background color
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        
        // Random rotation for confetti (more dynamic fall)
        confetti.style.animationName = `confetti, rotateConfetti${Math.floor(Math.random() * 2)}`; // Use different rotation animations
        confetti.style.animationIterationCount = 'infinite';
        confetti.style.animationTimingFunction = 'linear';


        container.appendChild(confetti);
    }
}

// Page Navigation - FIXED
function showPage(pageId, buttonElement) {
    console.log('Navigating to page:', pageId);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    if (buttonElement) {
        buttonElement.classList.add('active');
    }

    // =================================================================
    // == TAMBAHKAN BLOK INI DI DALAM FUNGSI showPage ==
    // =================================================================
    // Jalankan typewriter HANYA saat halaman 'messages' dibuka pertama kali
    if (pageId === 'messages' && !messageHasBeenTyped) {
        typewriter();           // Panggil fungsi typewriter
        messageHasBeenTyped = true; // Tandai bahwa sudah pernah dijalankan
    }
    // =================================================================

    // Initialize page-specific functions
    if (pageId === 'quiz') {
        loadQuiz();
    } else if (pageId === 'loveqa') { // New: Love Q&A page
        currentLoveQaIndex = 0; // Reset Q&A on page entry
        loadLoveQa();
    } else if (pageId === 'countdown') {
        startCountdown(); // Memastikan countdown dimulai/diperbarui saat halaman ini dibuka
    } else if (pageId === 'gift') {
        // Reset gift page state when navigating to it
        document.getElementById('giftBox').style.display = 'flex';
        document.getElementById('giftBox').style.opacity = '1';
        document.getElementById('giftBox').style.transform = 'scale(1)';
        document.getElementById('digitalGiftsList').style.display = 'none';
        document.getElementById('digitalGiftsList').classList.remove('active');
        // Hide flower delivery elements
        document.querySelector('.flower-img').style.display = 'none';
        document.querySelector('.flower-message').style.display = 'none';
    } else if (pageId === 'gallery') {
        renderGalleryItems(); // Ensure gallery items are loaded if not already
        renderWordCloud(); // Generate word cloud
    } else if (pageId === 'final') {
        // Reset magic mirror state
        document.getElementById('magicMirrorText').style.display = 'none';
    } 

    playSound('click');
}

// Start Journey / Choose Your Adventure
function showAdventureChoice() {
    const adventureModal = document.getElementById('adventureModal');
    adventureModal.classList.add('active');
    playSound('pop');
}

function closeAdventureModal() {
    const adventureModal = document.getElementById('adventureModal');
    adventureModal.classList.remove('active');
    playSound('click');
}

function chooseAdventure(page) {
    closeAdventureModal();
    showPage(page);
}


// Quiz System - FIXED
function loadQuiz() {
    console.log('Loading quiz, current index:', currentQuizIndex);
    
    if (currentQuizIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuizIndex];
        document.getElementById('quizQuestion').innerHTML = question.question;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.innerHTML = option;
            button.onclick = () => answerQuiz(index);
            optionsContainer.appendChild(button);
        });
    } else {
        // Quiz completed
        document.getElementById('quizQuestion').innerHTML = 
            `🎉 Quiz selesai! Skor kamu: ${quizScore}/${quizQuestions.length}`;
        
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = 
            '<img src="assets/images/image1.gif" alt="Quiz Complete" style="width: 150px; margin: 20px auto; display: block;">' +
            '<p style="color: #FF69B4; font-size: 1.2rem; margin-top: 20px; font-family: \'Comic Neue\', cursive; text-align: center;">Berapapun Nilai Skornya, Tetep tak sayang kok wkwk 🥰</p>';
    }
}

function answerQuiz(selectedIndex) {
    console.log('Answer selected:', selectedIndex);
    const question = quizQuestions[currentQuizIndex];
    
    if (selectedIndex === question.correct) {
        quizScore++;
        alert('Bener! Tumbenn Pinter Jawab 😘');
        playSound('correct');
    } else {
        alert(question.wrongResponse);
        playSound('wrong');
    }
    
    document.getElementById('quizScore').innerHTML = quizScore;
    currentQuizIndex++;
    
    setTimeout(() => {
        loadQuiz();
    }, 1000);
}

// New: Love Q&A Functions
function loadLoveQa() {
    console.log('Loading Love Q&A, current index:', currentLoveQaIndex);
    const loveQaQuestionEl = document.getElementById('loveQaQuestion');
    const loveQaOptionsEl = document.getElementById('loveQaOptions');
    const nextLoveQaBtn = document.getElementById('nextLoveQaBtn');

    if (currentLoveQaIndex < loveQaQuestions.length) {
        const qa = loveQaQuestions[currentLoveQaIndex];
        loveQaQuestionEl.innerHTML = qa.question;
        
        loveQaOptionsEl.innerHTML = `
            <input type="text" class="password-input" id="loveQaAnswer" placeholder="Ketik jawabanmu disini..." style="width: 100%; margin-bottom: 10px;">
            <p style="color: #FF69B4; font-weight: 600; margin-bottom: 10px; font-size: 1.1rem;">Clue: ${qa.hint}</p>
            <button class="cute-button" onclick="submitLoveQa()">Kirim Jawaban! 💕</button>
            <div id="loveQaFeedback" style="margin-top: 15px; font-weight: 600; font-size: 1.1rem;"></div>
        `;
        nextLoveQaBtn.style.display = 'none'; // Hide next button initially
        playSound('ding');
    } else {
        loveQaQuestionEl.innerHTML = "💖 Makasih sudah jawab semua pertanyaanku! 💖";
        loveQaOptionsEl.innerHTML = '<p style="color: #8A2BE2; font-size: 1.2rem;">Jawabanmu akan jadi rahasia kecil kita berdua! 🥰</p>';
        nextLoveQaBtn.textContent = 'Lanjut ke Galeri! 📸';
        nextLoveQaBtn.style.display = 'block';
        nextLoveQaBtn.onclick = () => showPage('gallery'); // Navigate to gallery
        playSound('success');
    }
}

function submitLoveQa() {
    const answerInput = document.getElementById('loveQaAnswer').value;
    const feedbackEl = document.getElementById('loveQaFeedback');
    
    if (answerInput.trim() !== '') {
        feedbackEl.innerHTML = '✨ Jawabanmu tersimpan di hatiku! ✨';
        feedbackEl.style.color = '#32CD32';
        playSound('success');
        currentLoveQaIndex++;
        setTimeout(() => {
            loadLoveQa(); // Load next question
        }, 1500);
    } else {
        feedbackEl.innerHTML = 'Ayooo dong diisi dulu jawabannya! 😉';
        feedbackEl.style.color = '#FF4500';
        playSound('wrong');
    }
}


// Game System Functions
function startGame() {
    console.log('Start game called, current state:', gameActive);
    
    if (!gameActive) {
        gameActive = true;
        gameScore = 0;
        document.getElementById('gameScore').innerHTML = gameScore;
        document.getElementById('gameBtn').innerHTML = '🛑 Stop Game';
        document.getElementById('gameArea').innerHTML = ''; // Clear previous hearts
        
        gameInterval = setInterval(createFallingHeart, 800); // Create hearts every 0.8s
        playSound('start');
    } else {
        stopGame();
    }
}

function stopGame() {
    console.log('Stopping game...');
    gameActive = false;
    clearInterval(gameInterval); // Stop creating new hearts
    const gameArea = document.getElementById('gameArea');
    
    // Remove all existing hearts from the game area
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild);
    }

    document.getElementById('gameBtn').innerHTML = 'Mulai Lagi! 🎯';
    
    gameArea.innerHTML = `
        <p style="padding: 20px; color: #8A2BE2; font-size: 1.3rem; font-family: 'Comic Neue', cursive;">
            Game selesai! Skor akhir: <span style="color: #FF1493;">${gameScore}</span> 💕<br>
            ${gameScore >= 10 ? 'Wow, kamu jago banget! 🏆' : 'Lumayan lah untuk coba pertama 😉'}
        </p>
    `;
}


function createFallingHeart() {
    if (!gameActive) return;
    
    const gameArea = document.getElementById('gameArea');
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = '💕';
    heart.style.left = Math.random() * (gameArea.offsetWidth - 30) + 'px';
    
    // Randomize falling speed for each heart (slower now: 4s to 7s)
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's'; // Duration from 4s to 7s
    
    heart.onclick = () => catchHeart(heart);
    
    gameArea.appendChild(heart);
    
    // Remove heart after its animation completes (or it falls out of view)
    // The `animationiteration` event listener is more robust for infinite animations
    heart.addEventListener('animationend', () => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    });
}

function catchHeart(heart) {
    console.log('Heart caught!');
    gameScore++;
    document.getElementById('gameScore').innerHTML = gameScore;
    heart.style.transform = 'scale(1.5)';
    heart.style.color = '#32CD32';
    
    // Remove heart immediately after click
    if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
    }
    
    playSound('catch');

    // Check for win condition
    if (gameScore >= 10) { // Changed win score to 10
        stopGame(); // Stop the game
        showWinPopup(); // Show win notification
    }
}

// Win Popup Functions
function showWinPopup() {
    const winPopup = document.getElementById('winPopup');
    winPopup.classList.add('active');
    playSound('success'); // Play a celebratory sound
}

function closeWinPopup() {
    const winPopup = document.getElementById('winPopup');
    winPopup.classList.remove('active');
    playSound('click'); // Play a click sound on close
}


// Countdown System - FIXED untuk menghitung dari 10 November 2024 sampai sekarang
function startCountdown() {
    console.log('Starting countdown...');
    
    // Clear existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Set start date to November 10th, 2024
    const startDate = new Date(2024, 10, 10, 0, 0, 0, 0); // Month 10 = November (0-indexed), set to midnight
    
    countdownInterval = setInterval(() => {
        const now = new Date();
        
        if (now >= startDate) {
            // Hitung selisih dari tanggal mulai sampai sekarang dengan lebih akurat
            let years = now.getFullYear() - startDate.getFullYear();
            let months = now.getMonth() - startDate.getMonth();
            let days = now.getDate() - startDate.getDate();
            
            // Adjust for negative days
            if (days < 0) {
                months--;
                // Dapatkan hari terakhir bulan sebelumnya
                const lastDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
                days += lastDayOfPrevMonth;
            }
            
            // Adjust for negative months
            if (months < 0) {
                years--;
                months += 12;
            }
            
            // Calculate total months yang lebih akurat
            const totalMonths = years * 12 + months;
            
            // Calculate remaining time in current day
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            
            // Update display elements
            const monthsEl = document.getElementById('months');
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (monthsEl) monthsEl.innerHTML = totalMonths;
            if (daysEl) daysEl.innerHTML = days;
            if (hoursEl) hoursEl.innerHTML = String(hours).padStart(2, '0'); // Format 2 digit
            if (minutesEl) minutesEl.innerHTML = String(minutes).padStart(2, '0'); // Format 2 digit
            if (secondsEl) secondsEl.innerHTML = String(seconds).padStart(2, '0'); // Format 2 digit
        } else {
            // Jika tanggal sekarang masih sebelum 10 November 2024 (countdown mundur)
            const distance = startDate.getTime() - now.getTime();
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const monthsEl = document.getElementById('months');
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (monthsEl) monthsEl.innerHTML = 0;
            if (daysEl) daysEl.innerHTML = days;
            if (hoursEl) hoursEl.innerHTML = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.innerHTML = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.innerHTML = String(seconds).padStart(2, '0');
        }
    }, 1000);
}

// Gift System Functions
function openGift() {
    const giftBox = document.getElementById('giftBox');
    const digitalGiftsList = document.getElementById('digitalGiftsList');
    const flowerImg = document.querySelector('.flower-img');
    const flowerMessage = document.querySelector('.flower-message');

    // Apply animation to gift box
    giftBox.style.animation = 'openGiftAnimation 0.7s forwards';
    playSound('success'); // Or a dedicated "gift open" sound

    // After animation, hide gift box and show list
    setTimeout(() => {
        giftBox.style.display = 'none';
        digitalGiftsList.style.display = 'flex';
        digitalGiftsList.classList.add('active');
        
        // Show virtual flower delivery
        setTimeout(() => {
            flowerImg.style.display = 'block';
            flowerMessage.style.display = 'block';
            flowerImg.style.animation = 'fadeIn 1s forwards';
            flowerMessage.style.animation = 'fadeIn 1s forwards';
            playSound('flower'); // Play flower bloom sound
        }, 500); // Delay after gift list appears
    }, 700); // Match animation duration
}

function handleGiftItemClick(giftName) {
    alert(`Kamu memilih: ${giftName}! Nanti aku wujudkan yaaa 😉`);
    playSound('pop'); // Or a specific sound for gift selection
    // Here you can add more logic, e.g., redirect to another page,
    // show a modal with details, etc.
}

// Gallery Modal Functions
let galleryModal, modalImage, modalCaption, prevImageBtn, nextImageBtn;

// Initialize modal elements when DOM is ready
function initializeGalleryModal() {
    console.log('Initializing gallery modal...');
    
    galleryModal = document.getElementById('galleryModal');
    modalImage = document.getElementById('modalImage');
    modalCaption = document.getElementById('modalCaption');
    prevImageBtn = document.getElementById('prevImageBtn');
    nextImageBtn = document.getElementById('nextImageBtn');
    
    console.log('Modal elements found:', {
        galleryModal: !!galleryModal,
        modalImage: !!modalImage,
        modalCaption: !!modalCaption,
        prevImageBtn: !!prevImageBtn,
        nextImageBtn: !!nextImageBtn
    });
    
    // Add close modal functionality
    if (galleryModal) {
        // Close when clicking outside the modal content
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                console.log('Closing modal - clicked outside');
                closeGalleryModal();
            }
        });
        
        // Close button functionality
        const closeBtn = galleryModal.querySelector('.close-button');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Closing modal - close button clicked');
                closeGalleryModal();
            });
        }
        
        // Navigation button functionality - Remove existing onclick handlers and use addEventListener
        if (prevImageBtn) {
            prevImageBtn.removeAttribute('onclick'); // Remove inline onclick
            prevImageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Previous button clicked');
                if (currentImageIndex > 0) {
                    changeImage(-1);
                }
            });
        }
        
        if (nextImageBtn) {
            nextImageBtn.removeAttribute('onclick'); // Remove inline onclick
            nextImageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Next button clicked');
                if (currentImageIndex < galleryImages.length - 1) {
                    changeImage(1);
                }
            });
        }
    }
    
    console.log('Gallery modal initialized successfully');
}

function openGalleryModal(index) {
    console.log(`Opening gallery modal for index: ${index}`);
    console.log('Gallery modal element:', galleryModal);
    console.log('Modal image element:', modalImage);
    console.log('Image data:', galleryImages[index]);
    
    // Validate index
    if (index < 0 || index >= galleryImages.length) {
        console.error('Invalid gallery index:', index);
        return;
    }
    
    // Ensure modal elements exist
    if (!galleryModal || !modalImage) {
        console.error('Modal elements not found, trying to reinitialize...');
        initializeGalleryModal();
        if (!galleryModal || !modalImage) {
            console.error('Failed to initialize modal elements');
            return;
        }
    }
    
    currentImageIndex = index;
    showImage(currentImageIndex);
    galleryModal.classList.add('active'); // Show the modal
    
    // Ensure modal is displayed properly
    galleryModal.style.display = 'flex';
    
    playSound('pop'); // Play a sound when opening
    
    console.log('Gallery modal opened successfully');
}

function closeGalleryModal() {
    if (galleryModal) {
        galleryModal.classList.remove('active'); // Hide the modal
        galleryModal.style.display = 'none'; // Ensure it's hidden
        playSound('click'); // Play a sound when closing
        console.log('Gallery modal closed');
    }
}

function showImage(index) {
    if (index < 0 || index >= galleryImages.length) {
        console.error('Invalid image index:', index);
        return; // Invalid index
    }
    
    console.log(`Showing image/video at index ${index}:`, galleryImages[index]);
    
    const isVideo = galleryImages[index].src.toLowerCase().endsWith('.mp4') || 
                   galleryImages[index].src.toLowerCase().endsWith('.webm') || 
                   galleryImages[index].src.toLowerCase().endsWith('.mov');
    
    // Clear previous content
    modalImage.innerHTML = '';
    
    if (isVideo) {
        // Create video element for modal with full controls
        const videoElement = document.createElement('video');
        videoElement.src = galleryImages[index].src;
        videoElement.controls = true; // Show controls in modal
        videoElement.autoplay = true; // Autoplay when modal opens
        videoElement.loop = true;
        videoElement.muted = false; // Allow sound in modal
        videoElement.style.width = '100%';
        videoElement.style.maxHeight = '70vh';
        videoElement.style.objectFit = 'contain';
        videoElement.style.borderRadius = '15px';
        videoElement.style.marginBottom = '15px';
        videoElement.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        
        // Load video and play when ready
        videoElement.addEventListener('loadeddata', () => {
            console.log('Video loaded and ready to play');
        });
        
        videoElement.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
        });
        
        modalImage.appendChild(videoElement);
    } else {
        // Create img element for modal
        const imgElement = document.createElement('img');
        imgElement.src = galleryImages[index].src;
        imgElement.style.width = '100%';
        imgElement.style.maxHeight = '70vh';
        imgElement.style.objectFit = 'contain';
        imgElement.style.borderRadius = '15px';
        imgElement.style.marginBottom = '15px';
        imgElement.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        
        imgElement.addEventListener('load', () => {
            console.log('Image loaded successfully');
        });
        
        imgElement.addEventListener('error', (e) => {
            console.error('Image loading error:', e);
        });
        
        modalImage.appendChild(imgElement);
    }
    
    // Set caption
    modalCaption.textContent = galleryImages[index].caption;
    
    // Enable/disable navigation buttons with proper styling
    if (prevImageBtn) {
        prevImageBtn.disabled = (index === 0);
        prevImageBtn.style.opacity = (index === 0) ? '0.5' : '1';
        prevImageBtn.style.cursor = (index === 0) ? 'not-allowed' : 'pointer';
    }
    if (nextImageBtn) {
        nextImageBtn.disabled = (index === galleryImages.length - 1);
        nextImageBtn.style.opacity = (index === galleryImages.length - 1) ? '0.5' : '1';
        nextImageBtn.style.cursor = (index === galleryImages.length - 1) ? 'not-allowed' : 'pointer';
    }
    
    console.log('Modal content updated successfully');
}

function changeImage(direction) {
    console.log(`Changing image by ${direction}, current index: ${currentImageIndex}`);
    
    const newIndex = currentImageIndex + direction;
    
    // Ensure index stays within bounds
    if (newIndex < 0) {
        console.log('Cannot go to previous image - already at first image');
        return; // Don't change if we're at the beginning
    } else if (newIndex >= galleryImages.length) {
        console.log('Cannot go to next image - already at last image');
        return; // Don't change if we're at the end
    }
    
    currentImageIndex = newIndex;
    console.log(`New image index: ${currentImageIndex}`);
    showImage(currentImageIndex);
    playSound('click'); // Play sound on navigation
}

// Add keyboard navigation for modal
function handleModalKeyboard(event) {
    if (!galleryModal || !galleryModal.classList.contains('active')) return;
    
    console.log('Modal keyboard event:', event.key);
    
    switch(event.key) {
        case 'Escape':
            console.log('Escape pressed - closing modal');
            closeGalleryModal();
            break;
        case 'ArrowLeft':
            console.log('Left arrow pressed');
            if (currentImageIndex > 0) {
                changeImage(-1);
            } else {
                console.log('Already at first image');
            }
            break;
        case 'ArrowRight':
            console.log('Right arrow pressed');
            if (currentImageIndex < galleryImages.length - 1) {
                changeImage(1);
            } else {
                console.log('Already at last image');
            }
            break;
    }
}

// Add keyboard event listener
document.addEventListener('keydown', handleModalKeyboard);

// Function to dynamically render gallery items
function renderGalleryItems() {
    const photoGalleryDiv = document.getElementById('photoGallery');
    
    if (!photoGalleryDiv) {
        console.error('Photo gallery div not found');
        return;
    }
    
    // Clear existing content and always re-render to ensure consistency
    photoGalleryDiv.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.setAttribute('data-index', index);
        
        // Ensure click event works for both image and video cards
        photoItem.style.cursor = 'pointer';
        photoItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Clicking gallery item at index: ${index}`);
            openGalleryModal(index);
        });

        // Check if it's a video or image
        const isVideo = image.src.toLowerCase().endsWith('.mp4') || 
                       image.src.toLowerCase().endsWith('.webm') || 
                       image.src.toLowerCase().endsWith('.mov');

        if (isVideo) {
            // For video files, create a video element as thumbnail
            const video = document.createElement('video');
            video.src = image.src;
            video.alt = image.caption;
            video.muted = true;
            video.preload = 'metadata'; // Load first frame
            video.style.pointerEvents = 'none'; // Prevent video interaction in gallery
            
            // Add a play icon overlay to indicate it's a video
            const playIcon = document.createElement('div');
            playIcon.className = 'play-icon';
            playIcon.innerHTML = '▶';
            playIcon.style.pointerEvents = 'none'; // Ensure icon doesn't block clicks
            
            photoItem.style.position = 'relative';
            photoItem.appendChild(video);
            photoItem.appendChild(playIcon);
        } else {
            // For image files, use img element
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.caption;
            img.style.pointerEvents = 'none'; // Prevent image drag/context menu
            photoItem.appendChild(img);
        }

        // Add caption
        const caption = document.createElement('div');
        caption.className = 'photo-caption';
        caption.textContent = image.caption;
        caption.style.pointerEvents = 'none'; // Ensure caption doesn't block clicks

        photoItem.appendChild(caption);
        photoGalleryDiv.appendChild(photoItem);
    });
    
    console.log(`Gallery rendered with ${galleryImages.length} items`);
}

// New: Word Cloud Functions
function renderWordCloud() {
    const wordCloudDiv = document.getElementById('wordCloud');
    if (!wordCloudDiv) return; // Exit if not on gallery page

    wordCloudDiv.innerHTML = ''; // Clear previous content

    // Shuffle words for random order
    const shuffledWords = [...sweetWords].sort(() => 0.5 - Math.random());

    shuffledWords.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        // Randomize size slightly for visual variety
        // const randomSize = Math.random() * 0.5 + 0.8; // From 0.8em to 1.3em
        // span.style.fontSize = `${randomSize}em`;
        // Randomize animation delay
        span.style.animationDelay = `${index * 0.1}s`; // Staggered entry

        wordCloudDiv.appendChild(span);
    });
}


// New: Magic Mirror Function
function activateMagicMirror() {
    const mirrorText = document.getElementById('magicMirrorText');
    if (mirrorText.style.display === 'none' || mirrorText.style.display === '') {
        mirrorText.style.display = 'block';
        playSound('success'); // Play a magic sound
        // Add a subtle animation to make it pop
        mirrorText.style.animation = 'fadeIn 0.5s forwards, heartbeat 1.5s infinite alternate';
    } else {
        mirrorText.style.display = 'none';
        playSound('click');
    }
}





// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing...');
    
    createFloatingHearts(); // This now generates both upward hearts and downward confetti
    renderGalleryItems(); // Render gallery items on load
    initializeGalleryModal(); // Initialize gallery modal

    // Initialize music state and button
    const music = document.getElementById('backgroundMusic');
    const musicButton = document.getElementById('musicToggleButton');
    
    // Set initial state based on actual audio state
    musicPlaying = false;
    musicButton.innerHTML = '🔇'; // Start with muted icon
    musicButton.classList.add('muted'); // Add mute style initially
    
    // Function to try playing music
    function tryPlayMusic() {
        if (!musicPlaying && music.paused) {
            music.play().then(() => {
                musicPlaying = true;
                musicButton.innerHTML = '🎶'; // Update icon to playing
                musicButton.classList.remove('muted'); // Remove mute style
                console.log('Music started playing successfully.');
            }).catch(error => {
                console.log('Autoplay still blocked:', error);
                musicPlaying = false;
                musicButton.innerHTML = '🔇'; // Keep muted icon
                musicButton.classList.add('muted'); // Keep mute style
            });
        }
    }

    // Try to play music on any user interaction
    const interactionEvents = ['click', 'touchstart', 'keydown'];
    
    function handleFirstInteraction() {
        tryPlayMusic();
        // Remove event listeners after first successful attempt
        interactionEvents.forEach(event => {
            document.removeEventListener(event, handleFirstInteraction, true);
        });
    }
    
    // Add listeners for all interaction types
    interactionEvents.forEach(event => {
        document.addEventListener(event, handleFirstInteraction, true);
    });
    
    // Also try when page becomes visible (for tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && !musicPlaying) {
            setTimeout(tryPlayMusic, 100); // Small delay to ensure page is ready
        }
    });

    // Add click effects (small hearts on click)
    document.addEventListener('click', function(e) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'absolute';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.pointerEvents = 'none'; /* Ensure clicks pass through */
        heart.style.animation = 'fadeIn 0.5s ease-out forwards, float 1s ease-out forwards';
        heart.style.zIndex = '9999'; /* Ensure these click-hearts are on top */
        heart.style.fontSize = '1.5rem';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                document.body.removeChild(heart);
            }
        }, 1000);
    });
});

// Debug function for testing
function debugCurrentState() {
    console.log('Current page active:', document.querySelector('.page.active')?.id);
    console.log('Current quiz index:', currentQuizIndex);
    console.log('Game active:', gameActive);
}




