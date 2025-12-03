"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, LogIn, ChevronDown, Menu, Search, FileText } from "lucide-react";

import { getCurrentUser, logout } from "@/src/services/AuthService";
import logo from "../../../../app/assets/images/logo1.png";
import avatar from "../../../../app/assets/images/Avatar.png";

const Navbar = () => {
  const router = useRouter();

  const [user, setUser] = useState<any>(null); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRedirect = (path: string) => {
    setIsDropdownOpen(false); 
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  const loadUser = async () => {
    const currentUser = await getCurrentUser();
    console.log("Loaded Current User:", currentUser);
    setUser(currentUser);
  };

  useEffect(() => {
    loadUser();
  }, []);
  
  console.log("Current User in Navbar:", user);
  
  // Determine if the user is an admin
  const isAdmin = user?.role === 'admin'; 
  const displayName = user?.name || user?.email?.split("@")[0] || "Guest";

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleRedirect("/")}>
            <Image src={logo} alt="Logo" width={65} height={16} />
          </div>

          {/* CENTER MENU (Desktop) */}
          <div className="hidden md:flex items-center space-x-8 ml-10">

            <button onClick={() => handleRedirect("/")} className="text-gray-700 hover:text-teal-600 cursor-pointer">
              Home
            </button>

            <button onClick={() => handleRedirect("/course")} className="text-gray-700 hover:text-teal-600 cursor-pointer">
              All Courses
            </button>

            {/* Conditional Link based on role */}
            {user && (
              <button
                onClick={() => handleRedirect(isAdmin ? "/admin" : "/my-enrolled-course")}
                className="text-gray-700 hover:text-teal-600"
              >
                {isAdmin ? "Admin Dashboard" : "My Enrolled Course"}
              </button>
            )}
          </div>

          {/* SEARCH BAR (Desktop) */}
          <div className="flex-1 max-w-md mx-6 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-full focus:ring-teal-500 bg-gray-50"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
                >
                  <Image src={avatar} alt="avatar" width={32} height={32} className="rounded-full" />
                  <span className="hidden lg:block">{displayName}</span>
                  <ChevronDown className={`transition ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md border rounded-md z-10 cursor-pointer">

                    {/* Admin Dashboard Link */}
                    {isAdmin && (
                        <button
                          onClick={() => handleRedirect("/admin")}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-teal-600 font-semibold"
                        >
                          Admin Dashboard
                        </button>
                    )}

                    {/* My Enrolled Courses (Only for regular users) */}
                    {!isAdmin && (
                        <button
                          onClick={() => handleRedirect("/my-enrolled-course")}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                        >
                          My Enrolled Courses
                        </button>
                    )}
                   
                    {/* All Courses Link */}
                    <button
                      onClick={() => handleRedirect("/course")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      All Courses
                    </button>
                    
                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      <LogOut className="mr-2 h-4 w-4 text-red-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleRedirect("/login")}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 cursor-pointer transition"
                >
                  Login
                </button>
                <button
                  onClick={() => handleRedirect("/register")}
                  className="px-4 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 cursor-pointer transition"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-500"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-white">

          <button onClick={() => handleRedirect("/")} className="block py-2 cursor-pointer">
            Home
          </button>

          <button onClick={() => handleRedirect("/course")} className="block py-2 cursor-pointer">
            All Courses
          </button>

          {/* Conditional Link based on role in Mobile Menu */}
          {user && (
            <button
              onClick={() => handleRedirect(isAdmin ? "/admin" : "/my-enrolled-course")}
              className="block py-2"
            >
              {isAdmin ? "Admin Dashboard" : "My Enrolled Course"}
            </button>
          )}

          {!user && (
            <>
              <button onClick={() => handleRedirect("/login")} className="block py-2 text-teal-600 cursor-pointer">
                Login
              </button>
              <button onClick={() => handleRedirect("/register")} className="block py-2 text-teal-600 cursor-pointer">
                Register
              </button>
            </>
          )}

          {user && (
            <>
              {/* Optional: Add Admin Dashboard link explicitly if needed, otherwise handled above */}
              <a href="/my-posts" className="block py-2">My Posts</a>
              <button onClick={handleLogout} className="block py-2 text-red-600 cursor-pointer">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;