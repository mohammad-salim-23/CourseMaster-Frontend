"use client";

import { useState } from "react";
import { createCourse } from "@/src/services/CourseService";
import { toast } from "sonner";

export default function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    category: "",
    tags: "",
  });

  const handleSubmit = async () => {
    try {
      const payload = {
        title: form.title,
        description: form.description,
        instructor: form.instructor,
        price: Number(form.price),
        category: form.category,
        tags: form.tags.split(",").map((t) => t.trim()),
      };

      const res = await createCourse(payload);

      if (res?.success) {
        toast.success("Course created successfully!");

        setForm({
          title: "",
          description: "",
          instructor: "",
          price: "",
          category: "",
          tags: "",
        });
      } else {
        toast.error(res?.message || "Course creation failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">➕ Create Course</h1>

        <div className="bg-white p-6 rounded-lg shadow w-96 space-y-4">

          <input
            type="text"
            placeholder="Course Title"
            className="w-full p-2 border rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="text"
            placeholder="Instructor Name"
            className="w-full p-2 border rounded"
            value={form.instructor}
            onChange={(e) => setForm({ ...form, instructor: e.target.value })}
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full p-2 border rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            type="text"
            placeholder="Category (e.g. Web Development)"
            className="w-full p-2 border rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="w-full p-2 border rounded"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />

          <button
            onClick={handleSubmit}
            className="bg-teal-600 text-white px-4 py-2 rounded w-full cursor-pointer hover:bg-teal-700 transition"
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
}
