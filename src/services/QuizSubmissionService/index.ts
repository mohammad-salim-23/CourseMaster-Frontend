"use server";

import { getToken } from "../AuthService";

const BASE = process.env.NEXT_PUBLIC_BASE_API;
// Submit quiz
export async function submitQuiz(data: any) {
  const res = await fetch(`${BASE}/quiz-submission`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Get results for a quiz for a user
export async function getQuizResult(userId: string, quizId: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/quiz-submission/user/${userId}/quiz/${quizId}`);
  return res.json();
}

// Get all quiz submissions of a user
export async function getUserQuizSubmissions(userId: string) {
  const res = await fetch(`${BASE}/quiz-submission/user/${userId}`);
  return res.json();
}
