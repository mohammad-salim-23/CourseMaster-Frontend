import Link from "next/link";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar - Updated Design */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6 shadow-2xl">
        
        {/* Header/Title */}
        <h2 className="text-2xl font-extrabold mb-8 border-b border-teal-700 pb-4">
          <span className="text-teal-400">CourseMaster</span> Admin
        </h2>

        {/* Navigation */}
        <nav className="space-y-4"> {/* Increased space-y to 4 */}
          
          {/* Dashboard */}
          <div className="group">
             <Link 
               href="/admin" 
               className="flex items-center space-x-3 text-lg font-medium p-3 rounded-lg transition duration-200 hover:bg-teal-700 hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
             >
               <span className="text-xl">📊</span> 
               <span>Dashboard</span>
             </Link>
          </div>
          
          {/* Manage Courses */}
          <div className="group">
            <Link 
              href="/admin/courses"
              className="flex items-center space-x-3 text-lg font-medium p-3 rounded-lg transition duration-200 hover:bg-teal-700 hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              <span className="text-xl">📚</span> 
              <span>Manage Courses</span>
            </Link>
          </div>
          
          {/* Create Course */}
          <div className="group">
              <Link 
                href="/admin/courses/create"
                className="flex items-center space-x-3 text-lg font-medium p-3 rounded-lg transition duration-200 hover:bg-teal-700 hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              >
                <span className="text-xl">➕</span> 
                <span>Create Course</span>
              </Link>
          </div>
          
          {/* Enrolled Students */}
          <div className="group">
            <Link 
              href="/admin/enrollments"
              className="flex items-center space-x-3 text-lg font-medium p-3 rounded-lg transition duration-200 hover:bg-teal-700 hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              <span className="text-xl">👥</span> 
              <span>Enrolled Students</span>
            </Link>
          </div>
          
          {/* Assignment Submissions */}
          <div className="group">
            <Link 
              href="/admin/submissions"
              className="flex items-center space-x-3 text-lg font-medium p-3 rounded-lg transition duration-200 hover:bg-teal-700 hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              <span className="text-xl">📝</span> 
              <span>Assignment Submissions</span>
            </Link>
          </div>
          
          {/* Quiz Submissions */}
          <div className="group">
            <Link 
              href="/admin/quizzes-submissions"
              className="flex items-center space-x-3 text-lg font-medium p-3 rounded-lg transition duration-200 hover:bg-teal-700 hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              <span className="text-xl">❓</span> 
              <span>Quiz Submissions</span>
            </Link>
          </div>
          
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
}