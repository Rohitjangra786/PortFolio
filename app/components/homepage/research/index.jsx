// @flow strict
import { publications } from "@/utils/data/publications";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdOutlineScience } from "react-icons/md";
import AnimatedPaths from "../../helper/animated-paths";
import ScrollReveal from "../../helper/scroll-reveal";
import TiltCard from "../../helper/tilt-card";

const STATUS_STYLES = {
  'Published': 'text-[#16f2b3] border-[#16f2b3]/40 bg-[#16f2b3]/10',
  'Accepted': 'text-violet-400 border-violet-500/40 bg-violet-500/10',
  'Under Review': 'text-amber-300 border-amber-400/40 bg-amber-400/10',
};

const GROUPS = ['Published', 'Accepted', 'Under Review'];

function PublicationCard({ publication }) {
  return (
    <div className="neon-border from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full h-full flex flex-col">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      <div className="tilt-depth p-4 lg:p-6 flex flex-col gap-3 grow">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${STATUS_STYLES[publication.status]}`}>
            {publication.status}
          </span>
          <span className="text-xs text-gray-400">{publication.date}</span>
        </div>
        <h3 className="text-sm lg:text-base font-medium text-white leading-snug">
          {publication.title}
        </h3>
        <p className="text-xs lg:text-sm text-gray-300">
          {publication.venue}
          {publication.meta ? <span className="text-gray-500"> &nbsp;|&nbsp; {publication.meta}</span> : null}
        </p>
        {publication.note &&
          <p className="text-xs text-gray-400 italic">{publication.note}</p>
        }
        <div className="flex items-center justify-between gap-2 flex-wrap mt-auto pt-2">
          <div className="flex gap-2 flex-wrap">
            {publication.tags.map((tag, i) => (
              <span key={i} className="text-[10px] sm:text-xs text-[#16f2b3] bg-[#1a1443] px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          {publication.link &&
            <Link
              href={publication.link}
              target="_blank"
              aria-label={`Open DOI for ${publication.title}`}
              className="flex items-center gap-1.5 text-xs text-pink-500 hover:text-pink-400 transition-colors duration-300"
            >
              <span>DOI</span>
              <FaExternalLinkAlt size={10} />
            </Link>
          }
        </div>
      </div>
    </div>
  );
}

function Research() {
  return (
    <div id="research" className="relative z-50 border-t my-8 lg:my-12 border-[#25213b]">
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>
      <AnimatedPaths className="absolute inset-x-0 top-0 -z-10 w-full h-[420px] opacity-40" />

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Research</span>
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <p className="text-center text-sm lg:text-base text-gray-300 max-w-3xl mx-auto px-4 mb-8 flex items-center justify-center gap-2">
        <MdOutlineScience className="text-[#16f2b3] shrink-0" size={20} aria-hidden="true" />
        Peer-reviewed publications in cybersecurity, machine learning, and HCI - published, accepted, and under review.
      </p>

      <div className="flex flex-col gap-10 py-4">
        {GROUPS.map((group) => {
          const items = publications.filter(p => p.status === group);
          if (items.length === 0) return null;
          return (
            <div key={group}>
              <h3 className="text-base lg:text-lg font-semibold uppercase tracking-wider mb-4 px-1">
                <span className={`${STATUS_STYLES[group].split(' ')[0]}`}>{group}</span>
                <span className="text-gray-500 text-sm font-normal ml-2">({items.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {items.map((publication, index) => (
                  <ScrollReveal key={publication.id} direction={index % 2 === 0 ? 'left' : 'right'} delay={(index % 2) * 80} className="h-full">
                    <TiltCard intensity={7} className="h-full">
                      <PublicationCard publication={publication} />
                    </TiltCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Research;
