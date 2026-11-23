function getActiveFactCase() {
  return FACT_CASES.find((p) => p.id === state.activeFactId) || FACT_CASES[0];
}

function selectFactPost(postId) {
  state.activeFactId = postId;
  renderFactCheck();
}

function toggleFactClue(postId, clueId) {
  if (!state.openFactClues[postId]) state.openFactClues[postId] = [];
  const arr = state.openFactClues[postId];
  const idx = arr.indexOf(clueId);
  if (idx === -1) arr.push(clueId);
  else arr.splice(idx, 1);
  renderFactCheck();
}

function chooseFactVerdict(postId, verdict) {
  const item = FACT_CASES.find((p) => p.id === postId);
  if (!item) return;

  state.factAttempts[postId] = verdict;
  if (verdict === item.correctVerdict && !state.solvedFacts.includes(postId)) {
    state.solvedFacts.push(postId);
    writeStorage(STORAGE_KEYS.facts, state.solvedFacts);
    syncProgressIndicators();
  }
  renderFactCheck();
}

function goToNextFactPost() {
  const idx = FACT_CASES.findIndex((p) => p.id === state.activeFactId);
  if (idx < FACT_CASES.length - 1) {
    selectFactPost(FACT_CASES[idx + 1].id);
  } else {
    navigateTo('guide');
  }
}

function clueBadgeTone(tone) {
  if (tone === 'emerald') return 'bg-emeraldSafe/15 text-emeraldSafe border-emeraldSafe/40';
  if (tone === 'amber') return 'bg-amberWarn/15 text-amberWarn border-amberWarn/40';
  return 'bg-roseAlert/15 text-roseAlert border-roseAlert/40';
}

function renderFactCheck() {
  const tabsEl = document.getElementById('fact-post-tabs');
  const cardEl = document.getElementById('fact-social-card');
  const cluesEl = document.getElementById('fact-clues-list');
  const verdictBtnsEl = document.getElementById('fact-verdict-buttons');
  const feedbackEl = document.getElementById('fact-feedback-box');

  if (!tabsEl || !cardEl || !cluesEl || !verdictBtnsEl || !feedbackEl) return;

  const current = getActiveFactCase();
  const currentIdx = FACT_CASES.findIndex((p) => p.id === current.id);
  const openList = state.openFactClues[current.id] || [];
  const isSolved = state.solvedFacts.includes(current.id);
  const selectedVerdict = state.factAttempts[current.id] || (isSolved ? current.correctVerdict : null);
  const isCorrect = selectedVerdict === current.correctVerdict;

  tabsEl.innerHTML = FACT_CASES.map((item) => {
    const solved = state.solvedFacts.includes(item.id);
    const active = item.id === current.id;
    let cls = 'bg-[#0D0F14] border-white/[0.09] hover:border-white/25 hover:bg-[#141720]';
    if (solved && active) {
      cls = 'bg-emeraldSafe/10 border-emeraldSafe/55 shadow-[inset_0_1px_0_rgba(52,211,153,0.3)]';
    } else if (solved) {
      cls = 'bg-emeraldSafe/[0.06] border-emeraldSafe/35 hover:border-emeraldSafe/55';
    } else if (active) {
      cls = 'bg-[#1B202C] border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]';
    }
    return `
      <button type="button" onclick="selectFactPost('${item.id}')" class="text-left p-3.5 rounded-xl border transition-all cursor-pointer ${cls}">
        <div class="flex items-center justify-between gap-2 mb-0.5">
          <span class="text-[13.5px] font-semibold ${solved ? 'text-emeraldSafe' : active ? 'text-white' : 'text-inkMuted'}">${escapeHtml(item.tabTitle)}</span>
          ${solved ? '<span class="text-[13px] font-bold text-emeraldSafe">Verified</span>' : ''}
        </div>
        <div class="font-display text-[15.5px] font-bold text-white truncate">${escapeHtml(item.shortLabel)}</div>
      </button>
    `;
  }).join('');

  cardEl.innerHTML = `
    <div class="p-4 sm:p-6 pb-4 flex items-start justify-between gap-3 border-b border-white/[0.08]">
      <div class="flex items-center gap-3.5 min-w-0">
        <div class="w-11 h-11 rounded-xl bg-[#1B202C] border border-white/20 flex items-center justify-center font-display text-[14.5px] font-bold text-white shrink-0">
          ${escapeHtml(current.accountName.slice(0, 2).toUpperCase())}
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-1.5">
            <span class="text-[16px] font-bold text-white truncate">${escapeHtml(current.accountName)}</span>
            ${
              current.id === 'food_recall'
                ? `<svg class="w-4 h-4 text-emeraldSafe shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-label="Verified government account"><path d="M12 2l2.4 2.4 3.4-.3.9 3.3 3.1 1.4-1.1 3.2 1.1 3.2-3.1 1.4-.9 3.3-3.4-.3L12 22l-2.4-2.4-3.4.3-.9-3.3-3.1-1.4 1.1-3.2-1.1-3.2 3.1-1.4.9-3.3 3.4.3L12 2zm-1.1 13.6l5.3-5.3-1.3-1.3-4 4-1.9-1.9-1.3 1.3 3.2 3.2z"/></svg>`
                : ''
            }
          </div>
          <div class="text-[14px] text-inkMuted truncate">
            <span class="font-mono">${escapeHtml(current.handle)}</span> &middot; ${escapeHtml(current.postedAt)}
          </div>
        </div>
      </div>
      ${
        isSolved
          ? `<span class="shrink-0 text-[13px] font-semibold px-3 py-1 rounded-full bg-emeraldSafe/15 border border-emeraldSafe/45 text-emeraldSafe">Verified</span>`
          : ''
      }
    </div>

    <div class="border-b border-white/[0.08] bg-[#080A0F]">
      ${current.artworkSvg}
    </div>

    <div class="p-4 sm:p-6 space-y-3">
      <h3 class="font-display text-xl font-bold tracking-[-0.02em] text-white leading-snug">
        ${escapeHtml(current.headline)}
      </h3>
      <p class="text-[16px] text-inkSecondary leading-relaxed wrap-anywhere">
        ${escapeHtml(current.caption)}
      </p>
    </div>
  `;

  cluesEl.innerHTML = current.clues
    .map((clue) => {
      const opened = openList.includes(clue.id);
      return `
        <div class="rounded-xl bg-[#080A0F] border ${opened ? 'border-white/25' : 'border-white/[0.1]'} overflow-hidden transition-colors">
          <button type="button" onclick="toggleFactClue('${current.id}', '${clue.id}')" class="w-full px-4 py-3.5 flex items-center justify-between gap-2 text-left hover:bg-white/[0.03] transition-colors cursor-pointer">
            <span class="text-[15px] font-semibold text-white">${escapeHtml(clue.buttonLabel)}</span>
            <div class="flex items-center gap-2 shrink-0">
              ${
                opened
                  ? `<span class="text-[13px] font-semibold px-2.5 py-0.5 rounded-md border ${clueBadgeTone(clue.tone)}">${escapeHtml(clue.status)}</span>`
                  : `<span class="text-[13.5px] font-medium text-inkMuted">Inspect</span>`
              }
              <svg class="w-4 h-4 text-inkSecondary transition-transform ${opened ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </button>
          ${
            opened
              ? `<div class="px-4 pb-4 pt-2.5 border-t border-white/[0.08] text-[14.5px] text-inkSecondary leading-relaxed">${escapeHtml(clue.detail)}</div>`
              : ''
          }
        </div>
      `;
    })
    .join('');

  const verdictOptions = [
    { key: 'real', label: 'Real' },
    { key: 'misleading', label: 'Misleading' },
    { key: 'fake', label: 'Fake' },
  ];

  verdictBtnsEl.innerHTML = verdictOptions
    .map((opt) => {
      const picked = selectedVerdict === opt.key;
      let extra = '';
      if (picked && isCorrect) {
        extra = '!border-emeraldSafe !bg-emeraldSafe/15 !text-emeraldSafe';
      } else if (picked && !isCorrect) {
        extra = '!border-roseAlert !bg-roseAlert/15 !text-roseAlert';
      }
      return `
        <button type="button" onclick="chooseFactVerdict('${current.id}', '${opt.key}')" class="btn-dark-glass py-3 px-2.5 rounded-xl text-[14.5px] font-semibold text-center cursor-pointer ${extra}">
          ${opt.label}
        </button>
      `;
    })
    .join('');

  if (!selectedVerdict) {
    feedbackEl.className = 'hidden';
    feedbackEl.innerHTML = '';
  } else if (isCorrect) {
    feedbackEl.className = 'rounded-xl p-4 bg-emeraldSafe/12 border border-emeraldSafe/45 space-y-3';
    feedbackEl.innerHTML = `
      <div class="space-y-1">
        <div class="text-[15.5px] font-bold text-emeraldSafe">Correct: ${escapeHtml(current.verdictName)}</div>
        <p class="text-[14.5px] text-inkPrimary leading-relaxed">${escapeHtml(current.verdictSummary)}</p>
      </div>
      <button type="button" onclick="goToNextFactPost()" class="btn-machined-silver w-full py-2.5 px-4 rounded-xl text-[14.5px] font-bold cursor-pointer">
        ${currentIdx < FACT_CASES.length - 1 ? 'Next Post' : 'Go to Link Checker'}
      </button>
    `;
  } else {
    feedbackEl.className = 'rounded-xl p-4 bg-roseAlert/12 border border-roseAlert/45 space-y-1';
    feedbackEl.innerHTML = `
      <div class="text-[15.5px] font-bold text-roseAlert">Not quite. Take a second look.</div>
      <p class="text-[14.5px] text-inkPrimary leading-relaxed">
        Open all three checks in <strong class="text-white">Verification Clues</strong> above to compare the source, date context, and official record, then try again.
      </p>
    `;
  }
}
