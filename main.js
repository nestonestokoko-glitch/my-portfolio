// ==========================================================================
// ANKIT KUMAR - MASTER PORTFOLIO INTERACTIVE SCRIPT
// Features: Apple Design Spring Physics + Emil Kowalski Animate Philosophy
// Powered by GSAP 3 + ScrollTrigger
// ==========================================================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Sonner-Style Toast Notification System
  const toastContainer = document.getElementById('toastContainer');

  function showToast(title, subtitle = '', type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    const icon = type === 'success' ? '⚡' : 'ℹ️';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <div>
        <strong style="display:block;font-size:0.9rem;color:var(--lime);">${title}</strong>
        ${subtitle ? `<span style="font-size:0.78rem;opacity:0.85;">${subtitle}</span>` : ''}
      </div>
    `;

    toastContainer.appendChild(toast);

    if (!prefersReducedMotion) {
      gsap.fromTo(toast, 
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.28, ease: "power3.out" }
      );
    } else {
      toast.classList.add('show');
    }

    setTimeout(() => {
      if (!prefersReducedMotion) {
        gsap.to(toast, {
          y: 12,
          opacity: 0,
          scale: 0.95,
          duration: 0.22,
          ease: "power2.in",
          onComplete: () => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
          }
        });
      } else {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }
    }, 3200);
  }

  // 2. Fullscreen Overlay Menu Toggle
  const menu = document.getElementById('menu');
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');

  function toggleMenu(isOpen) {
    if (!menu) return;
    if (isOpen) {
      menu.classList.add('open');
      if (!prefersReducedMotion) {
        gsap.fromTo(menu.querySelectorAll('a'), 
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.08, ease: "power3.out" }
        );
      }
    } else {
      menu.classList.remove('open');
    }
    if (openBtn) openBtn.setAttribute('aria-expanded', isOpen);
  }

  if (openBtn) openBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
  if (menu) {
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // 3. Apple-Design Spring Physics & Direct Manipulation (gsap.quickTo)
  const eyes = document.getElementById('eyes');
  const mascot = document.querySelector('.hero-mascot');
  const heroCtaBtn = document.getElementById('cta');

  // GSAP MatchMedia for clean Responsive & Reduced-Motion orchestration
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // ------------------------------------------------------------------------
    // A. HERO POSTER ENTRANCE CHOREOGRAPHY
    // ------------------------------------------------------------------------
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Letters slide up from mask (stagger 60ms)
    const letters = document.querySelectorAll('.ch');
    if (letters.length > 0) {
      heroTl.fromTo(letters, 
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.06 }
      );
    }

    // Mascot springs in with Apple momentum bounce (damping 0.8)
    if (mascot) {
      heroTl.fromTo(mascot,
        { scale: 0.85, opacity: 0, yPercent: 15 },
        { scale: 1, opacity: 1, yPercent: 0, duration: 0.75, ease: "back.out(1.5)" },
        "-=0.55"
      );
    }

    // Sticker scales and spins in
    const sticker = document.querySelector('.hero-sticker');
    if (sticker) {
      heroTl.fromTo(sticker,
        { scale: 0.8, opacity: 0, rotation: -30 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: "power2.out" },
        "-=0.45"
      );
    }

    // CTA Button & Caption rise up
    if (heroCtaBtn) {
      heroTl.fromTo(heroCtaBtn,
        { y: 24, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" },
        "-=0.35"
      );
    }

    const heroCaption = document.querySelector('.hero-caption');
    if (heroCaption) {
      heroTl.fromTo(heroCaption,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      );
    }

    // ------------------------------------------------------------------------
    // B. CONTINUOUS DIRECT MANIPULATION (Mascot Eyes & Magnetic Button)
    // ------------------------------------------------------------------------
    if (eyes && mascot) {
      const eyeX = gsap.quickTo(eyes, "x", { duration: 0.35, ease: "power2.out" });
      const eyeY = gsap.quickTo(eyes, "y", { duration: 0.35, ease: "power2.out" });

      window.addEventListener('pointermove', (e) => {
        const rect = mascot.getBoundingClientRect();
        const mascotCenterX = rect.left + rect.width / 2;
        const mascotCenterY = rect.top + rect.height / 2;

        let deltaX = ((e.clientX - mascotCenterX) / window.innerWidth) * 20;
        let deltaY = ((e.clientY - mascotCenterY) / window.innerHeight) * 20;

        deltaX = Math.max(-9, Math.min(9, deltaX));
        deltaY = Math.max(-9, Math.min(9, deltaY));

        eyeX(deltaX);
        eyeY(deltaY);
      });
    }

    // Magnetic Hero CTA Button with velocity-damping spring return
    if (heroCtaBtn) {
      const ctaX = gsap.quickTo(heroCtaBtn, "x", { duration: 0.38, ease: "power2.out" });
      const ctaY = gsap.quickTo(heroCtaBtn, "y", { duration: 0.38, ease: "power2.out" });
      const arrowIcon = heroCtaBtn.querySelector('svg');

      heroCtaBtn.addEventListener('pointermove', (e) => {
        const rect = heroCtaBtn.getBoundingClientRect();
        const offsetX = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
        const offsetY = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
        ctaX(offsetX);
        ctaY(offsetY);

        if (arrowIcon) {
          gsap.to(arrowIcon, { x: 7, duration: 0.25, ease: "power2.out", overwrite: "auto" });
        }
      });

      heroCtaBtn.addEventListener('pointerleave', () => {
        ctaX(0);
        ctaY(0);
        if (arrowIcon) {
          gsap.to(arrowIcon, { x: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        }
      });
    }

    // ------------------------------------------------------------------------
    // C. BENTO CARDS INTERACTIVE 3D SPRING TILT
    // ------------------------------------------------------------------------
    const bentoCards = document.querySelectorAll('.grid .t');
    bentoCards.forEach((card) => {
      const tiltX = gsap.quickTo(card, "rotationX", { duration: 0.45, ease: "power2.out" });
      const tiltY = gsap.quickTo(card, "rotationY", { duration: 0.45, ease: "power2.out" });
      const scaleTo = gsap.quickTo(card, "scale", { duration: 0.4, ease: "power2.out" });

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotX = -(y / rect.height) * 9;
        const rotY = (x / rect.width) * 9;

        tiltX(rotX);
        tiltY(rotY);
        scaleTo(1.015);
      });

      card.addEventListener('pointerleave', () => {
        tiltX(0);
        tiltY(0);
        scaleTo(1);
      });
    });

    // ------------------------------------------------------------------------
    // D. SCROLLTRIGGER STAGGERED ENTRANCES (Spatial Consistency & No scale(0))
    // ------------------------------------------------------------------------
    // Identity Bento Grid (7 Tiles)
    const identityCards = document.querySelectorAll('#about .grid .t');
    if (identityCards.length > 0) {
      gsap.fromTo(identityCards,
        { y: 36, opacity: 0, scale: 0.96 },
        {
          scrollTrigger: {
            trigger: '#about .grid',
            start: "top 82%",
            toggleActions: "play none none none"
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out"
        }
      );
    }

    // Capabilities / Work Grid
    const workCards = document.querySelectorAll('#work .t');
    if (workCards.length > 0) {
      gsap.fromTo(workCards,
        { y: 36, opacity: 0, scale: 0.96 },
        {
          scrollTrigger: {
            trigger: '#work',
            start: "top 82%",
            toggleActions: "play none none none"
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out"
        }
      );
    }

    // Tools 9-Grid Icon Stagger
    const toolItems = document.querySelectorAll('.tools b');
    if (toolItems.length > 0) {
      gsap.fromTo(toolItems,
        { scale: 0.9, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.tools',
            start: "top 85%",
            toggleActions: "play none none none"
          },
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.04,
          ease: "back.out(1.8)"
        }
      );
    }

    // Links Row Stagger
    const linkItems = document.querySelectorAll('.links a');
    if (linkItems.length > 0) {
      gsap.fromTo(linkItems,
        { y: 20, opacity: 0, scale: 0.97 },
        {
          scrollTrigger: {
            trigger: '.links',
            start: "top 90%",
            toggleActions: "play none none none"
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out"
        }
      );
    }
  });

  // 4. Instant Feedback On Click / Press (Kill Latency - Apple Principle 1)
  const interactiveBtns = document.querySelectorAll('.hero-cta, .pill-btn, .hero-pill-nav, .tools b, .chip');
  interactiveBtns.forEach((btn) => {
    btn.addEventListener('pointerdown', () => {
      if (!prefersReducedMotion) {
        gsap.to(btn, { scale: 0.96, duration: 0.08, ease: "power1.out" });
      }
    });

    const releaseHandler = () => {
      if (!prefersReducedMotion) {
        gsap.to(btn, { scale: 1, duration: 0.25, ease: "back.out(2)", overwrite: "auto" });
      }
    };

    btn.addEventListener('pointerup', releaseHandler);
    btn.addEventListener('pointercancel', releaseHandler);
  });

  // 5. Hero CTA WhatsApp Toast
  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', () => {
      showToast('Opening WhatsApp Community! 💬', 'Connecting to group chat...');
    });
  }

  // 6. Animated Counter (Smooth Cubic Countup with ScrollTrigger)
  function animateCounter(el) {
    const to = +el.dataset.to;
    const isDecimal = to % 1 !== 0;
    const decimals = isDecimal ? 1 : 0;
    const obj = { val: 0 };

    gsap.to(obj, {
      val: to,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = obj.val.toFixed(decimals);
      }
    });
  }

  const counters = document.querySelectorAll('.cn');
  counters.forEach((cnt) => {
    ScrollTrigger.create({
      trigger: cnt,
      start: "top 88%",
      once: true,
      onEnter: () => {
        if (!prefersReducedMotion) {
          animateCounter(cnt);
        } else {
          cnt.textContent = cnt.dataset.to;
        }
      }
    });
  });

  // 7. Multi-Layer Timeline Waveform Generator
  const clips = document.querySelectorAll('.clip');
  clips.forEach((clip) => {
    const count = +(clip.dataset.n || 20);
    for (let i = 0; i < count; i++) {
      const bar = document.createElement('i');
      bar.style.height = `${20 + Math.random() * 75}%`;
      bar.style.animationDelay = `${Math.random() * -1.1}s`;
      clip.appendChild(bar);
    }
  });

  // 8. Real-Time Coding Streak Timer
  const timerDisplay = document.getElementById('tm');
  if (timerDisplay) {
    let totalSeconds = 48 + 48 * 60;

    function pad(n) {
      return (n < 10 ? '0' : '') + n;
    }

    if (!prefersReducedMotion) {
      setInterval(() => {
        totalSeconds++;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        timerDisplay.innerHTML = `${pad(hours)}<small>h</small> ${pad(minutes)}<small>m</small> ${pad(seconds)}<small>s</small>`;
      }, 1000);
    }
  }

  // 9. Interactive Rotating Highlight on Chips
  const chips = Array.from(document.querySelectorAll('#ch .chip'));
  if (chips.length > 0 && !prefersReducedMotion) {
    let activeChipIndex = chips.findIndex((c) => c.classList.contains('on'));
    if (activeChipIndex === -1) activeChipIndex = 0;

    setInterval(() => {
      chips.forEach((c) => c.classList.remove('on'));
      activeChipIndex = (activeChipIndex + 1) % chips.length;
      chips[activeChipIndex].classList.add('on');
    }, 1400);
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('on'));
      chip.classList.add('on');
      showToast(`Skill Selected: ${chip.textContent.trim()}`, 'Ready for action!');
    });
  });

  // 10. Clipboard Copy System for Email & Links
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Copied to Clipboard! ✉️', textToCopy);
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast('Copied to Clipboard! ✉️', text);
    } catch (err) {
      showToast('Email ready', text);
    }
    document.body.removeChild(input);
  }

  // 11. Tool icons click micro-interaction
  const toolIcons = document.querySelectorAll('.tools b');
  toolIcons.forEach((tool) => {
    tool.addEventListener('click', () => {
      const toolName = tool.getAttribute('title') || 'Tool';
      showToast(`Arsenal: ${toolName}`, 'Production ready skill');
    });
  });
});
