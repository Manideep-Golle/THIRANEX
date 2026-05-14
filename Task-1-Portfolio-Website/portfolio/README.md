# Golle Manideep - Full Stack Developer Portfolio

A modern, production-ready full-stack portfolio website built with React, Node.js, Express, and MongoDB.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI Library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animations and transitions
- **Lucide React** - Icon library
- **React Type Animation** - Typing effect
- **React CountUp** - Animated counters
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation
- **Morgan** - HTTP request logger

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   ├── sections/        # All page sections
│   │   │   └── ui/              # Reusable UI components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utilities
│   │   ├── styles/              # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/
    └── src/
        ├── config/              # Database config
        ├── controllers/         # Route controllers
        ├── middleware/          # Error handling, auth
        ├── models/              # Mongoose models
        ├── routes/              # API routes
        ├── utils/               # Utility functions
        └── server.js            # Entry point
```

## 🛠️ Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
```

## 🌐 Deployment

### Frontend - Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel Dashboard:
   - `VITE_API_URL` = Your backend URL

### Backend - Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) and create a new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables:
   - `MONGODB_URI`
   - `NODE_ENV` = production
   - `CORS_ORIGIN` = Your frontend URL

### MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use `0.0.0.0/0` for all)
5. Get your connection string and add to `.env`

## 📧 Contact Form API

### POST /api/contact
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /api/contact
Get all contact submissions (Admin).

### GET /api/contact/:id
Get single contact submission.

### PUT /api/contact/:id/read
Mark contact as read.

### DELETE /api/contact/:id
Delete contact submission.

## 🎨 Features

- ✅ Dark/Light mode toggle
- ✅ Fully responsive design
- ✅ Smooth scroll animations
- ✅ Animated counters
- ✅ Scroll progress bar
- ✅ Back to top button
- ✅ Typing animation in hero
- ✅ Expandable project cards
- ✅ Animated timeline for education
- ✅ Form validation with error messages
- ✅ Toast notifications
- ✅ SEO-friendly structure
- ✅ Professional typography
- ✅ Glass morphism effects
- ✅ Grid pattern backgrounds

## 📄 Sections

1. Hero - Animated introduction
2. About - Professional summary
3. Skills - Categorized with progress bars
4. Projects - Featured work with details
5. Experience - Work history timeline
6. Certifications - Credentials display
7. Education - Animated timeline
8. Achievements - Award cards
9. Strengths - Core competencies
10. Hobbies - Personal interests
11. Contact - Functional contact form

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Golle Manideep**
- Full Stack Developer
- AI Enthusiast
- IIIT RGUKT Basar

---

Built with ❤️ using React, Node.js, and MongoDB
