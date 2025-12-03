"use client";

import { getAllCourses } from "@/src/services/CourseService";
import { useEffect, useState } from "react";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await getAllCourses();
      const json = await res.json();
      setCourses(json.data); // store the array only
    };

    loadData();
  }, []); 

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📚 All Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((c: any) => (
          <div key={c._id} className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p>{c.description}</p>

            <div className="mt-3 flex gap-2">
              <a
                href={`/admin/courses/${c._id}/modules/create`}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
              >
                Add Module
              </a>

              <a
                href={`/admin/courses/${c._id}/modules/assignments/create`}
                className="px-2 py-1 text-sm bg-green-600 text-white rounded"
              >
                Add Assignment
              </a>

              <a
                href={`/admin/courses/${c._id}/modules/quizzes/create`}
                className="px-2 py-1 text-sm bg-purple-600 text-white rounded"
              >
                Add Quiz
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
