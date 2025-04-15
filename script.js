// --------------- Menu icon ---------------

document.addEventListener("DOMContentLoaded", function () {
  Promise.all([
    fetch('header.html').then(res => res.text()),
    fetch('footer.html').then(res => res.text())
  ]).then(([headerHTML, footerHTML]) => {
    document.getElementById('header').innerHTML = headerHTML;
    document.getElementById('footer').innerHTML = footerHTML;

    // Loader
    initCursor();
    initScrollAnimations();
    initTitleMotion();
    rotateWords();
    initInteractiveShadow();
    initOurWorkTextMotion();
    initContactTitleMotion();
  });
});


// --------------- Mouse cursor ---------------

function initCursor() {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor-dot");
  document.body.appendChild(cursor);

  let scrollTimeout;
  let isScrolling = false;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
 
  window.addEventListener("scroll", () => {
    cursor.classList.add("scrolling");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      cursor.classList.remove("scrolling");
    }, 300);
  });
  
  // Hover effect
  document.addEventListener("mouseover", (e) => {
    const isInteractive = e.target.closest("a, button, .menu-toggle, label, input");
    if (isInteractive) {
      cursor.classList.add("hover");
      cursor.textContent = "➔";
    } else {
      cursor.classList.remove("hover");
      cursor.textContent = "";
    }
  });
}


// --------------- About section effect ---------------

function rotateWords() {
  const words = document.querySelectorAll('.rotating-hello .word');
  let currentIndex = 0;

  setInterval(() => {
    words[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % words.length;
    words[currentIndex].classList.add('active');
  }, 2000);
}


// --------------- Wwd + our work interactive shadow---------------

function initInteractiveShadow() {
  document.querySelectorAll('.wwd-tile, .our-work-tile').forEach(tile => {
    tile.addEventListener('mousemove', (e) => {
      const rect = tile.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const offsetX = (x - centerX) / 40;
      const offsetY = (y - centerY) / 40;

      // Dynamic shadow
      tile.style.boxShadow = `${-offsetX}px ${-offsetY}px 8px rgba(255, 153, 0, 1)`;
    });

    tile.addEventListener('mouseleave', () => {
      tile.style.boxShadow = 'none';
    });
  });
}


// --------------- Wwd section effect ---------------

function initTitleMotion() {
  const block = document.querySelector('.wwd-section');
  const title = block.querySelector('.wwd-title');

  block.addEventListener('mousemove', (e) => {
    const rect = block.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offsetX = (x - centerX) / 60;
    const offsetY = (y - centerY) / 60;

    title.style.transition = 'none';
    title.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  block.addEventListener('mouseleave', () => {
    
    title.style.transition = 'transform 0.5s ease-in-out';
    title.style.transform = 'translate(0, 0)';
  });
}


// --------------- Our Work section effect ---------------

function initOurWorkTextMotion() {
  const section = document.querySelector('.our-work-section');
  const overlays = section.querySelectorAll('.hover-overlay');

  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offsetX = (x - centerX) / 60;
    const offsetY = (y - centerY) / 60;

    overlays.forEach(overlay => {
      overlay.style.transition = 'none';
      overlay.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });

  section.addEventListener('mouseleave', () => {
    overlays.forEach(overlay => {
      overlay.style.transition = 'transform 0.5s ease-in-out';
      overlay.style.transform = 'translate(0, 0)';
    });
  });
}


// --------------- Contact section effect ---------------

function initContactTitleMotion() {
  const block = document.querySelector('.contact-section');
  const title = block.querySelector('.contact-heading');

  block.addEventListener('mousemove', (e) => {
    const rect = block.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offsetX = (x - centerX) / 60;
    const offsetY = (y - centerY) / 60;

    title.style.transition = 'none';
    title.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  block.addEventListener('mouseleave', () => {
    title.style.transition = 'transform 0.5s ease-in-out';
    title.style.transform = 'translate(0, 0)';
  });
}


// --------------- Our work button ---------------

function initOurWorkHoverEffect() {
  const tiles = document.querySelectorAll('.our-work-tile');
  let activeIndex = 5;

  function setActive(index) {
    tiles.forEach((tile, i) => {
      tile.classList.toggle('active', i === index);
    });
  }

  setActive(activeIndex);

  tiles.forEach((tile, index) => {
    tile.addEventListener('mouseenter', () => setActive(index));
    tile.addEventListener('mouseleave', () => setActive(activeIndex));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initOurWorkHoverEffect();
});


// --------------- Nav ---------------

function openNav() {
  document.getElementById("sidePanel").classList.add("open");
  document.getElementById("sideOverlay").classList.add("show");
}

function closeNav() {
  document.getElementById("sidePanel").classList.remove("open");
  document.getElementById("sideOverlay").classList.remove("show");
}

// Close nav with click outside
document.addEventListener("click", function (e) {
  const panel = document.getElementById("sidePanel");
  const overlay = document.getElementById("sideOverlay");
  const toggle = document.querySelector(".menu-toggle");

  if (
    panel.classList.contains("open") &&
    !panel.contains(e.target) &&
    !toggle.contains(e.target)
  ) {
    closeNav();
  }
});


// --------------- Fade in effect ---------------

function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.2
  });

  elements.forEach(el => observer.observe(el));
}