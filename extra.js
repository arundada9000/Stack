// code implementation in different languages
const languageSelector = document.querySelector(".language-selector");
const codeContainer = document.querySelector("#code-display");
const copyButton = document.querySelector(".language-copy-button");

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('button[data-language="c"]').click();

  if (window.innerWidth < 768) {
    document.querySelector('button[data-language="javascript"]').textContent =
      "js";
  }
});

languageSelector.addEventListener("click", (event) => {
  const selectedLanguage = event.target.dataset.language;
  codeContainer.style.display = "block";
  codeContainer.textContent = codeSnippets[selectedLanguage];

  codeContainer.classList.forEach((className) => {
    if (className.startsWith("language-")) {
      codeContainer.classList.remove(className);
    }
  });

  codeContainer.classList.add(`language-${selectedLanguage}`);
  Prism.highlightElement(codeContainer);

  codeContainer.style.animation = "none";
  codeContainer.offsetHeight;
  codeContainer.style.animation = "fadeInTopToBottom 1s forwards";
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(codeContainer.textContent);
  copyButton.textContent = "Copied!";
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 5000);
});

// Animation on scroll
const animatedElements = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-content");
      }
      //else {
      //   entry.target.classList.remove("show");
      // }
    });
  },
  {
    threshold: 0.5,
  }
);

animatedElements.forEach((element) => observer.observe(element));

// back to top
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// progress bar
window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector(".progress-bar").style.height = scrollPercent + "%";
});
