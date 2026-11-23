function getActiveScamCase() {
  return SCAM_CASES.find((c) => c.id === state.activeScamId) || SCAM_CASES[0];
}

function selectScamCase(caseId) {
  state.activeScamId = caseId;
  updateScamHoverUrl('');
  renderScamLab();
}

function updateScamHoverUrl(url) {
  const box = document.getElementById('scam-status-url');
  const text = document.getElementById('scam-status-url-text');
  const hint = document.getElementById('scam-status-hint');
  if (!box || !text) return;

  if (url) {
    text.textContent = url;
    box.classList.remove('opacity-0');
    box.classList.add('opacity-100');
    if (hint) hint.classList.add('hidden');
  } else {
    box.classList.remove('opacity-100');
    box.classList.add('opacity-0');
    if (hint) hint.classList.remove('hidden');
  }
}

function catchScamFlag(caseId, flagId, previewUrl = '') {
  if (previewUrl) updateScamHoverUrl(previewUrl);
  if (!state.scamFlags[caseId]) state.scamFlags[caseId] = [];
  let newlyFound = false;
  if (!state.scamFlags[caseId].includes(flagId)) {
    state.scamFlags[caseId].push(flagId);
    writeStorage(STORAGE_KEYS.scams, state.scamFlags);
    syncProgressIndicators();
    newlyFound = true;
  }
  renderScamLab(newlyFound ? `${caseId}-${flagId}` : null);
}

function showScamHint() {
  const current = getActiveScamCase();
  const found = state.scamFlags[current.id] || [];
  const nextUnfound = current.flags.find((f) => !found.includes(f.id));
  if (!nextUnfound) return;

  const el = document.querySelector(`[data-lab-flag="${current.id}-${nextUnfound.id}"]`);
  if (el) {
    el.classList.remove('hint-highlight');
    void el.offsetWidth;
    el.classList.add('hint-highlight');
  }
}

function revealAllScamFlags() {
  const current = getActiveScamCase();
  state.scamFlags[current.id] = current.flags.map((f) => f.id);
  writeStorage(STORAGE_KEYS.scams, state.scamFlags);
  syncProgressIndicators();
  renderScamLab();
}

function resetScamCase() {
  const current = getActiveScamCase();
  state.scamFlags[current.id] = [];
  writeStorage(STORAGE_KEYS.scams, state.scamFlags);
  syncProgressIndicators();
  renderScamLab();
}

function goToNextScamCase() {
  const idx = SCAM_CASES.findIndex((c) => c.id === state.activeScamId);
  if (idx < SCAM_CASES.length - 1) {
    selectScamCase(SCAM_CASES[idx + 1].id);
  } else {
    navigateTo('facts');
  }
}

function renderFlagPin(isFound, num) {
  if (!isFound) return '';
  return `<span class="inline-flex items-center justify-center ml-2 w-5 h-5 rounded-full bg-roseAlert text-[#050608] font-sans text-[13px] font-bold align-middle">${num}</span>`;
}

function buildScamSpecimenHtml(item, foundList, pulseKey) {
  const has = (id) => foundList.includes(id);
  const stateCls = (id) => `${has(id) ? 'flagged' : ''} ${pulseKey === `${item.id}-${id}` ? 'flag-just-found' : ''}`;

  if (item.id === 'bank_alert') {
    return `
      <div class="rounded-xl bg-[#141720] border border-white/[0.11] overflow-hidden shadow-lg">
        <div class="px-4 sm:px-5 py-4 bg-[#1B202C] border-b border-white/[0.09] space-y-2.5">
          <div class="font-display text-[17px] sm:text-[17.5px] font-bold text-white leading-snug">Action Required: Confirm Your National Bank Profile</div>
          <div class="space-y-1.5 text-[14px]">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-inkMuted w-11 shrink-0">From:</span>
              <button type="button" data-lab-flag="bank_alert-f1" onclick="catchScamFlag('bank_alert', 'f1')" class="lab-hotspot text-left px-2 py-0.5 font-mono text-[13.5px] sm:text-[14px] text-inkPrimary wrap-anywhere ${stateCls('f1')}">
                National Bank Security &lt;security@nationalbank-support.co&gt;${renderFlagPin(has('f1'), 1)}
              </button>
            </div>
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-inkMuted w-11 shrink-0">To:</span>
              <span class="font-mono text-[13.5px] sm:text-[14px] text-inkSecondary wrap-anywhere">you@personal-mail.com</span>
            </div>
          </div>
        </div>

        <div class="p-4 sm:p-6 space-y-4 text-[16px] leading-[1.65] text-inkPrimary">
          <p>Dear Account Holder,</p>
          <p class="text-inkSecondary">
            Our automated monitoring noticed an unusual access request on your online checking profile.
          </p>

          <div role="button" tabindex="0" data-lab-flag="bank_alert-f2" onclick="catchScamFlag('bank_alert', 'f2')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();catchScamFlag('bank_alert','f2');}" class="lab-hotspot p-3 -mx-3 ${stateCls('f2')}">
            Please complete verification immediately or your <strong class="text-white">account will be permanently suspended in 2 hours</strong>.${renderFlagPin(has('f2'), 2)}
          </div>

          <div class="pt-1">
            <button type="button" data-lab-flag="bank_alert-f3" onclick="catchScamFlag('bank_alert', 'f3', 'http://nb-login-verify.net/session')" onmouseenter="updateScamHoverUrl('http://nb-login-verify.net/session')" onmouseleave="updateScamHoverUrl('')" onfocus="updateScamHoverUrl('http://nb-login-verify.net/session')" onblur="updateScamHoverUrl('')" class="lab-hotspot inline-flex items-center px-5 py-2.5 rounded-lg bg-[#232939] border border-white/20 text-[15px] font-semibold text-white ${stateCls('f3')}">
              Verify Identity${renderFlagPin(has('f3'), 3)}
            </button>
          </div>

          <p class="text-[13.5px] text-inkMuted pt-2 border-t border-white/[0.08]">
            National Bank Automated Security Desk &middot; Do not reply directly to this message.
          </p>
        </div>
      </div>
    `;
  }

  if (item.id === 'parcel_fee') {
    return `
      <div class="mx-auto w-full max-w-[362px] rounded-[34px] p-2.5 bg-gradient-to-b from-[#30374A] via-[#1B202C] to-[#0D0F14] border border-white/25 shadow-[0_24px_48px_-14px_rgba(0,0,0,0.92),inset_0_1px_0_rgba(255,255,255,0.34)]">
        <div class="rounded-[26px] bg-[#090B0F] border border-white/[0.1] overflow-hidden">
          <div class="px-5 pt-3 pb-2 flex items-center justify-between text-[13px] font-medium text-inkSecondary">
            <span>15:42</span>
            <div class="w-16 h-4 rounded-full bg-[#1B202C] border border-white/10"></div>
            <span>5G</span>
          </div>

          <div class="px-4 py-3 bg-[#141720] border-y border-white/[0.09] text-center space-y-1">
            <div class="text-[13px] text-inkMuted">National Courier Notice</div>
            <button type="button" data-lab-flag="parcel_fee-f1" onclick="catchScamFlag('parcel_fee', 'f1')" class="lab-hotspot px-2.5 py-0.5 font-mono text-[14.5px] font-medium text-white ${stateCls('f1')}">
              +44 7911 882104${renderFlagPin(has('f1'), 1)}
            </button>
          </div>

          <div class="p-4 space-y-4 min-h-[296px] flex flex-col justify-between">
            <div class="space-y-3">
              <div class="text-center text-[13px] text-inkMuted">Today, 3:40 PM</div>

              <div class="rounded-2xl rounded-tl-sm bg-[#161A25] border border-white/[0.11] p-4 text-[15.5px] leading-[1.6] text-inkPrimary space-y-3">
                <p class="font-semibold text-white">Delivery Hold Notice</p>

                <div role="button" tabindex="0" data-lab-flag="parcel_fee-f2" onclick="catchScamFlag('parcel_fee', 'f2')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();catchScamFlag('parcel_fee','f2');}" class="lab-hotspot p-2 -mx-2 ${stateCls('f2')}">
                  <strong class="text-white">Final warning: pay $1.95 customs fee today or parcel is destroyed</strong> at our sorting facility.${renderFlagPin(has('f2'), 2)}
                </div>

                <div>
                  <span class="text-inkSecondary">Release parcel here:</span><br />
                  <button type="button" data-lab-flag="parcel_fee-f3" onclick="catchScamFlag('parcel_fee', 'f3', 'https://bit.ly/post-customs-fee  →  https://track-post-delivery.xyz/fee')" onmouseenter="updateScamHoverUrl('https://bit.ly/post-customs-fee  →  https://track-post-delivery.xyz/fee')" onmouseleave="updateScamHoverUrl('')" onfocus="updateScamHoverUrl('https://bit.ly/post-customs-fee  →  https://track-post-delivery.xyz/fee')" onblur="updateScamHoverUrl('')" class="lab-hotspot text-left px-2 py-1 -ml-2 mt-1 font-mono text-[14px] text-white underline decoration-white/40 wrap-anywhere ${stateCls('f3')}">
                    bit.ly/post-customs-fee${renderFlagPin(has('f3'), 3)}
                  </button>
                </div>
              </div>
            </div>

            <div class="px-4 py-2 rounded-full bg-[#141720] border border-white/[0.1] text-[13px] text-inkMuted flex items-center justify-between">
              <span>Text Message</span>
              <span>SMS</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="rounded-xl bg-[#141720] border border-white/[0.11] overflow-hidden shadow-lg">
      <div class="px-4 sm:px-5 py-4 bg-[#1B202C] border-b border-white/[0.09] flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-11 h-11 rounded-full bg-gradient-to-b from-[#2E364A] to-[#141720] border border-white/25 flex items-center justify-center font-display font-bold text-[14.5px] text-white shrink-0">
            TD
          </div>
          <div class="min-w-0">
            <div class="text-[15.5px] font-bold text-white truncate">TechDrop Giveaways</div>
            <button type="button" data-lab-flag="giveaway_dm-f1" onclick="catchScamFlag('giveaway_dm', 'f1')" class="lab-hotspot inline-flex items-center gap-1.5 text-left px-2 py-0.5 -ml-2 font-mono text-[14px] text-inkSecondary ${stateCls('f1')}">
              <span>@techdrop_offical</span>
              <svg class="w-4 h-4 text-inkMuted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-label="Unverified outline symbol">
                <polygon points="12 2 15 5 19 5 19 9 22 12 19 15 19 19 15 19 12 22 9 19 5 19 5 15 2 12 5 9 5 5 9 5 12 2" stroke-dasharray="3 2" />
              </svg>
              ${renderFlagPin(has('f1'), 1)}
            </button>
          </div>
        </div>
        <span class="text-[13.5px] text-inkMuted">Direct Message</span>
      </div>

      <div class="p-4 sm:p-6 space-y-3.5 text-[15.5px] leading-[1.6] text-inkPrimary">
        <div role="button" tabindex="0" data-lab-flag="giveaway_dm-f2" onclick="catchScamFlag('giveaway_dm', 'f2')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();catchScamFlag('giveaway_dm','f2');}" class="lab-hotspot rounded-2xl rounded-tl-sm bg-[#1B202C] border border-white/[0.1] p-4 max-w-[96%] ${stateCls('f2')}">
          You were randomly selected as our grand prize winner! <strong class="text-white">Claim within 10 minutes before we pick someone else</strong>.${renderFlagPin(has('f2'), 2)}
        </div>

        <div role="button" tabindex="0" data-lab-flag="giveaway_dm-f3" onclick="catchScamFlag('giveaway_dm', 'f3', 'https://claim-techdrop-prize.co/login-verify')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();catchScamFlag('giveaway_dm','f3','https://claim-techdrop-prize.co/login-verify');}" onmouseenter="updateScamHoverUrl('https://claim-techdrop-prize.co/login-verify')" onmouseleave="updateScamHoverUrl('')" onfocus="updateScamHoverUrl('https://claim-techdrop-prize.co/login-verify')" onblur="updateScamHoverUrl('')" class="lab-hotspot rounded-2xl rounded-tl-sm bg-[#1B202C] border border-white/[0.1] p-4 max-w-[96%] space-y-2 ${stateCls('f3')}">
          <p>
            Open our winner form below and <strong class="text-white">confirm your account login and shipping card</strong> to unlock delivery:${renderFlagPin(has('f3'), 3)}
          </p>
          <div class="font-mono text-[14px] text-white underline decoration-white/40 wrap-anywhere">
            claim-techdrop-prize.co/login-verify
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderScamLab(pulseKey = null) {
  const tabsEl = document.getElementById('scam-case-tabs');
  const mountEl = document.getElementById('scam-specimen-mount');
  const channelPill = document.getElementById('scam-channel-pill');
  const progressText = document.getElementById('scam-case-progress-text');
  const findingsSub = document.getElementById('scam-findings-subtitle');
  const findingsRatio = document.getElementById('scam-findings-ratio');
  const solvedBanner = document.getElementById('scam-solved-banner');
  const nextBtn = document.getElementById('scam-next-case-btn');
  const cardsMount = document.getElementById('scam-findings-cards');

  if (!tabsEl || !mountEl || !cardsMount) return;

  const current = getActiveScamCase();
  const foundList = state.scamFlags[current.id] || [];
  const currentIdx = SCAM_CASES.findIndex((c) => c.id === current.id);

  tabsEl.innerHTML = SCAM_CASES.map((item) => {
    const count = (state.scamFlags[item.id] || []).length;
    const isSelected = item.id === current.id;
    const isSolved = count === 3;

    let tabClasses = 'bg-[#0D0F14] border-white/[0.09] hover:border-white/25 hover:bg-[#141720]';
    if (isSolved && isSelected) {
      tabClasses = 'bg-emeraldSafe/10 border-emeraldSafe/55 shadow-[inset_0_1px_0_rgba(52,211,153,0.3)]';
    } else if (isSolved) {
      tabClasses = 'bg-emeraldSafe/[0.06] border-emeraldSafe/35 hover:border-emeraldSafe/55';
    } else if (isSelected) {
      tabClasses = 'bg-[#1B202C] border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]';
    }

    return `
      <button type="button" onclick="selectScamCase('${item.id}')" class="text-left p-4 rounded-xl border transition-all cursor-pointer ${tabClasses}">
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="text-[13.5px] font-semibold ${isSolved ? 'text-emeraldSafe' : isSelected ? 'text-white' : 'text-inkMuted'}">${escapeHtml(item.label)} &middot; ${escapeHtml(item.channel)}</span>
          <span class="text-[13.5px] font-bold tabular-nums ${isSolved ? 'text-emeraldSafe' : isSelected ? 'text-white' : 'text-inkMuted'}">${count}/3</span>
        </div>
        <div class="font-display text-[16.5px] font-bold ${isSelected || isSolved ? 'text-white' : 'text-inkPrimary'}">${escapeHtml(item.title)}</div>
      </button>
    `;
  }).join('');

  if (channelPill) channelPill.textContent = current.channel;
  if (progressText) progressText.textContent = `${foundList.length} of 3 red flags found`;
  if (findingsSub) findingsSub.textContent = `${foundList.length} of 3 red flags found`;
  if (findingsRatio) findingsRatio.textContent = `${foundList.length} / 3`;

  mountEl.innerHTML = buildScamSpecimenHtml(current, foundList, pulseKey);

  if (solvedBanner) solvedBanner.classList.toggle('hidden', foundList.length < 3);
  if (nextBtn) {
    nextBtn.textContent = currentIdx < SCAM_CASES.length - 1 ? 'Next Case' : 'Continue to Fact Check';
  }

  const discovered = current.flags.filter((f) => foundList.includes(f.id));
  if (discovered.length === 0) {
    cardsMount.innerHTML = `
      <div class="rounded-xl bg-[#080A0F] border border-dashed border-white/15 p-6 text-center space-y-2">
        <div class="font-display text-[16.5px] font-bold text-white">No red flags selected yet</div>
        <p class="text-[14.5px] text-inkSecondary leading-relaxed">
          Inspect the message and click any suspicious sender, deadline threat, or link. Use <strong class="text-white">Show Hint</strong> if you want a subtle cue.
        </p>
      </div>
    `;
  } else {
    cardsMount.innerHTML = discovered
      .map(
        (flag) => `
      <div class="rounded-xl bg-[#10131C] border border-roseAlert/40 p-4 space-y-2.5">
        <div class="flex items-center gap-2.5">
          <span class="w-6 h-6 rounded-full bg-roseAlert text-[#050608] text-[13px] font-bold flex items-center justify-center shrink-0">${flag.num}</span>
          <h4 class="font-display text-[16px] font-bold text-white">${escapeHtml(flag.title)}</h4>
        </div>
        <p class="text-[14.5px] text-inkSecondary leading-relaxed">${escapeHtml(flag.why)}</p>
        <p class="text-[14.5px] text-inkPrimary leading-relaxed pt-2 border-t border-white/[0.08]">
          <strong class="text-white">What to do instead:</strong> ${escapeHtml(flag.action)}
        </p>
      </div>
    `
      )
      .join('');
  }
}
