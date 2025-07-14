gsap.registerPlugin(MorphSVGPlugin);

const {
  gsap,
  gsap: { to, timeline, set, delayedCall },
  Splitting } =
window;

// === KODE CONFETTI DARI ANDA (DIBUNGKUS DALAM FUNGSI) ===
function launchConfetti() {
  var count = 200;
  var defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
// === AKHIR DARI KODE CONFETTI ===


// === KODE UNTUK FIREWORKS ===
function launchFireworks() {
  // Durasi sudah diubah dari 15 detik menjadi 3 detik
  var duration = 3 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
}
// === AKHIR DARI KODE FIREWORKS ===


Splitting();

// === ELEMEN DOM ===
const BTN = document.querySelector('.birthday-button__button');
const BLOW_BTN_WRAPPER = document.querySelector('#blow-candle-wrapper');
const BLOW_BTN = document.querySelector('#blow-candle-button');
const EYES = document.querySelector('.cake__eyes');

// === STATE MANAGEMENT ===
let animationHasPlayed = false; // Flag untuk mengontrol alur manual

// === AUDIO ===
const SOUNDS = {
  CHEER: new Audio('assets/sounds/applause-236785.mp3'), // Menggunakan URL yang valid
  MATCH: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/match-strike-trimmed.mp3'),
  TUNE: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/happy-birthday-trimmed.mp3'),
  ON: new Audio('https://assets.codepen.io/605876/switch-on.mp3'),
  BLOW: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/blow-out.mp3'),
  POP: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/pop-trimmed.mp3'),
  HORN: new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/horn.mp3'),
  FIREWORKS: new Audio('assets/sounds/fireworks-29629.mp3')
};

// === FUNGSI ANIMASI KECIL (SESUAI KODE ASLI) ===

const BLINK = eyes => {
  gsap.set(eyes, { scaleY: 1 });
  if (eyes.BLINK_TL) eyes.BLINK_TL.kill();
  eyes.BLINK_TL = new gsap.timeline({
    delay: Math.floor(Math.random() * 4) + 1,
    onComplete: () => BLINK(eyes)
  });
  eyes.BLINK_TL.to(eyes, {
    duration: 0.05,
    transformOrigin: '50% 50%',
    scaleY: 0,
    yoyo: true,
    repeat: 1
  });
};

const FROSTING_TL = () =>
  gsap.timeline().
  to(
    '.cake__frosting--start use',
    {
      scaleX: 1.015,
      duration: 0.25
    },
    0).

  to(
    '.cake__frosting--start use',
    {
      scaleY: 1,
      duration: 1
    },
    0).

  to(
    '.cake__frosting--start use',
    {
      duration: 1,
      morphSVG: '.cake__frosting--end'
    },
    0);

const SPRINKLES_TL = () =>
  gsap.timeline().to('.cake__sprinkle', { scale: 1, duration: 0.06, stagger: 0.02 });

const SPIN_TL = () =>
  gsap.timeline().
  set('.cake__frosting-patch', { display: 'block' }).
  to(
    ['.cake__frosting--duplicate', '.cake__sprinkles--duplicate'],
    { x: 0, duration: 1 },
    0).

  to(
    ['.cake__frosting--start', '.cake__sprinkles--initial'],
    { x: 65, duration: 1 },
    0).

  to('.cake__face', { duration: 1, x: -48.82 }, 0);

const flickerSpeed = 0.1;
const FLICKER_TL = gsap.timeline({ paused: true }).
  to('.candle__flame-outer', {
    duration: flickerSpeed,
    repeat: -1,
    yoyo: true,
    morphSVG: '#flame-outer'
  }).
  to(
    '.candle__flame-inner',
    {
      duration: flickerSpeed,
      repeat: -1,
      yoyo: true,
      morphSVG: '#flame-inner'
    },
    0);

const SHAKE_TL = () =>
  gsap.timeline({ delay: 0.5 }).
  set('.cake__face', { display: 'none' }).
  set('.cake__face--straining', { display: 'block' }).
  to(
    '.birthday-button',
    {
      onComplete: () => {
        set('.cake__face--straining', { display: 'none' });
        set('.cake__face', { display: 'block' });
      },
      x: 1,
      y: 1,
      repeat: 13,
      duration: 0.1
    },
    0).

  to(
    '.cake__candle',
    {
      onComplete: () => {
        FLICKER_TL.play();
      },
      onStart: () => {
        SOUNDS.POP.play();
        delayedCall(0.2, () => SOUNDS.POP.play());
        delayedCall(0.4, () => SOUNDS.POP.play());
      },
      ease: 'Elastic.easeOut',
      duration: 0.2,
      stagger: 0.2,
      scaleY: 1
    },
    0.2);

const FLAME_TL = () =>
  gsap.timeline({}).
  to('.cake__candle', { '--flame': 1, stagger: 0.2, duration: 0.1 }).
  to('body', { '--flame': 1, '--lightness': 5, duration: 0.2, delay: 0.2 });

function createSmoke(x, y) {
  const particle = document.createElement("div");
  particle.className = "smoke";
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  document.body.appendChild(particle);

  gsap.to(particle, {
    duration: 2,
    y: -100,
    opacity: 0,
    scale: 3,
    onComplete: () => particle.remove()
  });
}

// === FUNGSI UTAMA ===

const RESET = () => {
  console.log("Resetting animation...");
  gsap.set('.birthday-button__text--initial', { opacity: 1 });
  Object.values(SOUNDS).forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  });
  FLICKER_TL.pause(0).kill();

  set('.char', {
    '--hue': () => Math.random() * 50 + 300,
    '--char-sat': 0,
    '--char-light': 0,
    x: 0,
    y: 0,
    opacity: 1
  });

  to('body', {
    '--lightness': 50,
    '--glow-alpha': 0.4,
    '--transparency-alpha': 0,
    '--flame': 0,
    duration: 0.25
  });

  set('.cake__candle', { '--flame': 0, scaleY: 0, transformOrigin: '50% 100%' });
  set('.birthday-button__cake', { display: 'none' });
  set(BLOW_BTN_WRAPPER, { display: 'none' });
  set('.birthday-button', { scale: 0.6, x: 0, y: 0 });
  
  set('.cake__frosting--end', { opacity: 0 });
  set('.cake__frosting-patch', { display: 'none' });
  set('.cake__frosting--start use', { transformOrigin: '50% 10%', scaleX: 0, scaleY: 0 });
  set(['.cake__frosting--duplicate', '.cake__sprinkles--duplicate'], { x: -65 });
  set('.cake__face', { x: -110 });
  set('.cake__face--straining', { display: 'none' });
  set('.cake__sprinkle', { '--sprinkle-hue': () => Math.random() * 360, scale: 0, transformOrigin: '50% 50%' });

  BTN.removeAttribute('disabled');
  animationHasPlayed = false;
};

function playInitialAnimation() {
  BTN.setAttribute('disabled', true);
  SOUNDS.ON.play();
  launchConfetti(); // PANGGIL FUNGSI CONFETTI DI SINI
  const initialTL = gsap.timeline({
    onComplete: () => {
      to(BLOW_BTN_WRAPPER, { display: 'block', duration: 0.1 });
      SOUNDS.TUNE.play();
      SOUNDS.MATCH.play();
    }
  });

  gsap.to('.birthday-button__text--initial', { opacity: 0, duration: 0.2 });

  BTN.setAttribute('disabled', true)

  // MENGGUNAKAN URUTAN ANIMASI ASLI YANG BENAR
  initialTL
    .set('.birthday-button__cake', { display: 'block' })
    .to('.birthday-button', {
      onStart: () => SOUNDS.CHEER.play(),
      scale: 1,
      duration: 0.2
    })
    .to('.char', { '--char-sat': 70, '--char-light': 65, duration: 0.2 }, 0)
    .to('.char', {
      onStart: () => SOUNDS.HORN.play(),
      delay: 0.75,
      y: () => gsap.utils.random(-100, -200),
      x: () => gsap.utils.random(-50, 50),
      duration: () => gsap.utils.random(0.5, 1)
    })
    .to('.char', { opacity: 0, duration: 0.25 }, '>-0.5')
    .add(FROSTING_TL())
    .add(SPRINKLES_TL())
    .add(SPIN_TL())
    .add(SHAKE_TL())
    .add(FLAME_TL());
}

function blowOutCandles() {
  launchFireworks(); // PANGGIL FUNGSI FIREWORKS DI SINI
  SOUNDS.FIREWORKS.play();
  
  to(BLOW_BTN_WRAPPER, { display: 'none', duration: 0.1 }); //
  
  SOUNDS.TUNE.pause(); //
  SOUNDS.MATCH.pause(); //
  FLICKER_TL.kill(); //
  
  SOUNDS.BLOW.play(); //

  gsap.to(['body', '.cake__candle'], { //
    '--flame': 0, //
    duration: 0.3 //
  });
  
  gsap.to('body', { //
    '--glow-alpha': 0, //
    '--transparency-alpha': 0.8, //
    '--lightness': 0, //
    duration: 0.4 //
  });

  const candleEls = document.querySelectorAll(".cake__candle"); //
  candleEls.forEach(candle => { //
    const rect = candle.getBoundingClientRect(); //
    createSmoke(rect.left + rect.width / 2, rect.top); //
  });

  // 1. Efek menghilang untuk seluruh body setelah 1 detik
  gsap.to('body', {
    opacity: 0,
    duration: 2, 
    delay: 1 
  });

  // 2. Mengarahkan ke halaman lain setelah 3 detik
  gsap.delayedCall(3, () => {
  window.location.href = 'main.html';
  });
}

// === EVENT LISTENERS ===
BTN.addEventListener('click', () => {
  if (animationHasPlayed) {
    RESET();
  } else {
    playInitialAnimation();
    animationHasPlayed = true;
  }
});

BLOW_BTN.addEventListener("click", blowOutCandles);



// === INISIALISASI ===
RESET();
BLINK(EYES);
SOUNDS.TUNE.loop = true;



document.addEventListener('DOMContentLoaded', (event) => {
  const volumeToggle = document.getElementById('volume');
  
  // Setel semua suara ke volume 0 jika checkbox tidak dicentang
  const setMuteState = (muted) => {
    for (const sound in SOUNDS) {
      SOUNDS[sound].muted = muted;
    }
  };

  // Inisialisasi state mute berdasarkan checkbox
  setMuteState(volumeToggle.checked);

  // Tambahkan event listener untuk mengubah state mute
  volumeToggle.addEventListener('change', (e) => {
    setMuteState(e.target.checked);
  });
});