const TACTICS_CARDS = [
  {
    title: 'Domain Spoofing',
    body: 'Attackers hide familiar brand names inside subdomains or swap subtle characters like an <span class="font-mono text-white">o</span> for a <span class="font-mono text-white">0</span> to send your login to a lookalike server.',
    icon: `<svg class="w-6 h-6 text-[#E2E8F0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10.8 5.1" stroke-linecap="round" /><path d="M14 11a5 5 0 0 0-7.07 0L4.8 13.12a5 5 0 0 0 7.07 7.07l1.32-1.32" stroke-linecap="round" /></svg>`,
    visual: `<svg class="w-32 h-12 opacity-85 shrink-0" viewBox="0 0 128 48" fill="none" aria-hidden="true"><rect x="1" y="9" width="126" height="30" rx="8" stroke="rgba(226,232,240,0.22)" /><text x="14" y="29" fill="#B4BCCB" font-family="JetBrains Mono" font-size="13">amaz</text><text x="46" y="29" fill="#FB7185" font-family="JetBrains Mono" font-size="13" font-weight="600">0</text><text x="55" y="29" fill="#B4BCCB" font-family="JetBrains Mono" font-size="13">n.co</text></svg>`,
  },
  {
    title: 'Manufactured Urgency',
    body: 'Artificial deadlines like two-hour account lockouts, parcel threats, or 10-minute prize timers push you to click before you stop and check.',
    icon: `<svg class="w-6 h-6 text-[#E2E8F0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" aria-hidden="true"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.8 2.2M9.5 2.5h5" stroke-linecap="round" stroke-linejoin="round" /></svg>`,
    visual: `<svg class="w-32 h-12 opacity-85 shrink-0" viewBox="0 0 128 48" fill="none" aria-hidden="true"><rect x="1" y="9" width="126" height="30" rx="8" stroke="rgba(226,232,240,0.22)" /><rect x="10" y="18" width="58" height="12" rx="4" fill="rgba(244,63,94,0.18)" stroke="rgba(251,113,133,0.55)" /><line x1="78" y1="24" x2="114" y2="24" stroke="rgba(226,232,240,0.4)" stroke-width="2" stroke-linecap="round" /></svg>`,
  },
  {
    title: 'Authority Impersonation',
    body: 'Scammers borrow the logos and formal tone of banks, couriers, public grants, or verified creators so you trust the message without checking who actually sent it.',
    icon: `<svg class="w-6 h-6 text-[#E2E8F0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" aria-hidden="true"><path d="M12 3l7.5 3.4v5.3c0 4.6-3.1 8.1-7.5 9.3-4.4-1.2-7.5-4.7-7.5-9.3V6.4L12 3z" stroke-linejoin="round" /><circle cx="12" cy="10.2" r="2.2" /><path d="M8.6 15.8c.9-1.4 2.1-2.1 3.4-2.1s2.5.7 3.4 2.1" stroke-linecap="round" /></svg>`,
    visual: `<svg class="w-32 h-12 opacity-85 shrink-0" viewBox="0 0 128 48" fill="none" aria-hidden="true"><rect x="1" y="9" width="126" height="30" rx="8" stroke="rgba(226,232,240,0.22)" /><circle cx="22" cy="24" r="7" stroke="rgba(226,232,240,0.55)" stroke-width="1.5" /><line x1="37" y1="20" x2="96" y2="20" stroke="rgba(226,232,240,0.45)" stroke-width="2" stroke-linecap="round" /><line x1="37" y1="28" x2="78" y2="28" stroke="rgba(226,232,240,0.24)" stroke-width="2" stroke-linecap="round" /><circle cx="111" cy="24" r="5" stroke="rgba(245,158,11,0.7)" stroke-dasharray="2.5 2" /></svg>`,
  },
  {
    title: 'Context Hijacking',
    body: 'Misleading posts often recycle real photos or old storm clips from another country under a dramatic new headline to make a rumor feel undeniable.',
    icon: `<svg class="w-6 h-6 text-[#E2E8F0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2.5" /><path d="M3.5 15.5l4.8-4.5 3.7 3.5 2.8-2.6 5.7 5.1" stroke-linecap="round" stroke-linejoin="round" /><circle cx="9" cy="9.5" r="1.2" fill="currentColor" /></svg>`,
    visual: `<svg class="w-32 h-12 opacity-85 shrink-0" viewBox="0 0 128 48" fill="none" aria-hidden="true"><rect x="6" y="8" width="48" height="32" rx="6" stroke="rgba(226,232,240,0.28)" /><path d="M62 24H76M72 20L76 24L72 28" stroke="rgba(226,232,240,0.65)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><rect x="84" y="8" width="38" height="32" rx="6" stroke="rgba(245,158,11,0.65)" stroke-dasharray="3 2" /></svg>`,
  },
];

const PRACTICE_CARDS = [
  {
    view: 'scams',
    title: 'Scam Lab',
    statusId: 'dir-scams-status',
    initialStatus: '0 / 9 flags',
    desc: 'Spot suspicious headers, countdown threats, and spoofed links across realistic emails, texts, and DMs.',
    icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M4 6h16v12H4z" stroke-linejoin="round" /><path d="M4 7l8 6 8-6" stroke-linecap="round" stroke-linejoin="round" /></svg>`,
  },
  {
    view: 'facts',
    title: 'Fact Check',
    statusId: 'dir-facts-status',
    initialStatus: '0 / 3 verified',
    desc: 'Check viral social posts, compare source and date clues, and tell real public alerts apart from hoaxes.',
    icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.8-3.8" stroke-linecap="round" /><path d="M8.5 11l1.8 1.8 3.5-3.6" stroke-linecap="round" stroke-linejoin="round" /></svg>`,
  },
  {
    view: 'guide',
    title: 'Link Checker & Guide',
    statusId: 'dir-habits-status',
    initialStatus: '0 / 6 habits',
    desc: 'Reveal the real owner behind any web address and keep track of your everyday safety habits.',
    icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 3l7.5 3.4v5.3c0 4.6-3.1 8.1-7.5 9.3-4.4-1.2-7.5-4.7-7.5-9.3V6.4L12 3z" stroke-linejoin="round" /><path d="M9.2 12l2 2 3.8-4" stroke-linecap="round" stroke-linejoin="round" /></svg>`,
  },
];

const PAUSE_STEPS = [
  {
    num: '01',
    title: 'Stop & Breathe',
    desc: 'Take fifteen seconds whenever an alert threatens an account lockout, demands a quick payment, or promises a sudden prize.',
  },
  {
    num: '02',
    title: 'Inspect the Source',
    desc: 'Read the domain after <span class="font-mono text-white">@</span>, check handle spelling letter by letter, and preview the root domain of any link.',
  },
  {
    num: '03',
    title: 'Verify Separately',
    desc: 'Leave the message and open your own bookmark or official app directly. For viral news, search trusted newsrooms in a new tab.',
  },
  {
    num: '04',
    title: 'Report & Protect',
    desc: 'Mark phishing messages as spam, block clone accounts, and warn friends or group chats before a scam link spreads.',
  },
];

const SCAM_CASES = [
  {
    id: 'bank_alert',
    label: 'Case 1',
    title: 'Bank Account Alert',
    channel: 'Email',
    flags: [
      {
        id: 'f1',
        num: 1,
        title: 'Lookalike sender domain',
        why: 'The sender address security@nationalbank-support.co adds extra words and uses a .co ending to imitate a real bank.',
        action: 'Always read the exact domain after the @ symbol and compare it against your bank’s official site.',
      },
      {
        id: 'f2',
        num: 2,
        title: '2-hour suspension threat',
        why: 'Warning that your account will be "permanently suspended in 2 hours" creates panic so you click before double-checking.',
        action: 'Ignore urgent email countdowns and check for real alerts inside your official banking app.',
      },
      {
        id: 'f3',
        num: 3,
        title: 'Spoofed verification link',
        why: 'The "Verify Identity" button actually points to http://nb-login-verify.net/session, an unencrypted page built to capture passwords.',
        action: 'Never enter login details from an email button. Open your saved bookmark instead.',
      },
    ],
  },
  {
    id: 'parcel_fee',
    label: 'Case 2',
    title: 'Parcel Delivery Fee',
    channel: 'Text Message',
    flags: [
      {
        id: 'f1',
        num: 1,
        title: 'Unverified mobile sender',
        why: 'The text comes from a random mobile number (+44 7911 882104) pretending to be a national courier.',
        action: 'Track parcels from your store order page or official courier app instead of unexpected SMS senders.',
      },
      {
        id: 'f2',
        num: 2,
        title: 'Tiny-fee destruction threat',
        why: 'Demanding $1.95 today or your parcel gets "destroyed" sounds minor, but the real goal is stealing your payment card details.',
        action: 'Treat sudden text messages asking for small customs or redelivery fees as phishing.',
      },
      {
        id: 'f3',
        num: 3,
        title: 'Shortened customs link',
        why: 'The link bit.ly/post-customs-fee hides its true destination and redirects to track-post-delivery.xyz/fee.',
        action: 'Never tap shortened or unfamiliar delivery links to type card information on your phone.',
      },
    ],
  },
  {
    id: 'giveaway_dm',
    label: 'Case 3',
    title: 'Giveaway Winner DM',
    channel: 'Direct Message',
    flags: [
      {
        id: 'f1',
        num: 1,
        title: 'Spoofed impersonator handle',
        why: 'The handle @techdrop_offical drops the second "i" in official and uses a fake outline badge to copy the real creator.',
        action: 'Check handle spelling closely and review account age and public posts before trusting a DM.',
      },
      {
        id: 'f2',
        num: 2,
        title: '10-minute claim countdown',
        why: 'Telling you to "claim within 10 minutes before we pick someone else" uses excitement to rush your decision.',
        action: 'Real giveaways announce winners publicly and do not force a 10-minute timer in private messages.',
      },
      {
        id: 'f3',
        num: 3,
        title: 'Credential-harvesting prize link',
        why: 'Sending you to claim-techdrop-prize.co/login-verify to "confirm your account login and shipping card" is a direct account-theft trap.',
        action: 'Real prizes are free. Never give up your password or card details to claim a giveaway.',
      },
    ],
  },
];

const FACT_CASES = [
  {
    id: 'coastal_bridge',
    tabTitle: 'Post 1',
    shortLabel: 'Coastal Bridge',
    accountName: 'Breaking Storm Wire',
    handle: '@stormwire_alerts',
    postedAt: '18 mins ago',
    headline: 'Coastal Highway Bridge Collapse During Local Storms',
    caption: 'Unbelievable collapse on the Coastal Highway Bridge this morning after heavy rains. Authorities are staying quiet. Share immediately so drivers turn back before getting trapped.',
    correctVerdict: 'misleading',
    verdictName: 'Misleading (Out of Context)',
    verdictSummary: 'The photo is real, but it was taken during a 2019 flood in another country and reposted during local storms. Always check the original date and location of dramatic clips before forwarding.',
    clues: [
      {
        id: 'c1',
        buttonLabel: 'Source Check',
        status: 'Unverified Account',
        tone: 'amber',
        detail: 'Anonymous page created three weeks ago with no named journalists, newsroom link, or local reporting history.',
      },
      {
        id: 'c2',
        buttonLabel: 'Visual / Date Check',
        status: '2019 Foreign Footage',
        tone: 'rose',
        detail: 'A reverse image search matches this exact bridge photo to a 2019 flood report from another country, cropped to hide the date stamp.',
      },
      {
        id: 'c3',
        buttonLabel: 'Official Record',
        status: 'Bridge Open',
        tone: 'rose',
        detail: 'Transport authorities and live traffic cameras confirm every local coastal highway bridge is open and undamaged.',
      },
    ],
    artworkSvg: `
      <svg class="w-full h-auto block" viewBox="0 0 560 210" fill="none" aria-hidden="true">
        <rect width="560" height="210" fill="#080A0F" />
        <path d="M24 54C56 26 112 24 148 44C186 20 248 22 288 46C330 24 394 26 436 48C476 32 514 38 536 56" stroke="rgba(226,232,240,0.28)" stroke-width="1.8" stroke-linecap="round" />
        <g stroke="rgba(226,232,240,0.16)" stroke-width="1.2" stroke-linecap="round">
          <line x1="90" y1="62" x2="78" y2="92" />
          <line x1="170" y1="58" x2="158" y2="88" />
          <line x1="250" y1="64" x2="238" y2="94" />
          <line x1="340" y1="60" x2="328" y2="90" />
          <line x1="430" y1="64" x2="418" y2="94" />
          <line x1="496" y1="62" x2="484" y2="92" />
        </g>
        <line x1="0" y1="138" x2="560" y2="138" stroke="rgba(226,232,240,0.34)" stroke-width="2.2" />
        <rect x="148" y="66" width="12" height="106" fill="#1B202C" stroke="rgba(226,232,240,0.45)" stroke-width="1.4" />
        <rect x="400" y="66" width="12" height="106" fill="#1B202C" stroke="rgba(226,232,240,0.45)" stroke-width="1.4" />
        <path d="M18 138Q88 124 154 74Q280 148 406 74Q472 124 542 138" stroke="rgba(226,232,240,0.55)" stroke-width="1.7" />
        <g stroke="rgba(226,232,240,0.24)" stroke-width="1.1">
          <line x1="196" y1="98" x2="196" y2="138" />
          <line x1="238" y1="112" x2="238" y2="138" />
          <line x1="280" y1="117" x2="280" y2="138" />
          <line x1="322" y1="112" x2="322" y2="138" />
          <line x1="364" y1="98" x2="364" y2="138" />
        </g>
        <path d="M16 172Q74 162 132 172T248 172T364 172T480 172T548 172" stroke="rgba(226,232,240,0.46)" stroke-width="1.6" />
        <path d="M36 188Q94 180 152 188T268 188T384 188T500 188" stroke="rgba(226,232,240,0.24)" stroke-width="1.4" />
        <rect x="408" y="16" width="136" height="28" rx="6" fill="rgba(245,158,11,0.14)" stroke="rgba(245,158,11,0.55)" stroke-dasharray="3 3" />
        <text x="476" y="34" fill="#F59E0B" font-family="DM Sans" font-size="13" font-weight="600" text-anchor="middle">Archived Footage</text>
      </svg>
    `,
  },
  {
    id: 'student_pass',
    tabTitle: 'Post 2',
    shortLabel: 'Student Wi-Fi Pass',
    accountName: 'Youth Grants Daily',
    handle: '@student_perks_portal',
    postedAt: 'Forwarded · 1 hr ago',
    headline: 'Free Student Wi-Fi & Bus Pass Program (Apply Before Midnight)',
    caption: 'Every high-school and college student can register today for free unlimited transit and mobile Wi-Fi! Registration closes at midnight. Submit your student ID and bank card at free-student-grant.xyz.',
    correctVerdict: 'fake',
    verdictName: 'Fake',
    verdictSummary: 'This viral graphic is completely fabricated to collect student ID numbers and payment cards on an unofficial .xyz form. Neither the transport authority nor any ministry announced this scheme.',
    clues: [
      {
        id: 'c1',
        buttonLabel: 'Source Check',
        status: 'Unofficial Page',
        tone: 'rose',
        detail: 'Newly created promotional account with no government verification badge and no links to an official education or transit portal.',
      },
      {
        id: 'c2',
        buttonLabel: 'Visual / Date Check',
        status: 'Data-Harvesting Form',
        tone: 'rose',
        detail: 'The pass graphic is fabricated and points to free-student-grant.xyz, which asks for your ID card and payment details under a midnight timer.',
      },
      {
        id: 'c3',
        buttonLabel: 'Official Record',
        status: 'No Announcement',
        tone: 'rose',
        detail: 'No government ministry, transit agency, or credible newsroom has any record of a free unlimited student Wi-Fi and bus pass program.',
      },
    ],
    artworkSvg: `
      <svg class="w-full h-auto block" viewBox="0 0 560 210" fill="none" aria-hidden="true">
        <rect width="560" height="210" fill="#080A0F" />
        <rect x="64" y="22" width="432" height="166" rx="16" fill="#141720" stroke="rgba(226,232,240,0.28)" stroke-width="1.5" />
        <rect x="64" y="22" width="432" height="46" rx="16" fill="#1B202C" />
        <g transform="translate(90, 33)" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round">
          <path d="M2 10a13 13 0 0 1 18 0" opacity="0.55" />
          <path d="M5.5 13.5a8 8 0 0 1 11 0" opacity="0.82" />
          <circle cx="11" cy="17.5" r="1.4" fill="#FFFFFF" stroke="none" />
        </g>
        <text x="126" y="50" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="14" font-weight="700">FREE STUDENT WI-FI &amp; BUS PASS</text>
        <rect x="90" y="92" width="46" height="32" rx="5" fill="#232939" stroke="rgba(255,255,255,0.28)" />
        <line x1="104" y1="92" x2="104" y2="124" stroke="rgba(255,255,255,0.2)" />
        <line x1="90" y1="108" x2="136" y2="108" stroke="rgba(255,255,255,0.2)" />
        <text x="154" y="106" fill="#F3F5F9" font-family="JetBrains Mono" font-size="13.5">free-student-grant.xyz</text>
        <text x="154" y="128" fill="#FB7185" font-family="DM Sans" font-size="13.5" font-weight="600">Midnight cutoff · ID &amp; card required</text>
        <line x1="90" y1="154" x2="470" y2="154" stroke="rgba(255,255,255,0.1)" />
        <text x="90" y="174" fill="#8B95A7" font-family="DM Sans" font-size="13">Unofficial viral promotional graphic</text>
      </svg>
    `,
  },
  {
    id: 'food_recall',
    tabTitle: 'Post 3',
    shortLabel: 'Allergen Recall',
    accountName: 'National Food Safety Agency',
    handle: '@foodsafety_gov',
    postedAt: 'Today, 9:10 AM',
    headline: 'Batch #402 Oat Crackers Allergen Recall (Undeclared Peanut)',
    caption: 'Hearthstone Foods has issued a voluntary recall for 200g boxes of Oat Crackers marked Batch #402 due to undeclared peanut traces. Customers with peanut allergies should return boxes to the store for a full refund. Full notice: recalls.foodsafety.gov/2026-402',
    correctVerdict: 'real',
    verdictName: 'Real',
    verdictSummary: 'Digital resilience also means recognizing real public advisories. This comes from a verified agency active since 2016, cites exact batch numbers, matches newsroom reports, and links straight to an official .gov page.',
    clues: [
      {
        id: 'c1',
        buttonLabel: 'Source Check',
        status: 'Verified .gov Agency',
        tone: 'emerald',
        detail: 'Published by the verified official National Food Safety Agency account, active continuously since 2016.',
      },
      {
        id: 'c2',
        buttonLabel: 'Visual / Date Check',
        status: 'Exact Batch #402',
        tone: 'emerald',
        detail: 'Clear public safety graphic citing exact product weight and Batch #402 with today’s recall bulletin number, and no login or payment requests.',
      },
      {
        id: 'c3',
        buttonLabel: 'Official Record',
        status: 'Confirmed on .gov',
        tone: 'emerald',
        detail: 'The recall link points directly to recalls.foodsafety.gov/2026-402 and matches identical notices carried by established news outlets.',
      },
    ],
    artworkSvg: `
      <svg class="w-full h-auto block" viewBox="0 0 560 210" fill="none" aria-hidden="true">
        <rect width="560" height="210" fill="#080A0F" />
        <rect x="44" y="20" width="472" height="170" rx="14" fill="#141720" stroke="rgba(226,232,240,0.22)" stroke-width="1.4" />
        <rect x="44" y="20" width="472" height="42" rx="14" fill="#1B202C" />
        <circle cx="70" cy="41" r="8.5" stroke="#34D399" stroke-width="1.6" />
        <path d="M66.2 41l2.4 2.4 4.8-4.8" stroke="#34D399" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        <text x="90" y="46" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="13.5" font-weight="700">OFFICIAL PUBLIC SAFETY NOTICE · #2026-402</text>
        <rect x="70" y="80" width="86" height="90" rx="8" fill="#0D0F14" stroke="rgba(226,232,240,0.3)" />
        <line x1="84" y1="100" x2="142" y2="100" stroke="rgba(255,255,255,0.62)" stroke-width="2" />
        <line x1="84" y1="114" x2="128" y2="114" stroke="rgba(226,232,240,0.3)" stroke-width="1.8" />
        <rect x="82" y="132" width="62" height="22" rx="4" fill="#1B202C" />
        <text x="113" y="148" fill="#F3F5F9" font-family="JetBrains Mono" font-size="13" text-anchor="middle">#402</text>
        <text x="178" y="98" fill="#FFFFFF" font-family="Plus Jakarta Sans" font-size="15.5" font-weight="700">Oat Crackers (200g Box)</text>
        <text x="178" y="121" fill="#B4BCCB" font-family="JetBrains Mono" font-size="13">Batch #402 · Undeclared Peanut</text>
        <text x="178" y="144" fill="#F3F5F9" font-family="DM Sans" font-size="14">Return to store for full refund</text>
        <text x="178" y="167" fill="#34D399" font-family="JetBrains Mono" font-size="13">recalls.foodsafety.gov/2026-402</text>
      </svg>
    `,
  },
];

const LINK_PRESETS = [
  { label: 'Legitimate Bank', url: 'https://www.nationalbank.com/security/alerts' },
  { label: 'Subdomain Spoof', url: 'https://paypal.com.verify-login.net/signin' },
  { label: 'Typosquat Link', url: 'http://amaz0n-support.co/account/update' },
  { label: 'Raw IP Phishing', url: 'http://185.220.101.44/bank/login.php' },
  { label: 'Shortened Redirect', url: 'https://bit.ly/student-bonus-2026' },
];

const RESILIENCE_HABITS = [
  {
    id: 'habit_domain',
    title: 'Read the real domain before logging in',
    desc: 'Check the registered site owner in your browser bar every time a page asks for your password.',
  },
  {
    id: 'habit_apps',
    title: 'Open official apps instead of tapping alert links',
    desc: 'Close urgent bank or courier messages and open your own bookmark or official app directly.',
  },
  {
    id: 'habit_2fa',
    title: 'Enable two-factor authentication on key accounts',
    desc: 'Protect your main email, school login, and social accounts with an authenticator app or passkey.',
  },
  {
    id: 'habit_news',
    title: 'Verify dramatic headlines before forwarding',
    desc: 'Confirm shocking breaking news across at least two trusted newsrooms before sharing in group chats.',
  },
  {
    id: 'habit_passwords',
    title: 'Keep important account passwords unique',
    desc: 'Never reuse your email or banking password on random quizzes, forums, or giveaway forms.',
  },
  {
    id: 'habit_codes',
    title: 'Never share one-time codes or card details for prizes',
    desc: 'Walk away immediately if any DM or giveaway asks for a login code or small card verification.',
  },
];
