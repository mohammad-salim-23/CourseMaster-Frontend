"use client";

import { useEffect, useState, useCallback } from "react";

export default function AllCourse() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [lastSeenDate, setLastSeenDate] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Fetch API 
  const fetchCourses = async (reset = false) => {
    if (loading) return;
    if (!hasMore && !reset) return;

    setLoading(true);

    const queryParams = new URLSearchParams();

    // Search
    if (search.trim()) queryParams.append("search", search);

    // Pagination
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

    // Update pagination pointer
    if (newCourses.length > 0) {
      const last = newCourses[newCourses.length - 1];
      setLastSeenDate(last.createdAt);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCourses(true);
  }, []);

 
  useEffect(() => {
    const delayDebounce = setTimeout(() => {

      setLastSeenDate(null);
      fetchCourses(true);
    }, 400);

    return () => clearTimeout(delayDebounce);
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

      {/* Search Box */}
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
      {/* Course Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {courses.map((c: any) => (
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
        onClick={() => window.location.href = `/course/${c._id}`}
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 cursor-pointer"
      >
        Enroll Now
      </button>
    </div>
  ))}
</div>

      {/* Loader */}
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
