const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const heartLayer = document.querySelector(".floating-hearts");
function addHeart() {
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = Math.random() > 0.45 ? "♥" : "♡";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (10 + Math.random() * 15) + "px";
  heart.style.animationDuration = (9 + Math.random() * 9) + "s";
  heartLayer.appendChild(heart);
  setTimeout(() => heart.remove(), 18000);
}
setInterval(addHeart, 1100);

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");
document.querySelectorAll(".memory img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

const wishButton = document.getElementById("wishButton");
wishButton.addEventListener("click", () => {
  document.querySelector(".cake").classList.add("blown");
  document.getElementById("wishResult").textContent = "May every beautiful thing find its way to you. Happy birthday, Sanuhhhhh. ♥";
  wishButton.textContent = "Your wish is on its way ✨";
  wishButton.disabled = true;
  for (let i = 0; i < 24; i++) {
    setTimeout(() => {
      const spark = document.createElement("span");
      spark.className = "float-heart";
      spark.textContent = ["✦", "♥", "✧"][i % 3];
      spark.style.left = (25 + Math.random() * 50) + "vw";
      spark.style.bottom = "25%";
      spark.style.animationDuration = (3 + Math.random() * 2) + "s";
      heartLayer.appendChild(spark);
      setTimeout(() => spark.remove(), 6000);
    }, i * 65);
  }
});

// Keep video playback focused: pause the other clip when one starts.
document.querySelectorAll("video").forEach(video => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video").forEach(other => {
      if (other !== video) other.pause();
    });
  });
});
// Background music starts only after the visitor taps the opening button,
// because mobile browsers block automatic audio playback.
const backgroundMusic = document.getElementById("backgroundMusic");
const musicGate = document.getElementById("musicGate");
const openSurprise = document.getElementById("openSurprise");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");

function updateMusicControl() {
  const playing = !backgroundMusic.paused;
  musicToggle.classList.toggle("playing", playing);
  musicIcon.textContent = playing ? "♫" : "♪";
  musicLabel.textContent = playing ? "Pause music" : "Play music";
}
async function startMusic() {
  try {
    await backgroundMusic.play();
  } catch (error) {
    musicLabel.textContent = "Tap to play";
  }
  updateMusicControl();
}
openSurprise.addEventListener("click", async () => {
  musicGate.classList.add("dismissed");
  await startMusic();
});
musicToggle.addEventListener("click", async () => {
  if (backgroundMusic.paused) await startMusic();
  else backgroundMusic.pause();
  updateMusicControl();
});
backgroundMusic.addEventListener("play", updateMusicControl);
backgroundMusic.addEventListener("pause", updateMusicControl);
