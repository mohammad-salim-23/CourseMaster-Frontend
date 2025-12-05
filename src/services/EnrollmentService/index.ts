"use server";
import { getToken } from "../AuthService";

const BASE = process.env.NEXT_PUBLIC_BASE_API;
export async function enrollCourse(courseId: string) {
  const token = await getToken();
  console.log("token....",token);
 
  const res = await fetch(`${BASE}/enrollment`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ course: courseId }),
  });
  return res.json();
}

export async function markModuleCompleted(payload: {
  userId: string;
  courseId: string;
  enrollmentId: string;
  moduleId: string;
}) {
  const token = await getToken();
  const res = await fetch(`${BASE}/enrollment/complete-module`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// GET enrollments (admin)
export async function getAllEnrollments() {
  const token = await getToken();
  const res = await fetch(`${BASE}/enrollment`, {
    headers: { Authorization: token },
  });
  return res.json();
}

// GET user enrollments (user)
export async function getUserEnrollments(userId: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/enrollment/user/${userId}`, {
    headers: { Authorization: token },
  });
  return res.json();
}