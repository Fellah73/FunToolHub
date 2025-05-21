// app/components/home/FeatureSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Wrench, Gamepad2 } from 'lucide-react';
import { toolFeatures, gameFeatures, Feature } from '../../data/featureData';

function FeatureCard({
  feature,
  index,
  iconColor,
  bgColor,
}: {
  feature: Feature;
  index: number;
  iconColor: string;
  bgColor: string;
}) {
  return (
    <motion.div
      key={`feature-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col gap-y-4 group "
    >
      <div className={`p-2 flex flex-row gap-x-4 ${iconColor} group-hover:${iconColor.replace('400', '300')} transition-colors`}>
        <div className={`rounded-full p-2 bg-violet-950/80 flex items-center justify-center`}>
          {feature.icon}
        </div>
        <div className='flex flex-col justify-center items-center gap-y-4'>
          <span className={`font-semibold text-lg text-white`}>{feature.title}</span>
        </div>
      </div>
      <div className='pl-[15%] flex flex-row justify-end items-end'>
        <p className="text-gray-200 opacity-70">{feature.description.split('$')[0]}</p>
      </div>

    </motion.div>
  );
}

function FeatureGroup({
  title,
  icon,
  features,
  iconColor,
  bgColor,
  type
}: {
  title: string;
  icon: React.ReactNode;
  features: Feature[];
  iconColor: string;
  bgColor: string;
  type: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x:type === 'services' ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-violet-950/30 p-8 w-full rounded-lg shadow-2xl shadow-fuchsia-900/50 overflow-hidden"
    >
      <div className="flex flex-row items-center gap-x-3 mb-6">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          {icon}
        </div>
        <h3 className="text-xl tracking-wide font-bold">{title}</h3>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {features.map((feature, idx) => (
          <FeatureCard
            key={idx}
            feature={feature}
            index={idx}
            iconColor={iconColor}
            bgColor={bgColor}
          />
        ))}
      </div>
      <motion.a
        href={`/${type}`}
        className="flex flex-row justify-end items-end mt-6 text-fuchsia-500 tracking-wide hover:text-fuchsia-200 group"
        whileHover={{ x: 5 }}
      >
        Explore all {title.toLowerCase()} <ChevronRight className="ml-1 w-4 h-4 group-hover:ml-2 transition-all" />
      </motion.a>
    </motion.div>
  );
}

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 bg-violet-950/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Two Worlds In One Platform</h2>
          <p className="text-violet-200 max-w-2xl mx-auto">
            FunToolHub combines the best of both worlds - productivity tools to help you stay organized and fun mini-games to help you relax.
          </p>
        </motion.div>

        <div className="flex flex-col gap-y-4 lg:gap-y-8">
          <FeatureGroup
            title="Productivity Tools"
            icon={<Wrench className="h-6 w-6 text-blue-300" />}
            features={toolFeatures}
            iconColor="text-indigo-400"
            bgColor="bg-indigo-800/50"
            type='services'
          />
          <FeatureGroup
            title="Fun & Games"
            icon={<Gamepad2 className="h-6 w-6 text-fuchsia-300" />}
            features={gameFeatures}
            iconColor="text-fuchsia-400"
            bgColor="bg-fuchsia-800/50"
            type='game'
          />
        </div>
      </div>
    </section>
  );
}