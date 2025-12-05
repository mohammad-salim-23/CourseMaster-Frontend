"use server";

import { getToken } from "../AuthService";

const BASE = process.env.NEXT_PUBLIC_BASE_API;
// Submit quiz
export async function submitQuiz(data: any) {
  const token = await getToken();
  const res = await fetch(`${BASE}/quiz-submission/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json",
      Authorization: token
     },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Get results for a quiz for a user
export async function getQuizResult(userId: string, quizId: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/quiz-submission/user/${userId}/quiz/${quizId}`,
    { headers: { Authorization: token } }
  );
  return res.json();
}
//Get all quiz submissions
export async function getAllQuizSubmissions(){
  const token = await getToken();
  const res = await fetch(`${BASE}/quiz-submission/all`,
    { headers: { Authorization: token } }
  );
  return res.json();
  
}
// Get all quiz submissions of a user
export async function getUserQuizSubmissions(userId: string) {
  const token  = await getToken();
  const res = await fetch(`${BASE}/quiz-submission/user/${userId}`,
    { headers: { Authorization: token } }
  );
  return res.json();
}
