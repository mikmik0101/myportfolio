// Audio plays only after successful login

let loggedIn = false; // 🔒 gate

function userLogin() {
  const input = document.getElementById("userLogin").value.trim().toUpperCase();
  const correctKeys = [
    "77-109-86-118",
    "VANIA",
    "MARK",
    "YSABEL",
    "LUIS",
    "JOSHUA",
    "BEA",
    "KYLA",
    "RONALYN",
    "JANNA",
    "ALESSANDRA",
    "KRISTINE",
    "GIAN"
  ];

  if (correctKeys.includes(input)) {
    loggedIn = true;


    const generalMessage=`Hello there, 

Welcome to my mini book of projects!

I hope you're doing well wherever you are. Don't forget to eat your meals on time and take good care of yourself. And hey, don't lose that sweet smile of yours—it looks good on you.

I also hope you'll share some suggestions on how I can improve these projects or what new ideas I should try building in the future. Feedback is always appreciated and helps me continue growing as a developer.

Keep praying, keep believing in yourself, and never neglect your own well-being. Most importantly, I hope you continue to excel in whatever path or career you choose to pursue.

Never stop learning, kiddo!

— Mikmik`;
const kalukwanmessage=`HELLO SAYO, NAPAKA KUPAL MONG TAO KA`;
const letternotes = {
  "VANIA":      `Hellooo Vania,

Looks like naligaw ka dito ah? Haskwjwhagahahs. Anyway, I hope you're doing great.

I hope kumakain ka pa rin on time, and I hope you're not stressing yourself out too much with all the things you have to deal with every day. Wag mong aalisin sa mga labi mo yang mga matatamis mong ngiti ha, keep it on as often as you can.

If you're ever going through something heavy and feel like you have no one to talk to, just send me a message, okay? You already know where to find me. And no, I won't ignore you. Truth is, I've always just been a little shy around you. That's probably why it seemed like I acted as if everything was fine after what happened.

I also hope you're always happy. And whenever you feel completely exhausted or like you're about to give up, please take a moment to pray.

I've seen your achievements, and honestly, you've been doing even better lately. You've grown a lot and continue to excel. Keep going—you're doing great.

And please don't be a stranger. You can still talk to me anytime, even if it's just as a friend on social media.

That's all. Take care of yourself and stay safe, always. `,
  "MARK":          generalMessage,
  "YSABEL":        generalMessage,
  "LUIS":          generalMessage,
  "JOSHUA":        generalMessage,
  "BEA":           generalMessage,
  "KYLA":          generalMessage,
  "RONALYN":       kalukwanmessage,
  "JANNA":         generalMessage,
  "ALESSANDRA":    generalMessage,
  "KRISTINE":      generalMessage,
  "GIAN":          generalMessage,
  "77-109-86-118": generalMessage,
};

document.getElementById("userLetter").innerText = letternotes[input] || "No letter yet.";
 

    // Format name nicely e.g. "VANIA" → "Vania"
    const displayName = input.charAt(0) + input.slice(1).toLowerCase();
    document.getElementById("welcomeUser").textContent = "Welcome, " + displayName;

    // 🎵 Play music only on successful login
    const music = document.getElementById("bgMusic");
    music.play().catch(() => {
      // Autoplay blocked on some browsers — silently ignore
    });

    nextPage();
  }
   else {
    alert("Thaz invalid key boi. click 'Forgot Username?' to fix your shi");
    document.getElementById("userLogin").style.borderColor = "#ff4d4d";
  }
}

// ── MODAL ──
const openModalBtn = document.getElementById("openModal");
const modal = document.getElementById("forgotModal");
const closeModalBtn = document.querySelector(".got");

openModalBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close on backdrop click
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

//LETTERS TO
const openLetter = document.getElementById("openLetter");
const letterModal = document.getElementById("letterModal");
const closeLetter = document.getElementById("closeLetter");

openLetter.addEventListener("click", () => {
  letterModal.style.display = "flex";
});

closeLetter.addEventListener("click", () => {
  letterModal.style.display = "none";
});

letterModal.addEventListener("click", (e) => {
  if (e.target === letterModal) letterModal.style.display = "none";
});









// ── BOOK NAVIGATION ──
const TOTAL = 6; // pages 0–5
let current = 0;

const labels = ['Login', 'Cover', 'About', 'Work', 'Skills', 'Contact'];

function updateIndicator() {
  document.getElementById('pg-indicator').textContent = labels[current] || `Page ${current}`;
  document.getElementById('btn-prev').style.opacity = current === 0 ? '0.3' : '1';
  document.getElementById('btn-next').style.opacity = current === TOTAL - 1 ? '0.3' : '1';
}

function flipTo(target) {
  if (target === current) return;

  if (target > current) {
    for (let i = current; i < target; i++) {
      document.getElementById('page-' + i).classList.add('flipped');
    }
  } else {
    for (let i = current - 1; i >= target; i--) {
      document.getElementById('page-' + i).classList.remove('flipped');
    }
  }
  current = target;
  updateIndicator();

  if (current >= 4) setTimeout(animateSkills, 400);
}

function nextPage() {
  // 🔒 Block navigation from login page if not logged in
  if (current === 0 && !loggedIn) {
    alert("Thaz invalid key boi. click 'Forgot Username?' to fix your shi");
    return;
  }
  if (current < TOTAL - 1) flipTo(current + 1);
}

function prevPage() {
  if (current > 0) flipTo(current - 1);
}

function goToPage(n, e) {
  if (e) e.stopPropagation();
  flipTo(n);
}

function animateSkills() {
  document.querySelectorAll('.skill-fill').forEach(el => {
    el.style.transform = `scaleX(${el.dataset.w})`;
  });
}

// ── SWIPE (guarded via nextPage) ──
let touchStartX = 0;
const scene = document.getElementById('scene');
scene.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
scene.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 60) {
    if (dx < 0) nextPage(); else prevPage();
  }
}, { passive: true });

// ── KEYBOARD (guarded via nextPage) ──
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft') prevPage();
});

updateIndicator();
