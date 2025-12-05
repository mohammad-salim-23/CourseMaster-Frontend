🚀 CourseMaster Frontend
CourseMaster is a modern full-stack e-learning platform frontend built with Next.js, TypeScript, TailwindCSS, Shadcn UI, React Hook Form, and Context API.
This frontend communicates with the CourseMaster backend API to deliver:
User authentication (with secure HTTP-only cookies)
Course browsing & enrollment
Module learning interface
Quiz taking & result view
Assignment submission
Admin dashboard for creating Courses, Modules, Quizzes, Assignments
🎯 Project Overview
CourseMaster Frontend provides a complete learning interface where:
✔ Users can register, log in, browse courses and start learning
✔ Users can take quizzes, submit assignments, and track module completion
✔ Admin can create & manage courses, modules, quizzes, assignments
✔ Full authentication is handled via cookies for improved security
🛠 Tech Stack
Frontend
Next.js 14+ (App Router)
TypeScript
Tailwind CSS
Shadcn UI
React Hook Form
Fetch API
Context API for global auth state
Lucide Icons
Sonner Toast
Backend Integration
REST API via NEXT_PUBLIC_BASE_API
📂 Folder Structure
src/
├── app/              # Next.js App Router pages
├── components/       # UI & shared components
├── hooks/            # Custom React hooks
├── services/         # API service functions (fetch)
├── utils/            # Helper utilities
├── context/          # Auth context (cookie-based)
└── styles/           # Global styles
🔧 Environment Variables
Create a .env.local file in the root directory:
NEXT_PUBLIC_BASE_API=https://your-backend-url.com
Example:
NEXT_PUBLIC_BASE_API=http://localhost:5000/api
📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/mohammad-salim-23/CourseMaster-Frontend.git
cd CourseMaster-Frontend
2️⃣ Install dependencies
npm install
3️⃣ Run the development server
npm run dev
App will run at:
👉 http://localhost:3000
🔐 Authentication (Cookie-Based)
Login returns HTTP-only cookies
User info stored in Context API
Auto redirects based on role
Protected routes for:
/dashboard
/admin/*
/my-courses
/course/[id]
🧑‍💼 Admin Credentials (Default)
Email: salim@dev.com
Password: 123456
🧭 Main Features
👤 User Features
Register & Login with cookie-based auth
Browse all courses
Enroll into courses
Watch course modules
Take quizzes
Submit assignments (file/text)
View progress & completed modules
🛠 Admin Features
Admin can manage the entire LMS system:
✔ Create/Update/Delete Courses
✔ Create/Update/Delete Modules
✔ Create Quizzes
✔ Upload Assignments
✔ View all submissions
✔ Grade assignments
🔗 API Configuration
All API calls use:
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;
Fetching example:
const res = await fetch(`${BASE_URL}/course`, { cache: "no-store" });
🎨 UI
Clean, modern UI powered by Tailwind CSS
Components built using Shadcn UI
Toast notifications via Sonner
Responsive layout (mobile-first)
🚀 Production Build
npm run build
npm run start
🌐 Deployment
Recommended platform: Vercel
Just add your .env.local variables in Vercel Environment Settings.