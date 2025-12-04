"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function MarkCompleteButton({ enrollmentId, moduleId, disabled }: { enrollmentId: string, moduleId: string, disabled: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
   
    if (loading || disabled) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/enrollment/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId, moduleId }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 401) window.location.href = `/auth/login?next=/dashboard/enrollments`;
        throw new Error(json?.message || "Error");
      }
      if (json.success) {
        // Successfully marked complete, refresh the page to update status
        router.refresh(); 
      } else {
        toast(json.message || "Failed to mark complete");
      }
    } catch (err: any) {
      toast(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      // disabled prop 
      disabled={loading || disabled} 
      onClick={onClick} 
      className={`px-6 py-3 text-lg font-semibold text-white rounded-lg transition-colors duration-200 ${
        disabled 
          ? "bg-gray-400 cursor-not-allowed" 
          : "bg-green-600 hover:bg-green-700" 
      }`}
    >
      {loading 
        ? "Marking..." 
        : disabled 
          ? "Complete (Quiz/Assignment Pending)" 
          : "Mark Module Complete ✅"}
    </button>
  );
}