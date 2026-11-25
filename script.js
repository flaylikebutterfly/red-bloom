/* ========================================================
   PURPLE BLOOM - MY FAVORITE SENSEI
   ======================================================== */

// Membuat struktur bunga
document.querySelectorAll('.flower-container').forEach((el) => {
  el.innerHTML = `
    <div class="flower-top">
      <div class="flower-petal flower-petal__1"></div>
      <div class="flower-petal flower-petal__2"></div>
      <div class="flower-petal flower-petal__3"></div>
      <div class="flower-petal flower-petal__4"></div>
      <div class="flower-petal flower-petal__5"></div>
      <div class="flower-petal flower-petal__6"></div>
      <div class="flower-petal flower-petal__7"></div>
      <div class="flower-petal flower-petal__8"></div>
      <div class="flower-circle"></div>
      <div class="flower-light flower-light__1"></div>
      <div class="flower-light flower-light__2"></div>
      <div class="flower-light flower-light__3"></div>
      <div class="flower-light flower-light__4"></div>
      <div class="flower-light flower-light__5"></div>
      <div class="flower-light flower-light__6"></div>
      <div class="flower-light flower-light__7"></div>
      <div class="flower-light flower-light__8"></div>
    </div>

    <div class="flower-bottom">
      <div class="flower-stem"></div>
      <div class="flower-leaf flower-leaf__1"></div>
      <div class="flower-leaf flower-leaf__2"></div>
      <div class="flower-leaf flower-leaf__3"></div>
      <div class="flower-leaf flower-leaf__4"></div>
      <div class="flower-leaf flower-leaf__5"></div>
      <div class="flower-leaf flower-leaf__6"></div>
      <div class="flower-grass flower-grass__1"></div>
      <div class="flower-grass flower-grass__2"></div>
      <div class="flower-grass flower-grass__3"></div>
      <div class="flower-grass flower-grass__4"></div>
    </div>
  `;
});

// Animasi bunga mekar secara bertahap
const flowers = Array.from(
  document.querySelectorAll('.flower-container')
);

const animatedClass = 'animate';

if (flowers.length > 0) {
  flowers[0].classList.add(animatedClass);

  setTimeout(() => {
    for (let i = 1; i <= 2 && i < flowers.length; i++) {
      flowers[i].classList.add(animatedClass);
    }

    let remaining = flowers.slice(3);

    const interval = setInterval(() => {
      if (remaining.length === 0) {
        clearInterval(interval);
        return;
      }

      const randomIndex = Math.floor(
        Math.random() * remaining.length
      );

      const el = remaining.splice(randomIndex, 1)[0];
      el.classList.add(animatedClass);
    }, 400);

  }, 2500);
}

/* ========================================================
   FLOATING PURPLE HEARTS & SPARKLES
   ======================================================== */

const canvas = document.getElementById('hearts-canvas');

if (canvas) {
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];

  const heartColors = [
    '#c084fc',
    '#d8b4fe',
    '#e9d5ff',
    '#a855f7',
    '#f0abfc'
  ];

  class HeartParticle {
    constructor(x, y, isBurst = false) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : height + Math.random() * 20;

      this.size = Math.random() * 14 + 6;

      this.color = heartColors[
        Math.floor(Math.random() * heartColors.length)
      ];

      this.alpha = isBurst ? 1 : Math.random() * 0.7 + 0.3;

      this.speedY = isBurst
        ? (Math.random() - 0.7) * 4
        : Math.random() * 1.5 + 0.8;

      this.speedX = isBurst
        ? (Math.random() - 0.5) * 4
        : Math.sin(Math.random() * Math.PI) * 0.8;

      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.05 + 0.02;
      this.isBurst = isBurst;
    }

    update() {
      this.y -= this.speedY;
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.5;

      if (this.isBurst) {
        this.alpha -= 0.015;
      } else if (this.y < -30) {
        this.y = height + 20;
        this.x = Math.random() * width;
        this.alpha = Math.random() * 0.7 + 0.3;
      }
    }

    draw() {
      if (this.alpha <= 0) return;

      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 12;

      const s = this.size;

      ctx.beginPath();
      ctx.moveTo(this.x, this.y + s * 0.3);

      ctx.bezierCurveTo(
        this.x, this.y,
        this.x - s / 2, this.y,
        this.x - s / 2, this.y + s * 0.3
      );

      ctx.bezierCurveTo(
        this.x - s / 2,
        this.y + (s + s * 0.3) / 2,
        this.x,
        this.y + s,
        this.x,
        this.y + s
      );

      ctx.bezierCurveTo(
        this.x,
        this.y + s,
        this.x + s / 2,
        this.y + (s + s * 0.3) / 2,
        this.x + s / 2,
        this.y + s * 0.3
      );

      ctx.bezierCurveTo(
        this.x + s / 2, this.y,
        this.x, this.y,
        this.x, this.y + s * 0.3
      );

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  // Partikel awal
  for (let i = 0; i < 35; i++) {
    particles.push(
      new HeartParticle(
        Math.random() * width,
        Math.random() * height
      )
    );
  }

  function spawnBurst(x, y, count = 20) {
    for (let i = 0; i < count; i++) {
      particles.push(new HeartParticle(x, y, true));
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      p.update();
      p.draw();

      if (p.isBurst && p.alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animateCanvas);
  }

  animateCanvas();

  // Efek ketika layar diklik
  window.addEventListener('click', (e) => {
    if (
      e.target.closest('.glass-btn') ||
      e.target.closest('.glass-modal')
    ) return;

    spawnBurst(e.clientX, e.clientY, 18);
  });

  // Supaya efek partikel bisa dipakai bagian lain
  window.spawnBurst = spawnBurst;
}

/* ========================================================
   CUSTOM MP3 MUSIC PLAYER
   ======================================================== */

// Pastikan file MP3 bernama sensei-song.mp3
// dan berada di folder yang sama dengan index.html.

const customMusic = new Audio('./sensei-song.mp3');
customMusic.loop = true;
customMusic.volume = 0.5;

let isPlayingMusic = false;

const musicBtn = document.getElementById('music-btn');

if (musicBtn) {
  const btnText = musicBtn.querySelector('.btn-text');
  const btnIcon = musicBtn.querySelector('.btn-icon');

  async function toggleMusic() {
    if (!isPlayingMusic) {
      try {
        await customMusic.play();

        isPlayingMusic = true;

        if (btnText) btnText.textContent = 'Mute Music';
        if (btnIcon) btnIcon.textContent = '🎶';

      } catch (error) {
        console.error('Musik gagal diputar:', error);

        if (btnText) btnText.textContent = 'Try Again';
      }

    } else {
      customMusic.pause();

      isPlayingMusic = false;

      if (btnText) btnText.textContent = 'Play Music';
      if (btnIcon) btnIcon.textContent = '🎵';
    }
  }

  musicBtn.addEventListener('click', toggleMusic);
}

/* ========================================================
   SENSEI APPRECIATION LETTER
   ======================================================== */

const loveModal = document.getElementById('love-modal');
const noteBtn = document.getElementById('note-btn');
const closeModal = document.getElementById('close-modal');
const typewriterText = document.getElementById('typewriter-text');
const bloomBtn = document.getElementById('bloom-btn');
const heartBurstBtn = document.getElementById('heart-burst-btn');

// Pesan khusus untuk Sensei
const message = `Dear Anie Sensei,

Thank you for every lesson, every piece of advice, and every little encouragement you've given.

You don't just teach lessons from books, but also valuable things about life.

May your days bloom with happiness, just like the flowers in this little garden.

With sincere gratitude, hope you won’t get tired of teaching us yaa (especially iis hehe) ><

あなたの教えは、いつまでも心に残る。

その光は、誰かの未来を照らしている。

出会えてよかった、私の大切な先生。

Otsukaresama deshita :D

Your fav student ^^`;

let typewriterIndex = 0;
let typewriterTimer = null;

function typeWriter() {
  if (!typewriterText) return;

  if (typewriterIndex < message.length) {
    typewriterText.textContent += message.charAt(typewriterIndex);
    typewriterIndex++;

    typewriterTimer = setTimeout(typeWriter, 40);
  }
}

function openLoveLetter() {
  if (!loveModal || !typewriterText) return;

  loveModal.classList.remove('hidden');

  typewriterText.textContent = '';
  typewriterIndex = 0;

  clearTimeout(typewriterTimer);

  typeWriter();

  if (window.spawnBurst) {
    window.spawnBurst(
      window.innerWidth / 2,
      window.innerHeight / 2,
      25
    );
  }
}

function closeLoveLetter() {
  if (!loveModal) return;

  loveModal.classList.add('hidden');
  clearTimeout(typewriterTimer);
}

if (noteBtn) {
  noteBtn.addEventListener('click', openLoveLetter);
}

if (closeModal) {
  closeModal.addEventListener('click', closeLoveLetter);
}

if (loveModal) {
  loveModal.addEventListener('click', (e) => {
    if (e.target === loveModal) {
      closeLoveLetter();
    }
  });
}

// Tombol Send Appreciation
if (bloomBtn) {
  bloomBtn.addEventListener('click', () => {
    if (window.spawnBurst) {
      window.spawnBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        40
      );
    }
  });
}

// Tombol efek tambahan
if (heartBurstBtn) {
  heartBurstBtn.addEventListener('click', () => {
    if (window.spawnBurst) {
      window.spawnBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        35
      );
    }
  });
}
