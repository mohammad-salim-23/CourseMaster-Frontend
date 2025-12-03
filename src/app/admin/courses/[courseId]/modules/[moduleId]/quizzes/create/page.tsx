"use client";

import { createQuiz } from "@/src/services/QuizServices";
import React, { useState } from "react";

import { toast } from "sonner";

type Question = { question: string; options: string[]; correctAnswer: string };

// Define the expected structure of the resolved parameters
interface ParamsResult {
  courseId: string;
  moduleId: string;
}

export default function CreateQuiz({ params }: any) {
  
  const resolvedParams = React.use(params as Promise<ParamsResult>);

  const { courseId, moduleId } = resolvedParams;
  
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: ["", ""], correctAnswer: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (idx: number, field: keyof Question, value: any) => {
    const copy = [...questions];
   
    copy[idx][field] = value;
    setQuestions(copy);
  };

  const handleOptionChange = (qIdx: number, optIdx: number, value: string) => {
    const copy = [...questions];
    copy[qIdx].options[optIdx] = value;
    setQuestions(copy);
  };

  const addQuestion = () => setQuestions([...questions, { question: "", options: ["", ""], correctAnswer: "" }]);
  const addOption = (qIdx: number) => {
    const copy = [...questions];
    copy[qIdx].options.push("");
    setQuestions(copy);
  };

  const handleSubmit = async () => {
    if (!title) return toast.error("Title required");
    if (questions.some(q => !q.question || q.options.some(o => !o) || !q.correctAnswer)) return toast.error("Fill all questions/options");
    
    // Safety Check
    if (!courseId || !moduleId) {
        return toast.error("Course or Module context is missing.");
    }

    try {
      setLoading(true);
      const payload = { title, module: moduleId, questions };
      
      const res = await createQuiz(payload);
      
      if (res?.success) {
        toast.success("Quiz created");
        // Redirect
        window.location.href = `/admin/courses/${courseId}/modules/${moduleId}/quizzes`;
      } else toast.error(res?.message || "Failed");
      
    } catch (err) {
      console.error(err);
      toast.error("Error creating quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      <input 
        value={title} 
        onChange={(e)=>setTitle(e.target.value)} 
        placeholder="Quiz Title" 
        className="w-full p-2 border rounded mb-4" 
      />

      {questions.map((q, i) => (
        <div key={i} className="mb-4 p-3 border rounded bg-gray-50">
          <input 
            value={q.question} 
            onChange={(e)=>handleQuestionChange(i, "question", e.target.value)} 
            placeholder={`Question ${i+1}`} 
            className="w-full p-2 border rounded mb-2" 
          />
          <div className="space-y-2">
            {q.options.map((opt, oi) => (
              <input 
                key={oi} 
                value={opt} 
                onChange={(e)=>handleOptionChange(i, oi, e.target.value)} 
                placeholder={`Option ${oi+1}`} 
                className="w-full p-2 border rounded" 
              />
            ))}
            <div className="flex gap-2 mt-2">
              <button 
                type="button" 
                onClick={()=>addOption(i)} 
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                + Option
              </button>
            </div>
          </div>

          <input 
            value={q.correctAnswer} 
            onChange={(e)=>handleQuestionChange(i, "correctAnswer", e.target.value)} 
            placeholder="Correct Answer (exact option text)" 
            className="w-full p-2 border rounded mt-2" 
          />
        </div>
      ))}

      <div className="flex gap-2 mb-4">
        <button 
          onClick={addQuestion} 
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          + Add Question
        </button>
        <button 
          onClick={handleSubmit} 
          disabled={loading} 
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </div>
    </div>
  );
}