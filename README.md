# 📄 MERN Resume Builder

A full-stack resume builder web app inspired by Reactive Resume. Built with MongoDB, Express, React, and Node.js.

---

## ✨ Features

- ✅ Create, edit, and delete resumes
- ✅ Live preview updates as you type
- ✅ Export resume as PDF (Puppeteer)
- ✅ AI-powered bullet point generator (Google Gemini)
- ✅ AI professional summary improver
- ✅ Skills tag manager with suggestions
- ✅ Keyboard shortcut: `Ctrl+S` to save

---

## 🏗 Tech Stack

| Layer      | Technology                      |
|------------|---------------------------------|
| Frontend   | React 18 + Vite                 |
| Backend    | Node.js + Express               |
| Database   | MongoDB + Mongoose              |
| PDF        | Puppeteer                       |
| AI         | Google Gemini 1.5 Flash         |
| HTTP       | Axios                           |

---

## 📁 Project Structure

```
resume-builder/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/
│       │   ├── ResumeForm/     # Personal, Education, Experience, Skills, Projects
│       │   └── ResumePreview/  # Live preview
│       ├── context/            # ResumeContext (global state)
│       ├── pages/              # HomePage, EditorPage
│       ├── services/           # Axios API calls
│       └── styles/             # Global CSS
│
└── server/          # Express backend
    ├── controllers/ # resumeController, aiController
    ├── models/      # Resume Mongoose model
    ├── routes/      # resumeRoutes, aiRoutes
    ├── services/    # pdfService (Puppeteer), geminiService
    └── templates/   # HTML template for PDF generation
```

---

## 🚀 Setup & Running

### Prerequisites

- Node.js v18+
- MongoDB running locally (or MongoDB Atlas URI)
- (Optional) Google Gemini API key for AI features

---

### 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and Gemini API key
npm run dev
```

The server runs on **http://localhost:5000**

---

### 2. Frontend Setup

```bash
cd client
npm install
cp .env.example .env
# .env is pre-configured to proxy to localhost:5000
npm run dev
```

The frontend runs on **http://localhost:5173**

---

### 3. Environment Variables

**server/.env**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume-builder
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
```

**client/.env** (optional — Vite proxies /api to server by default)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🔌 API Endpoints

| Method | Endpoint                  | Description            |
|--------|---------------------------|------------------------|
| GET    | /api/resumes              | List all resumes       |
| POST   | /api/resumes              | Create a resume        |
| GET    | /api/resumes/:id          | Get single resume      |
| PUT    | /api/resumes/:id          | Update a resume        |
| DELETE | /api/resumes/:id          | Delete a resume        |
| GET    | /api/resumes/:id/pdf      | Export resume as PDF   |
| POST   | /api/ai/suggestions       | AI bullet generator    |
| POST   | /api/ai/improve           | AI summary improver    |
| GET    | /api/health               | Health check           |

---

## 👥 Developer Split

| Task                           | Developer  |
|--------------------------------|-----------|
| React context & state          | Frontend  |
| ResumeForm (all sections)      | Frontend  |
| ResumePreview live render      | Frontend  |
| API service (axios)            | Frontend  |
| Pages & routing                | Frontend  |
| Express server setup           | Backend   |
| Mongoose model                 | Backend   |
| CRUD controllers & routes      | Backend   |
| Puppeteer PDF service          | Backend   |
| Gemini AI integration          | Backend   |

---

## 🤖 AI Features (Gemini)

### Bullet Point Generator
In the **Experience** section, enter a job role and click **Generate** to get 6 AI-written resume bullets.

**POST /api/ai/suggestions**
```json
{ "jobRole": "Backend Developer Intern" }
```
Response:
```json
{ "bullets": ["Built REST APIs serving 5k+ requests/day", "..."] }
```

### Summary Improver
In the **Personal Info** section, write a summary and click **✨ AI Improve** to rewrite it professionally.

> Requires `GEMINI_API_KEY` in `server/.env`

---

## 📄 PDF Export

1. Save your resume first (the server needs the ID)
2. Click **⬇ PDF** in the editor toolbar
3. The server renders the HTML template with Puppeteer and streams back a PDF

> Note: First PDF generation may take a few seconds while Puppeteer starts.

---

## 🔮 Future Improvements

- Multiple resume templates (Modern, Minimal, Creative)
- User authentication (JWT)
- Autosave with debounce
- Drag-and-drop section reordering
- Shareable public resume links
- Import from LinkedIn
- Cover letter builder
