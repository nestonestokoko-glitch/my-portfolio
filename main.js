// ==========================================================================
// ANKIT KUMAR - PORTFOLIO INTERACTIVE ENGINE
// Built with GSAP 3: Core, Timelines, ScrollTrigger, Flip, ScrollToPlugin, 
// QuickTo 60fps Performance, Utils, and MatchMedia
// ==========================================================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Flip } from 'gsap/Flip';

// Register Official GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip);

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ensure document scroll is 100% unlocked and clean on init
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  const initialModals = document.querySelectorAll(
    '.mobile-drawer-backdrop, .mobile-sheet-backdrop, .cmd-modal-backdrop, .video-modal-backdrop'
  );
  initialModals.forEach((el) => {
    el.classList.remove('active');
    el.classList.remove('is-active');
  });

  // ========================================================================
  // 1. SONNER-STYLE FLOATING TOAST SYSTEM
  // ========================================================================
  const toastDock = document.getElementById('toastDock');

  function showToast(title, subtitle = '', icon = '⚡', duration = 3000) {
    if (!toastDock) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <div class="toast-content">
        <strong>${title}</strong>
        ${subtitle ? `<span>${subtitle}</span>` : ''}
      </div>
    `;

    toastDock.appendChild(toast);

    if (!prefersReducedMotion) {
      gsap.fromTo(toast, 
        { y: 24, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: "back.out(1.5)" }
      );
    }

    setTimeout(() => {
      if (!prefersReducedMotion) {
        gsap.to(toast, {
          y: 12,
          opacity: 0,
          scale: 0.94,
          duration: 0.22,
          ease: "power2.in",
          onComplete: () => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
          }
        });
      } else {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }
    }, duration);
  }

  window.showToast = showToast;

  // ========================================================================
  // 2. LIVE PATNA, INDIA (IST) LOCAL TIME CLOCK
  // ========================================================================
  const liveClockEl = document.getElementById('liveIstClock');

  function updatePatnaTime() {
    if (!liveClockEl) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
    liveClockEl.textContent = `${timeStr} IST (Patna)`;
  }

  updatePatnaTime();
  setInterval(updatePatnaTime, 1000);

  // ========================================================================
  // 3. ANKIT-OS TERMINAL CONSOLE ENGINE
  // ========================================================================
  const consoleOutput = document.getElementById('consoleOutput');
  const chipButtons = document.querySelectorAll('.console-chip-btn');

  const commandResponses = {
    whoami: "Ankit Kumar: 16-year-old student builder, web developer & AI explorer from Shishwachak, Punpun, Patna, Bihar, India. Crafting fast, delightful web apps that feel alive.",
    skills: "Production Stack: JavaScript (ESNext), TypeScript, React 19, Next.js, GSAP 3.15 Suite (ScrollTrigger, Flip, quickTo, Timelines), Vite, Convex, Tailwind CSS, Node.js, WCAG AAA.",
    works: "Selected projects: Flow Party Platform (creative web & motion), Sync Productivity Suite (bento timeline), PromptCraft AI Agent Studio, and Catalis Web Desktop OS.",
    convex: "📦 Realtime Backend Component: convex/components/messages (v1.0.0)\n├── Isolated schema table: 'messages' with index ('by_public')\n├── App contract: app.use(messages) in convex/convex.config.ts\n└── Reactive queries & mutations with live sync.",
    status: "🟢 Available for high-impact summer contracts, creative dev internships & ambitious freelance projects worldwide.",
    quote: '"The best way to predict the future is to invent it: pixel by pixel, millisecond by millisecond."',
    contact: "Primary: hey@ankit.dev | Alternate: hey@sync.com | Location: Patna, Bihar (IST)"
  };

  chipButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (!cmd || !consoleOutput) return;

      const responseText = commandResponses[cmd] || "Command executed successfully.";

      consoleOutput.innerHTML = `
        <div style="color: var(--blue2); margin-bottom: 4px;">&gt; executing: <strong style="color: #ffffff;">${cmd}</strong></div>
        <div style="color: var(--text); line-height: 1.55;">${responseText}</div>
      `;

      if (cmd === 'contact') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('hey@ankit.dev');
          showToast('Email Copied! ✉️', 'hey@ankit.dev copied to clipboard');
        }
      } else {
        showToast(`Executed: ${cmd}`, 'Console output updated', '💻');
      }

      if (!prefersReducedMotion) {
        gsap.fromTo(consoleOutput, 
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
        );
      }
    });
  });

  // ========================================================================
  // 3.1 STRUCTURED TYPOGRAPHY BLOCK (p#st)
  // ========================================================================
  const stEl = document.getElementById('st');
  const bioTextEl = document.getElementById('aboutBioText');

  if (stEl) {
    // Desktop hover wave ripple across words
    stEl.addEventListener('pointerenter', () => {
      gsap.to("#st .st-word", {
        y: -6,
        color: "#ffffff",
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.02,
          from: "start"
        },
        ease: "power1.out"
      });
    });

    // Touch / Pointerdown trigger for instant tactile word wave reveal
    const triggerStWave = (e) => {
      gsap.fromTo("#st .st-word", 
        { y: 16, opacity: 0.3, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.03, ease: "back.out(2)" }
      );
      if ('vibrate' in navigator) {
        try { navigator.vibrate(10); } catch (_) {}
      }
      showToast('Structured Typography ⚡', 'Turning complex ideas into tactile experiences', '✨');
    };
    stEl.addEventListener('pointerdown', triggerStWave);
  }

  if (bioTextEl) {
    bioTextEl.addEventListener('pointerdown', () => {
      gsap.fromTo("#aboutBioText .st-word",
        { y: 10, opacity: 0.4 },
        { y: 0, opacity: 1, duration: 0.38, stagger: 0.008, ease: "back.out(1.5)" }
      );
      if ('vibrate' in navigator) {
        try { navigator.vibrate(6); } catch (_) {}
      }
    });
  }

  // ========================================================================
  // 4. GSAP TIMELINES & SCROLLTRIGGER ORCHESTRATION
  // ========================================================================
  // ========================================================================
  // 4. GSAP TIMELINES & SCROLLTRIGGER ORCHESTRATION
  // Built for silky 60fps performance on mobile, tablet, and desktop.
  // Animations trigger reliably as each element enters view on scroll.
  // ========================================================================

  // A. Top Scroll Progress Indicator (ScrollTrigger Scrub)
  const progressBar = document.getElementById('scrollProgressBar');
  if (progressBar) {
    gsap.to(progressBar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15
      }
    });
  }

  // B. Hero Entrance Choreographed Timeline (gsap.timeline)
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .fromTo(".site-header", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
    .fromTo(".hero-pill", 
      { y: 20, scale: 0.9, opacity: 0 }, 
      { y: 0, scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.8)" }, 
      "-=0.25"
    )
    .fromTo(".hero-title .st-word", 
      { y: 26, opacity: 0, scale: 0.92, rotateX: 20 }, 
      { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.65, stagger: 0.045, ease: "back.out(1.8)" }, 
      "-=0.35"
    )
    .fromTo(".hero-description", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 
      "-=0.35"
    )
    .fromTo(".hero-actions .btn-primary, .hero-actions .btn-secondary", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }, 
      "-=0.25"
    )
    .fromTo(".hero-console-shell", 
      { y: 35, scale: 0.96, opacity: 0 }, 
      { y: 0, scale: 1, opacity: 1, duration: 0.85, ease: "power3.out" }, 
      "-=0.45"
    )
    .fromTo(".console-chip-btn", 
      { scale: 0.85, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.35, stagger: 0.04, ease: "back.out(1.4)" }, 
      "-=0.3"
    );

  // C. Section Headers Staggered Reveal with Structured Typography Word Spring Animation
  gsap.utils.toArray(".section-head").forEach((head) => {
    const pill = head.querySelector('.section-pill');
    const titleWords = head.querySelectorAll('.st-word');
    const subtext = head.querySelector('.section-subtext');

    const headTl = gsap.timeline({
      scrollTrigger: {
        trigger: head,
        start: "top 86%",
        toggleActions: "play none none none",
        once: true
      }
    });

    if (pill) {
      headTl.fromTo(pill, 
        { y: 14, opacity: 0, scale: 0.94 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }
      );
    }

    if (titleWords.length > 0) {
      headTl.fromTo(titleWords,
        { y: 26, opacity: 0, scale: 0.92, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.65,
          stagger: 0.045,
          ease: "back.out(1.8)"
        },
        pill ? "-=0.25" : 0
      );
    } else {
      const title = head.querySelector('.section-title');
      if (title) {
        headTl.fromTo(title, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, pill ? "-=0.25" : 0);
      }
    }

    if (subtext) {
      headTl.fromTo(subtext,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
        "-=0.3"
      );
    }
  });

  // Contact Section Title Animation
  gsap.fromTo(".contact-title .st-word",
    { y: 26, opacity: 0, scale: 0.92, rotateX: 20 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      duration: 0.65,
      stagger: 0.045,
      ease: "back.out(1.8)",
      scrollTrigger: {
        trigger: ".contact-title",
        start: "top 86%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  // D. Who I Am Section (#about) Elements
  // Decoupled so each element triggers right when the user scrolls it into view

  // D1. Portrait Card Entrance
  gsap.fromTo("#aboutPortraitCard", 
    { x: -35, opacity: 0, scale: 0.95 },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#aboutPortraitCard",
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  gsap.to(".about-portrait-halo", {
    scale: 1.15,
    opacity: 0.85,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // D2. Eyebrow Tag
  gsap.fromTo(".about-eyebrow-tag", 
    { y: 16, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-eyebrow-tag",
        start: "top 88%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  // D3. Structured Typography Block (p#st)
  // Triggers right when the headline enters view so the user clearly sees each word animate
  gsap.fromTo("#st .st-word", 
    { y: 26, opacity: 0, scale: 0.92, rotateX: 20 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      duration: 0.65,
      stagger: 0.04,
      ease: "back.out(1.8)",
      scrollTrigger: {
        trigger: "#st",
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  // D4. Bio Paragraphs (#aboutBioText)
  // Triggers right when the bio text enters view with a smooth wave across words
  gsap.fromTo("#aboutBioText .st-word", 
    { y: 16, opacity: 0, scale: 0.95 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.42,
      stagger: 0.012,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#aboutBioText",
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  // D5. Highlights Grid (.about-highlight-box & Catalis Stat Counter)
  gsap.fromTo(".about-highlight-box",
    { y: 22, opacity: 0, scale: 0.92 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.55,
      stagger: 0.1,
      ease: "back.out(1.8)",
      scrollTrigger: {
        trigger: ".about-highlights-grid",
        start: "top 86%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  // Catalis Animated Stat Numbers Counter
  gsap.utils.toArray(".stat-number").forEach((node) => {
    const target = Number(node.dataset.value || 0);
    const suffix = node.dataset.suffix || "";
    const prefix = node.dataset.prefix || "";
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: node,
        start: "top 88%",
        once: true
      },
      onUpdate: () => {
        node.innerHTML = prefix + Math.round(counter.value).toLocaleString() + (suffix ? `<small>${suffix}</small>` : "");
      }
    });
  });

  // Catalis Image Reveal Parallax Zoom
  gsap.utils.toArray(".image-reveal img").forEach((image) => {
    gsap.fromTo(image, 
      { scale: 1.14 }, 
      {
        scale: 1, 
        duration: 1.25, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: image,
          start: "top 90%",
          once: true
        }
      }
    );
  });

  // D6. Tags and Actions Row
  gsap.fromTo(".about-tag", 
    { y: 12, opacity: 0, scale: 0.95 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.35,
      stagger: 0.025,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-tags-row",
        start: "top 88%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  gsap.fromTo(".about-actions-row", 
    { y: 16, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-actions-row",
        start: "top 90%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  // E. Selected Works Cards (.project-card)
  // Fluid entrance when scroll reaches each card; stays visible
  const projCardsList = gsap.utils.toArray('.project-card');
  projCardsList.forEach((card, idx) => {
    gsap.fromTo(card,
      { opacity: 0, y: 45, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        delay: (idx % 2) * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  });

  // F. Dark Glass Bento Grid Cards (.bento-card)
  // Performs as user scrolls into each card; stays visible
  const bentoCardsList = gsap.utils.toArray('.bento-card');
  bentoCardsList.forEach((card, idx) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: (idx % 3) * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  });

  // Multi-Axis Ambient Floating (Catalis Hero Orb Physics)
  gsap.to(".glowing-orb", {
    y: -14,
    x: 7,
    rotation: 3.5,
    duration: 3.6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: {
      amount: 1.2,
      from: "random"
    }
  });

  // G. Technical Skills Arsenal (.skills-col & .skill-item-card)
  const skillsCols = gsap.utils.toArray('.skills-col');
  skillsCols.forEach((col, idx) => {
    gsap.fromTo(col,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: idx * 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: col,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );
  });

  gsap.fromTo(".skill-item-card",
    { opacity: 0, x: -14 },
    {
      opacity: 1,
      x: 0,
      duration: 0.45,
      stagger: 0.03,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills-panel",
        start: "top 82%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  // H. Timeline Experience (Hyperiux Vault Desktop Scrub & Mobile Native Swipeable Carousel)
  const journeyTimeline = document.getElementById('journeyTimeline') || document.getElementById('journey');
  const journeySlider = document.getElementById('journeySlider');
  const journeyActiveLine = document.getElementById('journeyActiveLine');

  const journeyMm = gsap.matchMedia();

  // Desktop (min-width: 769px) - Hyperiux Vault Pinned Horizontal Scrub
  journeyMm.add("(min-width: 769px)", () => {
    if (!journeyTimeline || !journeySlider) return;

    const nodeItems = [
      { id: "2024-march", pos: 0.08, isTop: true },
      { id: "2024-october", pos: 0.22, isTop: false },
      { id: "2025-january", pos: 0.36, isTop: true },
      { id: "2025-april", pos: 0.50, isTop: false },
      { id: "2025-august", pos: 0.65, isTop: true },
      { id: "2026-february", pos: 0.78, isTop: true },
      { id: "2026-present", pos: 0.90, isTop: false }
    ];

    if (prefersReducedMotion) {
      if (journeyActiveLine) gsap.set(journeyActiveLine, { width: "98%" });
      nodeItems.forEach((item) => {
        const stem = document.querySelector(`.jl-${item.id}`);
        const dot = document.querySelector(`.jd-${item.id}`);
        const title = document.querySelector(`.title-${item.id}`);
        const desc = document.querySelector(`.description-${item.id}`);
        if (stem) gsap.set(stem, { scaleY: 1 });
        if (dot) gsap.set(dot, { scale: 1 });
        if (title) gsap.set(title, { opacity: 1, y: 0 });
        if (desc) gsap.set(desc, { opacity: 1, y: 0 });
      });
      return;
    }

    // Master Pinned Horizontal ScrollTrigger (DESKTOP ONLY)
    const journeyTl = gsap.timeline({
      scrollTrigger: {
        trigger: journeyTimeline,
        start: "top top",
        end: "+=240%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    // 1. Horizontal Track Translation
    journeyTl.fromTo(journeySlider,
      { xPercent: 0 },
      { xPercent: -62, ease: "none", duration: 1 },
      0
    );

    // 2. Continuous Center Axis Scrub
    if (journeyActiveLine) {
      journeyTl.fromTo(journeyActiveLine,
        { width: "0%" },
        { width: "98%", ease: "none", duration: 1 },
        0
      );
    }

    // 3. Staggered Vertical Stems, Node Dots & Copy Reveal
    nodeItems.forEach((item) => {
      const stem = document.querySelector(`.jl-${item.id}`);
      const dot = document.querySelector(`.jd-${item.id}`);
      const title = document.querySelector(`.title-${item.id}`);
      const desc = document.querySelector(`.description-${item.id}`);

      if (stem) {
        gsap.set(stem, {
          scaleY: 0,
          transformOrigin: item.isTop ? "bottom bottom" : "top top"
        });
        journeyTl.to(stem,
          { scaleY: 1, duration: 0.08, ease: "power2.out" },
          item.pos
        );
      }
      if (dot) {
        gsap.set(dot, { scale: 0 });
        journeyTl.to(dot,
          { scale: 1, duration: 0.08, ease: "back.out(2)" },
          item.pos
        );
      }
      if (title) {
        gsap.set(title, { opacity: 0, y: 16 });
        journeyTl.to(title,
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          item.pos
        );
      }
      if (desc) {
        gsap.set(desc, { opacity: 0, y: 16 });
        journeyTl.to(desc,
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          item.pos + 0.02
        );
      }
    });
  });


  // J. Contact Section Panel
  gsap.fromTo(".contact-panel",
    { opacity: 0, y: 40, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.75,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  // K. SUPERCHARGED TOUCH FACTOR & INTERACTION ENGINE
  // Instant tactile feedback on cards, buttons, badges, chips, pills, and section headings

  // Helper to spawn a soft radial touch ripple
  function createTouchRipple(container, event) {
    if (!container || !event || event.clientX === undefined) return;
    const rect = container.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'touch-ripple';
    const size = Math.max(rect.width, rect.height) * 0.9;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    container.classList.add('touch-ripple-container');
    container.appendChild(ripple);
    setTimeout(() => {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 550);
  }

  // 1. Touch & Tactile Feedback on All Cards
  const allTactileCards = document.querySelectorAll(
    '.bento-card, .project-card, .about-portrait-card, .about-highlight-box, .skills-col, .skill-item-card, .journey-node-box, .journey-hero-card, .contact-panel, .hero-console-shell'
  );

  allTactileCards.forEach((card) => {
    let startY = 0;
    card.addEventListener('pointerdown', (e) => {
      if (e.target.closest('input, textarea, button, a, label')) return;
      startY = e.clientY;

      gsap.to(card, {
        scale: 0.982,
        duration: 0.14,
        ease: "power2.out",
        overwrite: "auto"
      });

      createTouchRipple(card, e);

      if ('vibrate' in navigator) {
        try { navigator.vibrate(8); } catch (_) {}
      }
    }, { passive: true });

    const releaseCard = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.45,
        ease: "back.out(2)",
        overwrite: "auto"
      });
    };

    card.addEventListener('pointerup', releaseCard);
    card.addEventListener('pointercancel', releaseCard);
    card.addEventListener('pointerleave', releaseCard);

    // Cancel press if dragging to scroll so scrolling never feels sticky
    card.addEventListener('pointermove', (e) => {
      if (startY && Math.abs(e.clientY - startY) > 8) {
        releaseCard();
      }
    }, { passive: true });
  });

  // 2. Touch Feedback on Pills, Buttons, Chips, and Badges
  const allTouchControls = document.querySelectorAll(
    '.btn-primary, .btn-secondary, .btn-primary-small, .media-expand-btn, .watch-reel-btn, .section-pill, .hero-pill, .console-chip-btn, .about-tag, .chip-tag, .filter-tab-btn, .social-pill-btn, .nav-cta-btn, .cmd-trigger-btn'
  );

  allTouchControls.forEach((btn) => {
    let touchY = 0;
    btn.addEventListener('pointerdown', (e) => {
      touchY = e.clientY;
      gsap.to(btn, {
        scale: 0.94,
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto"
      });
      createTouchRipple(btn, e);
      if ('vibrate' in navigator) {
        try { navigator.vibrate(6); } catch (_) {}
      }
    }, { passive: true });

    const releaseBtn = () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.38,
        ease: "back.out(2.4)",
        overwrite: "auto"
      });
    };

    btn.addEventListener('pointerup', releaseBtn);
    btn.addEventListener('pointercancel', releaseBtn);
    btn.addEventListener('pointerleave', releaseBtn);
    btn.addEventListener('pointermove', (e) => {
      if (touchY && Math.abs(e.clientY - touchY) > 8) {
        releaseBtn();
      }
    }, { passive: true });
  });

  // 3. Interactive Word Wave on All Section Heading Titles (Pointerdown & Tactile Feedback)
  const allSectionHeadings = document.querySelectorAll('.section-title, .hero-title, .contact-title, #st, #aboutBioText');
  allSectionHeadings.forEach((heading) => {
    heading.addEventListener('pointerdown', (e) => {
      const words = heading.querySelectorAll('.st-word');
      if (words.length > 0) {
        gsap.fromTo(words,
          { y: -10, scale: 1.08, color: "var(--blue2)" },
          {
            y: 0,
            scale: 1,
            color: "",
            duration: 0.42,
            stagger: 0.025,
            ease: "back.out(2)",
            overwrite: "auto"
          }
        );
      }
      if ('vibrate' in navigator) {
        try { navigator.vibrate(8); } catch (_) {}
      }
    }, { passive: true });

    // Desktop hover ripple across words
    heading.addEventListener('pointerenter', () => {
      const words = heading.querySelectorAll('.st-word');
      if (words.length > 0) {
        gsap.to(words, {
          y: -4,
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          stagger: 0.02,
          ease: "power1.out"
        });
      }
    });
  });

  // L. Recalculate ScrollTrigger markers on window load and after layout settle
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
  setTimeout(() => ScrollTrigger.refresh(), 350);
  setTimeout(() => ScrollTrigger.refresh(), 1000);

  // ========================================================================
  // 5. GSAP FLIP PLUGIN: PROJECT FILTERING WITH SMOOTH MORPH
  // ========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter') || 'all';

      if (!prefersReducedMotion) {
        // Record initial state for FLIP
        const state = Flip.getState(projectCards);

        // Update DOM display classes with multi-category token matching
        projectCards.forEach((card) => {
          const categoryStr = card.getAttribute('data-category') || '';
          const categories = categoryStr.split(/\s+/);
          const shouldShow = filterValue === 'all' || categories.includes(filterValue);
          card.classList.toggle('is-hidden', !shouldShow);
        });

        // Execute smooth FLIP transition
        Flip.from(state, {
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.04,
          absolute: true,
          onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.35 }),
          onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.92, duration: 0.2 }),
          onComplete: () => ScrollTrigger.refresh()
        });
      } else {
        // Reduced motion fallback
        projectCards.forEach((card) => {
          const categoryStr = card.getAttribute('data-category') || '';
          const categories = categoryStr.split(/\s+/);
          const shouldShow = filterValue === 'all' || categories.includes(filterValue);
          card.classList.toggle('is-hidden', !shouldShow);
        });
        ScrollTrigger.refresh();
      }

      showToast(`Filter: ${tab.textContent.trim()}`, `Displaying matching projects`, '📂');
    });
  });

  // ========================================================================
  // 5B. CINEMATIC VIDEO REEL LIGHTBOX MODAL & VIEWPORT AUTOPLAY
  // ========================================================================
  const videoModal = document.getElementById('videoModal');
  const modalVideoPlayer = document.getElementById('modalVideoPlayer');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const closeVideoModalBtn = document.getElementById('closeVideoModal');
  const watchReelButtons = document.querySelectorAll('.watch-reel-btn');

  // Smart Viewport Video Playback: Only plays videos currently in viewport for 60fps
  const projectVideos = document.querySelectorAll('.project-media-video');
  if ('IntersectionObserver' in window && projectVideos.length > 0) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    }, { threshold: 0.15 });

    projectVideos.forEach((vid) => videoObserver.observe(vid));
  }

  const openVideoModal = (src, title) => {
    if (!videoModal || !modalVideoPlayer) return;
    modalVideoPlayer.src = src;
    if (videoModalTitle) videoModalTitle.textContent = title || 'Project Video Reel';
    videoModal.classList.add('is-active');
    videoModal.setAttribute('aria-hidden', 'false');
    modalVideoPlayer.currentTime = 0;
    modalVideoPlayer.play().catch(() => {});
    showToast('Video Reel 🎬', title || 'Playing full project reel', '▶️');
  };

  const closeVideoModal = () => {
    if (!videoModal || !modalVideoPlayer) return;
    videoModal.classList.remove('is-active');
    videoModal.setAttribute('aria-hidden', 'true');
    modalVideoPlayer.pause();
    modalVideoPlayer.removeAttribute('src');
    modalVideoPlayer.load();
  };

  watchReelButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const videoSrc = btn.getAttribute('data-video-src');
      const title = btn.getAttribute('data-title');
      if (videoSrc) {
        openVideoModal(videoSrc, title);
      }
    });
  });

  if (closeVideoModalBtn) {
    closeVideoModalBtn.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('is-active')) {
      closeVideoModal();
    }
  });

  // ========================================================================
  // 6. GSAP-PERFORMANCE: 60 FPS MAGNETIC BUTTONS (gsap.quickTo)
  // ========================================================================
  const mm = gsap.matchMedia();
  mm.add("(min-width: 769px)", () => {
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta-btn, .cmd-trigger-btn, .aurora-btn, .social-pill-btn');

    magneticButtons.forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power2.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power2.out" });

      btn.addEventListener('pointermove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Bounded magnetic pull with gsap.utils.clamp
        const pullX = gsap.utils.clamp(-10, 10, distanceX * 0.28);
        const pullY = gsap.utils.clamp(-10, 10, distanceY * 0.28);

        xTo(pullX);
        yTo(pullY);
      });

      btn.addEventListener('pointerleave', () => {
        xTo(0);
        yTo(0);
      });
    });

    // ----------------------------------------------------------------------
    // 7. GSAP-PERFORMANCE: 3D CARD TILT WITH gsap.quickTo()
    // ----------------------------------------------------------------------
    const tiltableCards = document.querySelectorAll('.bento-card, .project-card');

    tiltableCards.forEach((card) => {
      const rotXTo = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power2.out" });
      const rotYTo = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power2.out" });
      const scaleTo = gsap.quickTo(card, "scale", { duration: 0.4, ease: "power2.out" });

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Map offset to rotation angles
        const rotX = gsap.utils.mapRange(-rect.height / 2, rect.height / 2, 6, -6, y);
        const rotY = gsap.utils.mapRange(-rect.width / 2, rect.width / 2, -6, 6, x);

        rotXTo(rotX);
        rotYTo(rotY);
        scaleTo(1.015);
      });

      card.addEventListener('pointerleave', () => {
        rotXTo(0);
        rotYTo(0);
        scaleTo(1);
      });
    });

    // 3D Tilt on Who I Am Portrait Card
    const portraitCard = document.getElementById('aboutPortraitCard');
    if (portraitCard) {
      const pRotXTo = gsap.quickTo(portraitCard, "rotationX", { duration: 0.45, ease: "power2.out" });
      const pRotYTo = gsap.quickTo(portraitCard, "rotationY", { duration: 0.45, ease: "power2.out" });
      const pScaleTo = gsap.quickTo(portraitCard, "scale", { duration: 0.45, ease: "power2.out" });

      portraitCard.addEventListener('pointermove', (e) => {
        const rect = portraitCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotX = gsap.utils.mapRange(-rect.height / 2, rect.height / 2, 6.5, -6.5, y);
        const rotY = gsap.utils.mapRange(-rect.width / 2, rect.width / 2, -6.5, 6.5, x);

        pRotXTo(rotX);
        pRotYTo(rotY);
        pScaleTo(1.02);
      });

      portraitCard.addEventListener('pointerleave', () => {
        pRotXTo(0);
        pRotYTo(0);
        pScaleTo(1);
      });
    }
  });

  // Interactive Tags in Who I Am section
  const aboutTags = document.querySelectorAll('.about-tag');
  aboutTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      showToast(`Skill Highlight: ${tag.textContent.trim()}`, 'Crafted by Ankit Kumar', '⚡');
      if (!prefersReducedMotion) {
        gsap.fromTo(tag, { scale: 0.88 }, { scale: 1, duration: 0.25, ease: "back.out(2)" });
      }
    });
  });

  // ========================================================================
  // 8. GSAP SCROLLTOPLUGIN: SMOOTH IN-PAGE ANCHOR NAVIGATION
  // ========================================================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        gsap.to(window, {
          duration: 0.85,
          scrollTo: {
            y: target,
            offsetY: 70
          },
          ease: "power3.inOut"
        });
      }
    });
  });

  // ========================================================================
  // 9. INTERACTIVE BENTO CARD MICRO-INTERACTIONS
  // ========================================================================
  // Like counter in Red Card
  const likeBtn = document.getElementById('likeCounterBtn');
  const likeCountSpan = document.getElementById('likeCount');
  let likes = 342;

  if (likeBtn && likeCountSpan) {
    likeBtn.addEventListener('click', () => {
      likes++;
      likeCountSpan.textContent = likes;
      showToast('Loved! ❤️', 'Thanks for supporting a 16 y/o builder', '🔥');

      if (!prefersReducedMotion) {
        gsap.fromTo(likeBtn, 
          { scale: 0.85 },
          { scale: 1, duration: 0.3, ease: "elastic.out(1.6, 0.4)" }
        );
      }
    });
  }

  // Chip tags in Spanned Bento Card
  const chipTags = document.querySelectorAll('.chip-tag');
  chipTags.forEach((chip) => {
    chip.addEventListener('click', () => {
      chipTags.forEach((c) => c.classList.remove('selected'));
      chip.classList.add('selected');
      showToast(`Skill Focus: ${chip.textContent.trim()}`, 'Ready for high-complexity builds', '🚀');

      if (!prefersReducedMotion) {
        gsap.fromTo(chip,
          { scale: 0.92 },
          { scale: 1, duration: 0.22, ease: "back.out(2)" }
        );
      }
    });
  });

  // ========================================================================
  // 10. COMMAND PALETTE (CMD + K / CTRL + K)
  // ========================================================================
  const cmdModal = document.getElementById('cmdModal');
  const cmdTriggerBtn = document.getElementById('cmdTriggerBtn');
  const cmdCloseBtn = document.getElementById('cmdCloseBtn');
  const cmdSearchInput = document.getElementById('cmdSearchInput');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function openCommandPalette() {
    if (!cmdModal) return;
    cmdModal.classList.add('active');
    if (cmdSearchInput) {
      cmdSearchInput.value = '';
      setTimeout(() => cmdSearchInput.focus(), 60);
    }
  }

  function closeCommandPalette() {
    if (!cmdModal) return;
    cmdModal.classList.remove('active');
  }

  if (cmdTriggerBtn) cmdTriggerBtn.addEventListener('click', openCommandPalette);
  if (cmdCloseBtn) cmdCloseBtn.addEventListener('click', closeCommandPalette);

  if (cmdModal) {
    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) closeCommandPalette();
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal && cmdModal.classList.contains('active')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    } else if (e.key === 'Escape' && cmdModal && cmdModal.classList.contains('active')) {
      closeCommandPalette();
    }
  });

  if (cmdSearchInput) {
    cmdSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      cmdItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }

  cmdItems.forEach((item) => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      closeCommandPalette();

      if (action === 'email') {
        if (navigator.clipboard) {
          navigator.clipboard.writeText('hey@ankit.dev');
          showToast('Copied to Clipboard! ✉️', 'hey@ankit.dev');
        }
      } else if (action === 'github') {
        window.open('https://github.com', '_blank');
      } else if (action === 'native-sheet') {
        if (typeof openMobileDrawer === 'function') openMobileDrawer();
      } else if (action && action.startsWith('#')) {
        const target = document.querySelector(action);
        if (target) {
          gsap.to(window, {
            duration: 0.85,
            scrollTo: { y: target, offsetY: 70 },
            ease: "power3.inOut"
          });
          showToast(`Jumped to: ${action.replace('#', '')}`, '', '📍');
        }
      }
    });
  });

  // ========================================================================
  // 11. CLIPBOARD COPY BUTTONS
  // ========================================================================
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast('Copied to Clipboard! ✉️', text);
        });
      } else {
        showToast('Email ready', text);
      }
    });
  });

  // ========================================================================
  // 12. CONTACT FORM SUBMISSION
  // ========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('userName')?.value || 'Friend';
      showToast(`Thank you, ${name}! 🚀`, "Your message has been sent. I'll get back to you shortly.");
      contactForm.reset();
    });
  }


  // ========================================================================
  // 14. NATIVE MOBILE BOTTOM SHEET DRAWER
  // ========================================================================
  const mobileSheetBackdrop = document.getElementById('mobileSheetBackdrop');
  const sheetCloseBtn = document.getElementById('sheetCloseBtn');

  function openMobileSheet() {
    if (!mobileSheetBackdrop) return;
    mobileSheetBackdrop.classList.add('active');
    if ('vibrate' in navigator) {
      try { navigator.vibrate(10); } catch (_) {}
    }
  }

  function closeMobileSheet() {
    if (!mobileSheetBackdrop) return;
    mobileSheetBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (sheetCloseBtn) sheetCloseBtn.addEventListener('click', closeMobileSheet);
  if (mobileSheetBackdrop) {
    mobileSheetBackdrop.addEventListener('click', (e) => {
      if (e.target === mobileSheetBackdrop) closeMobileSheet();
    });
  }

  window.openMobileDrawer = openMobileSheet;

  // ========================================================================
  // 15. MOBILE NAVIGATION DRAWER & NATIVE TOUCH FEEDBACK
  // ========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, #mobileDrawerContact');
  const btnMobileSearch = document.getElementById('btnMobileSearch');

  function openMobileNav() {
    if (!mobileDrawerBackdrop) return;
    mobileDrawerBackdrop.classList.add('active');
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.add('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
    if ('vibrate' in navigator) {
      try { navigator.vibrate(12); } catch (_) {}
    }
  }

  function closeMobileNav() {
    if (!mobileDrawerBackdrop) return;
    mobileDrawerBackdrop.classList.remove('active');
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeMobileSheet();
    }
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      if (mobileDrawerBackdrop && mobileDrawerBackdrop.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileNav);
  }

  if (mobileDrawerBackdrop) {
    mobileDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === mobileDrawerBackdrop) closeMobileNav();
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      closeMobileNav();
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: target, offsetY: 70 },
            ease: "power3.inOut"
          });
        }
      }
    });
  });

  if (btnMobileSearch) {
    btnMobileSearch.addEventListener('click', () => {
      closeMobileNav();
      openCommandPalette();
    });
  }
});
