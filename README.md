# 🎓 Luminary AI — AI Study Companion

An intelligent, full-stack learning platform built to transform notes and study topics into interactive, AI-generated study modules. Powered by **Google Gemini AI**, **React 19**, **Vite**, and an **Express backend**, this application features a futuristic UI with physics-based animations, WebGL graphics, and adaptive review workflows.

---

## 🌟 About the Project

**AI Study Companion** simplifies learning by automatically converting raw text or topics into structured, interactive study materials. Whether preparing for exams or exploring new subjects, users can instantly generate flashcards, timed quizzes, topic summaries, and node-based mind maps—all tailored to their learning pace.

---
DEPLOY LINK : https://luminary-ai-eta.vercel.app/

## 👥 Dual Portals & Credentials

The platform provides role-based access control with two distinct portals:

### 1. 🎓 User Portal
- **Capabilities**: Generate study modules, attempt interactive quizzes, flip flashcards, view node-based mind maps, bookmark key concepts, and review incorrect responses in the **Wrong Answers Bank**.

### 2. 🔐 Admin Portal & Real-time Analytics
- **Access Credentials**:
  - **Admin Email**: `admin@luminary.ai`
  - **Admin Password**: `admin123` *(or `password123`)*
- **Admin Specialities & Monitoring**:
  - 🟢 **Active Users Tracking**: Real-time monitoring of active user sessions.
  - 📊 **Detailed Login Analytics**: Comprehensive audit log tracking exact login timestamps, user IP addresses, browser types, and device information for every session.
  - 📈 **Platform Telemetry**: Real-time aggregated metrics showing total registered users, daily logins, total AI generation requests, flashcards created, quizzes taken, and average quiz scores.

---

## 🔥 Key Specialties & Features

- **⚡ Instant AI Module Generation**: Uses Google Generative AI (Gemini) to generate study content, structured flashcard decks, quiz questions with instant feedback, and visual mind maps.
- **🎯 Targeted Remediation ("Wrong Answers Bank")**: Automatically tracks incorrectly answered quiz questions in a dedicated review bank so learners can eliminate knowledge gaps.
- **🧠 Interactive Mind Maps**: Visualizes subject hierarchies and relationships using interactive node graphs powered by React Flow (`@xyflow/react`).
- **🔖 Bookmarks & Custom Study Sessions**: Bookmark key concepts or cards for quick access during dedicated, distraction-free study sessions.
- **🔐 Role-Based Auth & Admin Portal**: Secure JWT-based authentication featuring distinct user and administrator workflows, complete with an Admin Dashboard for managing platform data and analytics.
- **🎨 State-of-the-Art Aesthetic**: A dark-mode UI with custom glassmorphism, dynamic lighting, custom cursor followers, and interactive micro-animations.

---

## 🛠️ Tech Stack

### **Frontend**
- **Core**: React 19, Vite, React Router v7
- **Styling**: Tailwind CSS, Custom CSS Modules, Lucide React Icons
- **Interactive Diagrams**: `@xyflow/react` (React Flow)
- **Validation**: Zod

### **Backend & Database**
- **Runtime & Server**: Node.js, Express.js
- **AI Integration**: `@google/generative-ai` (Gemini SDK)
- **Auth & Security**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, CORS, Dotenv

---

## 🎭 Animations & Interactive Visual Effects

This project prioritizes high visual engagement by blending **physics engines**, **GPU WebGL shaders**, **Framer Motion**, and **GSAP text typography**:

### 1. ⚙️ Physics Engine (`matter-js`)
- **`FallingText`**: Physics-simulated text tags that drop, bounce, collide with boundaries, and react dynamically to mouse drags and gravity.

### 2. 🌌 WebGL GPU Shaders (`ogl`)
- **`SideRays`**: A custom GPU-accelerated WebGL canvas shader emitting ambient, flowing light rays along the viewport sides.

### 3. 🎬 Motion & UI Physics (`framer-motion`)
- **Page Transitions**: Smooth entering/exiting page animations (`AnimatedPage`) eliminating layout flickers.
- **Interactive Floating Dock & Pill Navigation**: Spring-animated floating macOS-style dock and smooth tab-switching pill navbar.
- **Modals & Cards**: Spring physics for popups, command menus (`Ctrl+K`), and card flips.

### 4. 🌀 GSAP & Canvas Animations (`gsap`)
- **Particle Canvas (`ParticlesBg`)**: Floating ambient particle background.
- **Scroll Velocity (`ScrollVelocity`)**: Kinetic text marquee accelerating dynamically based on user scroll velocity.

### 5. 🔤 Dynamic Typography & Kinetic Text
- **`BlurText`**: Smooth gradual unblur text reveal on entry.
- **`DecryptedText` & `ScrambledText`**: Cyberpunk-style letter decryption effect on render or hover.
- **`FuzzyText`**: WebGL/Canvas fuzzy glitch distortion on interactive text headers.
- **`GradientText` & `ShinyText`**: Flowing multi-color gradients and glossy light sweeps over text.
- **`TextPressure`**: Flexible SVG typography that dynamically deforms and stretches based on mouse proximity.

### 6. ✨ Ambient Effects & Celebrations
- **`AuroraBackground` & `BorderGlow`**: Flowing aurora color backdrop and animated glowing card borders.
- **`GradualBlur`**: Soft progressive edge blurring for header and footer overlays.
- **`canvas-confetti`**: Confetti explosions celebrating quiz completions and study milestones.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 2. Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AP23110010203/Luminary-AI.git
   cd Luminary-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3001
   JWT_SECRET=your_super_secret_jwt_key
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. **Run the Application**:
   - **Frontend & Server (Concurrently)**:
     ```bash
     npm run dev:full
     ```
   - Or run individually:
     ```bash
     npm run server   # Starts Express backend on port 3001
     npm run dev      # Starts Vite dev server
     ```

---

## 📁 Project Structure

```
flam/
├── api/                 # Vercel serverless functions entrypoint
├── public/              # Static assets
├── server/              # Express backend, JWT auth, Gemini AI service & DB
│   ├── routes/          # API endpoints (Auth, Study, Admin)
│   ├── geminiService.js # Google Gemini AI integration
│   └── db.js            # Custom JSON database layer
├── src/
│   ├── components/
│   │   ├── auth/        # Protected routes (User/Admin)
│   │   ├── blocks/      # Quiz, Flashcard, MindMap & Summary blocks
│   │   ├── layout/      # Navbar, Footer
│   │   └── ui/          # Kinetic text, Matter.js physics, OGL WebGL shaders
│   ├── context/         # Auth, Theme, and Study state providers
│   ├── pages/           # Landing, Dashboard, Generate, Quiz, Flashcards, Admin
│   ├── App.jsx          # Router & animated page wrappers
│   └── main.jsx         # App entry point
├── package.json
├── vercel.json          # Vercel deployment configuration
└── vite.config.js
```

DEPLOY LINK : https://luminary-ai-eta.vercel.app/
DEMO LINK : https://drive.google.com/file/d/1ME5SCPFXSDMzsWXD6fwZxidxwos2j_Ve/view?usp=drive_link
