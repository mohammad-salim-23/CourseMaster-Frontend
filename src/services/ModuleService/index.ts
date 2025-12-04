"use server"
import { getToken } from "../AuthService";
const BASE = process.env.NEXT_PUBLIC_BASE_API;
export async function createModule(data: any) {
  const token = await getToken();
  const res = await fetch(`${BASE}/module`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateModule(id: string, data: any) {
  const token = await getToken();
  const res = await fetch(`${BASE}/module/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteModule(id: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/module/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  return res.json();
}

// GET modules (public)
export async function getAllModules() {
  const res = await fetch(`${BASE}/module`);
  return res.json();
}
//getModuleDetails
export async function getModuleDetails(id: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/module/${id}/details`, {
    headers: { Authorization: token },
  });
  return res.json();
}
export async function getModulesByCourse(courseId: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/module/course/${courseId}`,{
    headers:{ Authorization: token}
  });
  return res.json();
}

