"use client";

import { getAllCourses } from "@/src/services/CourseService";
import { useEffect, useState } from "react";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await getAllCourses();
      setCourses(res.data);
    };

    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📚 All Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((c: any) => (
          <div
            key={c._id}
            className="p-4 bg-white rounded-lg shadow flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{c.title}</h2>
              <p className="mb-4">{c.description}</p>
            </div>

            <div className="mt-auto flex gap-2">
              
              {/* Add Module */}
              <a
                href={`/admin/courses/${c._id}/modules/create`}
                className="px-3 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded w-full text-center"
              >
                Add Module
              </a>

              {/* View Modules */}
              <a
                href={`/admin/courses/${c._id}/modules`}
                className="px-3 py-2 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded w-full text-center"
              >
                View Modules
              </a>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
