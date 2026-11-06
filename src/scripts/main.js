/**
 * SOFTLUTION! (Automation Solutions Factory S.A. de C.V.)
 * Interactive Landing Page Functionality
 */

function initAll() {
  initNavbar();
  initScrollSpy();
  initAnimatedCounters();
  initServiceTabs();
  initScadaDemo();
  initContactForms();
  initBackToTop();
  initPrivacyModal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const headerWrapper = document.getElementById('site-header-wrapper');
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.main-nav');

  // Sticky header background and topbar scroll behavior
  const handleScroll = () => {
    const isScrolled = window.scrollY > 40;
    if (headerWrapper) headerWrapper.classList.toggle('scrolled', isScrolled);
    if (header) header.classList.toggle('scrolled', isScrolled);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  const closeMenu = () => {
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.classList.remove('active');
      }
      document.body.classList.remove('nav-open');
    }
  };

  const openMenu = () => {
    if (navMenu) {
      navMenu.classList.add('open');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.classList.add('active');
      }
      document.body.classList.add('nav-open');
    }
  };

  // Mobile menu toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close mobile menu on clicking any link/button inside nav
    navMenu.querySelectorAll('a, button:not(.mobile-toggle)').forEach(item => {
      item.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && header && !header.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Reset when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991 && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -76;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

/* ==========================================================================
   2. SCROLL SPY (Visualización de Sección Activa en el Menú)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"], .nav-actions a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  function updateActiveLink() {
    let currentId = '';
    const scrollPos = window.scrollY + 140;
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 70);

    if (isAtBottom) {
      // Si el usuario llega al final de la página, activa la última sección (Contacto)
      const lastSection = sections[sections.length - 1];
      if (lastSection) currentId = lastSection.getAttribute('id');
    } else {
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentId = section.getAttribute('id');
        }
      });
    }

    // Si está al inicio, activa por defecto la primera sección
    if (!currentId && window.scrollY < 200 && sections.length > 0) {
      currentId = sections[0].getAttribute('id');
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('resize', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ==========================================================================
   3. ANIMATED METRICS COUNTERS
   ========================================================================== */
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const prefix = stat.getAttribute('data-prefix') || '';
          const suffix = stat.getAttribute('data-suffix') || '';
          const decimals = parseInt(stat.getAttribute('data-decimals') || '0', 10);
          animateValue(stat, 0, target, 2000, prefix, suffix, decimals);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) observer.observe(statsStrip);
}

function animateValue(element, start, end, duration, prefix, suffix, decimals) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = easeOutQuart(progress);
    const current = start + easeProgress * (end - start);
    
    element.innerHTML = `${prefix}${current.toFixed(decimals)}<span>${suffix}</span>`;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

/* ==========================================================================
   4. SERVICES FILTER / TABS
   ========================================================================== */
function initServiceTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn[data-category]');
  const serviceCards = document.querySelectorAll('.service-card[data-category]');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-category');

      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE SCADA SIMULATION DEMO (Caso Diversey Tlalnepantla)
   ========================================================================== */
function initScadaDemo() {
  const btnStart = document.getElementById('demo-btn-start');
  const btnPause = document.getElementById('demo-btn-pause');
  const btnReset = document.getElementById('demo-btn-reset');
  const modeSelector = document.getElementById('demo-mode-select');

  const tankMixer = document.getElementById('tank-mixer-liquid');
  const tankMixerVal = document.getElementById('tank-mixer-val');
  const tankCaustic = document.getElementById('tank-caustic-liquid');
  const tankCausticVal = document.getElementById('tank-caustic-val');
  const tankRinse = document.getElementById('tank-rinse-liquid');
  const tankRinseVal = document.getElementById('tank-rinse-val');

  const liveFlow = document.getElementById('telemetry-flow');
  const liveTemp = document.getElementById('telemetry-temp');
  const liveConduct = document.getElementById('telemetry-conduct');
  const liveBatch = document.getElementById('telemetry-batch');
  const terminal = document.getElementById('scada-log-terminal');

  let isRunning = true;
  let timerInterval = null;
  let cycle = 0;
  let batchCount = 142;

  function appendLog(msg, type = 'info') {
    if (!terminal) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const p = document.createElement('p');
    p.innerHTML = `<span class="timestamp">[${timeStr}]</span> <span class="${type}">${msg}</span>`;
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
  }

  function updateSimulation() {
    if (!isRunning) return;
    cycle++;

    // Oscillate values smoothly
    const mixerPct = Math.round(50 + 40 * Math.sin(cycle * 0.2));
    const causticPct = Math.round(65 + 20 * Math.cos(cycle * 0.15));
    const rinsePct = Math.round(75 + 15 * Math.sin(cycle * 0.1));

    if (tankMixer) {
      tankMixer.style.height = `${mixerPct}%`;
      tankMixerVal.innerText = `${mixerPct}%`;
    }
    if (tankCaustic) {
      tankCaustic.style.height = `${causticPct}%`;
      tankCausticVal.innerText = `${causticPct}%`;
    }
    if (tankRinse) {
      tankRinse.style.height = `${rinsePct}%`;
      tankRinseVal.innerText = `${rinsePct}%`;
    }

    // Telemetry updates
    const flow = (42.5 + (Math.random() * 4 - 2)).toFixed(1);
    const temp = (68.4 + (Math.random() * 1.5 - 0.75)).toFixed(1);
    const cond = (12.4 + (Math.random() * 0.8 - 0.4)).toFixed(1);

    if (liveFlow) liveFlow.innerHTML = `${flow} <small>L/min</small>`;
    if (liveTemp) liveTemp.innerHTML = `${temp} <small>°C</small>`;
    if (liveConduct) liveConduct.innerHTML = `${cond} <small>mS/cm</small>`;

    // Log messages based on cycle stages
    if (cycle % 12 === 0) {
      batchCount++;
      if (liveBatch) liveBatch.innerText = `#BAT-${batchCount}`;
      appendLog(`Lote #BAT-${batchCount} finalizado exitosamente. Transfiriendo a línea de envasado.`, 'info');
    } else if (cycle % 6 === 0) {
      appendLog(`Validación CIP: Conductividad en rango seguro (${cond} mS/cm). Ciclo de recirculación activo.`, 'info');
    } else if (cycle % 4 === 0) {
      appendLog(`PLC Allen-Bradley ControlLogix: Bomba dosificadora P-101 en línea a ${flow} L/min.`, 'info');
    }
  }

  // Start loop
  timerInterval = setInterval(updateSimulation, 1500);

  if (btnStart) {
    btnStart.addEventListener('click', () => {
      isRunning = true;
      appendLog('Simulación reanudada por operador SCADA.', 'info');
    });
  }

  if (btnPause) {
    btnPause.addEventListener('click', () => {
      isRunning = false;
      appendLog('Simulación en PAUSA por operador.', 'warn');
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      cycle = 0;
      isRunning = true;
      if (tankMixer) { tankMixer.style.height = '60%'; tankMixerVal.innerText = '60%'; }
      appendLog('Sistema reiniciado a parámetros nominales de fábrica.', 'info');
    });
  }

  if (modeSelector) {
    modeSelector.addEventListener('change', (e) => {
      appendLog(`Modo de operación cambiado a: ${e.target.value}. Parametrizando lógica en PLC...`, 'info');
    });
  }
}

/* ==========================================================================
   6. CONTACT FORM SUBMISSION & TOAST NOTIFICATION
   ========================================================================== */
function initContactForms() {
  const form = document.getElementById('form-contacto') || document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg> Enviando mensaje...
    `;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      form.reset();

      showToast(
        '¡Mensaje Enviado con Éxito!',
        'Gracias por contactarnos. Un ingeniero especialista de Softlution! se comunicará con usted a la brevedad.'
      );
    }, 1000);
  });
}

function showToast(title, message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="toast-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </div>
    <div class="toast-content">
      <strong style="display:block; font-size: 0.95rem; margin-bottom: 2px;">${title}</strong>
      <p style="font-size: 0.82rem; color: #cbd5e1; margin: 0;">${message}</p>
    </div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

/* ==========================================================================
   8. BACK TO TOP (Botón flotante para subir al inicio)
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  const handleScroll = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   9. PRIVACY NOTICE MODAL (Aviso Simplificado)
   ========================================================================== */
function initPrivacyModal() {
  const modalBackdrop = document.getElementById('privacy-modal-backdrop');
  const modal = document.getElementById('privacy-modal');
  if (!modalBackdrop || !modal) return;

  const closeBtn = document.getElementById('privacy-modal-close');
  const acceptBtn = document.getElementById('privacy-btn-accept');

  const openModal = () => {
    modalBackdrop.classList.add('show');
    document.body.classList.add('privacy-modal-open');
    modal.focus();
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('show');
    document.body.classList.remove('privacy-modal-open');
  };

  // Se muestra cada vez que se ingrese a la página web
  // (a excepción de la pantalla específica del aviso de privacidad completo)
  const isPrivacyPage = window.location.pathname.includes('/aviso-de-privacidad');
  if (!isPrivacyPage) {
    setTimeout(() => {
      openModal();
    }, 600);
  }

  // Botón Aceptar: cierra la ventana emergente
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  // Botón "X" de cierre
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  // Clic fuera del contenido modal (en el backdrop)
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Tecla Escape para cerrar
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('show')) {
      closeModal();
    }
  });

  // Permitir reabrir el aviso simplificado desde el footer
  const triggers = document.querySelectorAll('[data-open-privacy-modal]');
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      if (trigger.tagName === 'BUTTON' || trigger.classList.contains('footer-privacy-btn')) {
        e.preventDefault();
        openModal();
      }
    });
  });
}
