import './index.css';

// Project Meta Definitions (100% Client Data Compliant)
interface CaseStudy {
  challenge: string;
  action: string;
  metrics: { label: string; value: string }[];
  architecture: string[];
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  finstream: {
    challenge: "Building a unified low-latency data pipeline and rendering high-performance financial charts that update multiple times per second under critical thread loads.",
    action: "Configured optimized visual streams using clean vector layers and smart caching with D3 engine to throttle active frame updates under 16ms overhead.",
    architecture: ["React Sparklines", "D3 Canvas", "WebSocket Streams", "Web Workers"],
    metrics: [
      { label: "Uptime SLA", value: "99.9%" },
      { label: "Render Overhead", value: "<16ms" },
      { label: "Concurrent Metrics", value: "50k" }
    ]
  },
  luxecommerce: {
    challenge: "Ensuring smooth mobile interactions and maintaining low memory footprints during rich 3D model renderings and high-resolution image scrolls.",
    action: "Utilized heavy GPU acceleration layers combined with custom rendering hooks to streamline state persistence and keep memory leaks near zero.",
    architecture: ["React Native GPU", "Mobile Redux Engines", "SVG Vectors", "Expo Ecosystem"],
    metrics: [
      { label: "App Store Rating", value: "4.9★" },
      { label: "Average Latency", value: "120ms" },
      { label: "Downloads Volume", value: "200k" }
    ]
  },
  cloudpulse: {
    challenge: "Aggregating telemetry logs from thousands of Kubernetes nodes simultaneously without introducing container runtime spikes or bandwidth congestion.",
    action: "Designed dual-pipeline compression nodes to aggregate logs locally, and executed lightweight background threads for immediate parsing.",
    architecture: ["Docker", "AWS Pipelines", "Nginx Compression", "Grafana Engine"],
    metrics: [
      { label: "Data Compression", value: "85%" },
      { label: "Routing Latency", value: "<5ms" },
      { label: "Active Nodes", value: "1M+" }
    ]
  }
};

const PROJECT_DETAILS: Record<string, { title: string; image: string; tags: string[] }> = {
  finstream: {
    title: "FinStream Dashboard",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAstrrR8zCE5ZFNMe8J0AmPPapTtx6nCZnNdz-qXgmRid76bfyXqeGYhqC6SroIkEWB6WR6D7ddZK30a43vw2CIHUgprxuVxqLJDJK8c1KRd8ZUk_PaWNfIAeyIErUp-px1QcJLzhwxkpYDu-TOq_q6FIwTxwmrGJBVSyW3npqydEdhfzAs38fvIn1t6qn-kSm2JECxpmh9l1M65UoGdjXrQJ3DG_k4hDvcRanBU3S49q34bn5XNOPC3jAgfttL12BiylEkM1UCyMI",
    tags: ["React", "TypeScript", "Next.js"]
  },
  luxecommerce: {
    title: "LuxeCommerce App",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnzx6f-XLqXZRkcDwVqRcppM7LejElGWO3fmCDKY_E1ZL2DHYPy9TIEwPspYAjtV3R75ERtG0NE4291UNotb83nskBF-KTy_ldCFNHufo3ThGRM-6YNLxo2CLYC3ONDzS8crE56w-VhJtVjCo6ShJWVL_CQmJmI_cED72BUWA3kQCxA1tpC7Atp1iJHcaZWvehJoMq_Do5K7LooUsb6E_DI1TtFE_0jeLihd0PsCuKtNtvMMwbXRGJSwv8AKAhbFW5MBzMSR6f31w",
    tags: ["React Native", "Firebase", "Redux"]
  },
  cloudpulse: {
    title: "CloudPulse Monitor",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUSCQ_MjWP62szVQEoEf8E03XKe4BtgXS9E0Y98EcIKWJOGSoslD_vIdychavUf5oyGL4NTbIqCq0DcuCS_G1ujou4Ue568j-r1aQfLVPRnHOp6-ynR_5sutRNmIF0hGp0DRlN8Q3JWVXbcgMCftCqmv6saiYEZpsjdHt2NzkJYNPMZX8tpAq8lU7DsYVdv1PAWtvz_A91IlKbuwUAAWvkfos2uVWYbMmcWF5h7zidmIA50qimv8JiHNvX_CCui82JLZ1nLi7TbeY",
    tags: ["Docker", "AWS", "Nginx"]
  }
};

// Orchestrate DOM Actions on Mount
document.addEventListener('DOMContentLoaded', () => {
  setupStickyHeader();
  setupSectionObserver();
  setupMobileMenu();
  setupCaseStudyModal();
  setupContactForm();
  setupGlobalActions();
});

// 1. Sticky Navigation Header Control
function setupStickyHeader() {
  const header = document.getElementById('app-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 15) {
      header.className = "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 flex items-center bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md shadow-slate-100/40";
    } else {
      header.className = "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 flex items-center bg-white border-b border-slate-100 shadow-sm";
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run initially
}

// 2. Active Section Highlight Observer
function setupSectionObserver() {
  const sections = document.querySelectorAll('section');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px', // Target central viewport
    threshold: 0
  };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (!id) return;

        // Sync Desktop Nav Highlight
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('data-section') === id) {
            link.className = "nav-link font-sans text-[15px] font-semibold tracking-wide transition-colors duration-200 relative py-1.5 text-[#00236f] active-nav";
          } else {
            link.className = "nav-link font-sans text-[15px] font-semibold tracking-wide transition-colors duration-200 relative py-1.5 text-slate-600 hover:text-[#00236f]";
          }
        });

        // Sync Mobile Drawer Highlight
        mobileNavLinks.forEach(link => {
          if (link.getAttribute('data-section') === id) {
            link.className = "mobile-nav-link text-2xl font-display font-semibold transition-colors py-2 text-[#00236f] bg-slate-50 rounded-xl";
          } else {
            link.className = "mobile-nav-link text-2xl font-display font-semibold transition-colors py-2 text-slate-600 hover:text-[#00236f]";
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));
}

// 3. Mobile Navigation Drawer Toggle
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (!toggleBtn || !mobileMenu || !hamburgerIcon || !closeIcon) return;

  let isOpen = false;

  const toggle = () => {
    isOpen = !isOpen;
    if (isOpen) {
      mobileMenu.className = "fixed inset-0 top-0 z-40 bg-white flex flex-col pt-28 px-8 pb-10 border-b border-slate-200 shadow-xl transition-all duration-300 transform translate-y-0 opacity-100 pointer-events-auto";
      hamburgerIcon.className = "w-6 h-6 hidden";
      closeIcon.className = "w-6 h-6 block text-[#fea619]";
    } else {
      mobileMenu.className = "fixed inset-0 top-0 z-40 bg-white flex flex-col pt-28 px-8 pb-10 border-b border-slate-200 shadow-xl transition-all duration-300 transform -translate-y-full opacity-0 pointer-events-none";
      hamburgerIcon.className = "w-6 h-6 block";
      closeIcon.className = "w-6 h-6 hidden";
    }
  };

  toggleBtn.addEventListener('click', toggle);

  // Auto-close menu drawer when selecting any link
  const optionLinks = document.querySelectorAll('.mobile-nav-link');
  optionLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) toggle();
    });
  });
}

// 4. Modal / Case Study Presentation Layer
function setupCaseStudyModal() {
  const modal = document.getElementById('project-modal');
  const card = document.getElementById('modal-card');
  const closeBtn = document.getElementById('close-modal-btn');
  
  if (!modal || !card || !closeBtn) return;

  const mImage = document.getElementById('modal-project-image') as HTMLImageElement;
  const mTitle = document.getElementById('modal-project-title');
  const mChallenge = document.getElementById('modal-project-challenge');
  const mAction = document.getElementById('modal-project-action');
  const mTags = document.getElementById('modal-project-tags');
  const mArchitecture = document.getElementById('modal-project-architecture');
  const mMetrics = document.getElementById('modal-project-metrics');

  const openModal = (projectId: string) => {
    const detail = PROJECT_DETAILS[projectId];
    const study = CASE_STUDIES[projectId];
    if (!detail || !study) return;

    // Populate assets & texts safely
    mImage.src = detail.image;
    mImage.alt = `${detail.title} detailed snapshot`;
    if (mTitle) mTitle.textContent = detail.title;
    if (mChallenge) mChallenge.textContent = study.challenge;
    if (mAction) mAction.textContent = study.action;

    // Render tags
    if (mTags) {
      mTags.innerHTML = '';
      detail.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = "bg-[#fea619]/10 border border-[#fea619]/20 text-[#00236f] text-[9px] font-mono tracking-wider font-semibold py-0.5 px-2 rounded";
        span.textContent = t;
        mTags.appendChild(span);
      });
    }

    // Render system architectures
    if (mArchitecture) {
      mArchitecture.innerHTML = '';
      study.architecture.forEach(arch => {
        const span = document.createElement('span');
        span.className = "bg-[#f8f9ff] border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-700";
        span.textContent = arch;
        mArchitecture.appendChild(span);
      });
    }

    // Render metrics
    if (mMetrics) {
      mMetrics.innerHTML = '';
      study.metrics.forEach(metric => {
        const div = document.createElement('div');
        div.innerHTML = `
          <p class="text-2xl font-display font-extrabold text-[#00236f]">${metric.value}</p>
          <p class="text-xs text-slate-500 mt-0.5">${metric.label}</p>
        `;
        mMetrics.appendChild(div);
      });
    }

    // Interactive Animation
    modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto block";
    setTimeout(() => {
      card.className = "relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-left transition-all duration-300 transform scale-100 opacity-100";
    }, 10);
  };

  const closeModal = () => {
    card.className = "relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-left transition-all duration-300 transform scale-95 opacity-0";
    setTimeout(() => {
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto hidden";
    }, 200);
  };

  // Bind trigger buttons
  const triggerBtns = document.querySelectorAll('.view-case-study-btn');
  triggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project');
      if (pId) openModal(pId);
    });
  });

  // Closures
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// 5. Contact Inbound Mail Simulation
function setupContactForm() {
  const form = document.getElementById('portfolio-contact-form') as HTMLFormElement;
  const formContainer = document.getElementById('form-container');
  const submitBtn = document.getElementById('submit-contact-form-btn') as HTMLButtonElement;
  const formSuccessContainer = document.getElementById('form-success-container');
  const successUserName = document.getElementById('success-user-name');
  const resetBtn = document.getElementById('reset-form-btn');

  if (!form || !submitBtn || !formSuccessContainer || !resetBtn || !formContainer) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const msgInput = document.getElementById('message') as HTMLTextAreaElement;

    if (!nameInput.value || !emailInput.value || !msgInput.value) return;

    // Enter submitting details loader state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="w-5 h-5 animate-pulse text-[#00236f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
      <span>Submitting details...</span>
    `;

    setTimeout(() => {
      // Transition gracefully to Success Layout
      form.className = "space-y-6 hidden";
      if (successUserName) successUserName.textContent = nameInput.value;
      formSuccessContainer.className = "block text-center space-y-6";

      // Clear layout fields
      form.reset();
      
      // Restore button text
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Send Message</span>
        <svg class="w-4 h-4 text-[#00236f] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      `;
    }, 1200);
  });

  resetBtn.addEventListener('click', () => {
    formSuccessContainer.className = "hidden text-center space-y-6";
    form.className = "space-y-6 block";
  });
}

// 6. Global simulated actions and layout behaviors
function setupGlobalActions() {
  // Resume Download Button Alert
  const rDownload = document.getElementById('resume-download-btn');
  const mDownload = document.getElementById('mobile-resume-btn');
  const handleResumeSim = () => {
    alert("Visual Resume download simulation started! Formatted resume is prepared successfully.");
  };

  if (rDownload) rDownload.addEventListener('click', handleResumeSim);
  if (mDownload) mDownload.addEventListener('click', handleResumeSim);

  // Visit Production App Simulated alert
  const modalVisitBtn = document.getElementById('modal-visit-app-btn');
  if (modalVisitBtn) {
    modalVisitBtn.addEventListener('click', () => {
      const title = document.getElementById('modal-project-title')?.textContent || "Featured Project";
      alert(`Simulated connection to the live sandbox of ${title}`);
    });
  }

  // Visit Archives
  const archiveBtn = document.getElementById('view-archives-btn');
  if (archiveBtn) {
    archiveBtn.addEventListener('click', () => {
      alert("Simulation: Navigating to external production archives.");
    });
  }

  // Back To Top Floating Action Button
  const backToTopBtn = document.getElementById('scroll-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
