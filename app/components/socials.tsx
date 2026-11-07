import type { IconType } from 'react-icons'
import { RiGithubLine, RiLinkedinLine, RiStackOverflowLine, RiTwitterXLine } from 'react-icons/ri'
import { SiLeetcode } from 'react-icons/si'
import { personal } from '@/utils/data/personal'

const icons: Record<string, IconType> = {
  LinkedIn: RiLinkedinLine,
  LeetCode: SiLeetcode,
  'Stack Overflow': RiStackOverflowLine,
  'X / Twitter': RiTwitterXLine,
  GitHub: RiGithubLine,
}

export default function Socials() {
  return (
    <div className="flex items-center gap-x-1 text-lg">
      {personal.socials.map(({ label, href }) => {
        const Icon = icons[label]
        const isGithub = label === 'GitHub'
        return (
          <a
            key={label}
            href={href}
            title={label}
            target="_blank"
            rel="noopener noreferrer"
            data-icon
            data-magnetic
            className="group flex h-11 w-11 items-center justify-center"
          >
            <span
              className={`transition-all duration-300 ${
                isGithub ? 'rounded-full bg-accent p-1.25' : 'group-hover:text-mint'
              }`}
            >
              <Icon aria-hidden className="social-icon" />
            </span>
            <span className="sr-only">{label}</span>
          </a>
        )
      })}
    </div>
  )
}
