"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AllModulesSpecificCourse() {
  const params = useParams();
 
  const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId; 

  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE = process.env.NEXT_PUBLIC_BASE_API;

  
  const getModules = async () => {
    try {
     
      const res = await fetch(`${BASE}/module/course/${courseId}`);
      const data = await res.json();

      setModules(data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching modules:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      getModules();
    }
  }, [courseId]);

  if (loading) return <p className="text-center mt-8">Loading modules...</p>;

  return (
    <div className="mt-8 px-4 md:px-8 lg:px-16 mb-8">
      <h1 className="text-2xl font-bold mb-4">📘 Course Modules</h1>

      {modules.length === 0 && (
        <p className="text-gray-500">No modules available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m: any) => (
       
          <div 
            key={m._id} 
            className="p-4 bg-white rounded-lg shadow border flex flex-col min-h-[250px] justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{m.title}</h2>
              <p className="text-sm mt-2 opacity-80">{m.description}</p>
            </div>

          
            <div className="mt-auto flex flex-col gap-2 pt-4">
              <button
                className="bg-teal-600 text-white py-2 rounded hover:bg-teal-700 cursor-pointer"
               
                onClick={() =>
                  (window.location.href = `/dashboard/modules/${m._id}`)
                }
              >
                👀 View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}