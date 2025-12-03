
"use client";
import React, { useState } from "react";
import { createModule } from "@/src/services/ModuleService";
import { toast } from "sonner";

interface Lesson {
  title: string;
  videoUrl: string;
  isFreePreview: boolean;
}

interface CreateModuleProps {
  params: { courseId: string };
}

export default function CreateModule({ params }: CreateModuleProps) {
 const resolvedParams = React.use(params); 
  const courseId = resolvedParams.courseId;

  const [moduleTitle, setModuleTitle] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([
    { title: "", videoUrl: "", isFreePreview: false },
  ]);

  const handleLessonChange = <K extends keyof Lesson>(index: number, field: K, value: Lesson[K]) => {
    const updatedLessons = [...lessons];
    updatedLessons[index] = { ...updatedLessons[index], [field]: value } as Lesson;
    setLessons(updatedLessons);
  };

  const addLesson = () => {
    setLessons([...lessons, { title: "", videoUrl: "", isFreePreview: false }]);
  };

  const removeLesson = (index: number) => {
    const updatedLessons = lessons.filter((_, i) => i !== index);
    setLessons(updatedLessons);
  };

  const handleSubmit = async () => {
    if (!moduleTitle) {
      toast.error("Module title is required");
      return;
    }

    if (lessons.length === 0 || lessons.some(l => !l.title || !l.videoUrl)) {
      toast.error("All lessons must have a title and video URL");
      return;
    }
 if(!courseId){
      toast.error("Course ID is missing");
      return;
    }
    try {
      // courseId is correctly passed in the payload
      const res = await createModule({ title: moduleTitle, course: courseId, lessons });

      if (res?.success) {
        toast.success("Module created successfully!");
        setModuleTitle("");
        setLessons([{ title: "", videoUrl: "", isFreePreview: false }]);
      } else {
        toast.error(res?.message || "Module creation failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    // Centered the title and main content with proper vertical padding
    <div className="py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">📘 Add Module</h1>
      
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-xl">
        
        {/* New Field: Non-changeable Course ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Associated Course ID (Non-changeable)
          </label>
          <input
            type="text"
            value={courseId}
            className="input w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">This ID is automatically derived from the URL.</p>
        </div>
        {/* End New Field */}

        <input
          type="text"
          placeholder="Module Title"
          className="input w-full p-2 border rounded mb-4"
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
        />
        
        {/* ... Rest of the form remains the same ... */}
        
        {lessons.map((lesson, index) => (
          <div key={index} className="mb-4 border p-4 rounded bg-gray-50">
            <input
              type="text"
              placeholder="Lesson Title"
              className="input w-full p-2 border rounded mb-2"
              value={lesson.title}
              onChange={(e) => handleLessonChange(index, "title", e.target.value)}
            />
            <input
              type="text"
              placeholder="Video URL"
              className="input w-full p-2 border rounded mb-2"
              value={lesson.videoUrl}
              onChange={(e) => handleLessonChange(index, "videoUrl", e.target.value)}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={lesson.isFreePreview}
                onChange={(e) => handleLessonChange(index, "isFreePreview", e.target.checked)}
              />
              Free Preview
            </label>

            {lessons.length > 1 && (
              <button
                type="button"
                onClick={() => removeLesson(index)}
                className="text-red-600 mt-2 hover:text-red-800 transition"
              >
                Remove Lesson
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addLesson}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4 cursor-pointer hover:bg-green-700 transition"
        >
          + Add Another Lesson
        </button>

        <button
          onClick={handleSubmit}
          className="bg-teal-600 text-white px-4 py-2 mt-2 rounded w-full hover:bg-teal-700 transition cursor-pointer"
        >
          Create Module
        </button>
      </div>
    </div>
  );
}