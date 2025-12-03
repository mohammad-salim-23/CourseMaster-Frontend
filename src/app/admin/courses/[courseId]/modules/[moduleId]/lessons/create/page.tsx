"use client";

import React, { useState } from "react";
import { updateModule, getModulesByCourse } from "@/src/services/ModuleService";
import { toast } from "sonner";


interface ParamsResult {
  courseId: string;
  moduleId: string;
}

// Update the component structure to use React.use()
export default function CreateLesson({ params }: any) {
  

  const resolvedParams = React.use(params as Promise<ParamsResult>);

  const { courseId, moduleId } = resolvedParams;
  
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isFreePreview, setIsFreePreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !videoUrl) return toast.error("Title and video URL required");
    
    // Safety check in case IDs are somehow missing (though React.use should ensure they exist)
    if (!courseId || !moduleId) {
        return toast.error("Course or Module context is missing.");
    }

    try {
      setLoading(true);
      
      // Fetch current module lessons
      const modRes = await getModulesByCourse(courseId);
      const module = (modRes?.data || []).find((m: any) => m._id === moduleId);
      
      if (!module) return toast.error("Module not found");

      // Prepare updated lessons array
      const newLesson = { title, videoUrl, isFreePreview };
      const updatedLessons = [...(module.lessons || []), newLesson];

      //Update the module with the new lesson
      const res = await updateModule(moduleId, { lessons: updatedLessons });
      
      if (res?.success) {
        toast.success("Lesson added");
        // Redirect to lessons list
        window.location.href = `/admin/courses/${courseId}/modules/${moduleId}/lessons`;
      } else {
        toast.error(res?.message || "Failed to add lesson");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Lesson</h1>

      <input 
        className="w-full p-2 border rounded mb-2" 
        placeholder="Lesson title" 
        value={title} 
        onChange={(e)=>setTitle(e.target.value)} 
      />
      <input 
        className="w-full p-2 border rounded mb-2" 
        placeholder="Video URL" 
        value={videoUrl} 
        onChange={(e)=>setVideoUrl(e.target.value)} 
      />
      
      <label className="flex items-center gap-2 mb-4">
        <input 
          type="checkbox" 
          checked={isFreePreview} 
          onChange={(e)=>setIsFreePreview(e.target.checked)} 
        />
        Free Preview
      </label>

      <div className="flex gap-2">
        <button 
          onClick={handleSubmit} 
          disabled={loading} 
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "Adding..." : "Add Lesson"}
        </button>
        <a 
          href={`/admin/courses/${courseId}/modules/${moduleId}/lessons`} 
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Back
        </a>
      </div>
    </div>
  );
}