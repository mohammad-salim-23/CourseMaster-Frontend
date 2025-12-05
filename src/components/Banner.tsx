"use client";

import * as React from "react";

import Image from "next/image";

import bannerImage from "../app/assets/images/edTechLogo3.jpg"; 

import Link from "next/link";
import NLButton from "@/components/ui/core/button/NlButton";




function Banner() {
  


  return (
    // Outer div for the entire banner section
    <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden">
      
 
      <Image 
        src={bannerImage} 
        fill 
        alt="CourseMaster Banner" 
        className="object-cover" 
        priority 
      />

     
      <div className="bg-black w-full h-full absolute z-10 opacity-30"></div>
      
  
      <div className="text-white absolute z-30 flex justify-center items-center w-full h-full">
        <div className="text-center lg:w-3xl px-5 py-5 space-y-4 md:space-y-6">
          
 
          <h2
            className="text-3xl md:text-5xl lg:text-7xl font-bold leading-snug"
            data-aos="fade-down"
            data-aos-duration="500"
          >
            Master Your Skills with <br />
            <span className="text-teal-400">CourseMaster</span>
          </h2>
          
          {/* Sub-text */}
          <p
            className="text-sm md:text-xl font-light max-w-3xl mx-auto"
          >
            Explore hundreds of courses, learn from experts, and gain the skills
            needed to advance your career. Start your learning journey today!
          </p>
          
          {/* Single Button: All Courses */}
          <div className="flex justify-center items-center pt-6">
            <Link href={"/all-courses"}> 
              <NLButton
                variant="primary" 
                className="lg:px-8 lg:py-4 text-base md:text-xl font-semibold bg-teal-500 hover:bg-teal-700 transition duration-300 cursor-pointer"
              >
                All Courses
              </NLButton>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Banner;
