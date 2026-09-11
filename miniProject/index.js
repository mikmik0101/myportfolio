/* Portfolio book engine: open welcome + leaf navigation + project rendering. */

'use strict';

/* ── EDIT ME: replace screenshots by dropping files into images/ ──
   Each project renders from this single object. To update:
   1. Drop a screenshot into images/ (e.g. images/poke-battle-league.png)
   2. Update `image` below. Leave `url: ""` if no public link yet. */
var PROJECTS = [
  {
    index: 'Project 01 / 04',
    title: 'Poke Battle League',
    image: 'images/poke-battle-league.png',
    fallbackInitials: 'PBL',
    description: 'A Pokémon-inspired battle/game project built to practice game logic, state, and interactive UI on the web.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://poke-battle-league-jpbg.onrender.com/' // TODO: paste the real public URL, e.g. "https://your-link-here"
  },
  {
    index: 'Project 02 / 04',
    title: 'MATINS — Bible Verse Alarm',
    image: 'images/matins.png',
    fallbackInitials: 'M',
    description: 'An Android Bible verse alarm application — wake up to a verse. Built while learning mobile development.',
    technologies: ['Android', 'Capacitor', 'JavaScript'],
    url: 'https://mikmik0101.github.io/Alarm/' // TODO: paste the real public URL
  },
  {
    index: 'Project 03 / 04',
    title: 'Granny Meour',
    image: 'images/granny-meour.png',
    fallbackInitials: 'GM',
    description: 'A crochet catalog website presenting handmade pieces in a clean, browsable layout.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    url: 'https://granny-meour.vercel.app/' // TODO: paste the real public URL
  },
  {
    index: 'Project 04 / 04',
    title: 'Circle Diary',
    image: 'images/circle-diary.png',
    fallbackInitials: 'CD',
    description: 'A private digital diary project — simple, personal journaling on the web.',
    technologies: ['JavaScript', 'PostgreSQL', 'Neon'],
    url: '' // TODO: paste the real public URL, or remove the entry if it should stay private
  }
];

/* ── EDIT ME: real contact links (leave "" for anything not ready) ── */
var CONTACTS = {
  github: 'https://github.com/mikmik0101',   // TODO: e.g. "https://github.com/your-username"
  email: 'mickaelcullamat01@gmail.com',    // TODO: e.g. "you@example.com"
  linkedin: 'https://www.linkedin.com/in/mickael-cullamat-5003a8306/'  // TODO: e.g. "https://www.linkedin.com/in/your-name"
};

var visitorName = '';

/* ── PAGE 2: BIBLE VERSE OF THE DAY ──
   Primary source: bible-api.com (keyless, CORS-open, KJV text) — a
   random reference is requested client-side on each load. If the API
   is unreachable, a bundled public-domain (KJV) pool below is used.
   The book never depends on the network: a local verse paints first. */
var VERSE_API_URL = 'https://bible-api.com/';
var VERSE_TRANSLATION = 'KJV';

/* Bundled fallback pool: 50 complete KJV verses (public domain). */
var VERSES = [
  { book: 'John', chapter: 3, verse: 16, reference: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
  { book: 'Psalm', chapter: 23, verse: 1, reference: 'Psalm 23:1', text: 'The LORD is my shepherd; I shall not want.' },
  { book: 'Proverbs', chapter: 3, verse: 5, reference: 'Proverbs 3:5', text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.' },
  { book: 'Proverbs', chapter: 3, verse: 6, reference: 'Proverbs 3:6', text: 'In all thy ways acknowledge him, and he shall direct thy paths.' },
  { book: 'Romans', chapter: 8, verse: 28, reference: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.' },
  { book: 'Philippians', chapter: 4, verse: 13, reference: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.' },
  { book: 'Jeremiah', chapter: 29, verse: 11, reference: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.' },
  { book: 'Romans', chapter: 10, verse: 9, reference: 'Romans 10:9', text: 'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.' },
  { book: 'Genesis', chapter: 1, verse: 1, reference: 'Genesis 1:1', text: 'In the beginning God created the heaven and the earth.' },
  { book: 'Psalm', chapter: 46, verse: 1, reference: 'Psalm 46:1', text: 'God is our refuge and strength, a very present help in trouble.' },
  { book: 'Psalm', chapter: 46, verse: 10, reference: 'Psalm 46:10', text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.' },
  { book: 'Isaiah', chapter: 40, verse: 31, reference: 'Isaiah 40:31', text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.' },
  { book: 'Matthew', chapter: 11, verse: 28, reference: 'Matthew 11:28', text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.' },
  { book: 'John', chapter: 14, verse: 6, reference: 'John 14:6', text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.' },
  { book: 'Romans', chapter: 3, verse: 23, reference: 'Romans 3:23', text: 'For all have sinned, and come short of the glory of God;' },
  { book: 'Romans', chapter: 6, verse: 23, reference: 'Romans 6:23', text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.' },
  { book: 'Ephesians', chapter: 2, verse: 8, reference: 'Ephesians 2:8', text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God:' },
  { book: '2 Timothy', chapter: 1, verse: 7, reference: '2 Timothy 1:7', text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.' },
  { book: 'Joshua', chapter: 1, verse: 9, reference: 'Joshua 1:9', text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.' },
  { book: 'Psalm', chapter: 119, verse: 105, reference: 'Psalm 119:105', text: 'Thy word is a lamp unto my feet, and a light unto my path.' },
  { book: 'Matthew', chapter: 6, verse: 33, reference: 'Matthew 6:33', text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.' },
  { book: 'Matthew', chapter: 7, verse: 7, reference: 'Matthew 7:7', text: 'Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you:' },
  { book: 'John', chapter: 1, verse: 1, reference: 'John 1:1', text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
  { book: 'John', chapter: 8, verse: 12, reference: 'John 8:12', text: 'Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.' },
  { book: 'John', chapter: 10, verse: 10, reference: 'John 10:10', text: 'The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly.' },
  { book: 'John', chapter: 11, verse: 25, reference: 'John 11:25', text: 'Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live:' },
  { book: 'Romans', chapter: 5, verse: 8, reference: 'Romans 5:8', text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.' },
  { book: 'Galatians', chapter: 2, verse: 20, reference: 'Galatians 2:20', text: 'I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.' },
  { book: 'Philippians', chapter: 4, verse: 7, reference: 'Philippians 4:7', text: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.' },
  { book: 'Colossians', chapter: 3, verse: 23, reference: 'Colossians 3:23', text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men;' },
  { book: '1 Thessalonians', chapter: 5, verse: 16, reference: '1 Thessalonians 5:16', text: 'Rejoice evermore.' },
  { book: '1 Thessalonians', chapter: 5, verse: 17, reference: '1 Thessalonians 5:17', text: 'Pray without ceasing.' },
  { book: '1 Thessalonians', chapter: 5, verse: 18, reference: '1 Thessalonians 5:18', text: 'In every thing give thanks: for this is the will of God in Christ Jesus concerning you.' },
  { book: 'Hebrews', chapter: 11, verse: 1, reference: 'Hebrews 11:1', text: 'Now faith is the substance of things hoped for, the evidence of things not seen.' },
  { book: '1 Peter', chapter: 5, verse: 7, reference: '1 Peter 5:7', text: 'Casting all your care upon him; for he careth for you.' },
  { book: '1 John', chapter: 1, verse: 9, reference: '1 John 1:9', text: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.' },
  { book: '1 John', chapter: 4, verse: 8, reference: '1 John 4:8', text: 'He that loveth not knoweth not God; for God is love.' },
  { book: '1 John', chapter: 4, verse: 19, reference: '1 John 4:19', text: 'We love him, because he first loved us.' },
  { book: 'Revelation', chapter: 3, verse: 20, reference: 'Revelation 3:20', text: 'Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him, and will sup with him, and he with me.' },
  { book: 'Psalm', chapter: 19, verse: 1, reference: 'Psalm 19:1', text: 'The heavens declare the glory of God; and the firmament sheweth his handywork.' },
  { book: 'Psalm', chapter: 27, verse: 1, reference: 'Psalm 27:1', text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?' },
  { book: 'Psalm', chapter: 37, verse: 4, reference: 'Psalm 37:4', text: 'Delight thyself also in the LORD; and he shall give thee the desires of thine heart.' },
  { book: 'Psalm', chapter: 55, verse: 22, reference: 'Psalm 55:22', text: 'Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.' },
  { book: 'Psalm', chapter: 118, verse: 24, reference: 'Psalm 118:24', text: 'This is the day which the LORD hath made; we will rejoice and be glad in it.' },
  { book: 'Proverbs', chapter: 16, verse: 3, reference: 'Proverbs 16:3', text: 'Commit thy works unto the LORD, and thy thoughts shall be established.' },
  { book: 'Proverbs', chapter: 18, verse: 10, reference: 'Proverbs 18:10', text: 'The name of the LORD is a strong tower: the righteous runneth into it, and is safe.' },
  { book: 'Isaiah', chapter: 41, verse: 10, reference: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.' },
  { book: 'Micah', chapter: 6, verse: 8, reference: 'Micah 6:8', text: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?' },
  { book: 'Matthew', chapter: 5, verse: 16, reference: 'Matthew 5:16', text: 'Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.' },
  { book: 'Romans', chapter: 12, verse: 1, reference: 'Romans 12:1', text: 'I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.' }
];

function lastVerseRef() {
  try { return window.localStorage.getItem('mhc-last-verse'); }
  catch (e) { return null; }
}

function rememberVerseRef(ref) {
  try { window.localStorage.setItem('mhc-last-verse', ref); }
  catch (e) { /* private mode etc. — randomization still works per-load */ }
}

/* Random bundled verse, re-rolled if it matches the previous visit. */
function pickLocalVerse() {
  var last = lastVerseRef();
  var pool = VERSES.filter(function (v) { return v.reference !== last; });
  if (!pool.length) pool = VERSES;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* Normalize a bible-api.com response ({reference, verses[], text}). */
function verseFromApi(data) {
  if (!data || !data.reference || !data.text) return null;
  var first = (data.verses && data.verses[0]) || {};
  var text = String(data.text).replace(/\s+/g, ' ').trim();
  if (!text) return null;
  return {
    book: first.book_name || '',
    chapter: first.chapter || null,
    verse: first.verse || null,
    reference: data.reference,
    text: text
  };
}

function renderVerse(v) {
  var t = document.getElementById('verseText');
  var r = document.getElementById('verseRef');
  if (!t || !r || !v) return;
  t.textContent = '\u201C' + v.text + '\u201D';
  r.textContent = v.reference + ' · ' + VERSE_TRANSLATION;
  rememberVerseRef(v.reference);
}

function fetchApiVerse() {
  var ref = VERSES[Math.floor(Math.random() * VERSES.length)].reference;
  /* ?translation=kjv keeps the API text in the same translation as the pool */
  return fetch(VERSE_API_URL + encodeURIComponent(ref) + '?translation=kjv').then(function (res) {
    if (!res.ok) throw new Error('verse api ' + res.status);
    return res.json();
  }).then(verseFromApi);
}

function loadVerseOfDay() {
  /* Instant local paint — the page works offline and never flashes empty. */
  renderVerse(pickLocalVerse());
  /* Upgrade to a fresh API verse when reachable; silent on failure. */
  try {
    if (typeof fetch !== 'function') return;
    fetchApiVerse().then(function (v) {
      if (v) renderVerse(v);
    }).catch(function () { /* bundled verse already shown */ });
  } catch (e) { /* bundled verse already shown */ }
}

/* ── PROJECT RENDERING ── */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function renderProjects() {
  document.querySelectorAll('.project[data-project]').forEach(function (slot) {
    var p = PROJECTS[Number(slot.getAttribute('data-project'))];
    if (!p) return;
    var hasUrl = Boolean(p.url);
    var tech = p.technologies.map(function (t) {
      return '<span>' + escapeHtml(t) + '</span>';
    }).join('');
    slot.innerHTML =
      '<div class="proj-kicker"><span>' + escapeHtml(p.index) + '</span><em>Featured</em></div>' +
      '<div class="proj-shot">' +
        '<div class="proj-shot-fallback">' + escapeHtml(p.fallbackInitials) + '<small>Screenshot slot — replace in images/</small></div>' +
        '<img src="' + escapeHtml(p.image) + '" alt="' + escapeHtml(p.title) + ' screenshot" loading="lazy" onerror="this.remove()">' +
      '</div>' +
      '<h4 class="proj-name">' + escapeHtml(p.title) + '</h4>' +
      '<p class="proj-desc">' + escapeHtml(p.description) + '</p>' +
      '<div class="proj-tech">' + tech + '</div>' +
      (hasUrl
        ? '<a class="neu-btn proj-btn" href="' + escapeHtml(p.url) + '" target="_blank" rel="noopener">View Project →</a>'
        : '<span class="neu-btn proj-btn is-soon" role="note">Link coming soon </span>');
  });
}

function renderContacts() {
  var map = [
    ['linkGithub', 'labelGithub', CONTACTS.github, 'GitHub'],
    ['linkEmail', 'labelEmail', CONTACTS.email, 'Email'],
    ['linkLinkedin', 'labelLinkedin', CONTACTS.linkedin, 'LinkedIn']
  ];
  map.forEach(function (row) {
    var a = document.getElementById(row[0]);
    var label = document.getElementById(row[1]);
    if (!a || !label) return;
    var value = row[2];
    if (value) {
      if (row[0] === 'linkEmail' && value.indexOf('@') !== -1 && value.indexOf('http') !== 0) {
        a.href = 'mailto:' + value;
      } else {
        a.href = value;
      }
      label.textContent = value;
    } else {
      a.href = '#';
      a.classList.add('is-soon');
      a.removeAttribute('target');
      label.textContent = row[3] + ' link coming soon';
      a.addEventListener('click', function (e) { e.preventDefault(); });
    }
  });
}

/* ── BOOK NAVIGATION ──
   Desktop: 3D leaf engine (TOTAL leaves, spread of two faces).
   Mobile (m-mode, ≤700px): each of the 16 faces is its own page;
   one swipe/keypress = exactly one face. See M_TITLES order.
   Locked until entered === true: every path refuses to move. */
var TOTAL = 8; // leaves 0–7
var current = 0;
var labels = ['Welcome', 'Cover', 'About · Skills', 'Skills · Project', 'Projects', 'Project · School', 'Journey · Contact', 'Thanks'];

var entered = false;
var isMobile = false;
var mobilePos = 0; // face index 0–15
var M_TOTAL = 16;
var M_TITLES = [
  'Welcome', 'Inside Cover',
  'Cover', 'Hello',
  'About Me', 'Skills · Code',
  'Skills · Stack', 'Poke Battle League',
  'MATINS', 'Granny Meour',
  'Circle Diary', 'Education',
  'Journey', 'Contact',
  'Thank You', 'Back Cover'
];

function isLocked() { return !entered; }

function updateIndicator() {
  var el = document.getElementById('pageIndicator');
  var prev = document.getElementById('btnPrev');
  var next = document.getElementById('btnNext');
  if (isMobile) {
    if (el) {
      var m = String(mobilePos + 1).padStart(2, '0');
      el.textContent = M_TITLES[mobilePos] + ' · ' + m + ' / ' + M_TOTAL;
    }
    if (prev) prev.disabled = isLocked() || mobilePos === 0;
    if (next) next.disabled = isLocked() || mobilePos === M_TOTAL - 1;
  } else {
    if (el) {
      var n = String(current + 1).padStart(2, '0');
      var t = String(TOTAL).padStart(2, '0');
      el.textContent = labels[current] + ' · ' + n + ' / ' + t;
    }
    if (prev) prev.disabled = isLocked() || current === 0;
    if (next) next.disabled = isLocked() || current === TOTAL - 1;
  }
}

/* Desktop leaf flip. Guarded: locked book never leaves face 0. */
function flipTo(target) {
  if (target === current) return;
  target = Math.max(0, Math.min(TOTAL - 1, target));
  if (isLocked() && target !== 0) return;
  if (target > current) {
    for (var i = current; i < target; i++) {
      document.getElementById('page-' + i).classList.add('flipped');
    }
  } else {
    for (var j = current - 1; j >= target; j--) {
      document.getElementById('page-' + j).classList.remove('flipped');
    }
  }
  current = target;
  updateIndicator();
}

/* Mobile face-by-face navigation: leaf = floor(pos/2), back = odd pos.
   Two-phase page-turn: the outgoing sheet rotates away around the spine
   edge (same 3D language as desktop) while the incoming sheet waits
   beneath, then the new sheet settles. Same-leaf turns (front↔back)
   lift and land on the same sheet. Interruptions jump-cut to the
   latest target so rapid swipes never corrupt the sequence. */
var mShown = 0; // face currently painted (lags mobilePos mid-flip)
var mFlipTimer = null;
var M_FLIP_MS = 320; // must match mFlipNext/mFlipPrev duration in style.css

function liveLeaf(pos) { return Math.floor(pos / 2); }
function liveBack(pos) { return pos % 2 === 1; }

/* Strip a leaf to a neutral state, optionally painting one face of it. */
function paintLeaf(i, pos) {
  var pg = document.getElementById('page-' + i);
  if (!pg) return null;
  pg.classList.remove('m-live', 'm-active', 'm-under', 'm-show-back',
    'm-flip-next', 'm-flip-prev', 'm-settle-next', 'm-settle-prev');
  /* force reflow so animations can replay */
  void pg.offsetWidth;
  if (pos !== null && pos !== undefined && liveLeaf(pos) === i) {
    pg.classList.add('m-live');
    if (liveBack(pos)) pg.classList.add('m-show-back');
  }
  return pg;
}

function renderMobileInstant() {
  if (mFlipTimer) { clearTimeout(mFlipTimer); mFlipTimer = null; }
  for (var i = 0; i < TOTAL; i++) paintLeaf(i, mobilePos);
  var here = document.getElementById('page-' + liveLeaf(mobilePos));
  if (here) here.classList.add('m-active');
  mShown = mobilePos;
}

function renderMobile(dir) {
  if (!dir) { renderMobileInstant(); return; }
  /* busy mid-flip: jump-cut straight to the latest target */
  if (mFlipTimer) { renderMobileInstant(); return; }
  var fromLeaf = liveLeaf(mShown), fromBack = liveBack(mShown);
  var toLeaf = liveLeaf(mobilePos), toBack = liveBack(mobilePos);
  if (fromLeaf === toLeaf && fromBack === toBack) return;
  var same = fromLeaf === toLeaf;
  var outEl = paintLeaf(fromLeaf, mShown);
  if (!outEl) { renderMobileInstant(); return; }
  outEl.classList.add('m-active', dir === 'next' ? 'm-flip-next' : 'm-flip-prev');
  var inEl = outEl;
  if (!same) {
    inEl = paintLeaf(toLeaf, mobilePos);
    if (!inEl) { renderMobileInstant(); return; }
    inEl.classList.add('m-under');
  }
  var finalEl = inEl;
  mFlipTimer = setTimeout(function () {
    mFlipTimer = null;
    outEl.classList.remove('m-flip-next', 'm-flip-prev');
    if (same) {
      if (toBack) outEl.classList.add('m-show-back');
      else outEl.classList.remove('m-show-back');
    } else {
      paintLeaf(fromLeaf, null);
      inEl.classList.remove('m-under');
      inEl.classList.add('m-active');
    }
    finalEl.classList.add(dir === 'next' ? 'm-settle-next' : 'm-settle-prev');
    mShown = mobilePos;
  }, M_FLIP_MS);
}

function mGo(target, dir) {
  target = Math.max(0, Math.min(M_TOTAL - 1, target));
  if (isLocked() && target !== 0) return;
  if (target === mobilePos) { renderMobile(null); return; }
  var d = dir || (target > mobilePos ? 'next' : 'prev');
  mobilePos = target;
  renderMobile(d);
  if (entered) document.body.classList.add('hint-seen');
  updateIndicator();
}

function mNext() { mGo(mobilePos + 1, 'next'); }
function mPrev() { mGo(mobilePos - 1, 'prev'); }

function nextPage() {
  if (isMobile) { mNext(); return; }
  if (isLocked()) return;
  if (current < TOTAL - 1) flipTo(current + 1);
}

function prevPage() {
  if (isMobile) { mPrev(); return; }
  if (isLocked()) return;
  if (current > 0) flipTo(current - 1);
}

/* Leaf n ↔ mobile face 2n (front of that leaf). Guarded by flipTo/mGo. */
function goToPage(n, e) {
  if (e) e.stopPropagation();
  if (isMobile) mGo(Number(n) * 2);
  else flipTo(Number(n));
}

/* Keep desktop leaf and mobile face in sync across the breakpoint. */
function syncMode() {
  var mob = window.matchMedia('(max-width: 700px)').matches;
  if (mob === isMobile) { updateIndicator(); return; }
  isMobile = mob;
  document.body.classList.toggle('m-mode', mob);
  if (mob) {
    mobilePos = Math.max(0, Math.min(M_TOTAL - 1, current * 2));
    renderMobile(null);
  } else {
    var c = Math.max(0, Math.min(TOTAL - 1, Math.ceil(mobilePos / 2)));
    if (isLocked()) c = 0;
    /* set leaves directly (bypass lock: lock forces 0 anyway) */
    if (mFlipTimer) { clearTimeout(mFlipTimer); mFlipTimer = null; }
    for (var i = 0; i < TOTAL; i++) {
      var pg = paintLeaf(i, null);
      if (!pg) continue;
      if (i < c) pg.classList.add('flipped');
      else pg.classList.remove('flipped');
    }
    current = c;
    mShown = mobilePos;
  }
  updateIndicator();
}

/* ── WELCOME (any name accepted) ── */
function titleCase(name) {
  return name.split(/\s+/).map(function (w) {
    return w ? w.charAt(0).toUpperCase() + w.slice(1) : w;
  }).join(' ');
}

function welcome(name) {
  var clean = (name || '').trim().replace(/\s+/g, ' ');
  var input = document.getElementById('visitorName');
  if (!clean) {
    /* Subtle "name required" indication only — never advance. */
    if (input) {
      input.focus();
      input.setAttribute('aria-invalid', 'true');
      input.classList.remove('input-error');
      void input.offsetWidth;
      input.classList.add('input-error');
    }
    return;
  }
  if (input) {
    input.removeAttribute('aria-invalid');
    input.classList.remove('input-error');
  }
  entered = true;
  document.body.classList.add('entered');
  visitorName = titleCase(clean);
  var greetTitle = document.getElementById('greetTitle');
  var greetSub = document.getElementById('greetSub');
  var coverVisitor = document.getElementById('coverVisitor');
  if (greetTitle) greetTitle.textContent = 'Welcome, ' + visitorName + '.';
  if (greetSub) greetSub.textContent = "Let's turn the page.";
  if (coverVisitor) coverVisitor.textContent = 'Hello, ' + visitorName + ' — enjoy the book';
  if (isMobile) mGo(1, 'next');
  else flipTo(1);
}

/* ── EVENTS (all navigation routes through the locked guards above) ── */
document.getElementById('welcomeForm').addEventListener('submit', function (e) {
  e.preventDefault();
  welcome(document.getElementById('visitorName').value);
});
document.getElementById('visitorName').addEventListener('input', function (e) {
  e.target.classList.remove('input-error');
  e.target.removeAttribute('aria-invalid');
});
document.getElementById('btnPrev').addEventListener('click', prevPage);
document.getElementById('btnNext').addEventListener('click', nextPage);
document.querySelectorAll('[data-goto]').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    goToPage(Number(btn.getAttribute('data-goto')), e);
  });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft') prevPage();
  if (e.key === 'Enter' && current === 0 && document.activeElement &&
      document.activeElement.id === 'visitorName') {
    welcome(document.activeElement.value);
  }
});

/* Swipe: ignore gestures starting on interactive elements */
var touchStartX = 0;
var touchStartY = 0;
var scene = document.getElementById('scene');
scene.addEventListener('touchstart', function (e) {
  var t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
}, { passive: true });
scene.addEventListener('touchend', function (e) {
  var startEl = e.target;
  if (startEl && startEl.closest && startEl.closest('a, button, input, textarea')) return;
  var t = e.changedTouches[0];
  var dx = t.clientX - touchStartX;
  var dy = t.clientY - touchStartY;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) nextPage(); else prevPage();
  }
}, { passive: true });

renderProjects();
renderContacts();
loadVerseOfDay();
syncMode();
if (window.matchMedia) {
  var bp = window.matchMedia('(max-width: 700px)');
  if (bp.addEventListener) bp.addEventListener('change', syncMode);
  else if (bp.addListener) bp.addListener(syncMode);
}
