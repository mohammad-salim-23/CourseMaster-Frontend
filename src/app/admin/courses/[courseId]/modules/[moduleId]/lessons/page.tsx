"use client"; 
import React, { useEffect, useState } from "react";
import { getModulesByCourse } from "@/src/services/ModuleService";

interface ParamsResult{
    courseId: string;
    moduleId: string;
}


export default function LessonsPage({ params }: any) {
   
   
   const resolvedParams = React.use(params as Promise<ParamsResult>);
   const courseId = resolvedParams.courseId;
   const moduleId = resolvedParams.moduleId;
   
   const [moduleData, setModuleData] = useState<any>(null); 
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    const loadModule = async () => {
        if (!courseId || !moduleId) {
            setLoading(false);
            return;
        }
        
        try {
          
            const res = await getModulesByCourse(courseId);
            
          
            const module = (res?.data || []).find((m: any) => m._id === moduleId);
            setModuleData(module);
        } catch (error) {
            console.error("Failed to load module data:", error);
            setModuleData(null); 
        } finally {
            setLoading(false);
        }
    };
    loadModule();
   }, [courseId, moduleId]); 

   if (loading) return <div className="p-6">Loading module lessons...</div>;

   if (!moduleData) return <div className="p-6 text-red-600">Module not found or failed to load.</div>;
   
   const lessons = moduleData.lessons || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{moduleData.title} — Lessons</h1>

      <a 
        href={`/admin/courses/${courseId}/modules/${moduleId}/lessons/create`} 
        className="px-4 py-2 bg-green-600 text-white rounded mb-4 inline-block hover:bg-green-700 transition"
      >
        ➕ Add Lesson
      </a>

      <div className="space-y-3 mt-4">
        {lessons.length === 0 && <p>No lessons yet. Start by adding one!</p>}
        {lessons.map((l: any, i: number) => (
          <div key={i} className="p-3 bg-white rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{l.title}</h3>
              <p className="text-sm text-gray-600">{l.videoUrl}</p>
            </div>
            <p className={`text-xs font-medium px-2 py-1 rounded ${l.isFreePreview ? "bg-teal-100 text-teal-800" : "bg-gray-100 text-gray-500"}`}>
                {l.isFreePreview ? "Free Preview" : "Locked"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}