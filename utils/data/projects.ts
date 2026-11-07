export type Category =
  | 'Web Development'
  | 'App Development'
  | 'UI/UX Design'
  | 'Graphic Design'
  | 'Creative Experiments'

export type Project = {
  slug: string
  name: string
  tagline: string
  categories: Category[]
  role: string
  overview: string
  contributions: string[]
  metrics?: { value: string; label: string }[]
  tools: string[]
  /** Real screenshot in /public/projects. Without one the project shows a text tile. */
  image?: string
  demo?: string
  demoLabel?: string
  code?: string
}

export const projects: Project[] = [
  {
    slug: 'sikshasarovar',
    name: 'Sikshasarovar',
    tagline: 'An EdTech platform, co-founded and built end to end.',
    categories: ['Web Development', 'UI/UX Design'],
    role: 'Co-Founder & Full-Stack Developer',
    overview:
      'Sikshasarovar is an EdTech platform that serves students with curated learning resources. I co-founded it and built it on the MERN stack with TypeScript, and it is actively maintained in production.',
    contributions: [
      'Owned the full SDLC, from architecture through development and deployment.',
      'Built the platform on React, Node.js, Express and MongoDB with TypeScript.',
      'Set up custom-domain hosting and handle ongoing maintenance.',
      'Lead product strategy and the technical roadmap as Co-Founder & CEO.',
    ],
    tools: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    demo: 'https://sikshasarovar.com',
    demoLabel: 'Visit platform',
  },
  {
    slug: 'yourphysiofriend',
    name: 'YourPhysioFriend',
    tagline: 'A responsive clinic website, delivered for a practising doctor.',
    categories: ['Web Development', 'UI/UX Design'],
    role: 'Full-Stack Developer (Client Project)',
    overview:
      'A client project for a physiotherapy practice. I designed and built the responsive website with Next.js and TypeScript and delivered the whole project to the doctor, deployed on Vercel.',
    contributions: [
      'Designed and built a component-based UI in Next.js and TypeScript.',
      'Made every page responsive across phone, tablet and desktop.',
      'Set up custom-domain hosting on Vercel.',
      'Wired up continuous deployment from GitHub.',
    ],
    tools: ['Next.js', 'TypeScript', 'CSS', 'Vercel'],
    image: '/projects/yourphysiofriend.webp',
    demo: 'https://yourphysiofriend.com',
    demoLabel: 'Visit website',
  },
  {
    slug: 'launch-attack',
    name: 'Launch-Attack',
    tagline: 'Lightweight ML intrusion detection for web automation.',
    categories: ['Creative Experiments'],
    role: 'Researcher & Developer (Sole Author)',
    overview:
      'A lightweight machine-learning threat-detection framework for web-automation security, built with Scikit-learn for Selenium and Puppeteer environments. It was published as a sole-authored paper in JoWET (STM Journals).',
    contributions: [
      'Designed the detection framework in Python with Scikit-learn.',
      'Targeted Selenium and Puppeteer automation environments.',
      'Evaluated the framework on the CIC-IDS2017 dataset.',
      'Wrote and published the work as sole author.',
    ],
    metrics: [
      { value: '~92%', label: 'Accuracy' },
      { value: '~3%', label: 'False-positive rate' },
      { value: '<1s', label: 'Response time' },
      { value: '~200MB', label: 'Footprint' },
    ],
    tools: ['Python', 'Scikit-learn', 'Selenium', 'Puppeteer', 'CIC-IDS2017'],
    demo: 'https://doi.org/10.37591/JOWET.v13i01.235616',
    demoLabel: 'Read the paper',
  },
  {
    slug: 'bestee',
    name: 'Bestee',
    tagline: 'A voice-activated personal assistant for Android.',
    categories: ['App Development', 'Creative Experiments'],
    role: 'Android Developer',
    overview:
      'A voice-activated Android assistant built in Android Studio with Java during my second year at MDU, designed as a personal AI companion.',
    contributions: [
      'Built voice-activated task reminders and search.',
      'Added schedule management.',
      'Implemented basic conversational handling.',
    ],
    tools: ['Android', 'Java', 'Android Studio'],
  },
  {
    slug: 'portfolio',
    name: 'This Portfolio',
    tagline: 'The site you are on, with real work and real research.',
    categories: ['Web Development'],
    role: 'Developer',
    overview:
      'My personal site, showing my work, research and teaching in one place. It began from the open-source modern-portfolio template by Sanidhya Kumar Verma (MIT) and was rebuilt as a single scroll-driven story.',
    contributions: [
      'Rebuilt the site as one scroll-driven page, with project case studies and a research section.',
      'Built with Next.js, TypeScript and Tailwind CSS.',
      'Animated with GSAP, Lenis and a custom WebGL shader, with reduced-motion support.',
    ],
    tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lenis', 'WebGL'],
    code: 'https://github.com/rohitjangra786',
  },
  {
    slug: 'login-system',
    name: 'React + Express Login System',
    tagline: 'Secure authentication with hashed credentials.',
    categories: ['Web Development'],
    role: 'Full-Stack Developer',
    overview:
      'A secure authentication web app built at Q-Spiders with React.js, Express.js and Node.js on a PostgreSQL database.',
    contributions: [
      'Built user registration with input validation.',
      'Implemented login with securely hashed passwords.',
      'Added profile CRUD management.',
    ],
    tools: ['React.js', 'Express.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    slug: 'bank-management-system',
    name: 'Bank Management System',
    tagline: 'Reliable transactions on Java and JDBC.',
    categories: ['App Development'],
    role: 'Backend Developer',
    overview:
      'A banking system built at Q-Spiders with Java, JDBC and MySQL, focused on reliable transactional data handling.',
    contributions: [
      'Built account creation.',
      'Implemented deposit and withdrawal transactions and balance inquiries.',
      'Handled transactional data through a robust JDBC connection.',
    ],
    tools: ['Java', 'JDBC', 'MySQL', 'Eclipse'],
  },
  {
    slug: 'grilli',
    name: 'Grilli',
    tagline: 'A multi-page restaurant website with animated detail.',
    categories: ['Web Development', 'UI/UX Design'],
    role: 'Front-End Developer',
    overview:
      'A multi-page restaurant website built during my first year at MDU with HTML5, CSS3 and JavaScript.',
    contributions: [
      'Built the menu, gallery and reservations pages.',
      'Added creative animations and hover effects.',
      'Made the layout fully responsive.',
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
