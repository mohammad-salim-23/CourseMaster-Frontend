import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getToken } from "@/src/services/AuthService";
import VideoPlayer from "@/src/components/modules/Course/VideoPlayer";
import AssignmentSubmitForm from "@/src/components/modules/Course/AssignmentSubmitForm";
import QuizTake from "@/src/components/modules/Course/QuizTake";
import MarkCompleteButton from "@/src/components/modules/Course/MarkCompleteButton";


const BASE = process.env.NEXT_PUBLIC_BASE_API;

export default async function ModulePage({ params }: any) {
  const { moduleId, courseId } = params;

 
  const token = await getToken();

  const headers: any = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}/module/${moduleId}/details`, { headers, cache: "no-store" });
  const json = await res.json();
  const { module, assignments, quizzes, assignmentSubmitted, quizSubmitted } = json.data;

  const enrollmentId = json.data.enrollmentId; 
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">{module.title}</h1>
      <p className="text-gray-600 mt-1">{module.description}</p>

      <section className="mt-6">
        <h2 className="font-semibold mb-2">Lessons</h2>
        <div className="space-y-4">
          {module.lessons.map((lesson: any) => (
            <div key={lesson._id} className="border p-3 rounded flex items-start gap-4">
              <div className="w-40">
                {/* Thumbnail: YouTube thumbnail via videoId */}
                <img src={`https://img.youtube.com/vi/${extractYoutubeId(lesson.videoUrl)}/mqdefault.jpg`} alt={lesson.title} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{lesson.title}</h3>
                <p className="text-sm text-gray-500">Preview: {lesson.isFreePreview ? "Yes" : "No"}</p>

                {/* Player component (client) */}
                <div className="mt-2">
                  <VideoPlayer videoUrl={lesson.videoUrl} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Assignments</h3>
          {assignments.length === 0 ? <p>No assignments</p> : (
            assignments.map((a: any) => (
              <div key={a._id} className="mb-4">
                <h4 className="font-medium">{a.title}</h4>
                <p className="text-sm text-gray-600">{a.description}</p>

                <AssignmentSubmitForm
                  assignmentId={a._id}
                  moduleId={module._id}
                  disabled={assignmentSubmitted}
                />
              </div>
            ))
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Quizzes</h3>
          {quizzes.length === 0 ? <p>No quizzes</p> : (
            quizzes.map((q: any) => (
              <div key={q._id} className="mb-4">
                <QuizTake quiz={q} disabled={quizSubmitted} />
              </div>
            ))
          )}
        </div>
      </section>

      <div className="mt-8">
        <MarkCompleteButton
          enrollmentId={enrollmentId}
          moduleId={module._id}
          disabled={!(assignmentSubmitted && quizSubmitted)}
        />
      </div>
    </div>
  );
}

// helper to extract youtube id
function extractYoutubeId(url: string) {
  // crude extraction — improves for various URL shapes
  const m = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return m ? m[1] : "";
}
