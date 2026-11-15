const tabs = [...document.querySelectorAll("[data-plan]")];
const fields = {
  subtitles: document.querySelector("#demo-subtitles"),
  export: document.querySelector("#demo-export"),
  cost: document.querySelector("#demo-cost"),
  warning: document.querySelector("#demo-warning"),
  result: document.querySelector("#demo-result"),
};

const states = {
  free: {
    subtitles: "inclus",
    export: "1080p · offert",
    cost: "0 €",
    warning: "1 option payante est disponible dans ce projet.",
    result: "Démo : le contrôle annonce le fichier, les sous-titres et le coût avant l’export.",
  },
  pro: {
    subtitles: "inclus",
    export: "4K · option Pro",
    cost: "à confirmer",
    warning: "Option Pro repérée. Le prix doit être confirmé avant le paiement.",
    result: "Démo : l’option payante est signalée avant l’action, pas après le rendu.",
  },
};

let currentPlan = "free";

function renderPlan(plan) {
  currentPlan = plan;
  const state = states[plan];
  fields.subtitles.textContent = state.subtitles;
  fields.export.textContent = state.export;
  fields.cost.textContent = state.cost;
  fields.warning.textContent = state.warning;
  fields.result.textContent = "Cliquez pour simuler le contrôle.";
  fields.result.classList.remove("is-ready");

  tabs.forEach((tab) => {
    const selected = tab.dataset.plan === plan;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => renderPlan(tab.dataset.plan));
});

document.querySelector("#demo-check")?.addEventListener("click", () => {
  fields.result.textContent = states[currentPlan].result;
  fields.result.classList.add("is-ready");
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".topnav a")];

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.toggleAttribute("aria-current", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-30% 0px -60% 0px" },
  );
  sections.forEach((section) => observer.observe(section));
}
