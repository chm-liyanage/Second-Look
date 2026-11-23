function renderHeroPreview() {
  const mount = document.getElementById('hero-preview-mount');
  if (!mount) return;

  mount.innerHTML = `
    <div id="hero-preview-shell" class="silver-glare-card rounded-2xl p-1.5">
      <div class="relative rounded-[13px] bg-[#0D0F14] border border-white/[0.09] overflow-hidden">
        <div id="hero-scan-beam" class="scan-beam" aria-hidden="true"></div>

        <div class="px-4 sm:px-5 py-3.5 bg-[#141720] border-b border-white/[0.09] flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 text-inkSecondary">
            <svg class="w-4 h-4 text-[#DCE3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2.5" />
              <path d="M4 7l8 6 8-6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-[14px] font-medium">Inbox Preview</span>
          </div>

          <div class="inline-flex items-center p-1 rounded-full bg-[#050608] border border-white/[0.13]">
            <button type="button" id="preview-btn-normal" onclick="setHeroPreviewMode(false)" class="px-3.5 py-1.5 rounded-full text-[13.5px] font-semibold bg-[#1B202C] text-white border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all cursor-pointer">
              Normal View
            </button>
            <button type="button" id="preview-btn-secondlook" onclick="setHeroPreviewMode(true)" class="px-3.5 py-1.5 rounded-full text-[13.5px] font-semibold text-inkSecondary hover:text-white border border-transparent transition-all cursor-pointer">
              Second Look
            </button>
          </div>
        </div>

        <div class="p-4 sm:p-6 space-y-5">
          <div class="space-y-2 pb-4 border-b border-white/[0.08]">
            <h2 class="font-display text-[18px] font-bold tracking-[-0.02em] text-white leading-snug">
              Security Alert: Unusual sign-in attempt
            </h2>
            <div class="flex flex-wrap items-center justify-between gap-2 text-[14px]">
              <div class="flex flex-wrap items-center gap-1.5 min-w-0">
                <span class="text-inkMuted">From:</span>
                <button type="button" data-preview-trap="1" onclick="focusPreviewTrap(1)" class="preview-trap text-left px-2 py-0.5 font-mono text-[13.5px] sm:text-[14px] text-inkPrimary wrap-anywhere">
                  Bank Account Protection &lt;alerts@bank-verify-now.co&gt;
                  <span class="preview-badge hidden ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-roseAlert text-[#050608] font-sans text-[13px] font-bold align-middle">1</span>
                </button>
              </div>
              <span class="text-[13px] text-inkMuted shrink-0">Just now</span>
            </div>
          </div>

          <div class="space-y-4 text-[16px] leading-[1.65] text-inkPrimary">
            <p>Hello,</p>
            <p class="text-inkSecondary">
              We detected an unfamiliar sign-in request on your online banking profile from a new browser.
            </p>

            <div role="button" tabindex="0" data-preview-trap="2" onclick="focusPreviewTrap(2)" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();focusPreviewTrap(2);}" class="preview-trap p-3 -mx-3">
              <span>
                Verify your identity within <strong class="text-white font-semibold">15 minutes</strong> or your online access and debit card will be suspended automatically.
              </span>
              <span class="preview-badge hidden ml-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-roseAlert text-[#050608] text-[13px] font-bold align-middle">2</span>
            </div>

            <div class="pt-1">
              <button type="button" data-preview-trap="3" onclick="focusPreviewTrap(3)" class="preview-trap inline-flex flex-wrap items-center gap-3 p-2 -ml-2 text-left max-w-full">
                <span class="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#1B202C] border border-white/20 text-[15px] font-semibold text-white">
                  Review Sign-In Activity
                </span>
                <span class="preview-badge hidden font-mono text-[13.5px] text-roseAlert wrap-anywhere">
                  Leads to: http://account-login-check.xyz/auth
                </span>
                <span class="preview-badge hidden inline-flex items-center justify-center w-5 h-5 rounded-full bg-roseAlert text-[#050608] text-[13px] font-bold shrink-0">3</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="hero-explanation-strip" class="hidden grid grid-cols-1 sm:grid-cols-3 gap-3">
      <button type="button" data-preview-note="1" onclick="focusPreviewTrap(1)" class="text-left rounded-xl p-4 bg-[#141720] border border-roseAlert/35 hover:border-roseAlert/70 transition-all space-y-1.5 cursor-pointer">
        <div class="flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-roseAlert text-[#050608] text-[13px] font-bold flex items-center justify-center shrink-0">1</span>
          <span class="text-[14.5px] font-bold text-white">Lookalike sender</span>
        </div>
        <p class="text-[14px] text-inkSecondary leading-relaxed">
          <span class="font-mono text-roseAlert wrap-anywhere">bank-verify-now.co</span> is an unofficial lookalike domain, not your real bank.
        </p>
      </button>

      <button type="button" data-preview-note="2" onclick="focusPreviewTrap(2)" class="text-left rounded-xl p-4 bg-[#141720] border border-roseAlert/35 hover:border-roseAlert/70 transition-all space-y-1.5 cursor-pointer">
        <div class="flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-roseAlert text-[#050608] text-[13px] font-bold flex items-center justify-center shrink-0">2</span>
          <span class="text-[14.5px] font-bold text-white">15-minute urgency</span>
        </div>
        <p class="text-[14px] text-inkSecondary leading-relaxed">
          An extreme countdown pushes you to tap before checking your official banking app.
        </p>
      </button>

      <button type="button" data-preview-note="3" onclick="focusPreviewTrap(3)" class="text-left rounded-xl p-4 bg-[#141720] border border-roseAlert/35 hover:border-roseAlert/70 transition-all space-y-1.5 cursor-pointer">
        <div class="flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-roseAlert text-[#050608] text-[13px] font-bold flex items-center justify-center shrink-0">3</span>
          <span class="text-[14.5px] font-bold text-white">Spoofed destination</span>
        </div>
        <p class="text-[14px] text-inkSecondary leading-relaxed">
          The clean button hides an unencrypted third-party site built to steal passwords.
        </p>
      </button>
    </div>
  `;
}

function renderOverviewSections() {
  renderHeroPreview();

  const tacticsEl = document.getElementById('overview-tactics-grid');
  if (tacticsEl) {
    tacticsEl.innerHTML = TACTICS_CARDS.map(
      (card) => `
      <div class="silver-glare-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6">
        <div class="flex items-start justify-between gap-4">
          <div class="w-12 h-12 rounded-xl bg-[#1B202C] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] flex items-center justify-center shrink-0">
            ${card.icon}
          </div>
          ${card.visual}
        </div>
        <div class="space-y-2">
          <h3 class="font-display text-xl font-bold tracking-[-0.02em] text-white">${escapeHtml(card.title)}</h3>
          <p class="text-[16px] text-inkSecondary leading-relaxed">${card.body}</p>
        </div>
      </div>
    `
    ).join('');
  }

  const dirEl = document.getElementById('overview-directory-grid');
  if (dirEl) {
    dirEl.innerHTML = PRACTICE_CARDS.map(
      (item) => `
      <button type="button" onclick="navigateTo('${item.view}')" class="silver-glare-card group text-left rounded-2xl p-6 flex flex-col justify-between gap-6 cursor-pointer">
        <div class="flex items-center justify-between gap-3">
          <div class="w-10 h-10 rounded-xl bg-[#1B202C] border border-white/15 flex items-center justify-center text-white">
            ${item.icon}
          </div>
          <span id="${item.statusId}" class="text-[13.5px] font-semibold px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.12] text-inkPrimary tabular-nums">
            ${escapeHtml(item.initialStatus)}
          </span>
        </div>
        <div class="space-y-2">
          <div class="font-display text-xl font-bold text-white flex items-center justify-between">
            <span>${escapeHtml(item.title)}</span>
            <span class="text-inkSecondary group-hover:text-white group-hover:translate-x-1 transition-all">&rarr;</span>
          </div>
          <p class="text-[15px] text-inkSecondary leading-relaxed">${escapeHtml(item.desc)}</p>
        </div>
      </button>
    `
    ).join('');
  }
}

function renderPauseSteps() {
  const pauseEl = document.getElementById('guide-pause-grid');
  if (!pauseEl) return;

  pauseEl.innerHTML = PAUSE_STEPS.map(
    (step) => `
    <div class="silver-glare-card rounded-2xl p-6 space-y-3.5">
      <span class="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-[#1B202C] border border-white/15 font-mono text-[14px] font-semibold text-white">${escapeHtml(step.num)}</span>
      <h3 class="font-display text-xl font-bold text-white">${escapeHtml(step.title)}</h3>
      <p class="text-[15.5px] text-inkSecondary leading-relaxed">${step.desc}</p>
    </div>
  `
  ).join('');
}
