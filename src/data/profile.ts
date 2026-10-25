// Personal profile information for the portfolio site.
export const profile = {
  name: 'Ayush Baranwal',
  wordmark: 'Ayush Baranwal',
  role: 'Software engineer and researcher',
  location: 'New Delhi, India',
  tagline: 'Scientific computing, systems, and software engineering.',
  headline: 'I build software, study systems, and write about what I learn.',
  intro:
    'I am a software engineer and researcher interested in scientific computing, numerical methods, machine learning, and systems work. I contribute to open-source projects, build practical tools, and document the engineering decisions behind them.',
  email: 'baranwal96080ayush@gmail.com',
  social: [
    { label: 'GitHub', href: 'https://github.com/baranwalayush' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayush-kumar-baranwal' },
    { label: 'Resume', href: '/public/Resume-AyushBaranwal.pdf', download: true },
  ],
  interests: [
    'Scientific computing',
    'Machine learning',
    'Systems programming',
    'Applied mathematics',
    'Numerical methods',
  ],
  education: [
    { title: 'B.Tech, Electronics and Communication Engineering', place: 'Jawaharlal Nehru University', years: '2023 to 2027' },
    { title: 'Diploma in Computer Science and Engineering', place: 'New Government Polytechnic, Patna', years: '2020 to 2023' },
  ],
  experience: [
    { title: 'Software Engineering Intern', place: 'Zettabolt Technologies', years: 'October 2026 to present', 
      note: 'Learning and building Electronic Design Automation (EDA) tools.' },

    { title: 'Open source contributor', place: 'Various projects', years: '2023 to present', 
      note: 'Feature development, documentation, algorithmic optimizations, bug fixes, and test coverage for various open-source libraries and tools including mpmath, scipy, shap, and mlpack.', 
      details: 'Implemented arbitrary-precision FFT/IFFT routines, high-precision root-finding algorithms, and extended matrix APIs to support list inputs and improve edge-case handling.'},

    { title: 'Google Summer of Code Contributor', place: 'National Resource for Network Biology (NRNB)', years: 'May 2025 to September 2025', 
      note: 'Implemented and integrated LSODA (Livermore Solver for Ordinary Differential Equations Automatic) solver in the Systems Biology Simulation Core Library (SBSCL).' },

    { title: 'Artificial Intelligence / Machine Learning Trainee', place: 'National Institute of Electronics and Information Technology (NIELIT), Patna', years: 'July 2023 to August 2023',
      note: 'Completed a 150+ hour AI/ML program with Grade A certification and built and evaluated 5+ machine learning models across classification, regression, clustering, and deep learning tasks.' },
  ],
  bio: [
    'I am Ayush Baranwal, a software engineer and open-source contributor focused on scientific computing, numerical methods, and systems software. My work spans ODE solvers, numerical algorithms, and practical machine learning pipelines, and I enjoy turning research ideas into robust, maintainable code.',
    'I am currently pursuing a B.Tech. in Electronics and Communication Engineering at Jawaharlal Nehru University while continuing to contribute to open-source projects and build hands-on technical experience. My interests include C++, Python, scientific computing, machine learning, and competitive programming.',
  ],
};

export const siteMeta = {
  title: 'Ayush Baranwal',
  description: 'Personal portfolio, technical blog, and learning archive.',
  copyrightYear: new Date().getFullYear(),
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Writing', href: '/blog/' },
  // { label: 'Learning', href: '/learning/' },
];
