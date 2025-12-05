"use server";

import { getToken } from "../AuthService";

const BASE = process.env.NEXT_PUBLIC_BASE_API;
// Submit assignment
export async function submitAssignment(data: any) {
  const token = await getToken();
  const res = await fetch(`${BASE}/assignment-submission/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" ,
      
     Authorization: token
  
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Get submissions by module
export async function getModuleSubmissions(moduleId: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/assignment-submission/module/${moduleId}`,{
     headers: { Authorization: token }
  },
   
  );
  return res.json();
}
//get all submissions
export async function getAllAssignmentSubmissions() {
  const token = await getToken();
  const res = await fetch(`${BASE}/assignment-submission`,{
     headers: { Authorization: token }
  },);
  return res.json();
}
// Get submissions by user
export async function getUserAssignmentSubmissions(userId: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/assignment-submission/user/${userId}`,{
     headers: { Authorization: token }
  },);
  return res.json();
}
