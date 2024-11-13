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
