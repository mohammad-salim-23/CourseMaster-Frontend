
"use client";

import React, { useState } from "react";
import { createModule } from "@/src/services/ModuleService";
import { toast } from "sonner";

interface Lesson {
  title: string;
  videoUrl: string;
  isFreePreview: boolean;
}
interface ParamsResult {
  courseId: string;
}
interface CreateModuleProps {
  params: ParamsResult | Promise<ParamsResult>;
}
export default function CreateModule({ params }: CreateModuleProps) {
    console.log(".....params", params);
  const resolvedParams = React.use(params as Promise<ParamsResult>);
  const courseId = resolvedParams.courseId;
  const [moduleTitle, setModuleTitle] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([
    { title: "", videoUrl: "", isFreePreview: false },
  ]);
  const [loading, setLoading] = useState(false);

  const handleLessonChange = (index: number, field: keyof Lesson, value: any) => {
    const updated = [...lessons];
    // @ts-ignore
    updated[index][field] = value;
    setLessons(updated);
  };

  const addLesson = () => setLessons([...lessons, { title: "", videoUrl: "", isFreePreview: false }]);
  const removeLesson = (i: number) => setLessons(lessons.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    if (!moduleTitle) return toast.error("Module title required");
    if (!courseId) return toast.error("Missing courseId");
    if (lessons.some(l => !l.title || !l.videoUrl)) return toast.error("All lessons need title & video URL");

    try {
      setLoading(true);
      const res = await createModule({ title: moduleTitle, course: courseId, lessons });
      if (res?.success) {
        toast.success("Module created");
        setModuleTitle("");
        setLessons([{ title: "", videoUrl: "", isFreePreview: false }]);
        // optional: navigate to modules list or module detail
        window.location.href = `/admin/courses/${courseId}/modules`;
      } else {
        toast.error(res?.message || "Failed to create module");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">📘 Add Module</h1>
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Associated Course ID</label>
          <input
            value={courseId}
            disabled
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <input
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
          placeholder="Module Title"
          className="w-full p-2 border rounded mb-4"
        />

        {lessons.map((lesson, i) => (
          <div key={i} className="mb-4 border p-4 rounded bg-gray-50">
            <input
              value={lesson.title}
              onChange={(e) => handleLessonChange(i, "title", e.target.value)}
              placeholder="Lesson Title"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              value={lesson.videoUrl}
              onChange={(e) => handleLessonChange(i, "videoUrl", e.target.value)}
              placeholder="Video URL"
              className="w-full p-2 border rounded mb-2"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={lesson.isFreePreview}
                onChange={(e) => handleLessonChange(i, "isFreePreview", e.target.checked)}
              />
              Free Preview
            </label>

            {lessons.length > 1 && (
              <button type="button" onClick={() => removeLesson(i)} className="text-red-600 mt-2">Remove</button>
            )}
          </div>
        ))}

        <div className="flex gap-2 mb-4">
          <button type="button" onClick={addLesson} className="px-4 py-2 bg-green-600 text-white rounded">+ Add Lesson</button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-teal-600 text-white rounded">
            {loading ? "Creating..." : "Create Module"}
          </button>
        </div>
      </div>
    </div>
  );
}
