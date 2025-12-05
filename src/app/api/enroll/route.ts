
import { enrollCourse } from "@/src/services/EnrollmentService";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseId} = body;
    if (!courseId ) return NextResponse.json({ success: false, message: "Missing courseId/batchId" }, { status: 400 });

    const result = await enrollCourse(courseId);
   
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Enroll API error:", err);
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 });
  }
}