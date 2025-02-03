'use client'

import { User } from '@prisma/client'
import React,{ useEffect,useState} from 'react'
import { Calendar, Mail } from 'lucide-react';
import ModalComponent from './modal/modal';

export default function profileCardComponent({ user }: { user: User }) {

     const [currentUuser, setCurrentUuser] = useState<null | User>(user)

     useEffect(() => {
        console.log('updated profile in profile card ',currentUuser);
     }, [currentUuser])
        
     return (
      <div className="min-h-screen bg-gray-900 px-6 md:px-8 lg:px-10 py-8  ">
        <div className="w-[90%] md:w-[85%] mx-auto bg-gray-800 rounded-lg shadow-lg shadow-pink-800 overflow-hidden border-pink-800  border-t-2">
  
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-l non-pointer-events select-none">
            <img src={currentUuser?.backgroundImage} alt="web" className="w-full h-48 object-cover pointer-events-none select-none" />
  
  
            <div className="absolute -bottom-12 md:-bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative size-36 md:size-40 lg:size-44 rounded-full border-4 border-gray-800">
                <img
                  src={currentUuser?.profileImage}
                  alt="web"
                  className="size-full object-cover rounded-full pointer-events-none select-none "
                />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-end justify-center">
                  <span className="text-2xl md:text-3xl lg:text-4xl text-gray-100 z-10 pb-4 hidden">
                    {currentUuser?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Profile Content */}
          <div className="pt-11 pb-8 px-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">{currentUuser?.name}</h1>
                <p className="text-gray-400">{currentUuser?.pseudoname}</p>
              </div>
              <ModalComponent user={currentUuser!} setUser={setCurrentUuser!}/>
            </div>
            {/* Profile Info */}
            <div className="space-y-4">
              <div className="flex items-center text-gray-300 gap-2">
                <Mail size={18} />
                <span>{currentUuser?.email}</span>
              </div>
              <div className="flex items-center text-gray-300 gap-2">
                <Calendar size={18} />
                <span>Joined  us in {new Date(currentUuser?.createdAt || 0).toLocaleDateString()}</span>
              </div>
            </div>
            {/* Stats */}
            <div className="mt-8 flex flex-col gap-y-3 sm:flex sm:flex-row sm:justify-between sm:px-5 border-t border-gray-700 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-gray-400">Credit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-gray-400">Contributions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
