# Resume Builder — Multilingual Edition

Full-stack resume builder with support for **English 🇬🇧, French 🇫🇷, Arabic 🇸🇦, and Spanish 🇪🇸** (including full RTL layout for Arabic).

---

## What changed vs the original codebase

| File | Change |
|---|---|
| `client/src/i18n/translations.js` | **NEW** — all UI strings for all 4 languages |
| `client/src/context/LanguageContext.jsx` | **NEW** — React context; persists choice to `localStorage`; sets `<html dir>` |
| `client/src/components/LanguageSwitcher.jsx` | **NEW** — dropdown picker in the navbar |
| `client/src/App.jsx` | Wrapped with `<LanguageProvider>` |
| `client/src/components/Navbar.jsx` | Renders `<LanguageSwitcher>`, all text via `t.*` |
| `client/src/components/ResumeForm/*` | All labels/placeholders via `t.*` |
| `client/src/components/ResumePreview/index.jsx` | Section titles via `t.pdf.*`; RTL-aware layout |
| `client/src/pages/*.jsx` | All text via `t.*` |
| `client/src/styles/global.css` | RTL overrides, Arabic font stack, `inset-inline-end` for toast |
| `client/src/context/ResumeContext.jsx` | Added `lang` field to `defaultResume` |
| `server/models/Resume.js` | Added `lang` field (`enum: ['en','fr','ar','es']`) |
| `server/templates/resumeTemplate.js` | Section headings localised; RTL `dir` + Arabic font |
| `server/controllers/resumeController.js` | Passes `lang` through to PDF template |
| `client/src/pages/EditorPage.jsx` | Embeds `lang` in save payload |

---

## Quick Start

### 1. Clone / unzip and install

```bash
# Server
cd server
npm install
cp .env.example .env   # fill in MONGO_URI, JWT secrets, optional GEMINI_API_KEY

# Client
cd ../client
npm install
cp .env.example .env   # optional: add VITE_GOOGLE_CLIENT_ID
```

### 2. Run

```bash
# Terminal 1 — API
cd server && npm run dev

# Terminal 2 — Vite dev server
cd client && npm run dev
```

Open **http://localhost:5173**

---

## How the i18n system works

### Language selection
The **LanguageSwitcher** dropdown (in the navbar) calls `setLang(code)` from `LanguageContext`.  
The chosen code is stored in `localStorage` under the key `rb_lang` so it survives page refreshes.

### RTL support
When the user selects Arabic, `LanguageContext` sets `document.documentElement.dir = 'rtl'` and `document.documentElement.lang = 'ar'`.  
CSS uses logical properties (`margin-inline-start`, `inset-inline-end`, `border-inline-end`) so the layout mirrors automatically.

### PDF localisation
When the user saves a resume the current language code is written to the `lang` field of the MongoDB document.  
`pdfService.generate()` passes the full resume object (including `lang`) to `resumeTemplate.js`, which selects the correct label set and sets `dir="rtl"` for Arabic.

### Adding a new language
1. Add an entry to `client/src/i18n/translations.js` following the existing pattern.
2. Add the code to `SUPPORTED_LANGUAGES` in the same file.
3. Add the code to the `enum` array in `server/models/Resume.js`.
4. Add a label entry to the `PDF_LABELS` map in `server/templates/resumeTemplate.js`.

---

## Environment variables

### server/.env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume-builder
GEMINI_API_KEY=          # optional — enables AI bullet & summary features
CLIENT_URL=http://localhost:5173
JWT_ACCESS_SECRET=       # generate: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_REFRESH_SECRET=      # same as above
GOOGLE_CLIENT_ID=        # optional — enables Google One-Tap sign-in
```

### client/.env
```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=   # must match server GOOGLE_CLIENT_ID
```
