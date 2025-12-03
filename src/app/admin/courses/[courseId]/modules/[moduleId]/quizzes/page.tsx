"use client";

import { getQuizzesByModule } from "@/src/services/QuizServices";
import React, { useEffect, useState } from "react";


interface ParamsResult {
  courseId: string;
  moduleId: string;
}

// Props interface for the component
interface Props { 
    params: ParamsResult | Promise<ParamsResult>;
}
export default function QuizzesPage({ params }: Props) {
    
    const resolvedParams = React.use(params as Promise<ParamsResult>);
    const { courseId, moduleId } = resolvedParams;

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadQuizzes = async () => {
            if (!moduleId) {
                setLoading(false);
                return;
            }
            
            try {
                const res = await getQuizzesByModule(moduleId);
                setQuizzes(res?.data || []);
            } catch (error) {
                console.error("Failed to load quizzes:", error);
                setQuizzes([]);
            } finally {
                setLoading(false);
            }
        };
        
        loadQuizzes();
    }, [moduleId]); 
    if (loading) {
        return <div className="p-6">Loading quizzes...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quizzes</h1>
            
            <a 
                href={`/admin/courses/${courseId}/modules/${moduleId}/quizzes/create`} 
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
                ➕ Add Quiz
            </a>

            <div className="mt-4 space-y-3">
                {quizzes.length === 0 && <p>No quizzes yet.</p>}
                
                {quizzes.map((q: any) => (
                    <div key={q._id} className="p-3 bg-white rounded shadow">
                        <h3 className="font-semibold">{q.title}</h3>
                        <p className="text-sm text-gray-600">Questions: **{q.questions?.length || 0}**</p>
                    </div>
                ))}
            </div>
        </div>
    );
}