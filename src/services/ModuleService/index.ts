
"use server";
const BASE = process.env.NEXT_PUBLIC_BASE_API;
// GET all modules
export async function getAllModules() {
  const res = await fetch(`${BASE}/module`);
  return res.json();
}

// GET modules by course
export async function getModulesByCourse(courseId: string) {
  const res = await fetch(`${BASE}/module/course/${courseId}`);
  return res.json();
}

// ADMIN: Create module
export async function createModule(data: any) {
  const res = await fetch(`${BASE}/module`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ADMIN: Update module
export async function updateModule(id: string, data: any) {
  const res = await fetch(`${BASE}/module/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ADMIN: Delete module
export async function deleteModule(id: string) {
  const res = await fetch(`${BASE}/module/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
