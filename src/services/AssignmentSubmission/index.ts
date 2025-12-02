"use server";
const BASE = process.env.NEXT_PUBLIC_BASE_API;
// Submit assignment
export async function submitAssignment(data: any) {
  const res = await fetch(`${BASE}/assignment-submission`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Get submissions by module
export async function getModuleSubmissions(moduleId: string) {
  const res = await fetch(`${BASE}/assignment-submission/module/${moduleId}`);
  return res.json();
}

// Get submissions by user
export async function getUserAssignmentSubmissions(userId: string) {
  const res = await fetch(`${BASE}/assignment-submission/user/${userId}`);
  return res.json();
}
