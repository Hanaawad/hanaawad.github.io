// Single source of truth for the résumé — consumed by both the résumé page
// (site/src/pages/resume.astro) and the ATS PDF generator
// (site/scripts/build-resume-pdf.mjs). Content transcribed from Hana's real CV
// slides (src/assets/images/cv/Slide1-10). Do not invent — update here only.

export const resume = {
  name: 'Hana Awad',
  title: 'User Experience Designer & ex-Architect',
  location: 'Copenhagen, Denmark',
  email: 'hana@hanaawad.com',
  phone: '(+45) 93 83 90 46',
  links: {
    linkedin: 'https://www.linkedin.com/in/hana-awad-96071b150/',
    site: 'https://hanaawad.com',
  },

  summary:
    'Passionate interface and UX designer with front-end development experience and an architect’s background. I take products from research and information architecture through to designed, shipped interfaces — and, because I also write front-end code, I design with the grain of what’s buildable. Ex-architect from Alexandria, Egypt, now based in Copenhagen.',

  experience: [
    {
      role: 'Senior UX Designer Lead',
      org: 'SOUNDBOKS',
      start: 'Apr 2021',
      end: 'Present',
      location: 'Copenhagen, Denmark',
      bullets: [
        'Translate insights and business requirements into product design concepts and intuitive end-to-end experiences.',
        'Lead UX design strategy from start to finish — deep research, creative ideation, and tackling design-strategy and information-architecture challenges across the whole UX journey.',
        'Develop user-centric brand experiences across online shops, digital products, and services; build customer journeys, sketches and wireframes.',
        'Lead research projects and develop new app features through cross-team collaboration with stakeholders across departments.',
        'Build a Figma component library and design frameworks for website and mobile app, improving UI consistency and speed of delivery.',
        'Work with scalable, responsive designs; collaborate with Product Owners and Engineers from conception to launch in an agile, weekly-sprint process.',
      ],
    },
    {
      role: 'UX Designer & Frontend Developer',
      org: 'Ovni',
      start: 'Aug 2018',
      end: 'Present',
      location: 'Egypt',
      bullets: [
        'Developed user personas and user journeys, and defined the product roadmap and KPIs to prioritise work.',
        'Fast sketching and prototyping; designed website and mobile-app frameworks in Figma for back-end developers.',
        'Implemented designs using the Angular framework, working weekly with back-end developers on the high-level experience and key interactions.',
        'Worked with the marketing team to understand market traction and strengthen community building.',
      ],
    },
    {
      role: 'UX Designer & Frontend Developer',
      org: 'Memorix',
      start: 'Sep 2019',
      end: 'Aug 2020',
      location: 'Copenhagen, Denmark',
      bullets: [
        'Weekly user testing plus desk and on-site research to understand user challenges and the market domain.',
        'Developed personas and journeys; defined the product roadmap and KPIs.',
        'Designed website and mobile-app frameworks in Figma and implemented designs using Angular, working daily with back-end developers.',
      ],
    },
    {
      role: 'Frontend Web Developer Intern',
      org: 'Valuer',
      start: 'Jul 2019',
      end: 'Sep 2019',
      location: 'Copenhagen, Denmark',
      bullets: [
        'Redesigned proposals for Valuer’s website; produced e-book and thumbnail designs.',
      ],
    },
    {
      role: 'Full-Stack & Web Developer Intern',
      org: 'Bomae',
      start: 'Mar 2019',
      end: 'Sep 2019',
      location: 'Copenhagen, Denmark',
      bullets: [
        'Built a customised CRM to meet business requirements, giving full visibility on cases and easier document sharing with customers.',
        'Designed and implemented the dashboard, improving employee productivity.',
      ],
    },
    {
      role: 'Interior Designer (Freelance)',
      org: 'Freelance',
      start: 'Jul 2016',
      end: 'Sep 2018',
      location: 'Egypt · Zurich · Copenhagen',
      bullets: [
        'Delivered residential apartment, villa and office projects — client consultation, schematic design, 3D visualisation, detailed drawings and final delivery.',
      ],
    },
    {
      role: 'Architect, Researcher & Teaching Assistant',
      org: 'Arab Academy for Science & Technology (AAST)',
      start: 'Jul 2014',
      end: 'Sep 2018',
      location: 'Alexandria, Egypt',
      bullets: [
        'Organised and developed teaching material for university lectures; reviewed material with students in group and one-to-one sessions.',
        'Assisted in preparing examinations and grading student progress and projects.',
      ],
    },
  ],

  education: [
    {
      title: 'MSc, Architectural Engineering & Environmental Design',
      org: 'Arab Academy for Science & Technology (AAST)',
      start: 'Sep 2017',
      end: 'Aug 2019',
      location: 'Alexandria, Egypt',
      note: 'Graduated with honours. Thesis: a sustainable-design approach studying natural ventilation in educational buildings.',
    },
    {
      title: 'BSc, Architectural Engineering & Environmental Design',
      org: 'Arab Academy for Science & Technology (AAST)',
      start: 'Sep 2009',
      end: 'Aug 2014',
      location: 'Alexandria, Egypt',
    },
    {
      title: 'Front-End Web Development Nanodegree',
      org: 'Udacity',
      date: 'Jan 2020',
      location: 'Online',
    },
    {
      title: 'Web Development Bootcamp',
      org: 'Le Wagon',
      date: 'Jan 2019',
      location: 'Copenhagen, Denmark',
      note: '9-week full-stack bootcamp: Ruby, Ruby on Rails, JavaScript, HTML & CSS, APIs, GitHub, Heroku — plus an introduction to UX design and Figma.',
    },
    {
      title: 'Parametric Design Course',
      org: 'Architectural Association',
      date: 'Sep 2014',
      location: 'Berlin, Germany',
    },
    {
      title: 'Sustainability Summer School',
      org: 'University of Lincoln',
      date: 'Jul 2011',
      location: 'Lincoln, UK',
    },
  ],

  certifications: {
    org: 'LinkedIn Learning',
    date: 'Jan 2021',
    items: [
      'Analyzing User Data',
      'Creating Personas',
      'Ideation',
      'Creating Scenarios & Storyboards',
      'Implementation Planning',
      'Prototyping',
      'Multidevice Design',
    ],
  },

  skills: {
    'UX / UI': [
      'Figma',
      'Adobe XD',
      'InVision',
      'Whimsical',
      'Sketching',
      'Wireframing',
      'Prototyping',
      'Usability testing',
      'Photoshop',
      'Illustrator',
      'InDesign',
    ],
    'Front-end & software': [
      'HTML',
      'CSS',
      'JavaScript',
      'Angular',
      'Bootstrap',
      'Ruby',
      'Ruby on Rails',
      'Git',
      'Heroku',
      'Linux',
      'OOP',
      'SaaS',
    ],
    Architecture: [
      'Autodesk Revit 2D/3D',
      'Autodesk 3D-MAX',
      'SketchUp',
      'CAD',
      'Rendering',
      'Design research',
      'Project planning',
    ],
    'Ways of working': [
      'Agile / Scrum',
      'Information architecture',
      'Customer journeys',
      'Cross-team collaboration',
    ],
  },

  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Danish', level: 'Learning (module 3)' },
    { name: 'French', level: 'Beginner' },
  ],

  hobbies: ['Painting', 'Photography', 'Traveling', 'Fishing', 'Hiking', 'Board games'],
};

export default resume;
