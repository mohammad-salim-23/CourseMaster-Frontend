"use server";
const BASE = process.env.NEXT_PUBLIC_BASE_API;
// Create quiz
export async function createQuiz(data: any) {
  const res = await fetch(`${BASE}/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Get quizzes by module
export async function getQuizzesByModule(moduleId: string) {
  const res = await fetch(`${BASE}/quiz/module/${moduleId}`);
  return res.json();
}

// Update quiz
export async function updateQuiz(id: string, data: any) {
  const res = await fetch(`${BASE}/quiz/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Delete quiz
export async function deleteQuiz(id: string) {
  const res = await fetch(`${BASE}/quiz/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
