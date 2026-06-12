// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import ScrollReveal from "../../helper/scroll-reveal";


function AboutSection() {
  return (
    <div id="about" className="my-8 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <ScrollReveal direction="left" className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Who I am?</span>
          </p>
          <p className="text-gray-200 text-sm lg:text-lg">
            {personalData.description}
          </p>
        </ScrollReveal>
        <ScrollReveal direction="right" className="flex justify-center order-1 lg:order-2">
          <Image
            src={personalData.profile}
            width={280}
            height={375}
            alt="Rohit Kumar"
            className="rounded-lg shadow-[0_0_40px_0_rgba(139,92,246,0.25)] transition-all duration-700 hover:scale-105 cursor-pointer"
          />
        </ScrollReveal>
      </div>
    </div>
  );
};

export default AboutSection;