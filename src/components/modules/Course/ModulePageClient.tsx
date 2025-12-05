"use client";
import React, { useState, useEffect } from "react"; 

import { getToken } from "@/src/services/AuthService";
import VideoPlayer from "@/src/components/modules/Course/VideoPlayer";
import AssignmentSubmitForm from "@/src/components/modules/Course/AssignmentSubmitForm";
import QuizTake from "@/src/components/modules/Course/QuizTake";
import MarkCompleteButton from "@/src/components/modules/Course/MarkCompleteButton";
import { getModuleDetails } from "@/src/services/ModuleService";

const BASE = process.env.NEXT_PUBLIC_BASE_API;
interface ParamsResult {
  courseId: string;
  moduleId: string;
}


interface ModuleData {
  title: string;
  description: string;
  _id: string;
  lessons: any[];
}

export default function ModulePageClient({ params }: any) {
 
  const resolvedParams = React.use(params as Promise<ParamsResult>);
  const { courseId, moduleId } = resolvedParams;
  
  
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false); // Defaulting to false
  const [quizSubmitted, setQuizSubmitted] = useState(false); // Defaulting to false
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadModuleData = async () => {
      if (!moduleId) {
        setLoading(false);
        return;
      }
      
      try {
      
        const token = await getToken();
    
        const res = await getModuleDetails(moduleId);
        console.log("Module details response:", res);
        
        
        console.log("Module details:", res);
        
      
        if (res.success ) {
          const data = res.data;
        setModuleData({
  ...data.module,
  lessons: data.module.lessons || []
});

          setAssignments(data.assignments || []);
          setQuizzes(data.quizzes || []);
          setEnrollmentId(data.enrollmentId || null);
          setAssignmentSubmitted(data.assignmentSubmitted || false);
          setQuizSubmitted(data.quizSubmitted || false);
        } else {
            console.error("Failed to load module details:", res.message);
        }
        
      } catch (error) {
        console.error("Error loading module page data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadModuleData();
  }, [moduleId]); 


  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading module content...</div>;
  }

  if (!moduleData) {
    return <div className="container mx-auto py-8 text-center text-red-600">Failed to load module details or module not found.</div>;
  }
  

  const module = moduleData;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-extrabold mb-2 text-teal-700">{module.title}</h1>
      <p className="text-gray-600 mb-6">{module.description}</p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-3 border-b pb-1">Lessons</h2>
        <div className="space-y-4">
          {module.lessons.map((lesson: any) => (
            <div key={lesson._id} className="border p-4 rounded-lg shadow-sm flex flex-col md:flex-row items-start gap-4 bg-white">
              <div className="w-56  flex-shrink-0">
                {/* Thumbnail: YouTube thumbnail via videoId */}
                <img 
                  src={`https://img.youtube.com/vi/${extractYoutubeId(lesson.videoUrl)}/mqdefault.jpg`} 
                  alt={lesson.title} 
                  className="w-full rounded-md shadow"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">{lesson.title}</h3>
                <p className="text-sm text-gray-500">Preview: {lesson.isFreePreview ? "Yes" : "No"}</p>

                {/* Player component (client) */}
                <div className="mt-3">
                  <VideoPlayer  videoUrl={lesson.videoUrl} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assignments Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-teal-700">Assignments</h3>
          {assignments.length === 0 ? <p className="text-gray-500">No assignments for this module.</p> : (
            assignments.map((a: any) => (
              <div key={a._id} className="mb-6 p-4 border rounded-md bg-gray-50">
                <h4 className="text-lg font-medium">{a.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{a.description}</p>

                <AssignmentSubmitForm
                  assignmentId={a._id}
                  moduleId={module._id}
                  // Assuming logic to check if *this specific* assignment is submitted
                  disabled={assignmentSubmitted} 
                />
              </div>
            ))
          )}
        </div>

        {/* Quizzes Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-purple-700">Quizzes</h3>
          {quizzes.length === 0 ? <p className="text-gray-500">No quizzes for this module.</p> : (
            quizzes.map((q: any) => (
              <div key={q._id} className="mb-6 p-4 border rounded-md bg-gray-50">
                <QuizTake quiz={q} disabled={quizSubmitted} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Completion Button */}
      <div className="mt-10 pt-4 border-t flex justify-center">
        <MarkCompleteButton
          enrollmentId={enrollmentId}
          moduleId={module._id}
          // The button is enabled only if both flags are true
          disabled={!(assignmentSubmitted && quizSubmitted)} 
        />
      </div>
    </div>
  );
}

// helper to extract youtube id (Unchanged)
function extractYoutubeId(url: string) {
  // crude extraction — improves for various URL shapes
  const m = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return m ? m[1] : "";
}