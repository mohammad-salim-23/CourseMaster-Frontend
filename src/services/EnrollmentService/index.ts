"use server";
const BASE = process.env.NEXT_PUBLIC_BASE_API;
// Enroll a user in a course (with batch)
export async function enrollCourse(courseId: string, batchId: string) {
  const res = await fetch(`${BASE}/enrollment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course: courseId, batch: batchId }),
  });
  return res.json();
}

// GET all enrollments of a user
export async function getUserEnrollments(userId: string) {
  const res = await fetch(`${BASE}/enrollment/user/${userId}`);
  return res.json();
}

// GET enrollment for user + course
export async function getEnrollment(userId: string, courseId: string) {
  const res = await fetch(`${BASE}/enrollment/user/${userId}/course/${courseId}`);
  return res.json();
}

// Mark a module as completed
export async function markModuleCompleted(enrollmentId: string, moduleId: string) {
  const res = await fetch(`${BASE}/enrollment/complete-module`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ enrollmentId, moduleId }),
  });
  return res.json();
}
