"use client";
import { useState } from "react";

export default function QuizTake({ quiz }: { quiz: any }) {

  const [answers, setAnswers] = useState<{ [key:number]: string }>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const selectOption = (idx: number, option: string) => {
    setAnswers(prev => ({ ...prev, [idx]: option }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        quizId: quiz._id,
        moduleId: quiz.module,
        answers: quiz.questions.map((q: any, idx: number) => ({
          question: q.question,
          selectedOption: answers[idx] || ""
        }))
      };

      const res = await fetch("/api/quiz-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Submit failed");
      setResult(json.data || json);
    } catch (err: any) {
      alert(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{quiz.title}</h3>

      <form onSubmit={onSubmit} className="space-y-3">
        {quiz.questions.map((q: any, idx: number) => (
          <div key={idx} className="p-3 border rounded">
            <p className="font-medium">{q.question}</p>
            <div className="mt-2 space-y-1">
              {q.options.map((opt: string) => (
                <label key={opt} className="flex items-center gap-2">
                  <input type="radio" name={`q-${idx}`} value={opt} onChange={()=>selectOption(idx,opt)} required />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? "Submitting..." : "Submit Quiz"}</button>
      </form>

      {result && (
        <div className="p-4 bg-green-50 rounded">
          <p>Score: {result.score ?? result.data?.score}</p>
          {/* show correctness */}
          {result.answers?.map((a: any, i: number) => (
            <div key={i} className="mt-2">
              <div className="text-sm">{a.question}</div>
              <div className={`text-xs ${a.isCorrect ? "text-green-600" : "text-red-600"}`}>
                Your answer: {a.selectedOption} — {a.isCorrect ? "Correct" : "Wrong"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
