"use client";

import { useEffect, useState } from "react";
import { getModulesByCourse } from "@/src/services/ModuleService";

export default function ModulesPage({ params }: any) {
  const { courseId } = params;
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await getModulesByCourse(courseId);
      setModules(res.data);
    };
    load();
  }, [courseId]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📘 All Modules</h1>

      <a
        href={`/admin/courses/${courseId}/modules/create`}
        className="px-4 py-2 bg-blue-600 text-white rounded block w-40 mb-4"
      >
        ➕ Add Module
      </a>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((m: any) => (
          <div key={m._id} className="bg-white p-4 shadow rounded">

            <h2 className="text-xl font-semibold">{m.title}</h2>

            {/* Module Action Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`/admin/courses/${courseId}/modules/${m._id}/lessons`}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm"
              >
                Lessons
              </a>

              <a
                href={`/admin/courses/${courseId}/modules/${m._id}/assignments`}
                className="px-3 py-1 bg-purple-600 text-white rounded text-sm"
              >
                Assignments
              </a>

              <a
                href={`/admin/courses/${courseId}/modules/${m._id}/quizzes`}
                className="px-3 py-1 bg-orange-500 text-white rounded text-sm"
              >
                Quizzes
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
