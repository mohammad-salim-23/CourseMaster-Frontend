"use server";

const BASE = process.env.NEXT_PUBLIC_BASE_API;

// GET all courses
export async function getAllCourses() {
  const res = await fetch(`${BASE}/course`);
  return res.json();
}

// GET single course
export async function getCourseById(id: string) {
  const res = await fetch(`${BASE}/course/${id}`);
  return res.json();
}

// ADMIN: Create course
export async function createCourse(data: any) {
  const res = await fetch(`${BASE}/course`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ADMIN: Update course
export async function updateCourse(id: string, data: any) {
  const res = await fetch(`${BASE}/course/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ADMIN: Delete course
export async function deleteCourse(id: string) {
  const res = await fetch(`${BASE}/course/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
