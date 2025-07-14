document.addEventListener('DOMContentLoaded', () => {
    // Variabel dan konstanta
    const board = document.getElementById('puzzle-board');
    const restartButton = document.getElementById('restart-button');
    const winMessage = document.getElementById('win-message');
    const originalImage = document.getElementById('original-image');
    
    // Variabel untuk fitur baru
    const imageGallery = document.getElementById('image-gallery');
    const imageUploader = document.getElementById('image-uploader');
    
    const galleryImages = [
        {
            url: 'assets/images/puzzle/puzzle1.JPG',
            title: 'Gambar Random 1'
        },
        {
            url: 'assets/images/puzzle/puzzle2.JPG', 
            title: 'Gambar Random 2'
        },
        {
            url: 'assets/images/puzzle/puzzle3.JPG',
            title: 'Gambar Random 3'
        },
        {
            url: 'assets/images/puzzle/puzzle4.JPG',
            title: 'Gambar Random 4'
        },
    ];

    const ROWS = 3;
    const COLS = 3;
    const TILE_COUNT = ROWS * COLS;
    
    let tiles = [];
    let IMAGE_SRC = galleryImages[0].url; // Set gambar default
    let draggedTile = null;
    let imageLoaded = false;

    // --- Inisialisasi Fitur Baru ---

    // 1. Membuat Galeri Gambar
    function populateGallery() {
        imageGallery.innerHTML = ''; // Clear gallery first
        galleryImages.forEach((imageObj, index) => {
            const img = document.createElement('img');
            img.src = imageObj.url;
            img.alt = imageObj.title;
            img.title = imageObj.title;
            img.classList.add('gallery-img');
            if (index === 0) img.classList.add('active'); // Set gambar pertama sebagai aktif
            
            // Add loading placeholder
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            img.addEventListener('error', () => {
                img.src = 'https://via.placeholder.com/300x300/536dff/ffffff?text=Error';
                img.alt = 'Error loading image';
            });
            
            img.style.opacity = '0.7';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('click', () => {
                // Hapus kelas aktif dari semua gambar galeri
                document.querySelectorAll('.gallery-img').forEach(i => i.classList.remove('active'));
                // Tambahkan kelas aktif ke gambar yang diklik
                img.classList.add('active');
                
                IMAGE_SRC = imageObj.url;
                loadImageAndInitGame();
            });
            imageGallery.appendChild(img);
        });
    }
    
    // 2. Event Listener untuk Upload Gambar
    imageUploader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Mohon pilih file gambar yang valid!');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Ukuran file terlalu besar! Maksimal 5MB.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                IMAGE_SRC = event.target.result;
                // Hapus kelas aktif dari semua gambar galeri karena kita pakai gambar upload
                document.querySelectorAll('.gallery-img').forEach(i => i.classList.remove('active'));
                loadImageAndInitGame();
            }
            reader.onerror = function() {
                alert('Error membaca file. Mohon coba lagi!');
            }
            reader.readAsDataURL(file);
        }
    });

    // 3. Function untuk load gambar dan init game
    function loadImageAndInitGame() {
        // Show loading state
        const loadingDiv = document.createElement('div');
        loadingDiv.innerHTML = '🔄 Memuat gambar...';
        loadingDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(83, 109, 255, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 1.1em;
            z-index: 1000;
        `;
        board.style.position = 'relative';
        board.appendChild(loadingDiv);
        
        // Create temporary image to ensure it loads
        const tempImg = new Image();
        tempImg.onload = function() {
            originalImage.src = IMAGE_SRC;
            imageLoaded = true;
            loadingDiv.remove();
            initGame();
        };
        tempImg.onerror = function() {
            loadingDiv.innerHTML = '❌ Error memuat gambar';
            setTimeout(() => {
                loadingDiv.remove();
                // Fallback to first gallery image
                IMAGE_SRC = galleryImages[0].url;
                originalImage.src = IMAGE_SRC;
                initGame();
            }, 2000);
        };
        tempImg.src = IMAGE_SRC;
    }


    // --- Logika Inti Game ---

    function initGame() {
        if (!imageLoaded) {
            console.log("⏳ Waiting for image to load...");
            return;
        }
        
        console.log("🎮 Initializing game...");
        board.innerHTML = '';
        winMessage.classList.add('hidden');
        
        // Hapus tombol navigasi jika ada
        const existingButton = winMessage.querySelector('.cute-button');
        if (existingButton) {
            existingButton.remove();
        }
        
        console.log("✅ Win message hidden");
        tiles = [];

        for (let i = 0; i < TILE_COUNT; i++) {
            const tile = document.createElement('div');
            tile.classList.add('puzzle-tile');
            tile.dataset.index = i;
            tile.draggable = true;

            tile.addEventListener('dragstart', handleDragStart);
            tile.addEventListener('dragover', handleDragOver);
            tile.addEventListener('drop', handleDrop);
            
            if (i !== TILE_COUNT - 1) { // Ubin terakhir sengaja dikosongkan
                const x = (i % COLS) * -100;
                const y = Math.floor(i / COLS) * -100;
                tile.style.backgroundImage = `url(${IMAGE_SRC})`;
                tile.style.backgroundPosition = `${x}px ${y}px`;
                tile.style.backgroundSize = '300% 300%';
                tile.style.backgroundRepeat = 'no-repeat';
            } else {
                tile.draggable = false;
                tile.style.backgroundColor = '#e3f2fd';
                tile.style.border = '2px dashed #69b2ff';
            }
            
            tiles.push(tile);
        }
        
        shuffleTiles();
        tiles.forEach(tile => board.appendChild(tile));
        
        // Ensure original image is also updated
        if (originalImage.src !== IMAGE_SRC) {
            originalImage.src = IMAGE_SRC;
        }
    }

    function shuffleTiles() {
        // Logika pengacakan yang memastikan puzzle bisa diselesaikan (parity check sederhana)
        let inversions;
        do {
            for (let i = tiles.length - 2; i > 0; i--) { // -2 untuk menjaga ubin kosong di akhir
                const j = Math.floor(Math.random() * (i + 1));
                [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
            }
            inversions = 0;
            const tileOrder = tiles.slice(0, -1).map(t => parseInt(t.dataset.index));
            for (let i = 0; i < tileOrder.length; i++) {
                for (let j = i + 1; j < tileOrder.length; j++) {
                    if (tileOrder[i] > tileOrder[j]) {
                        inversions++;
                    }
                }
            }
        } while (inversions % 2 !== 0); // Ulangi pengacakan jika jumlah inversi ganjil
    }

    // Mekanisme Drag and Drop tetap sama
    function handleDragStart(e) {
        draggedTile = e.target;
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const dropTarget = e.target;

        if (dropTarget.style.backgroundImage === '') {
            console.log("🔄 Tile moved, checking win condition...");
            // Tukar properti visual
            dropTarget.style.backgroundImage = draggedTile.style.backgroundImage;
            dropTarget.style.backgroundPosition = draggedTile.style.backgroundPosition;
            dropTarget.draggable = true;
            
            draggedTile.style.backgroundImage = '';
            draggedTile.draggable = false;
            
            // Tukar data index untuk pengecekan kemenangan
            [draggedTile.dataset.index, dropTarget.dataset.index] = [dropTarget.dataset.index, draggedTile.dataset.index];

            checkWinCondition();
        }
    }
    
    function checkWinCondition() {
        let isWin = true;
        console.log("🔍 Checking win condition...");
        
        for (let i = 0; i < TILE_COUNT; i++) {
            const tile = board.children[i];
            const tileIndex = parseInt(tile.dataset.index);
            console.log(`Tile ${i}: expected ${i}, actual ${tileIndex}`);
            
            if (tileIndex !== i) {
                isWin = false;
                break;
            }
        }

        console.log(`🎯 Is win: ${isWin}`);
        
        if (isWin) {
            console.log("🎉 MENANG! Showing navigation button..."); 
            winMessage.classList.remove('hidden');
            winMessage.style.display = 'block'; // Force display
            
            // Tambahkan tombol navigasi ke halaman final
            const nextButton = document.createElement('button');
            nextButton.innerHTML = '🎉 Selamat! Lanjut ke Pesan Terakhir 💝';
            nextButton.className = 'cute-button';
            nextButton.style.marginTop = '15px';
            nextButton.style.padding = '15px 30px';
            nextButton.style.backgroundColor = '#536dff';
            nextButton.style.color = 'white';
            nextButton.style.border = 'none';
            nextButton.style.borderRadius = '15px';
            nextButton.style.cursor = 'pointer';
            nextButton.style.fontSize = 'clamp(1em, 3vw, 1.2em)';
            nextButton.style.fontFamily = 'inherit';
            nextButton.style.fontWeight = '600';
            nextButton.style.transition = 'all 0.3s ease';
            nextButton.style.boxShadow = '0 4px 15px rgba(83, 109, 255, 0.3)';
            
            nextButton.addEventListener('mouseenter', () => {
                nextButton.style.backgroundColor = '#4894ff';
                nextButton.style.transform = 'translateY(-3px)';
                nextButton.style.boxShadow = '0 6px 20px rgba(83, 109, 255, 0.4)';
            });
            
            nextButton.addEventListener('mouseleave', () => {
                nextButton.style.backgroundColor = '#536dff';
                nextButton.style.transform = 'translateY(0)';
                nextButton.style.boxShadow = '0 4px 15px rgba(83, 109, 255, 0.3)';
            });
            
            nextButton.addEventListener('click', () => {
                // Panggil fungsi showPage yang ada di script utama
                if (typeof showPage === 'function') {
                    showPage('final', document.querySelector('.nav-btn[onclick*="final"]'));
                }
            });
            
            // Cek apakah tombol sudah ada, jika belum baru tambahkan
            if (!winMessage.querySelector('.cute-button')) {
                winMessage.appendChild(nextButton);
            }
            
            // Confetti effect jika tersedia
            if (typeof confetti !== 'undefined') {
                confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { y: 0.6 }
                });
            }
        }
    }

    // Event listener untuk tombol restart
    restartButton.addEventListener('click', initGame);
    
    // FITUR DEBUG: Double-click untuk menyelesaikan puzzle secara otomatis
    board.addEventListener('dblclick', () => {
        console.log("🚀 Auto-solving puzzle for testing...");
        for (let i = 0; i < TILE_COUNT; i++) {
            const tile = board.children[i];
            tile.dataset.index = i;
            
            if (i !== TILE_COUNT - 1) {
                const x = (i % COLS) * -100;
                const y = Math.floor(i / COLS) * -100;
                tile.style.backgroundImage = `url(${IMAGE_SRC})`;
                tile.style.backgroundPosition = `${x}px ${y}px`;
                tile.style.backgroundSize = '300% 300%';
                tile.style.backgroundRepeat = 'no-repeat';
                tile.draggable = true;
            } else {
                tile.style.backgroundImage = '';
                tile.style.backgroundColor = '#e3f2fd';
                tile.style.border = '2px dashed #69b2ff';
                tile.draggable = false;
            }
        }
        checkWinCondition();
    });

    // Memulai semuanya
    populateGallery();
    
    // Load initial image
    const initialImg = new Image();
    initialImg.onload = function() {
        originalImage.src = IMAGE_SRC;
        imageLoaded = true;
        initGame();
    };
    initialImg.src = IMAGE_SRC;
});