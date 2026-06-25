/**
 * templates.js
 * Template metadata used by the picker UI and the live preview switcher.
 */

export const TEMPLATES = [
  {
    key:         'classic',
    name:        'Classic',
    description: 'Clean professional layout with blue accents',
    accent:      '#2563eb',
    thumbnail: `
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="160" fill="#fff"/>
        <!-- name bar -->
        <rect x="10" y="10" width="100" height="14" rx="2" fill="#2563eb" opacity=".15"/>
        <rect x="30" y="14" width="60" height="6" rx="1" fill="#2563eb" opacity=".7"/>
        <!-- divider -->
        <rect x="10" y="28" width="100" height="2" fill="#2563eb"/>
        <!-- section -->
        <rect x="10" y="36" width="40" height="4" rx="1" fill="#2563eb" opacity=".6"/>
        <rect x="10" y="44" width="80" height="3" rx="1" fill="#d1d5db"/>
        <rect x="10" y="50" width="70" height="3" rx="1" fill="#d1d5db"/>
        <rect x="10" y="56" width="75" height="3" rx="1" fill="#d1d5db"/>
        <!-- section 2 -->
        <rect x="10" y="66" width="40" height="4" rx="1" fill="#2563eb" opacity=".6"/>
        <rect x="10" y="74" width="85" height="3" rx="1" fill="#d1d5db"/>
        <rect x="10" y="80" width="60" height="3" rx="1" fill="#d1d5db"/>
        <!-- skills chips -->
        <rect x="10" y="96" width="40" height="4" rx="1" fill="#2563eb" opacity=".6"/>
        <rect x="10" y="104" width="22" height="8" rx="4" fill="#eff6ff" stroke="#bfdbfe" stroke-width=".5"/>
        <rect x="36" y="104" width="22" height="8" rx="4" fill="#eff6ff" stroke="#bfdbfe" stroke-width=".5"/>
        <rect x="62" y="104" width="18" height="8" rx="4" fill="#eff6ff" stroke="#bfdbfe" stroke-width=".5"/>
      </svg>`,
  },
  {
    key:         'modern',
    name:        'Modern',
    description: 'Dark navy sidebar with two-column layout',
    accent:      '#1e3a5f',
    thumbnail: `
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="160" fill="#fff"/>
        <!-- sidebar -->
        <rect width="40" height="160" fill="#1e3a5f"/>
        <rect x="6" y="12" width="28" height="6" rx="1" fill="#fff" opacity=".9"/>
        <rect x="6" y="22" width="20" height="3" rx="1" fill="#93c5fd" opacity=".8"/>
        <rect x="6" y="32" width="28" height="1.5" fill="rgba(255,255,255,.2)"/>
        <rect x="6" y="37" width="22" height="3" rx="1" fill="#cbd5e1" opacity=".7"/>
        <rect x="6" y="43" width="18" height="3" rx="1" fill="#cbd5e1" opacity=".7"/>
        <rect x="6" y="49" width="24" height="3" rx="1" fill="#cbd5e1" opacity=".7"/>
        <rect x="6" y="60" width="28" height="1.5" fill="rgba(255,255,255,.2)"/>
        <rect x="6" y="65" width="14" height="6" rx="3" fill="rgba(255,255,255,.15)"/>
        <rect x="22" y="65" width="14" height="6" rx="3" fill="rgba(255,255,255,.15)"/>
        <rect x="6" y="74" width="22" height="6" rx="3" fill="rgba(255,255,255,.15)"/>
        <!-- main area -->
        <rect x="50" y="12" width="60" height="3" rx="1" fill="#d1d5db"/>
        <rect x="50" y="18" width="50" height="3" rx="1" fill="#d1d5db"/>
        <rect x="50" y="30" width="35" height="4" rx="1" fill="#1e3a5f" opacity=".5"/>
        <rect x="50" y="38" width="60" height="2.5" rx="1" fill="#e5e7eb"/>
        <rect x="50" y="43" width="55" height="2.5" rx="1" fill="#e5e7eb"/>
        <rect x="50" y="48" width="50" height="2.5" rx="1" fill="#e5e7eb"/>
        <rect x="50" y="58" width="35" height="4" rx="1" fill="#1e3a5f" opacity=".5"/>
        <rect x="50" y="66" width="60" height="2.5" rx="1" fill="#e5e7eb"/>
        <rect x="50" y="71" width="45" height="2.5" rx="1" fill="#e5e7eb"/>
      </svg>`,
  },
  {
    key:         'minimal',
    name:        'Minimal',
    description: 'Elegant serif typography, no colour distractions',
    accent:      '#111',
    thumbnail: `
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="160" fill="#fff"/>
        <!-- centred name -->
        <rect x="25" y="12" width="70" height="7" rx="1" fill="#111" opacity=".85"/>
        <rect x="35" y="22" width="50" height="3" rx="1" fill="#888" opacity=".6"/>
        <!-- divider -->
        <rect x="10" y="30" width="100" height="1" fill="#111"/>
        <!-- section title -->
        <rect x="10" y="38" width="45" height="3" rx="1" fill="#111" opacity=".7"/>
        <rect x="10" y="38" width="100" height=".5" fill="#eee" y="42"/>
        <!-- entries -->
        <rect x="10" y="46" width="65" height="3" rx="1" fill="#333"/>
        <rect x="10" y="52" width="90" height="2.5" rx="1" fill="#aaa"/>
        <rect x="10" y="57" width="80" height="2.5" rx="1" fill="#aaa"/>
        <!-- section 2 -->
        <rect x="10" y="68" width="40" height="3" rx="1" fill="#111" opacity=".7"/>
        <rect x="10" y="75" width="70" height="3" rx="1" fill="#333"/>
        <rect x="10" y="81" width="90" height="2.5" rx="1" fill="#aaa"/>
        <!-- skills as text -->
        <rect x="10" y="96" width="40" height="3" rx="1" fill="#111" opacity=".7"/>
        <rect x="10" y="103" width="100" height="2.5" rx="1" fill="#aaa"/>
      </svg>`,
  },
  {
    key:         'executive',
    name:        'Executive',
    description: 'Premium dark header with gold accents',
    accent:      '#b7860b',
    thumbnail: `
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="160" fill="#fff"/>
        <!-- dark header -->
        <rect width="120" height="42" fill="#1c1c2e"/>
        <!-- gold bar -->
        <rect y="38" width="120" height="4" fill="#b7860b"/>
        <rect x="12" y="12" width="60" height="7" rx="1" fill="#fff" opacity=".9"/>
        <rect x="12" y="22" width="40" height="3" rx="1" fill="#b7860b" opacity=".9"/>
        <rect x="12" y="28" width="90" height="2.5" rx="1" fill="#aaa" opacity=".5"/>
        <!-- body sections -->
        <rect x="12" y="52" width="96" height="2.5" rx="1" fill="#d1d5db"/>
        <rect x="12" y="57" width="80" height="2.5" rx="1" fill="#d1d5db"/>
        <!-- section title with gold -->
        <rect x="12" y="68" width="36" height="3.5" rx="1" fill="#b7860b" opacity=".8"/>
        <rect x="52" y="69.5" width="56" height="1" fill="#e5e7eb"/>
        <rect x="12" y="76" width="65" height="3" rx="1" fill="#374151"/>
        <rect x="12" y="82" width="90" height="2.5" rx="1" fill="#d1d5db"/>
        <rect x="12" y="87" width="75" height="2.5" rx="1" fill="#d1d5db"/>
        <!-- skill tags -->
        <rect x="12" y="104" width="26" height="9" rx="3" fill="#fefce8" stroke="#fde68a" stroke-width=".5"/>
        <rect x="42" y="104" width="26" height="9" rx="3" fill="#fefce8" stroke="#fde68a" stroke-width=".5"/>
        <rect x="72" y="104" width="26" height="9" rx="3" fill="#fefce8" stroke="#fde68a" stroke-width=".5"/>
      </svg>`,
  },
  {
    key:         'creative',
    name:        'Creative',
    description: 'Teal & coral accents, timeline layout for tech roles',
    accent:      '#0d9488',
    thumbnail: `
      <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="160" fill="#fff"/>
        <!-- teal header -->
        <rect width="120" height="36" fill="#0f172a"/>
        <rect y="33" width="120" height="4" fill="#0d9488"/>
        <rect x="10" y="10" width="55" height="7" rx="1" fill="#fff" opacity=".9"/>
        <rect x="10" y="20" width="80" height="2.5" rx="1" fill="#94a3b8" opacity=".7"/>
        <!-- summary teal bar -->
        <rect x="10" y="46" width="3" height="18" fill="#0d9488"/>
        <rect x="16" y="48" width="90" height="2.5" rx="1" fill="#d1d5db"/>
        <rect x="16" y="53" width="75" height="2.5" rx="1" fill="#d1d5db"/>
        <rect x="16" y="58" width="80" height="2.5" rx="1" fill="#d1d5db"/>
        <!-- section -->
        <rect x="10" y="72" width="38" height="3.5" rx="1" fill="#0d9488" opacity=".8"/>
        <rect x="52" y="73.5" width="58" height="1.5" fill="#ccfbf1"/>
        <!-- timeline dots -->
        <circle cx="14" cy="83" r="3" fill="#0d9488"/>
        <rect x="22" y="80" width="50" height="3" rx="1" fill="#374151"/>
        <rect x="22" y="86" width="78" height="2.5" rx="1" fill="#d1d5db"/>
        <rect x="22" y="91" width="65" height="2.5" rx="1" fill="#d1d5db"/>
        <circle cx="14" cy="103" r="3" fill="#0d9488"/>
        <rect x="22" y="100" width="45" height="3" rx="1" fill="#374151"/>
        <rect x="22" y="106" width="78" height="2.5" rx="1" fill="#d1d5db"/>
        <!-- skill pills -->
        <rect x="10" y="120" width="24" height="9" rx="4.5" fill="#ecfdf5" stroke="#6ee7b7" stroke-width=".5"/>
        <rect x="38" y="120" width="24" height="9" rx="4.5" fill="#ecfdf5" stroke="#6ee7b7" stroke-width=".5"/>
        <rect x="66" y="120" width="24" height="9" rx="4.5" fill="#ecfdf5" stroke="#6ee7b7" stroke-width=".5"/>
      </svg>`,
  },
];

export const TEMPLATE_MAP = Object.fromEntries(TEMPLATES.map(t => [t.key, t]));
