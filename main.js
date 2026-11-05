import { gsap } from "gsap";

const emailAddress = "hey@ankit.dev";

const projectDetails = {
  "ak-media": {
    title: "AK Media",
    category: "Website · Motion",
    overview: "A digital home for AK Media India, shaped around its creator-marketing offer and campaign paths.",
    role: "Visual direction, motion, and frontend",
    builtWith: "GSAP · ScrollTrigger · Video",
    brief: "Help brands understand the offer and find a clear path to start a campaign.",
    approach: "A direct introduction, a prominent reel, and a page structure that gives the work room to speak."
  },
  "nexora-ai": {
    title: "Nexora",
    category: "AI · Website",
    overview: "An AI agency concept with a distinct visual identity and clear routes into its services.",
    role: "Frontend, visual system, and AI experience exploration",
    builtWith: "React · Vite · AI workflows",
    brief: "Make an AI automation agency easier to understand and explore.",
    approach: "A confident visual language, service-led sections, and space to demonstrate agent workflows.",
    live: "https://nexora-ankit.netlify.app/",
    relatedLive: "https://nexora-ankit.lovable.app/"
  },
  "ai-brain": {
    title: "AI Brain",
    category: "AI · Product exploration",
    overview: "A knowledge workspace concept for turning videos, articles, and PDFs into summaries and searchable notes.",
    role: "Product exploration and interface development",
    builtWith: "AI tools · Research · Interface design",
    brief: "Help people turn long-form material into notes they can revisit.",
    approach: "Bring source material, summaries, and follow-up questions together in one approachable workspace."
  },
  "portfolio-lab": {
    title: "Portfolio Lab",
    category: "Personal experiment · Creative engineering",
    overview: "An earlier portfolio experiment exploring canvas visuals, spring motion, and interactive details.",
    role: "Independent project",
    builtWith: "GSAP · Canvas · JavaScript",
    brief: "Explore how custom motion can make a personal portfolio feel more alive.",
    approach: "Treat interaction as part of the visual identity and use motion to make the page feel responsive."
  }
};

const previewMedia = {
  "ak-media": {
    title: "AK Media — project preview",
    src: "./assets/work_ak_media.mp4",
    poster: "./assets/posters/ak-media.jpg"
  },
  "nexora-ai": {
    title: "Nexora — project preview",
    src: "./assets/work_nexora_ai.mp4",
    poster: "./assets/posters/nexora-ai.jpg"
  },
  "ai-brain": {
    title: "AI Brain — project preview",
    src: "./assets/work_ai_brain.mp4",
    poster: "./assets/posters/ai-brain.jpg"
  },
  "portfolio-lab": {
    title: "Portfolio Lab — project preview",
    src: "./assets/work_ankit_portfolio.mp4",
    poster: "./assets/posters/portfolio-lab.jpg"
  }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  gsap.fromTo(
    ".hero-copy > *",
    { y: 18, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.08, ease: "power3.out", delay: 0.08 }
  );
  gsap.fromTo(
    ".portrait-stage",
    { y: 20, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out", delay: 0.2 }
  );
}

const revealItems = document.querySelectorAll(".reveal");

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -7% 0px", threshold: 0.08 }
  );

  revealItems.forEach((element) => {
    element.classList.add("is-ready");
    revealObserver.observe(element);
  });
}

const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const filterStatus = document.getElementById("filter-status");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    let visibleCount = 0;
    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const visible = filter === "all" || categories.includes(filter);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (filterStatus) {
      filterStatus.textContent = "Showing " + visibleCount + (visibleCount === 1 ? " project" : " projects");
    }
  });
});

const caseDialog = document.getElementById("case-study-dialog");
const caseTitle = document.getElementById("case-study-title");
const caseCategory = document.getElementById("case-study-category");
const caseOverview = document.getElementById("case-study-overview");
const caseFacts = document.getElementById("case-study-facts");
const caseSections = document.getElementById("case-study-sections");

function addCaseFact(container, heading, value) {
  const fact = document.createElement("div");
  fact.className = "case-fact";

  const title = document.createElement("h3");
  title.textContent = heading;

  const content = document.createElement("p");
  content.textContent = value;

  fact.append(title, content);
  container.append(fact);
}

function addCaseSection(container, heading, value) {
  const section = document.createElement("section");
  section.className = "case-section";

  const title = document.createElement("h3");
  title.textContent = heading;

  const content = document.createElement("p");
  content.textContent = value;

  section.append(title, content);
  container.append(section);
}

function openCaseStudy(projectId) {
  const project = projectDetails[projectId];
  if (!project || !caseDialog) return;

  caseTitle.textContent = project.title;
  caseCategory.textContent = project.category;
  caseOverview.textContent = project.overview;
  caseFacts.replaceChildren();
  caseSections.replaceChildren();

  addCaseFact(caseFacts, "Role", project.role);
  addCaseFact(caseFacts, "Built with", project.builtWith);
  addCaseSection(caseSections, "The brief", project.brief);
  addCaseSection(caseSections, "The approach", project.approach);

  if (project.live) {
    const link = document.createElement("a");
    link.className = "case-live-link";
    link.href = project.live;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View the live project ↗";
    caseSections.append(link);
  }

  if (project.relatedLive) {
    const link = document.createElement("a");
    link.className = "case-live-link";
    link.href = project.relatedLive;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Explore Nexora 2.0 ↗";
    caseSections.append(link);
  }

  caseDialog.showModal();
}

const videoDialog = document.getElementById("video-dialog");
const projectPlayer = document.getElementById("project-player");
const videoDialogTitle = document.getElementById("video-dialog-title");

function openPreview(projectId) {
  const media = previewMedia[projectId];
  if (!media || !videoDialog || !projectPlayer) return;

  videoDialogTitle.textContent = media.title;
  projectPlayer.poster = media.poster;
  projectPlayer.src = media.src;
  videoDialog.showModal();

  const playRequest = projectPlayer.play();
  if (playRequest && typeof playRequest.catch === "function") {
    playRequest.catch(() => {});
  }
}

document.addEventListener("click", (event) => {
  const caseButton = event.target.closest("[data-case-study]");
  if (caseButton) {
    openCaseStudy(caseButton.dataset.caseStudy);
    return;
  }

  const previewButton = event.target.closest("[data-preview]");
  if (previewButton) {
    openPreview(previewButton.dataset.preview);
  }
});

if (videoDialog && projectPlayer) {
  videoDialog.addEventListener("close", () => {
    projectPlayer.pause();
    projectPlayer.removeAttribute("src");
    projectPlayer.load();
  });
}

const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

function setMobileNav(open, restoreFocus = false) {
  if (!menuToggle || !mobileNav) return;

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.querySelector("span").textContent = open ? "Close" : "Menu";
  mobileNav.hidden = !open;

  if (open) {
    mobileNav.querySelector("a")?.focus();
  } else if (restoreFocus) {
    menuToggle.focus();
  }
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    setMobileNav(open);
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMobileNav(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMobileNav(false, true);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      menuToggle.getAttribute("aria-expanded") === "true" &&
      !mobileNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMobileNav(false);
    }
  });
}

const copyButton = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");

if (copyButton && copyStatus) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      copyStatus.textContent = "Email address copied.";
    } catch {
      copyStatus.textContent = "Copy unavailable. You can email hey@ankit.dev directly.";
    }
  });
}

const currentYear = document.getElementById("current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
