"use server";
import { getToken } from "../AuthService";
const BASE = process.env.NEXT_PUBLIC_BASE_API;
export async function createCourse(data: any) {
  const token = await getToken();
  const res = await fetch(`${BASE}/course`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCourse(id: string, data: any) {
  const token = await getToken();
  const res = await fetch(`${BASE}/course/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteCourse(id: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/course/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  return res.json();
}

// GET courses (public)
export async function getAllCourses() {
  const res = await fetch(`${BASE}/course`);
  return res.json();
}

export async function getCourseById(id: string) {
  const res = await fetch(`${BASE}/course/${id}`);
  return res.json();
}