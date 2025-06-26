// SPLASH SCREEN LOGIC
const splash = document.getElementById('splash-screen');
const main = document.querySelector('main');

function hideSplash() {
  splash.style.opacity = '0';
  setTimeout(() => {
    splash.style.display = 'none';
    main.style.display = 'block';
    handleScrollSlides(); // <-- Add this line!
  }, 800);
}

// SLIDE FADE-IN/OUT ON SCROLL
function handleScrollSlides() {
  const slides = document.querySelectorAll('.section-slide');
  const scrollY = window.scrollY;
  const windowH = window.innerHeight;
  slides.forEach((slide) => {
    const slideTop = slide.offsetTop;
    const slideH = slide.offsetHeight;
    if (scrollY + windowH/2 >= slideTop && scrollY + windowH/2 < slideTop + slideH) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', handleScrollSlides);
window.addEventListener('DOMContentLoaded', handleScrollSlides);

// THEME TOGGLE
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  themeToggle.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌓';
});

// Splash loading messages
const loadingLine = document.getElementById('loading-line');

// Create a container for finished lines
let finishedContainer = document.getElementById('finished-lines');
if (!finishedContainer) {
  finishedContainer = document.createElement('div');
  finishedContainer.id = 'finished-lines';
  finishedContainer.style.marginTop = '18px';
  finishedContainer.style.fontFamily = "'Courier New', Courier, monospace";
  finishedContainer.style.fontSize = '0.85rem';
  finishedContainer.style.color = '#00ff99';
  finishedContainer.style.textAlign = 'center';
  loadingLine.parentNode.appendChild(finishedContainer);
}

const loadingMessages = [
  'Activating core telemetry',
  'Loading Resume Module',
  'Establishing Secure Connection',
  'Loading UI components',
  'Encrypting transmission'
];
let msgIndex = 0;
let dotCount = 0;
let currentMessage = '';

function showFinishedLine(msg) {
  const div = document.createElement('div');
  div.textContent = `✔ Finished: ${msg}`;
  div.style.opacity = 0;
  finishedContainer.appendChild(div);
  setTimeout(() => {
    div.style.transition = 'opacity 0.5s';
    div.style.opacity = 1;
  }, 50);
}

const startLoadingSequence = () => {
  currentMessage = loadingMessages[msgIndex];
  let baseText = `Currently loading: ${currentMessage}`;
  loadingLine.textContent = baseText;
  dotCount = 0;

  const dotInterval = setInterval(() => {
    if (dotCount < 6) {
      loadingLine.textContent = baseText + '.'.repeat(dotCount + 1);
      dotCount++;
    } else {
      clearInterval(dotInterval);
      showFinishedLine(currentMessage);
      setTimeout(() => {
        msgIndex++;
        if (msgIndex < loadingMessages.length) {
          startLoadingSequence();
        } else {
          // All components loaded, now hide splash
          setTimeout(hideSplash, 600);
        }
      }, 200);
    }
  }, 80);
};
setTimeout(startLoadingSequence, 0);
