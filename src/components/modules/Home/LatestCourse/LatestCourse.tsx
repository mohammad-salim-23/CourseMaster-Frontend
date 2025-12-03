"use client";

import { getAllCourses } from "@/src/services/CourseService";
import { useEffect, useState } from "react";

const LatestCourse= ()=>{
    const [courses,setCourses] = useState([]);

    useEffect(()=>{
        const loadData = async()=>{
            const res = await getAllCourses();
            setCourses(res.data);
        }
        loadData();
    },[])
   return (
    <div className="mt-8 px-4 md:px-8 lg:px-16 mb-8">
      <h1 className="text-3xl font-bold mb-4 ">📚 Latest Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((c: any) => (
          <div
            key={c._id}
            className="p-4 bg-white rounded-lg shadow flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{c.title}</h2>
              <p className="mb-4">{c.description}</p>
            </div>

        
          </div>
        ))}
      </div>
    </div>
   ) 
}
export default LatestCourse;