// @flow strict
import { achievements } from "@/utils/data/achievements";
import { BsAward, BsJournalText, BsRocketTakeoff, BsPersonCheck } from "react-icons/bs";
import { MdOutlineRateReview, MdOutlineSupervisorAccount, MdOutlineWorkOutline, MdOutlineVerified } from "react-icons/md";
import AnimatedPaths from "../../helper/animated-paths";
import ScrollReveal from "../../helper/scroll-reveal";
import TiltCard from "../../helper/tilt-card";

const ICONS = {
  award: BsAward,
  research: BsJournalText,
  rocket: BsRocketTakeoff,
  chair: BsPersonCheck,
  review: MdOutlineRateReview,
  lead: MdOutlineSupervisorAccount,
  placement: MdOutlineWorkOutline,
  quality: MdOutlineVerified,
};

function Achievements() {
  return (
    <div id="achievements" className="relative z-50 border-t my-8 lg:my-12 border-[#25213b]">
      <AnimatedPaths className="absolute inset-x-0 top-0 -z-10 w-full h-[420px] opacity-35" />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Achievements</span>
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-8">
        {achievements.map((achievement, index) => {
          const Icon = ICONS[achievement.icon] ?? BsAward;
          return (
            <ScrollReveal key={achievement.id} direction="left" delay={(index % 4) * 80} className="h-full">
            <TiltCard intensity={12} className="h-full">
              <div className="group neon-border rounded-lg border border-[#1b2c68a0] bg-gradient-to-r from-[#0d1224] to-[#0a0d37] p-5 flex flex-col gap-3 h-full">
                <div className="tilt-depth flex flex-col gap-3">
                  <div className="text-[#16f2b3] transition-transform duration-300 group-hover:scale-110 w-fit">
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <h3 className="text-sm lg:text-base font-semibold text-white leading-snug">
                    {achievement.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </TiltCard>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
