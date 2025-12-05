"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, ChevronDown, Menu } from "lucide-react";


import logo from "../../../../app/assets/images/logo1.png";
import avatar from "../../../../app/assets/images/Avatar.png";
import { useUser } from "@/src/UserContext";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useUser(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRedirect = (path: string) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  const handleLogout = async () => {
    await logout(); 
    router.push("/login");
  };
console.log("Current User in Navbar:", user);
  const isAdmin = user?.role === "admin";
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
            <button onClick={() => handleRedirect("/all-courses")} className="text-gray-700 hover:text-teal-600 cursor-pointer">
              All Courses
            </button>

            {user && (
              <button
                onClick={() => handleRedirect(isAdmin ? "/admin" : "/dashboard/enrollments")}
                className="text-gray-700 hover:text-teal-600 cursor-pointer"
              >
                {isAdmin ? "Admin Dashboard" : "My Enrolled Course"}
              </button>
            )}
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
                  <ChevronDown className={isDropdownOpen ? "rotate-180 transition" : "transition"} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md border rounded-md z-10 cursor-pointer">
                    {isAdmin && (
                      <button
                        onClick={() => handleRedirect("/admin")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-teal-600 font-semibold cursor-pointer"
                      >
                        Admin Dashboard
                      </button>
                    )}

                    {!isAdmin && (
                      <button
                        onClick={() => handleRedirect("/dashboard/enrollments")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                      >
                        My Enrolled Courses
                      </button>
                    )}

                    <button
                      onClick={() => handleRedirect("/all-courses")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                      All Courses
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4 text-red-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={() => handleRedirect("/login")} className="px-4 py-2 bg-teal-600 text-white rounded-md cursor-pointer">
                  Login
                </button>
                <button onClick={() => handleRedirect("/register")} className="px-4 py-2 border border-teal-600 text-teal-600 rounded-md cursor-pointer">
                  Register
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-500">
            <Menu />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-white">
          <button onClick={() => handleRedirect("/")} className="block py-2 cursor-pointer">Home</button>
          <button onClick={() => handleRedirect("/all-courses")} className="block py-2">All Courses</button>
          {user && (
            <button onClick={() => handleRedirect(isAdmin ? "/admin" : "/dashboard/enrollments")} className="block py-2">
              {isAdmin ? "Admin Dashboard" : "My Enrolled Course"}
            </button>
          )}
          {!user && (
            <>
              <button onClick={() => handleRedirect("/login")} className="block py-2 text-teal-600 cursor-pointer">Login</button>
              <button onClick={() => handleRedirect("/register")} className="block py-2 text-teal-600 cursor-pointer">Register</button>
            </>
          )}
          {user && (
            <button onClick={handleLogout} className="block py-2 text-red-600">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
