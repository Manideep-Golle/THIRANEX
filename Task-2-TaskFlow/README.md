# TaskFlow - Full Stack Task Management SaaS

A modern production-ready task management application built using React, TypeScript, Tailwind CSS, and Supabase.

Developed as part of the Thiranex Full Stack Development Internship.

---

## 🚀 Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Vite

### Backend & Database
- Supabase
- PostgreSQL
- Row Level Security (RLS)

### Additional Features
- Realtime Database Updates
- Authentication & Authorization
- Responsive SaaS UI
- Dark/Light Theme
- Optimistic UI Updates

---

## 📁 Project Structure

```txt
taskflow/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── tasks/
│   │   └── dashboard/
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   ├── lib/
│   └── types/
│
├── supabase/
│   └── migrations/
│
├── public/
└── Configuration Files
```

---

## 🛠️ Installation

### Prerequisites

- Node.js v18+
- npm
- Supabase account

---

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

### 4. Setup Supabase

1. Create project at Supabase
2. Open SQL Editor
3. Run migration SQL from:
   ```txt
   supabase/migrations/
   ```

---

### 5. Run Development Server

```bash
npm run dev
```

---

## 🌐 Deployment

### Frontend Hosting
- Vercel
- Netlify

### Backend & Database
- Supabase Cloud

---

## 🎨 Features

- ✅ User Authentication
- ✅ Task CRUD Operations
- ✅ Realtime Task Updates
- ✅ Dashboard Analytics
- ✅ Task Categories
- ✅ Priority Management
- ✅ Due Date Tracking
- ✅ Mobile Responsive Design
- ✅ Glassmorphism UI
- ✅ SaaS-inspired Design
- ✅ Dark/Light Mode

---

## 📊 Database Schema

### Tables

#### profiles
Stores authenticated user profiles.

#### tasks
Stores task information:
- title
- description
- priority
- due dates
- status

#### categories
Stores custom user categories with colors.

---

## 🔐 Security

- Row Level Security (RLS)
- Protected API Access
- User-specific data isolation
- Secure authentication flows

---

## 👨‍💻 Internship Task

Task-2: Task Management Application

Thiranex Full Stack Development Internship

---

## 👤 Author

**Golle Manideep**
- Full Stack Developer
- AI Enthusiast
- IIIT RGUKT Basar