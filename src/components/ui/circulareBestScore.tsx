// components/CircularBestScore.tsx
import React from 'react';

interface CircularBestScoreProps {
  score: number;
  maxScore?: number;
}

const CircularBestScore: React.FC<CircularBestScoreProps> = ({ 
  score = 0, 
  maxScore = 100 
}) => {
  // Calculate percentage for the progress ring
  const percentage = Math.min(100, (score / maxScore) * 100);
  
  // Calculate the parameters for the SVG circle
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;


  
  
  return (
    <div className="p-4 hidden md:block">
      <div className="relative flex items-center justify-center size-32">
        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-md"></div>
        
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/10"></div>
        
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background track */}
          <circle 
            cx="50" 
            cy="50" 
            r={radius} 
            fill="none" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="8"
          />
          
          {/* Progress indicator with gradient */}
          <circle 
            cx="50" 
            cy="50" 
            r={radius} 
            fill="none" 
            stroke="url(#scoreGradient)" 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-700 ease-out"
          />
          
          {/* Define the gradient */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className='absolute inset-0 flex items-center justify-center'>
         <p className='text-2xl lg:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500'>{score}</p>
        </div>
        
      </div>
    </div>
  );
};

export default CircularBestScore;