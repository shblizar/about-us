/* ══════════════════════════════════════
   IBUL & CHIARA — script.js
══════════════════════════════════════ */

// ─── CLOUDINARY CONFIG ────────────────
const CLOUDINARY_CLOUD_NAME = 'dvbi5gysg';
const CLOUDINARY_UPLOAD_PRESET = 'about-us';

// ─── PETALS ───────────────────────────
(function spawnPetals() {
  const container = document.getElementById('petals');
  const symbols = ['✿', '❀', '·', '꽃', '✾'];
  const colors  = ['#D4A5A5', '#B8868A', '#C9A96E', '#E8D5B0', '#8B5E6B'];
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = symbols[i % symbols.length];
    p.style.cssText = `
      left: ${(i * 7.2) % 100}%;
      font-size: ${8 + (i % 4) * 3}px;
      color: ${colors[i % colors.length]};
      animation-duration: ${13 + i * 1.8}s;
      animation-delay: ${i * 1.4}s;
    `;
    container.appendChild(p);
  }
})();

// ─── NAVBAR SCROLL ────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── HAMBURGER ────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('mobile-open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('mobile-open');
  });
});

// ─── FADE ON SCROLL ───────────────────
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
fadeEls.forEach(el => fadeObserver.observe(el));

// ─── COUNTER ANIMATION ────────────────
(function initCounters() {
  const startDate = new Date('2025-03-20');
  const today = new Date();
  const diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const dayEl = document.querySelector('.stat-num[data-target="396"]');
  if (dayEl) dayEl.dataset.target = diff;

  const counters = document.querySelectorAll('.stat-num');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = Math.max(target / 60, 0.5);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target; clearInterval(timer); return; }
        el.textContent = Math.floor(current);
      }, 20);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObs.observe(el));
})();

// ─── POV DATA ─────────────────────────
const povData = {
  Ruby: {
    initial: 'R',
    gradient: 'linear-gradient(135deg, #D4A5A5, #8B5E6B)',
    name: 'Shohibul Izar',
    tag: '— Ruby',
    paras: [
      { text: 'Waktu pertama ketemu di Kopi Kotak, gue sama sekali gak kenal siapa-siapa. Bahkan yang udah aktif di grup pun gue gak tau mukanya. Semuanya berjalan kayak nongkrong biasa.', highlight: false },
      { text: 'Sampai menjelang maghrib, waktu mau ada sesi pembagian pita, kita mulai kenalan satu-satu. Dan di situlah gue ngeliat dia — perempuan dengan baju warna coklat, rambut dikepang.', highlight: false },
      { text: '"Dia siapa?" — tapi lebih ke bayangan sekilas, asal sebut. Tapi ada satu hal yang gue rasain: dia beda dari yang lain.', highlight: true },
      { text: 'Gue diam-diam ngepelajarin sifat-sifatnya jauh sebelum kita deket. Sampai akhirnya waktu mempertemukan kita di satu sirkel yang sama — dan gue sadar, perasaan itu bukan cuma kebetulan.', highlight: false },
    ]
  },
  chiara: {
    initial: 'C',
    gradient: 'linear-gradient(135deg, #E8D5B0, #C9A96E)',
    name: 'Chiara Rezzita Putri Ferindra',
    tag: '— Chiara',
    paras: [
      { text: 'Jujur, waktu first meet jurusan, aku sama sekali gak ngeh ada Ibul. Aku emang orangnya gak peduli sama anak cowok sekelas — jadi ya, keberadaannya saat itu lewat begitu aja buat aku.', highlight: false },
      { text: 'Aku baru mulai notice Ibul ketika kuliah udah jalan. Sampai pada satu hari — ada keluarga sisfor yang meninggal, dan Ibul yang mimpin doa di depan kelas.', highlight: false },
      { text: '"Emang kece la ni orang."', highlight: true },
      { text: 'Tapi aku takut deket sama dia. Karena waktu itu dia sedang bersama orang lain. Jadi aku batasi diri — cukup jadiin dia teman satu sirkel, tidak lebih.', highlight: false },
      { text: 'Siapa sangka, ternyata dari awal — dari saat aku bahkan belum ngeh keberadaannya — dia sudah memperhatikan aku. Udah ngepelajarin sifat-sifatku. Dan pada 20 Maret 2025... akhirnya kita ofc. 🫰🏼', highlight: false },
    ]
  }
};

function renderPOV(who) {
  const d = povData[who];
  const card = document.getElementById('povCard');
  card.style.opacity = '0';
  setTimeout(() => {
    card.innerHTML = `
      <div class="pov-quote-mark">"</div>
      <div class="pov-avatar">
        <div class="avatar-circle" style="background:${d.gradient}">${d.initial}</div>
        <div>
          <div class="avatar-name">${d.name}</div>
          <div class="avatar-tag">${d.tag}</div>
        </div>
      </div>
      ${d.paras.map(p => `<p class="pov-para${p.highlight ? ' highlight' : ''}">${p.text}</p>`).join('')}
    `;
    card.style.opacity = '1';
  }, 180);
}

document.querySelectorAll('.pov-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pov-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPOV(btn.dataset.pov);
  });
});
renderPOV('ibul');

// ─── TIMELINE ─────────────────────────
const timelineEvents = [
  { date: 'Sebelum Kuliah — 2024', title: 'Kopi Kotak, Depok', desc: 'Pertemuan kelas pertama sebelum masa kuliah. Semua masih asing. Tapi di antara semua orang, ada satu perempuan berbaju coklat dengan rambut dikepang yang entah kenapa terasa berbeda.', icon: '☕', side: 'left' },
  { date: 'Awal Kuliah — 2024', title: 'Gunadarma Dimulai', desc: 'Kuliah resmi berjalan. Chiara belum notice keberadaan Ibul — tidak terlalu peduli dengan teman cowok. Ibul, di sisi lain, diam-diam sudah mulai memperhatikan.', icon: '🎓', side: 'right' },
  { date: 'Momen Doa — 2024', title: 'Ibul Mimpin Doa', desc: 'Saat ada keluarga sisfor yang meninggal, Ibul maju memimpin doa di depan kelas. Di sinilah Chiara pertama kali benar-benar notice Ibul dan berkata dalam hati: "emang kece la ni orang."', icon: '🤲', side: 'left' },
  { date: '2024 – 2025', title: 'Satu Sirkel', desc: 'Tanpa disengaja, keduanya masuk ke circle yang sama. Makin dekat, makin sering bareng — sampai orang-orang sekitar lebih dulu bertanya: "lu pacaran sama Ibul ya, Zit?"', icon: '👥', side: 'right' },
  { date: '20 Maret 2025', title: 'Resmi Jadi Nyata 🫰🏼', desc: 'Setelah perjalanan panjang — dari stranger di Kopi Kotak, doa yang mengubah pandangan, circle yang menyatukan — pada hari ini Ibul dan Chiara resmi memilih satu sama lain.', icon: '✿', side: 'left', special: true },
];

(function renderTimeline() {
  const tl = document.getElementById('timelineEl');
  timelineEvents.forEach((ev, i) => {
    const item = document.createElement('div');
    item.className = 'tl-item fade-up';
    item.style.setProperty('--d', `${i * 0.1}s`);

    const card = `
      <div class="tl-card${ev.special ? ' special-card' : ''}">
        <span class="tl-date">${ev.date}</span>
        <h3>${ev.title}</h3>
        <p>${ev.desc}</p>
      </div>`;

    item.innerHTML = `
      <div class="tl-left">${ev.side === 'left' ? card : ''}</div>
      <div class="tl-center">
        <div class="tl-dot${ev.special ? ' special' : ''}">${ev.icon}</div>
      </div>
      <div class="tl-right">${ev.side === 'right' ? card : ''}</div>
    `;
    tl.appendChild(item);
    fadeObserver.observe(item);
  });

  const end = document.createElement('div');
  end.className = 'tl-end fade-up';
  end.innerHTML = `<span class="tl-end-script">& forever</span><span class="tl-end-label">To be continued...</span>`;
  tl.appendChild(end);
  fadeObserver.observe(end);
})();

// ─── MEMORIES — Cloudinary Storage ────
const STORAGE_KEY = 'ibul-chiara-memories-v2';

function loadMemories() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function saveMemories(arr) {
  // Hanya simpan metadata (URL, caption, tag, date) — BUKAN base64
  const safe = arr.map(({ id, src, caption, date, tag, createdAt }) =>
    ({ id, src, caption, date, tag, createdAt })
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
}

let memories = loadMemories();

function renderMemories() {
  const grid  = document.getElementById('memoriesGrid');
  const empty = document.getElementById('memoriesEmpty');
  grid.innerHTML = '';

  if (memories.length === 0) {
    empty.classList.add('show');
    return;
  }
  empty.classList.remove('show');

  memories.forEach((mem, i) => {
    const card = document.createElement('div');
    card.className = 'mem-card fade-up';
    card.style.setProperty('--d', `${i * 0.07}s`);
    card.innerHTML = `
      <div class="mem-img-wrap">
        <img src="${mem.src}" alt="${mem.caption}" loading="lazy" />
        <span class="mem-tag ${mem.tag}">${mem.tag}</span>
        <button class="mem-del" data-id="${mem.id}" title="Hapus">✕</button>
      </div>
      <div class="mem-body">
        <p class="mem-caption">${mem.caption}</p>
        ${mem.date ? `<p class="mem-date">${mem.date}</p>` : ''}
      </div>
    `;
    card.querySelector('.mem-img-wrap img').addEventListener('click', () => openLightbox(mem));
    card.querySelector('.mem-caption').addEventListener('click', () => openLightbox(mem));
    card.querySelector('.mem-del').addEventListener('click', e => {
      e.stopPropagation();
      if (confirm('Hapus memory ini?')) {
        memories = memories.filter(m => m.id !== mem.id);
        saveMemories(memories);
        renderMemories();
      }
    });
    grid.appendChild(card);
    fadeObserver.observe(card);
  });
}

renderMemories();

// ─── UPLOAD MODAL ─────────────────────
const uploadOverlay   = document.getElementById('uploadOverlay');
const dropZone        = document.getElementById('dropZone');
const dropPlaceholder = document.getElementById('dropPlaceholder');
const dropPreview     = document.getElementById('dropPreview');
const fileInput       = document.getElementById('fileInput');
let selectedFile    = null;
let activeTag       = 'together';

document.getElementById('openUpload').addEventListener('click', () => {
  uploadOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});
document.getElementById('closeUpload').addEventListener('click', closeUpload);
uploadOverlay.addEventListener('click', e => { if (e.target === uploadOverlay) closeUpload(); });

function closeUpload() {
  uploadOverlay.classList.remove('open');
  document.body.style.overflow = '';
  selectedFile = null;
  dropPreview.src = '';
  dropPreview.classList.remove('show');
  dropPlaceholder.classList.remove('hidden');
  document.getElementById('captionInput').value = '';
  document.getElementById('dateInput').value = '';
  document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.tag-btn[data-tag="together"]').classList.add('active');
  activeTag = 'together';
}

dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', e => handleFile(e.target.files[0]));

dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  handleFile(e.dataTransfer.files[0]);
});

function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  selectedFile = file;
  // Preview lokal sementara
  const reader = new FileReader();
  reader.onload = e => {
    dropPreview.src = e.target.result;
    dropPreview.classList.add('show');
    dropPlaceholder.classList.add('hidden');
  };
  reader.readAsDataURL(file);
}

document.querySelectorAll('.tag-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTag = btn.dataset.tag;
  });
});

// ─── UPLOAD KE CLOUDINARY ─────────────
async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) throw new Error('Upload gagal');
  const data = await res.json();
  return data.secure_url; // URL permanen yang bisa diakses siapapun
}

// ─── SAVE MEMORY ──────────────────────
document.getElementById('saveMemory').addEventListener('click', async () => {
  const caption = document.getElementById('captionInput').value.trim();
  if (!selectedFile) { alert('Pilih foto dulu ya! ✿'); return; }
  if (!caption)      { alert('Isi caption dulu ya! ✿'); return; }

  const saveBtn = document.getElementById('saveMemory');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Uploading... ✿';

  try {
    const cloudUrl = await uploadToCloudinary(selectedFile);

    const mem = {
      id: Date.now().toString(),
      src: cloudUrl,   // URL Cloudinary, bukan base64
      caption,
      date: document.getElementById('dateInput').value.trim(),
      tag: activeTag,
      createdAt: new Date().toISOString(),
    };

    memories.unshift(mem);
    saveMemories(memories);
    renderMemories();
    closeUpload();
  } catch (err) {
    alert('Gagal upload foto. Coba lagi ya! ✿');
    console.error(err);
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = 'Simpan Memory ✿';
  }
});

// ─── LIGHTBOX ─────────────────────────
const lightboxOverlay = document.getElementById('lightboxOverlay');

function openLightbox(mem) {
  document.getElementById('lightboxImg').src = mem.src;
  document.getElementById('lightboxCaption').textContent = mem.caption;
  document.getElementById('lightboxDate').textContent = mem.date || '';
  lightboxOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', e => { if (e.target === lightboxOverlay) closeLightbox(); });

function closeLightbox() {
  lightboxOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── KEYBOARD ─────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeLightbox(); closeUpload(); }
});

// ─── SMOOTH SCROLL ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});
