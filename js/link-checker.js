function renderLinkPresets() {
  const mount = document.getElementById('link-preset-pills');
  if (!mount) return;
  mount.innerHTML = LINK_PRESETS.map(
    (preset, idx) => `
    <button type="button" onclick="loadLinkPreset(${idx})" class="btn-dark-glass px-3.5 sm:px-4 py-2 rounded-lg text-[14px] font-medium cursor-pointer">
      ${escapeHtml(preset.label)}
    </button>
  `
  ).join('');
}

function loadLinkPreset(index) {
  const item = LINK_PRESETS[index];
  if (!item) return;
  const input = document.getElementById('link-checker-input');
  if (input) input.value = item.url;
  inspectUrl(item.url);
}

function onInspectUrlSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('link-checker-input');
  if (input) inspectUrl(input.value);
}

function isRawIpv4(host) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(host);
}

function splitHostname(hostname) {
  const lower = hostname.toLowerCase();
  if (isRawIpv4(lower) || lower === 'localhost' || !lower.includes('.')) {
    return { subdomain: '', registeredDomain: lower, tld: isRawIpv4(lower) ? 'IPv4' : '' };
  }

  const parts = lower.split('.').filter(Boolean);
  const multiPartTlds = ['co.uk', 'com.au', 'co.jp', 'org.uk', 'gov.uk', 'com.sg', 'co.nz', 'com.lk', 'gov.lk', 'edu.lk'];
  const tailTwo = parts.slice(-2).join('.');
  const rootCount = parts.length >= 3 && multiPartTlds.includes(tailTwo) ? 3 : 2;

  return {
    registeredDomain: parts.slice(-rootCount).join('.'),
    subdomain: parts.length > rootCount ? parts.slice(0, -rootCount).join('.') : '',
    tld: '.' + parts[parts.length - 1],
  };
}

function inspectUrl(rawInput) {
  const errBanner = document.getElementById('link-error-banner');
  const trimmed = (rawInput || '').trim();

  if (!trimmed) {
    if (errBanner) {
      errBanner.textContent = 'Enter a web address above or click one of the five sample links below.';
      errBanner.classList.remove('hidden');
    }
    return;
  }

  if (/\s/.test(trimmed)) {
    if (errBanner) {
      errBanner.textContent = 'Web addresses cannot contain spaces. Remove any spaces and try again.';
      errBanner.classList.remove('hidden');
    }
    return;
  }

  const lowerInput = trimmed.toLowerCase();
  const hasHttpScheme = lowerInput.startsWith('http://') || lowerInput.startsWith('https://');
  const hasOtherScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed) && !/^[a-z0-9.-]+:\d+/i.test(trimmed);
  let candidate = trimmed;
  let protocolOmitted = false;

  if (!hasHttpScheme && !hasOtherScheme) {
    candidate = 'http://' + candidate;
    protocolOmitted = true;
  }

  let parsed;
  try {
    parsed = new URL(candidate);
    const host = parsed.hostname;
    if (!host || (!host.includes('.') && host !== 'localhost') || host.startsWith('.') || host.endsWith('.')) {
      throw new Error('Malformed domain');
    }
  } catch (err) {
    if (errBanner) {
      errBanner.textContent = 'That does not look like a valid web address. Include a domain name like example.com or pick a sample link.';
      errBanner.classList.remove('hidden');
    }
    return;
  }

  if (errBanner) errBanner.classList.add('hidden');

  const host = parsed.hostname.toLowerCase();
  const { subdomain, registeredDomain, tld } = splitHostname(host);
  const pathAndQuery = `${parsed.pathname || '/'}${parsed.search || ''}${parsed.hash || ''}`;

  const checks = [];
  let overall = 'safe';
  const elevateRisk = (lvl) => {
    const order = { safe: 0, caution: 1, high: 2 };
    if (order[lvl] > order[overall]) overall = lvl;
  };

  const isHttps = parsed.protocol === 'https:' && !protocolOmitted;
  const schemeLabel = parsed.protocol.replace(':', '').toUpperCase();

  if (protocolOmitted) {
    elevateRisk('caution');
    checks.push({
      name: 'HTTPS Encryption',
      status: 'Missing https://',
      tone: 'amber',
      detail: 'No protocol was included in the link. Confirm the browser upgrades to encrypted https:// before entering any personal details.',
    });
  } else if (isHttps) {
    checks.push({
      name: 'HTTPS Encryption',
      status: 'Encrypted',
      tone: 'emerald',
      detail: 'Uses encrypted https:// transport. Scammers can still enable HTTPS, so always verify the website owner too.',
    });
  } else {
    elevateRisk('high');
    checks.push({
      name: 'HTTPS Encryption',
      status: 'Unencrypted HTTP',
      tone: 'rose',
      detail: `Uses plain ${schemeLabel} without encryption. Passwords or card numbers sent here are exposed in transit.`,
    });
  }

  const watchedBrands = ['paypal', 'google', 'apple', 'microsoft', 'instagram', 'bank', 'netflix', 'amazon', 'dhl'];
  const brandInSubdomain = watchedBrands.find(
    (b) => subdomain && subdomain.includes(b) && !registeredDomain.includes(b)
  );

  const typoPatterns = [
    { rx: /paypa1|paypol|paypai/i, brand: 'PayPal' },
    { rx: /amaz0n|arnazon|amazom/i, brand: 'Amazon' },
    { rx: /g00gle|goog1e|gooogle/i, brand: 'Google' },
    { rx: /app1e|appl3/i, brand: 'Apple' },
    { rx: /micros0ft|rnicrosoft/i, brand: 'Microsoft' },
    { rx: /instagrarn|1nstagram/i, brand: 'Instagram' },
    { rx: /netf1ix|netfl1x/i, brand: 'Netflix' },
    { rx: /dh1/i, brand: 'DHL' },
  ];
  const typoMatch = typoPatterns.find((p) => p.rx.test(host));
  const hasAtMask = trimmed.includes('@') || Boolean(parsed.username);
  const hasPunycode = host.includes('xn--');

  if (brandInSubdomain) {
    elevateRisk('high');
    const capBrand = brandInSubdomain.charAt(0).toUpperCase() + brandInSubdomain.slice(1);
    checks.push({
      name: 'Brand Spoofing / Lookalikes',
      status: 'Subdomain Spoof',
      tone: 'rose',
      detail: `"${brandInSubdomain}" is placed in the subdomain (${subdomain}) to impersonate ${capBrand}, while the actual site belongs to ${registeredDomain}.`,
    });
  } else if (typoMatch || hasPunycode || hasAtMask) {
    elevateRisk('high');
    checks.push({
      name: 'Brand Spoofing / Lookalikes',
      status: 'Lookalike Trap',
      tone: 'rose',
      detail: typoMatch
        ? `Lookalike character swap detected in ${registeredDomain}, mimicking ${typoMatch.brand} using digits or altered letters.`
        : hasAtMask
        ? 'Contains an "@" credential trick designed to disguise the true destination domain.'
        : 'Uses encoded punycode (xn--) that can disguise lookalike non-Latin characters.',
    });
  } else {
    checks.push({
      name: 'Brand Spoofing / Lookalikes',
      status: 'No Spoof Found',
      tone: 'emerald',
      detail: 'No major brand name hidden in the subdomain and no common lookalike character swaps detected.',
    });
  }

  const riskyTlds = ['.xyz', '.top', '.ru', '.click', '.tk', '.gq', '.ml', '.zip', '.loan'];
  if (isRawIpv4(host)) {
    elevateRisk('high');
    checks.push({
      name: 'Domain Reputation & IP',
      status: 'Raw IP Address',
      tone: 'rose',
      detail: `Points directly to a numeric IP server (${host}) instead of a verified organization domain, which is a strong phishing signal.`,
    });
  } else if (riskyTlds.includes(tld)) {
    elevateRisk('caution');
    checks.push({
      name: 'Domain Reputation & IP',
      status: `Risky ${tld} Ending`,
      tone: 'amber',
      detail: `Ends in ${tld}, an inexpensive domain extension frequently used for disposable scam pages.`,
    });
  } else if ((registeredDomain.match(/-/g) || []).length >= 2) {
    elevateRisk('caution');
    checks.push({
      name: 'Domain Reputation & IP',
      status: 'Hyphenated Domain',
      tone: 'amber',
      detail: `Contains multiple hyphens (${registeredDomain}), a common pattern on imitation support portals.`,
    });
  } else {
    checks.push({
      name: 'Domain Reputation & IP',
      status: 'Standard Domain',
      tone: 'emerald',
      detail: `Uses a standard registered domain (${registeredDomain}) rather than a raw IP address or high-risk disposable TLD.`,
    });
  }

  const shortenerList = ['bit.ly', 'tinyurl.com', 't.co', 'rb.gy', 'is.gd', 'ow.ly', 'cutt.ly', 'buff.ly'];
  const isShortener = shortenerList.includes(registeredDomain);
  let decodedSearch = (parsed.search || '').toLowerCase();
  try {
    decodedSearch = decodeURIComponent(decodedSearch);
  } catch (err) {
    decodedSearch = (parsed.search || '').toLowerCase();
  }
  const hasRedirectParam =
    /(redirect|next|url|dest|return_to)=/.test(decodedSearch) &&
    (decodedSearch.includes('http://') || decodedSearch.includes('https://'));

  if (isShortener) {
    elevateRisk('caution');
    checks.push({
      name: 'Redirect / Shortener Risk',
      status: 'Shortened Link',
      tone: 'amber',
      detail: `${registeredDomain} hides the final destination until clicked. Never sign in or pay after following an unknown short URL.`,
    });
  } else if (hasRedirectParam) {
    elevateRisk('caution');
    checks.push({
      name: 'Redirect / Shortener Risk',
      status: 'Embedded Redirect',
      tone: 'amber',
      detail: 'The query string contains another web address that may silently bounce you to a third-party site.',
    });
  } else {
    checks.push({
      name: 'Redirect / Shortener Risk',
      status: 'Direct Destination',
      tone: 'emerald',
      detail: 'Not routed through a known link shortener or obvious open-redirect parameter.',
    });
  }

  const echoEl = document.getElementById('link-parsed-echo');
  const overallBadge = document.getElementById('link-overall-badge');
  const connEl = document.getElementById('anatomy-connection');
  const connDesc = document.getElementById('anatomy-connection-desc');
  const ownerBox = document.getElementById('anatomy-owner-box');
  const ownerTag = document.getElementById('anatomy-owner-tag');
  const ownerVal = document.getElementById('anatomy-owner-value');
  const ownerDesc = document.getElementById('anatomy-owner-desc');
  const subPathVal = document.getElementById('anatomy-subpath-value');
  const subPathDesc = document.getElementById('anatomy-subpath-desc');
  const gridEl = document.getElementById('link-security-grid');

  if (echoEl) echoEl.textContent = protocolOmitted ? `${trimmed}  (no protocol specified)` : parsed.href;

  if (overallBadge) {
    if (overall === 'high') {
      overallBadge.innerHTML = `<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-roseAlert/15 border border-roseAlert/50 text-[14.5px] font-bold text-roseAlert">High Risk</span>`;
    } else if (overall === 'caution') {
      overallBadge.innerHTML = `<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amberWarn/15 border border-amberWarn/50 text-[14.5px] font-bold text-amberWarn">Proceed with Caution</span>`;
    } else {
      overallBadge.innerHTML = `<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emeraldSafe/15 border border-emeraldSafe/50 text-[14.5px] font-bold text-emeraldSafe">Looks Safe</span>`;
    }
  }

  if (connEl) {
    if (protocolOmitted) {
      connEl.textContent = '(omitted)';
      connEl.className = 'font-mono text-[18px] sm:text-[19px] font-semibold text-amberWarn wrap-anywhere';
    } else {
      connEl.textContent = isHttps ? 'https://' : parsed.protocol === 'http:' ? 'http://' : parsed.protocol;
      connEl.className = `font-mono text-[18px] sm:text-[19px] font-semibold wrap-anywhere ${isHttps ? 'text-emeraldSafe' : 'text-roseAlert'}`;
    }
  }
  if (connDesc) {
    connDesc.textContent = protocolOmitted
      ? 'No https:// specified. Check for the padlock in your browser.'
      : isHttps
      ? 'Encrypted connection between your browser and the server.'
      : 'Unencrypted connection. Never type passwords here.';
  }

  if (ownerVal) ownerVal.textContent = registeredDomain;
  if (ownerBox && ownerTag) {
    ownerBox.classList.remove('owner-card-silver', 'owner-card-safe', 'owner-card-danger', 'owner-card-warn');
    if (overall === 'high') {
      ownerBox.classList.add('owner-card-danger');
      ownerTag.className = 'text-[13px] font-bold px-2.5 py-0.5 rounded-md bg-roseAlert text-[#050608]';
      ownerTag.textContent = 'Suspicious Owner';
    } else if (overall === 'caution') {
      ownerBox.classList.add('owner-card-warn');
      ownerTag.className = 'text-[13px] font-bold px-2.5 py-0.5 rounded-md bg-amberWarn text-[#050608]';
      ownerTag.textContent = 'Check Owner';
    } else {
      ownerBox.classList.add('owner-card-safe');
      ownerTag.className = 'text-[13px] font-bold px-2.5 py-0.5 rounded-md bg-emeraldSafe text-[#050608]';
      ownerTag.textContent = 'Verified Structure';
    }
  }

  if (ownerDesc) {
    if (brandInSubdomain) {
      const cap = brandInSubdomain.charAt(0).toUpperCase() + brandInSubdomain.slice(1);
      ownerDesc.textContent = `Controlled by ${registeredDomain}, not ${cap}.`;
    } else if (isRawIpv4(host)) {
      ownerDesc.textContent = `No registered brand name. Connects straight to server ${host}.`;
    } else if (isShortener) {
      ownerDesc.textContent = `${registeredDomain} redirects to another hidden address.`;
    } else {
      ownerDesc.textContent = `Your browser connects directly to servers owned by ${registeredDomain}.`;
    }
  }

  if (subPathVal) {
    subPathVal.innerHTML = `
      <div><span class="text-inkMuted">Subdomain:</span> <span class="${brandInSubdomain ? 'text-roseAlert font-semibold' : 'text-white'}">${escapeHtml(subdomain || '(none)')}</span></div>
      <div><span class="text-inkMuted">Path:</span> <span class="text-inkSecondary">${escapeHtml(pathAndQuery)}</span></div>
    `;
  }

  if (subPathDesc) {
    subPathDesc.textContent = brandInSubdomain
      ? `"${subdomain}" is a decoy prefix placed before "${registeredDomain}".`
      : 'Whoever owns the root domain can create any subdomain or path they choose.';
  }

  if (gridEl) {
    gridEl.innerHTML = checks
      .map(
        (c) => `
      <div class="rounded-xl bg-[#080A0F] border border-white/[0.1] p-4 space-y-2 min-w-0">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="font-display text-[15.5px] font-bold text-white">${escapeHtml(c.name)}</span>
          <span class="text-[13px] font-semibold px-2.5 py-0.5 rounded-md border ${clueBadgeTone(c.tone)}">${escapeHtml(c.status)}</span>
        </div>
        <p class="text-[14.5px] text-inkSecondary leading-relaxed wrap-anywhere">${escapeHtml(c.detail)}</p>
      </div>
    `
      )
      .join('');
  }
}
