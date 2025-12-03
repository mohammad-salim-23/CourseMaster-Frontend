"use server";

import { getToken } from "../AuthService";

const BASE = process.env.NEXT_PUBLIC_BASE_API;
// Create assignment (ADMIN)
export async function createAssignment(data: any) {
  const token = await getToken();
  const res = await fetch(`${BASE}/assignment`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Get assignments by module
export async function getAssignmentsByModule(moduleId: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/assignment/module/${moduleId}`,
    {
      headers: {Authorization: token}
    }
  );
  return res.json();
}

// Update assignment (ADMIN)
export async function updateAssignment(id: string, data: any) {
  const token = await getToken();
  const res = await fetch(`${BASE}/assignment/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" , 
      Authorization: token
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Delete assignment
export async function deleteAssignment(id: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/assignment/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  return res.json();
}
