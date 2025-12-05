"use client";
import { submitAssignment } from "@/src/services/AssignmentSubmission";
import { useState } from "react";
import { toast } from "sonner";


export default function AssignmentSubmitForm({ assignmentId, moduleId, disabled ,onSuccess}: { assignmentId: string, moduleId: string, disabled: boolean, onSuccess?: () => void }) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

 
  if (disabled) {
    return (
      <div className="p-3 bg-teal-100 text-teal-800 rounded mt-3">
        Assignment already submitted.
      </div>
    );
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (loading || disabled || !answer.trim()) {
        if (!answer.trim()) toast.error("Answer cannot be empty.");
        return; 
    } 

    const data = {
        assignment: assignmentId,
        module: moduleId, 
        submissionType: "text",
        answer: answer.trim(), 
    };

    setLoading(true);
    let json: any = null; // Initialize json variable
    
    try {
      
        const res = await submitAssignment(data);
        
        // Response 
        
       console.log("Submission response:", res);
        if (res.success===false) {
            // Error handling (including 401 redirect)
            if (res.status === 401) {
                window.location.href = `/auth/login?next=${window.location.pathname}`;
                return;
            }
            toast.error(json?.message || "Submission failed due to server error.");
            throw new Error(json?.message || "Submit failed");
        }

        // Success
        toast.success("Submitted successfully. Please refresh the page to see the updated status.");
        if (onSuccess) onSuccess();
        setAnswer(""); // Clear the form on success
        
    } catch (err: any) {
      // Catch error from fetch or the thrown error
      toast.error(err.message || "An unexpected error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2 mt-3">
      <textarea 
        required 
        value={answer} 
        onChange={(e)=>setAnswer(e.target.value)} 
        className="w-full border p-2 rounded resize-none focus:ring-teal-500 focus:border-teal-500 transition" 
        placeholder="Paste Google Drive link or write answer" 
        // disabled prop 
        disabled={disabled || loading} 
        rows={4}
      />
      <div>
        <button 
          type="submit" 
          // disabled prop 
          disabled={loading || disabled} 
          className={`px-4 py-2 text-white rounded transition cursor-pointer ${
            loading || disabled 
            ? "bg-gray-500 cursor-not-allowed" 
            : "bg-teal-600 hover:bg-teal-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Assignment"}
        </button>
      </div>
    </form>
  );
}