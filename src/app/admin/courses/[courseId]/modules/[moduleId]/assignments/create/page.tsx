"use client";

import React, { useState } from "react";
import { createAssignment } from "@/src/services/AssignmentService";
import { toast } from "sonner";

// Define the expected structure of the resolved parameters
interface ParamsResult {
  courseId: string;
  moduleId: string;
}

export default function CreateAssignment({ params }: any) {
  
  const resolvedParams = React.use(params as Promise<ParamsResult>);
  const { courseId, moduleId } = resolvedParams;
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submissionType, setSubmissionType] = useState<"text"|"link">("text");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title) return toast.error("Title required");
    
    // Safety check for required IDs
    if (!courseId || !moduleId) {
        return toast.error("Course or Module context is missing.");
    }
    
    setLoading(true);
    try {
      const res = await createAssignment({ 
        title, 
        module: moduleId, 
        description, 
        submissionType 
      });
      
      if (res?.success) {
        toast.success("Assignment created");
        // Redirect
        window.location.href = `/admin/courses/${courseId}/modules/${moduleId}/assignments`;
      } else toast.error(res?.message || "Failed");
      
    } catch (err) {
      console.error(err);
      toast.error("Error creating assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Assignment</h1>
      <input 
        value={title} 
        onChange={(e)=>setTitle(e.target.value)} 
        placeholder="Title" 
        className="w-full p-2 border rounded mb-2" 
      />
      <textarea 
        value={description} 
        onChange={(e)=>setDescription(e.target.value)} 
        placeholder="Description" 
        className="w-full p-2 border rounded mb-2" 
      />
      <select 
        value={submissionType} 
        onChange={(e)=>setSubmissionType(e.target.value as "text"|"link")} 
        className="w-full p-2 border rounded mb-4"
      >
        <option value="text">Text</option>
        <option value="link">Link</option>
      </select>

      <div className="flex gap-2">
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition disabled:bg-gray-400 cursor-pointer"
        >
          {loading ? "Creating..." : "Create"}
        </button>
        <a 
          href={`/admin/courses/${courseId}/modules/${moduleId}/assignments`} 
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Back
        </a>
      </div>
    </div>
  );
}