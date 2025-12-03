"use client";

import { useState } from "react";
import { createModule } from "@/src/services/ModuleService";
import { toast } from "sonner";


export default function CreateModule({ params }: any) {
  const courseId = params.courseId;

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  // Submit Handler
  const handleSubmit = async () => {
    try {
      const res = await createModule({ ...form, courseId });

      if (res?.success) {
        toast.success("Module created successfully!");
        setForm({ title: "", content: "" }); // clear form
      } else {
        toast.error(res?.message || "Module creation failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📘 Add Module</h1>

      <div className="bg-white p-6 rounded-lg shadow w-96">
        <input
          type="text"
          placeholder="Module Title"
          className="input w-full p-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Module Content"
          className="input w-full p-2 border rounded mt-4"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded w-full"
        >
          Create Module
        </button>
      </div>
    </div>
  );
}
