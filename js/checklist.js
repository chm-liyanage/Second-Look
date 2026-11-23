function toggleHabit(id) {
  const idx = state.checkedHabits.indexOf(id);
  if (idx === -1) state.checkedHabits.push(id);
  else state.checkedHabits.splice(idx, 1);

  writeStorage(STORAGE_KEYS.habits, state.checkedHabits);
  disarmChecklistReset();
  renderChecklist();
  syncProgressIndicators();
}

function disarmChecklistReset() {
  state.checklistResetArmed = false;
  if (state.checklistResetTimer) {
    clearTimeout(state.checklistResetTimer);
    state.checklistResetTimer = null;
  }
  const btn = document.getElementById('checklist-reset-btn');
  if (btn) {
    btn.textContent = 'Reset Checklist';
    btn.classList.remove('text-roseAlert');
  }
}

function handleChecklistReset() {
  const btn = document.getElementById('checklist-reset-btn');
  if (!btn) return;
  if (!state.checklistResetArmed) {
    state.checklistResetArmed = true;
    btn.textContent = 'Confirm reset?';
    btn.classList.add('text-roseAlert');
    state.checklistResetTimer = setTimeout(disarmChecklistReset, 3500);
  } else {
    state.checkedHabits = [];
    writeStorage(STORAGE_KEYS.habits, []);
    disarmChecklistReset();
    renderChecklist();
    syncProgressIndicators();
  }
}

function renderChecklist() {
  const grid = document.getElementById('checklist-items-grid');
  const summary = document.getElementById('checklist-summary-text');
  const bar = document.getElementById('checklist-progress-bar');
  if (!grid) return;

  const count = state.checkedHabits.length;
  const pct = Math.round((count / RESILIENCE_HABITS.length) * 100);

  if (summary) summary.textContent = `${count} of ${RESILIENCE_HABITS.length} completed`;
  if (bar) {
    bar.style.width = `${pct}%`;
    bar.className = count === RESILIENCE_HABITS.length ? 'emerald-bar-fill h-full rounded-full' : 'silver-bar-fill h-full rounded-full';
  }

  grid.innerHTML = RESILIENCE_HABITS.map((habit) => {
    const checked = state.checkedHabits.includes(habit.id);
    return `
      <button type="button" onclick="toggleHabit('${habit.id}')" class="text-left p-4 sm:p-5 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
        checked
          ? 'bg-[#1B202C] border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
          : 'bg-[#080A0F] border-white/[0.1] hover:border-white/25 hover:bg-[#141720]'
      }">
        <div class="w-6 h-6 mt-0.5 rounded-md flex items-center justify-center shrink-0 transition-all ${
          checked
            ? 'bg-gradient-to-b from-white to-[#CBD5E1] text-[#050608] border border-white'
            : 'bg-[#141720] border border-white/25 text-transparent'
        }">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
            <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="space-y-1">
          <div class="text-[15.5px] font-bold ${checked ? 'text-white' : 'text-inkPrimary'}">${escapeHtml(habit.title)}</div>
          <p class="text-[14.5px] text-inkSecondary leading-relaxed">${escapeHtml(habit.desc)}</p>
        </div>
      </button>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderOverviewSections();
  renderPauseSteps();
  initCardGlareTracking();
  renderScamLab();
  renderFactCheck();
  renderLinkPresets();
  loadLinkPreset(1);
  renderChecklist();
  syncProgressIndicators();
});
