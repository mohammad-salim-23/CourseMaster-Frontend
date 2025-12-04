"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnrollButton({ courseId, batchId }: { courseId: string; batchId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onEnroll = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, batchId }),
      });
      const json = await res.json();

      if (!res.ok) {
        // If backend responds unauthorized, redirect to login
        if (res.status === 401 || (json && /unauthor/i.test(json.message || ""))) {
          // pass next param
          window.location.href = `/auth/login?next=/course/${courseId}`;
          return;
        }
        throw new Error(json?.message || "Enroll failed");
      }

      if (json.success) {
        // success → go to My Enrolled Courses or dashboard
        router.push("/dashboard/enrollments");
      } else {
        alert(json.message || "Enroll failed");
      }
    } catch (err: any) {
      alert(err.message || "Enroll error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={onEnroll}
      className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 cursor-pointer"
    >
      {loading ? "Enrolling..." : "Enroll Now"}
    </button>
  );
}
