"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, LogIn, ChevronDown, Menu } from "lucide-react";

import { getCurrentUser, logout } from "@/src/services/AuthService";
import logo from "../../../../app/assets/images/logo1.png";
import avatar from "../../../../app/assets/images/Avatar.png";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

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
    router.push("/login");
  };

  const loadUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const isAdmin = user?.role === "admin";
  const displayName =
    user?.name || user?.email?.split("@")[0] || "Guest";

  
  useEffect(() => {
    if (!user) return; // Wait until user loads

    if (pathname.startsWith("/admin") && !isAdmin) {
      router.replace("/"); // redirect non-admin users
    }
  }, [user, pathname, isAdmin, router]);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleRedirect("/")}
          >
            <Image src={logo} alt="Logo" width={65} height={16} />
          </div>

          {/* CENTER MENU (Desktop) */}
          <div className="hidden md:flex items-center space-x-8 ml-10">

            <button
              onClick={() => handleRedirect("/")}
              className="text-gray-700 hover:text-teal-600 cursor-pointer"
            >
              Home
            </button>

            <button
              onClick={() => handleRedirect("/all-courses")}
              className="text-gray-700 hover:text-teal-600 cursor-pointer"
            >
              All Courses
            </button>

            {/* Conditional Link */}
            {user && (
              <button
                onClick={() =>
                  handleRedirect(isAdmin ? "/admin" : "/dashboard/enrollments")
                }
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
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="hidden lg:block">
                    {displayName}
                  </span>
                  <ChevronDown
                    className={`transition ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md border rounded-md z-10 cursor-pointer">

                    {/* Admin Dashboard */}
                    {isAdmin && (
                      <button
                        onClick={() => handleRedirect("/admin")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-teal-600 font-semibold cursor-pointer"
                      >
                        Admin Dashboard
                      </button>
                    )}

                    {/* My Enrolled Courses (User only) */}
                    {!isAdmin && (
                      <button
                        onClick={() =>
                          handleRedirect("/dashboard/enrollments")
                        }
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        My Enrolled Courses
                      </button>
                    )}

                    {/* All Courses */}
                    <button
                      onClick={() => handleRedirect("/all-courses")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                      All Courses
                    </button>

                    {/* Logout */}
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

          <button onClick={() => handleRedirect("/")} className="block py-2">
            Home
          </button>

          <button
            onClick={() => handleRedirect("/all-courses")}
            className="block py-2"
          >
            All Courses
          </button>

          {/* Conditional Role Link */}
          {user && (
            <button
              onClick={() =>
                handleRedirect(isAdmin ? "/admin" : "/dashboard/enrollments")
              }
              className="block py-2"
            >
              {isAdmin ? "Admin Dashboard" : "My Enrolled Course"}
            </button>
          )}

          {!user && (
            <>
              <button
                onClick={() => handleRedirect("/login")}
                className="block py-2 text-teal-600"
              >
                Login
              </button>
              <button
                onClick={() => handleRedirect("/register")}
                className="block py-2 text-teal-600"
              >
                Register
              </button>
            </>
          )}

          {user && (
            <>
              <button
                onClick={handleLogout}
                className="block py-2 text-red-600"
              >
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
