"use client";

import { getCurrentUser } from "@/src/services/AuthService";
import { enrollCourse, getUserEnrollments } from "@/src/services/EnrollmentService"; 
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

export default function AllCourse() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [lastSeenDate, setLastSeenDate] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  
  const [userEnrollments, setUserEnrollments] = useState<Set<string>>(new Set());
  
  // ENROLL HANDLER
  const handleEnroll = async (courseId: string) => {
   
    const user = await getCurrentUser();
    
    // Not logged in → redirect
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await enrollCourse(courseId);
      console.log("Enroll response:", res);
      if (res?.success) {
        toast("Enrolled Successfully!");
      
       
        setUserEnrollments(prev => new Set(prev).add(courseId)); 
        window.location.href = "/dashboard/enrollments";
      } else {
        toast(res?.message || "Enrollment failed!");
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong!");
    }
  };

  // Fetch API (existing function)
  const fetchCourses = async (reset = false) => {
    // ... (unchanged fetch logic)
    if (loading) return;
    if (!hasMore && !reset) return;

    setLoading(true);

    const queryParams = new URLSearchParams();

    if (search.trim()) queryParams.append("search", search);

    if (lastSeenDate && !reset) {
      queryParams.append("lastSeenDate", lastSeenDate);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/course?${queryParams.toString()}`
    );

    const data = await res.json();
    const newCourses = data?.data || [];

    if (reset) {
      setCourses(newCourses);
      setHasMore(true);
    } else {
      setCourses((prev) => [...prev, ...newCourses]);
    }

    if (newCourses.length > 0) {
      const last = newCourses[newCourses.length - 1];
      setLastSeenDate(last.createdAt);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  
  useEffect(() => {
    const loadEnrollments = async () => {
        // getCurrentUser() একটি ইউজার অবজেক্ট রিটার্ন করে
        const user = await getCurrentUser() as { email: any; role: any; name: any; _id?: string };
        
        
        if (user && user._id) { 
            try {
              
                const res = await getUserEnrollments(user._id); 
                
                if (res?.success && res.data) {
                    
                   
                    const enrolledCourseIds = new Set<string>(
                        res.data.map((enrollment: any) => enrollment.course._id || enrollment.course)
                    );
                    setUserEnrollments(enrolledCourseIds);
                }
            } catch (error) {
                console.error("Failed to load enrollments:", error);
                
            }
        }
    };

    fetchCourses(true); 
    loadEnrollments(); 

  }, []); 



  useEffect(() => {
    const delay = setTimeout(() => {
      setLastSeenDate(null);
      fetchCourses(true);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      fetchCourses();
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="mt-8 px-4 md:px-8 lg:px-16 mb-8">
      <h1 className="text-3xl font-bold mb-4">📚 All Courses</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search courses..."
          className="border rounded px-3 py-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((c: any) => {
         
          const isEnrolled = userEnrollments.has(c._id);

          return (
            <div
              key={c._id}
              className="p-4 bg-white rounded-lg shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{c.title}</h2>
                <p className="mb-4 text-sm opacity-80">{c.description}</p>
              </div>

              <p className="text-xs text-gray-500 mb-2">
                {new Date(c.createdAt).toLocaleDateString()}
              </p>

              <button
               
                disabled={isEnrolled}
                onClick={() => handleEnroll(c._id)}
                className={`w-full py-2 rounded cursor-pointer ${
                  isEnrolled
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-teal-600 text-white hover:bg-teal-700' 
                }`}
              >
               
                {isEnrolled ? 'Enrolled' : 'Enroll Now'}
              </button>
            </div>
          );
        })}
      </div>

      {loading && (
        <p className="text-center mt-4 text-gray-600">Loading...</p>
      )}

      {!loading && courses.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No courses found</p>
      )}

      {!hasMore && courses.length > 0 && (
        <p className="text-center mt-4 text-gray-400">No more courses.</p>
      )}
    </div>
  );
}