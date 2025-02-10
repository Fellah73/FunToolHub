"use client";

import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { GlowingEffect } from "./ui/glowing-effect";

interface CardDemoProps {
  title: string
  description: string
  link: string,
  image: string,
  type?: string,
  borderGlow?: boolean,
  setActiveCard: (title: string | null) => void; // 🔥 Ajout de la prop
 
}
export function ThreeDCardDemo({ title, description, link, image, type, borderGlow,setActiveCard }: CardDemoProps) {

  
  

  const progress = Math.floor(Math.random() * 100);

  const direction = Math.floor(Math.random() * 2) - 1

  return (
    <div className="w-full relative">
      {
        borderGlow && (<GlowingEffect
          spread={100}
          glow={true}
          disabled={false}
          proximity={200}
          inactiveZone={0.4}
          borderWidth={6}
          movementDuration={2}
          blur={0}
          className="rounded-3xl" />)
      }
      <CardContainer className="size-full relative rounded-3xl">
        <CardBody className="bg-gray-800 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] h-auto rounded-xl p-6 ">
          <div className="flex flex-col justify-center items-center">
            <CardItem
              translateZ={40} translateX={5} translateY={5}
              className="text-2xl sm:text-xl lg:text-lg font-bold text-white"
            >
              {title}
            </CardItem>
            <CardItem
              translateZ={0}
              as="p"
              className="text-neutral-300 text-base sm:text-lg lg:text-base font-semibold"
            >
              {description.split("$")[0]}
            </CardItem>
          </div>


          <CardItem translateZ="30" translateX={5 * direction} translateY={5} className="w-full mt-4">
            <img
              src={image}
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={title}
            />
          </CardItem>

          <div className="flex flex-col justify-center items-center gap-y-5 mt-4">
            <p className="text-white text-lg sm:text-xl lg:text-2xl font-semibold">progression</p>
            {/** progress bar */}
            <div className="h-[6px] w-[95%] mx-auto border-2 border-l-pink-800 rounded-sm overflow-hidden">
              <div className="h-full bg-white transition-all ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {/* buttons of leanre more and try */}
          <div className="flex justify-between items-center mt-4">

            {/* try it button */}
            <CardItem
              translateZ={30}
              translateX={15}
              translateY={-5}
              as={Link}
              href={link}
              className="px-4 py-2 text-white font-semibold text-lg sm:text-xl lg:text-2xl "
            >
              {
                type === "game" ? "play it" : "try it"
              }
              {" "} →
            </CardItem>

            {/*  more details button */}
            <CardItem
              translateZ={40}
              translateX={-15}
              translateY={-5}
              as="button"
              onClick={() => setActiveCard(title)}
              className="px-4 py-2 rounded-xl bg-pink-800 border-pink-800 border-4 text-white text-base sm:text-lg  font-semibold"
            >
              more details
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
      
    </div>
  );
}

// adding the details modal --> done
// ading the hover background for the gris videos --> done