// @flow strict
import { certifications, educations } from "@/utils/data/educations";
import Image from "next/image";
import { BsAward } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import lottieFile from '../../../assets/lottie/study.json';
import AnimatedPaths from "../../helper/animated-paths";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import ScrollReveal from "../../helper/scroll-reveal";

function Education() {
  return (
    <div id="education" className="relative z-50 border-t my-8 lg:my-12 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />
      <AnimatedPaths className="absolute inset-x-0 top-0 -z-10 w-full h-[420px] opacity-35" />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Educations</span>
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <ScrollReveal direction="left" className="flex justify-center items-start">
            <div className="w-3/4 h-3/4">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </ScrollReveal>

          <div>
            <div className="flex flex-col gap-6">
              {
                educations.map((education, index) => (
                  <ScrollReveal key={education.id} direction="left" delay={index * 80}>
                  <GlowCard identifier={`education-${education.id}`}>
                    <div className="p-3 relative text-white">
                      <Image
                        src="/blur-23.svg"
                        alt="Hero"
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                      />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm text-[#16f2b3]">
                          {education.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-8 px-3 py-5">
                        <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                          <FaGraduationCap size={36} />
                        </div>
                        <div>
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                            {education.title}
                          </p>
                          <p className="text-sm sm:text-base">{education.institution}</p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                  </ScrollReveal>
                ))
              }
            </div>

            <h3 className="text-base lg:text-lg font-semibold uppercase tracking-wider text-[#16f2b3] mt-10 mb-4 px-1">
              Certifications
            </h3>
            <div className="flex flex-col gap-6">
              {
                certifications.map((certification, index) => (
                  <ScrollReveal key={`cert-${certification.id}`} direction="left" delay={index * 80}>
                  <GlowCard identifier={`certification-${certification.id}`}>
                    <div className="p-3 relative text-white">
                      <Image
                        src="/blur-23.svg"
                        alt=""
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                      />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm text-[#16f2b3]">
                          {certification.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-8 px-3 py-5">
                        <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                          <BsAward size={36} />
                        </div>
                        <div>
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                            {certification.title}
                          </p>
                          <p className="text-sm sm:text-base">{certification.issuer}</p>
                          <p className="text-xs sm:text-sm text-gray-400 mt-1">{certification.description}</p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                  </ScrollReveal>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;