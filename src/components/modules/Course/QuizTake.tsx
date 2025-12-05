"use client";

import { submitQuiz } from "@/src/services/QuizSubmissionService";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface QuizTakeProps {
  quiz: any; 
  disabled: boolean; 
  onSuccess?:()=>void;
}

export default function QuizTake({ quiz, disabled,onSuccess }: QuizTakeProps) {
  
  const questions = quiz.questions || [];

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Reset answers if quiz changes
  useEffect(() => {
    setAnswers({});
    setResult(null);
  }, [quiz]);

  const selectOption = (idx: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [idx]: option }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (disabled || loading) return;

    if (Object.keys(answers).length !== questions.length) {
      toast("Please answer all questions before submitting.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        quizId: quiz._id,
        moduleId: quiz.module,
        answers: questions.map((q: any, idx: number) => ({
          question: q.question,
          selectedOption: answers[idx],
        })),
      };

      const res = await submitQuiz(payload);

      if (!res.success) throw new Error(res.message || "Submit failed");

      setResult(res.data);
      toast.success("Quiz submitted successfully!");
      if(onSuccess) onSuccess();
    } catch (err: any) {
      toast(err.message || "Error submitting quiz.");
    } finally {
      setLoading(false);
    }
  };

  const alreadySubmitted = disabled && !result;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{quiz.title}</h3>

      {alreadySubmitted && (
        <div className="p-3 bg-teal-100 text-teal-800 rounded">
          You have already submitted this quiz.
        </div>
      )}

      {/* Show Questions Only If Not Submitted */}
      {!disabled && !result && questions.length > 0 && (
        <form onSubmit={onSubmit} className="space-y-5">
          {questions.map((q: any, idx: number) => (
            <div key={idx} className="p-3 border rounded-lg">
              <p className="font-medium mb-2">{q.question}</p>
              {q.options.map((opt: string) => (
                <label key={opt} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    value={opt}
                    onChange={() => selectOption(idx, opt)}
                    required
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white rounded-lg transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Quiz"}
          </button>
        </form>
      )}

      {/* Quiz Result After Submit */}
      {result && (
        <div className="p-4 bg-green-50 border rounded-lg">
          <h4 className="font-semibold text-green-700">Your Score</h4>
          <p className="text-xl font-bold">Score: {result.score}</p>

          <div className="mt-3 space-y-2">
            {result.answers?.map((a: any, i: number) => (
              <div key={i} className="p-2 border rounded">
                <p className="font-medium">{a.question}</p>
                <p className={`text-sm ${a.isCorrect ? "text-green-700" : "text-red-600"}`}>
                  Your answer: {a.selectedOption} —{" "}
                  {a.isCorrect ? "Correct ✅" : `Wrong ❌ (Correct: ${a.correctOption})`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No questions available */}
      {questions.length === 0 && !disabled && !result && (
        <p className="text-gray-500">No questions available for this quiz.</p>
      )}
    </div>
  );
}
