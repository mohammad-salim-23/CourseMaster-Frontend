import { markModuleCompleted } from "@/src/services/EnrollmentService";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json(); // { enrollmentId, moduleId }
    const { enrollmentId, moduleId } = body;
    if (!enrollmentId || !moduleId) return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });

    const result = await markModuleCompleted(enrollmentId, moduleId); 
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Complete module error:", err);
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 });
  }
}
