"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { markModuleCompleted } from "@/src/services/EnrollmentService";

export default function MarkCompleteButton({
  userId,
  courseId,
  enrollmentId,
  moduleId,
  disabled,
  isCompleted,
}: {
  userId: string;
  courseId: string;
  enrollmentId: string;
  moduleId: string;
  disabled: boolean;
  isCompleted?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    if (loading || disabled) return;

    setLoading(true);
    try {
      const res = await markModuleCompleted({
        userId,
        courseId,
        enrollmentId,
        moduleId,
      });

      if (!res.success) {
        toast.error(res.message || "Failed to mark module complete");
        
        return;
      }

      toast.success("Module marked complete!");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading || disabled || isCompleted}
      onClick={onClick}
      className={`px-6 py-3 text-lg font-semibold text-white rounded-lg transition ${
        disabled ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"
      }`}
    >
      {isCompleted ? "Already Completed":
      loading
        ? "Marking..."
        : disabled
        ? "Complete (Quiz/Assignment Pending)"
        : "Mark Module Complete"}
    </button>
  );
}
