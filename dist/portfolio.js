const dialog = document.querySelector(".detail-dialog");
const detailContent = document.querySelector("#detail-content");

for (const button of document.querySelectorAll("[data-detail]")) {
  button.addEventListener("click", () => {
    const template = document.getElementById(button.dataset.detail);
    detailContent.replaceChildren(template.content.cloneNode(true));
    dialog.showModal();
    dialog.scrollTop = 0;
  });
}

dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;

  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom;

  if (outside) dialog.close();
});

const navLinks = [...document.querySelectorAll(".navigation a")];

function highlightNavigation() {
  const hash = location.hash === "#projects" ? "#work" : location.hash || "#home";
  for (const link of navLinks) {
    if (link.hash === hash) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}

highlightNavigation();
window.addEventListener("hashchange", highlightNavigation);

const skillTrack = document.querySelector(".skill-track");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

for (const button of document.querySelectorAll("[data-skill-scroll]")) {
  button.addEventListener("click", () => {
    const direction = Number(button.dataset.skillScroll);
    const limit = skillTrack.scrollWidth - skillTrack.clientWidth;
    const next = skillTrack.scrollLeft + direction * Math.min(skillTrack.clientWidth * .65, 220);
    const atEdge = direction > 0 ? skillTrack.scrollLeft >= limit - 1 : skillTrack.scrollLeft <= 1;
    skillTrack.scrollTo({
      left: atEdge ? (direction > 0 ? 0 : limit) : next,
      behavior: reducedMotion.matches ? "instant" : "smooth",
    });
  });
}

const steps = [...document.querySelectorAll(".step")];
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

for (const step of steps) {
  const card = step.querySelector(".step-card");

  step.addEventListener("pointermove", (event) => {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType === "touch") return;

    const bounds = step.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    card.style.setProperty("--tilt-x", `${-y * 15}deg`);
    card.style.setProperty("--tilt-y", `${x * 18}deg`);
  });

  step.addEventListener("pointerleave", () => {
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
  });

  card.addEventListener("click", () => {
    const selected = card.getAttribute("aria-pressed") === "true";
    for (const other of steps) {
      other.querySelector(".step-card").setAttribute("aria-pressed", String(other === step && !selected));
    }
  });
}

if (!reducedMotion.matches) {
  const entrances = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("entered");
      observer.unobserve(entry.target);
    }
  }, { threshold: .15 });

  for (const element of document.querySelectorAll(".work-intro > *, .project, .method-copy > *, .step, .about-copy > *, .contact-inner > *")) {
    entrances.observe(element);
  }
}
