"use client";

import React from "react";

interface VideoPlayerProps {
    videoUrl: string;
}


const getYouTubeVideoId = (url: string): string | null => {
    try {
        const urlObj = new URL(url);
        
       
        if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.get('v')) {
            return urlObj.searchParams.get('v');
        }
        
     
        if (urlObj.hostname.includes('youtu.be')) {
           
            return urlObj.pathname.substring(1); 
        }
    } catch (e) {
       
        return null;
    }
    return null;
};


export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
    if (!videoUrl) return null;

    const videoId = getYouTubeVideoId(videoUrl);

    if (!videoId) {
        
        return <p className="text-red-500">Invalid YouTube URL provided.</p>;
    }

    
    const embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1`;

    return (
        <div className="player-wrapper w-full" style={{ height: '360px' }}>
            <iframe
                title="YouTube Video Player"
                width="100%"
                height="100%"
                src={embedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                style={{ border: 'none' }}
            ></iframe>
        </div>
    );
}