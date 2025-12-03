"use client";

import { useState } from "react";
import { createCourse } from "@/src/services/CourseService";
import { toast } from "sonner";


export default function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await createCourse(form);

      if (res?.success) {
        toast.success("Course created successfully!");
        setForm({ title: "", description: "" }); // clear form
      } else {
        toast.error(res?.message || "Course creation failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">➕ Create Course</h1>

      <div className="bg-white p-6 rounded-lg shadow w-96">
        <input
          type="text"
          placeholder="Course Title"
          className="input w-full p-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="input w-full p-2 border rounded mt-4"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded w-full"
        >
          Create
        </button>
      </div>
    </div>
  );
}
