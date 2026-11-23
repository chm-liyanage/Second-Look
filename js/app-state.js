const STORAGE_KEYS = {
  scams: 'secondlook_scams_v2',
  facts: 'secondlook_facts_v2',
  habits: 'secondlook_habits_v2',
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    return;
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const state = {
  activeView: 'overview',
  heroSecondLook: false,
  masteryBannerDismissed: false,
  activeScamId: 'bank_alert',
  scamFlags: readStorage(STORAGE_KEYS.scams, {
    bank_alert: [],
    parcel_fee: [],
    giveaway_dm: [],
  }),
  activeFactId: 'coastal_bridge',
  openFactClues: {
    coastal_bridge: [],
    student_pass: [],
    food_recall: [],
  },
  factAttempts: {},
  solvedFacts: readStorage(STORAGE_KEYS.facts, []),
  checkedHabits: readStorage(STORAGE_KEYS.habits, []),
  checklistResetArmed: false,
  checklistResetTimer: null,
  allResetArmed: false,
  allResetTimer: null,
};

function initCardGlareTracking() {
  document.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    const card = e.target.closest('.silver-glare-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
}

function navigateTo(viewId) {
  const validViews = ['overview', 'scams', 'facts', 'guide'];
  if (!validViews.includes(viewId)) return;

  state.activeView = viewId;

  validViews.forEach((id) => {
    const panel = document.getElementById(`section-${id}`);
    if (panel) panel.classList.toggle('hidden', id !== viewId);
  });

  document.querySelectorAll('[data-nav-view]').forEach((btn) => {
    const isCurrent = btn.getAttribute('data-nav-view') === viewId;
    btn.classList.toggle('active', isCurrent);
    btn.classList.toggle('text-white', isCurrent);
    btn.classList.toggle('text-inkSecondary', !isCurrent);
  });

  closeMobileNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileNav() {
  const panel = document.getElementById('mobile-nav-panel');
  const btn = document.getElementById('mobile-menu-btn');
  const openIcon = document.getElementById('mobile-menu-open-icon');
  const closeIcon = document.getElementById('mobile-menu-close-icon');
  if (!panel || !btn) return;

  const hidden = panel.classList.toggle('hidden');
  btn.setAttribute('aria-expanded', String(!hidden));
  if (openIcon) openIcon.classList.toggle('hidden', !hidden);
  if (closeIcon) closeIcon.classList.toggle('hidden', hidden);
}

function closeMobileNav() {
  const panel = document.getElementById('mobile-nav-panel');
  const btn = document.getElementById('mobile-menu-btn');
  const openIcon = document.getElementById('mobile-menu-open-icon');
  const closeIcon = document.getElementById('mobile-menu-close-icon');
  if (!panel || !btn) return;

  panel.classList.add('hidden');
  btn.setAttribute('aria-expanded', 'false');
  if (openIcon) openIcon.classList.remove('hidden');
  if (closeIcon) closeIcon.classList.add('hidden');
}

function dismissMasteryBanner() {
  state.masteryBannerDismissed = true;
  const banner = document.getElementById('mastery-completion-banner');
  if (banner) banner.classList.add('hidden');
}

function syncProgressIndicators() {
  let totalFlags = 0;
  Object.values(state.scamFlags).forEach((arr) => {
    if (Array.isArray(arr)) totalFlags += arr.length;
  });
  const totalFacts = Array.isArray(state.solvedFacts) ? state.solvedFacts.length : 0;
  const totalHabits = Array.isArray(state.checkedHabits) ? state.checkedHabits.length : 0;
  const completed = Math.min(12, totalFlags + totalFacts);
  const pct = Math.round((completed / 12) * 100);
  const allDone = completed === 12;

  const pill = document.getElementById('nav-progress-pill');
  const text = document.getElementById('nav-progress-text');
  const bar = document.getElementById('nav-progress-bar');
  const check = document.getElementById('nav-progress-check');
  const masteryBanner = document.getElementById('mastery-completion-banner');

  if (text) {
    text.textContent = `${completed} / 12 completed`;
    text.classList.toggle('text-emeraldSafe', allDone);
    text.classList.toggle('text-inkPrimary', !allDone);
  }
  if (bar) {
    bar.style.width = `${pct}%`;
    bar.className = allDone ? 'emerald-bar-fill h-full rounded-full' : 'silver-bar-fill h-full rounded-full';
  }
  if (check) {
    check.classList.toggle('hidden', !allDone);
  }
  if (pill) {
    pill.classList.toggle('border-emeraldSafe/55', allDone);
    pill.classList.toggle('border-white/[0.14]', !allDone);
  }
  if (masteryBanner) {
    if (allDone && !state.masteryBannerDismissed) {
      masteryBanner.classList.remove('hidden');
    } else if (!allDone) {
      state.masteryBannerDismissed = false;
      masteryBanner.classList.add('hidden');
    }
  }

  const scamTotalEl = document.getElementById('scam-total-badge');
  const factTotalEl = document.getElementById('fact-total-badge');
  const dirScams = document.getElementById('dir-scams-status');
  const dirFacts = document.getElementById('dir-facts-status');
  const dirHabits = document.getElementById('dir-habits-status');

  if (scamTotalEl) scamTotalEl.textContent = `${totalFlags} / 9`;
  if (factTotalEl) factTotalEl.textContent = `${totalFacts} / 3`;

  const doneCls = 'text-[13.5px] font-semibold px-3 py-1 rounded-full bg-emeraldSafe/15 border border-emeraldSafe/45 text-emeraldSafe tabular-nums';
  const baseCls = 'text-[13.5px] font-semibold px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.12] text-inkPrimary tabular-nums';

  if (dirScams) {
    dirScams.textContent = `${totalFlags} / 9 flags`;
    dirScams.className = totalFlags === 9 ? doneCls : baseCls;
  }
  if (dirFacts) {
    dirFacts.textContent = `${totalFacts} / 3 verified`;
    dirFacts.className = totalFacts === 3 ? doneCls : baseCls;
  }
  if (dirHabits) {
    dirHabits.textContent = `${totalHabits} / 6 habits`;
    dirHabits.className = totalHabits === 6 ? doneCls : baseCls;
  }
}

function setHeroPreviewMode(enableSecondLook) {
  state.heroSecondLook = enableSecondLook;
  const shell = document.getElementById('hero-preview-shell');
  const beam = document.getElementById('hero-scan-beam');
  const normalBtn = document.getElementById('preview-btn-normal');
  const secondLookBtn = document.getElementById('preview-btn-secondlook');
  const explanationStrip = document.getElementById('hero-explanation-strip');
  const badges = document.querySelectorAll('.preview-badge');

  if (!shell || !normalBtn || !secondLookBtn) return;

  const activeBtnClasses = ['bg-[#1B202C]', 'text-white', 'border-white/20', 'shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'];
  const idleBtnClasses = ['text-inkSecondary', 'border-transparent'];

  if (enableSecondLook) {
    secondLookBtn.classList.add(...activeBtnClasses);
    secondLookBtn.classList.remove(...idleBtnClasses);
    normalBtn.classList.remove(...activeBtnClasses);
    normalBtn.classList.add(...idleBtnClasses);

    if (beam) {
      beam.classList.remove('sweeping');
      void beam.offsetWidth;
      beam.classList.add('sweeping');
    }

    shell.classList.add('second-look-active');
    badges.forEach((b) => b.classList.remove('hidden'));
    if (explanationStrip) explanationStrip.classList.remove('hidden');
  } else {
    normalBtn.classList.add(...activeBtnClasses);
    normalBtn.classList.remove(...idleBtnClasses);
    secondLookBtn.classList.remove(...activeBtnClasses);
    secondLookBtn.classList.add(...idleBtnClasses);

    shell.classList.remove('second-look-active');
    badges.forEach((b) => b.classList.add('hidden'));
    if (explanationStrip) explanationStrip.classList.add('hidden');

    document.querySelectorAll('.preview-trap').forEach((el) => el.classList.remove('focused-trap'));
    document.querySelectorAll('[data-preview-note]').forEach((el) => el.classList.remove('ring-1', 'ring-roseAlert'));
  }
}

function focusPreviewTrap(num) {
  if (!state.heroSecondLook) setHeroPreviewMode(true);
  document.querySelectorAll('.preview-trap').forEach((el) => {
    el.classList.toggle('focused-trap', el.getAttribute('data-preview-trap') === String(num));
  });
  document.querySelectorAll('[data-preview-note]').forEach((el) => {
    const match = el.getAttribute('data-preview-note') === String(num);
    el.classList.toggle('ring-1', match);
    el.classList.toggle('ring-roseAlert', match);
  });
}

function disarmAllReset() {
  state.allResetArmed = false;
  if (state.allResetTimer) {
    clearTimeout(state.allResetTimer);
    state.allResetTimer = null;
  }
  const btn = document.getElementById('footer-reset-all-btn');
  if (btn) {
    btn.textContent = 'Reset All Progress';
    btn.classList.remove('text-roseAlert');
  }
}

function handleResetAllProgress() {
  const btn = document.getElementById('footer-reset-all-btn');
  if (!btn) return;

  if (!state.allResetArmed) {
    state.allResetArmed = true;
    btn.textContent = 'Click again to clear all';
    btn.classList.add('text-roseAlert');
    state.allResetTimer = setTimeout(disarmAllReset, 4000);
  } else {
    state.scamFlags = { bank_alert: [], parcel_fee: [], giveaway_dm: [] };
    state.solvedFacts = [];
    state.factAttempts = {};
    state.openFactClues = { coastal_bridge: [], student_pass: [], food_recall: [] };
    state.checkedHabits = [];
    state.masteryBannerDismissed = false;

    writeStorage(STORAGE_KEYS.scams, state.scamFlags);
    writeStorage(STORAGE_KEYS.facts, []);
    writeStorage(STORAGE_KEYS.habits, []);

    disarmAllReset();
    renderScamLab();
    renderFactCheck();
    renderChecklist();
    syncProgressIndicators();
  }
}
