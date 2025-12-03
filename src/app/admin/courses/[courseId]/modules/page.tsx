"use client";

import React, { useEffect, useState } from "react";
import { getModulesByCourse } from "@/src/services/ModuleService";
interface ParamsResult {
  courseId: string;
}
export default function ModulesPage({ params }: any) {
  const resolvedParams = React.use(params as Promise<ParamsResult>);
  const courseId = resolvedParams.courseId;
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
        className="px-4 py-2 bg-teal-600 text-white rounded block w-40 mb-4"
      >
        ➕ Add Module
      </a>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((m: any) => (
          <div key={m._id} className="bg-white p-4 shadow rounded flex flex-col justify-between">

            <h2 className="text-xl font-semibold">{m.title}</h2>

            {/* Module Action Buttons */}
            <div className="mt-auto flex flex-wrap gap-2">
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
