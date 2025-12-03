import { getToken } from "../AuthService";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function enrollCourse(courseId: string, batchId: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/enrollment`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ course: courseId, batch: batchId }),
  });
  return res.json();
}

export async function markModuleCompleted(enrollmentId: string, moduleId: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/enrollment/complete-module`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ enrollmentId, moduleId }),
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