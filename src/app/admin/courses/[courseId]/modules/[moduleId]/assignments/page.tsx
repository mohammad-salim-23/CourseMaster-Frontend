"use client";

import React, { useEffect, useState } from "react";
import { getAssignmentsByModule } from "@/src/services/AssignmentService";


interface ParamsResult {
  courseId: string;
  moduleId: string;
}

// Props interface for the component (We expect params to be the object or the Promise)
interface Props { 
    params: ParamsResult | Promise<ParamsResult>;
}

export default function AssignmentsPage({ params }: Props) {
    
    const resolvedParams = React.use(params as Promise<ParamsResult>);
    const { courseId, moduleId } = resolvedParams;
    
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadAssignments = async () => {
          
            if (!moduleId) {
                setLoading(false);
                return;
            }
            
            try {
                const res = await getAssignmentsByModule(moduleId);
                setAssignments(res?.data || []);
            } catch (error) {
                console.error("Failed to load assignments:", error);
                setAssignments([]);
            } finally {
                setLoading(false);
            }
        };
        
        loadAssignments();
    }, [moduleId]); 

    if (loading) {
        return <div className="p-6">Loading assignments...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Assignments</h1>
            
            <a 
                href={`/admin/courses/${courseId}/modules/${moduleId}/assignments/create`} 
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition cursor-pointer inline-block mb-4"
            >
                ➕ Add Assignment
            </a>

            <div className="mt-4 space-y-3">
                {assignments.length === 0 && <p>No assignments yet.</p>}
                
                {assignments.map((a: any) => (
                    <div key={a._id} className="p-3 bg-white rounded shadow">
                        <h3 className="font-semibold">{a.title}</h3>
                        <p className="text-sm text-gray-600">{a.description}</p>
                        <p className="text-xs text-gray-500">Type: **{a.submissionType}**</p>
                    </div>
                ))}
            </div>
        </div>
    );
}