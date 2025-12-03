"use server";
import { cookies } from "next/headers";

const BASE = process.env.NEXT_PUBLIC_BASE_API;

// Helper to get token
const getToken = async () => (await cookies()).get("accessToken")?.value || "";

// ----------------- QUIZ -----------------
export async function createQuiz(data: any) {
  const token = await getToken();
  const res = await fetch(`${BASE}/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateQuiz(id: string, data: any) {
  const token = await getToken();
  const res = await fetch(`${BASE}/quiz/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteQuiz(id: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/quiz/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  return res.json();
}

// Get quizzes (public)
export async function getQuizzesByModule(moduleId: string) {
  const res = await fetch(`${BASE}/quiz/module/${moduleId}`);
  return res.json();
}