import { scroll } from "motion";

const story = document.querySelector("#about .about-content");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (story && !reducedMotion.matches) {
  const words = [];

  for (const element of story.querySelectorAll("h2, p")) {
    for (const node of [...element.childNodes]) {
      if (node.nodeType !== Node.TEXT_NODE) continue;

      const fragment = document.createDocumentFragment();
      for (const part of node.textContent.match(/\s+|\S+/g) ?? []) {
        if (!part.trim()) {
          fragment.append(part);
          continue;
        }
        const word = document.createElement("span");
        word.className = "about-word";
        word.textContent = part;
        words.push(word);
        fragment.append(word);
      }
      node.replaceWith(fragment);
    }
  }

  let revealed = 0;
  scroll(() => {
    const { top, height } = story.getBoundingClientRect();
    const viewportHeight = document.documentElement.clientHeight;
    const progress = Math.min(1, Math.max(0, (viewportHeight * .9 - top) / (height + viewportHeight * .22)));
    const next = Math.round(progress * words.length);
    while (revealed < next) words[revealed++].classList.add("is-read");
    while (revealed > next) words[--revealed].classList.remove("is-read");
  });
}
