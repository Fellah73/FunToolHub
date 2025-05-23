'use client'

import { motion } from 'framer-motion';
import { Award, Calendar, Edit, Loader2, Mail } from 'lucide-react';
import { useEffect } from 'react';
import { useUser } from '../../context/userContext';
import ModalComponent from '../modal/modal';
export default function profileCardComponent() {

  const { user, setUser, loading } = useUser()


  useEffect(() => {
    console.log('updated profile in profile card ', user);
  }, [user])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-violet-950/20'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex flex-col items-center gap-y-3 p-6 rounded-lg bg-violet-900/20 backdrop-blur-sm'
        >
          <p className='text-white tracking-wide text-lg md:text-xl lg:text-3xl font-medium'>
            Loading your profile
          </p>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className='text-indigo-400 size-8' />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='text-white text-2xl md:text-4xl p-8 bg-violet-900/20 rounded-lg backdrop-blur-sm'
      >
        No user data available
      </motion.div>
    );
  }



  return (
    <div className="px-6 md:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto bg-gradient-to-br from-violet-950 to-indigo-950 rounded-lg shadow-md shadow-violet-950/80 overflow-hidden"
      >
        {/* Profile Header with Gradient Overlay */}
        <div className="relative h-52 md:h-60 ">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full h-full"
          >
            <img
              src={user?.backgroundImage || '/profile/defaultBackground.webp'}
              alt="Profile background"
              className="w-full h-full object-cover pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-950 via-violet-900/50 to-transparent"></div>
          </motion.div>

          {/* Profile Picture */}
          <motion.div
            className="absolute -bottom-14 left-1/2 transform -translate-x-1/2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="relative size-36 md:size-40 lg:size-44 rounded-full border-4 border-violet-950 group">
              <img
                src={user?.profileImage || '/profile/defaultPorfleImage.jpg'}
                alt="Profile picture"
                className="size-full object-cover rounded-full pointer-events-none select-none"
              />
            </div>
          </motion.div>
        </div>

        {/* Profile Content */}
        <motion.div
          className="pt-16 pb-8 px-8 md:px-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex justify-between items-start mb-6">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                {user?.name}
              </h1>
              <p className="text-fuchsia-300 mt-1 font-medium">{user?.pseudoname}</p>
            </motion.div>

            <motion.div

            >
              <ModalComponent user={user!} setUser={setUser} />
            </motion.div>
          </div>

          {/* Profile Info Cards */}
          <motion.div
            className="space-y-3 md:space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-indigo-900/30 text-indigo-100"
            >
              <div className="bg-fuchsia-800/50 p-2 rounded-full">
                <Mail size={18} className="text-fuchsia-300" />
              </div>
              <span className="text-sm md:text-base font-medium">{user?.email}</span>
            </motion.div>

            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-indigo-900/30 text-indigo-100"
            >
              <div className="bg-fuchsia-800/50 p-2 rounded-full">
                <Calendar size={18} className="text-fuchsia-300" />
              </div>
              <span className="text-sm md:text-base font-medium">
                Joined {new Date(user?.createdAt || 0).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-10 grid  gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ y: -5 }}
              className=" p-4 rounded-lg bg-purple-900/30 backdrop-blur-sm border border-indigo-800/50"
            >
              <p className='text-violet-300 tracking-wider text-lg'>
                {user.bio}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
