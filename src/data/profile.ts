// Personal profile information for the portfolio site.
export const profile = {
  name: 'Ayush Baranwal',
  wordmark: 'Ayush Baranwal',
  role: 'Software Engineer',
  location: 'New Delhi, India',
  tagline: 'Blah blah blah',
  headline: 'I build software, study systems, and write about what I learn. ',

  intro:
    'I am a software engineer and open-source contributor interested in scientific computing, systems software, and machine learning. I enjoy working on algorithms, understanding how things work under the hood, and writing about the elegant engineering behind them.',

  email: 'baranwal96080ayush@gmail.com',

  social: [
    { label: 'GitHub', href: 'https://github.com/baranwalayush' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayush-kumar-baranwal' },
    // { label: 'Resume', href: '/Resume-AyushBaranwal.pdf', download: false },
  ],

  interests: [
    'Scientific computing',
    'Numerical methods',
    'Systems programming',
    'Applied mathematics',
    'Machine learning',
    'Algorithms and data structures',
  ],

  education: [
    { title: 'B.Tech, Electronics and Communication Engineering', 
      place: 'Jawaharlal Nehru University', 
      years: '2023 - 2027' },

    { title: 'Diploma in Computer Science and Engineering', 
      place: 'New Government Polytechnic, Patna', 
      years: '2020 - 2023' },
  ],

  experience: [
    { title: 'Software Engineering Intern', 
      place: 'Zettabolt Technologies', 
      years: 'October 2026 - present', 
      note: 'Working on Electronic Design Automation (EDA) software, exploring engineering challenges in tools and workflows used in vlsi design.' },

    { title: 'Open source contributor', 
      link: 'https://github.com/search?q=is%3Apr+author%3Abaranwalayush&type=pullrequests',
      place: 'Various projects', 
      years: '2023 - present', 
      note: 'Contributions across projects including mpmath, SciPy, SHAP, and mlpack. Work has included numerical routines, algorithmic improvements, feature development, bug fixes, API enhancements, test coverage and improving the reliability of existing implementations.', 

      // details: 'Implemented arbitrary-precision FFT/IFFT routines, high-precision root-finding algorithms, and extended matrix APIs to support list inputs and improve edge-case handling.'

      // note:
      //   'Contribute to scientific and machine learning libraries through algorithmic improvements, feature development, bug fixes, API enhancements, and test coverage.',
      // details:
      //   'Contributions across projects including mpmath, SciPy, SHAP, and mlpack. Work has included numerical routines, matrix API improvements, edge-case handling, and improving the reliability of existing implementations.',
    },

    { title: 'Google Summer of Code Contributor', 
      link: 'https://summerofcode.withgoogle.com/programs/2025/projects/gtQryewh',
      place: 'National Resource for Network Biology (NRNB)', 
      years: 'May 2025 - September 2025', 
      note:
        'Developed and integrated an LSODA ordinary differential equation solver into the Systems Biology Simulation Core Library (SBSCL).',
      details:
        'Implemented the solver in Java, including adaptive step-size control, automatic switching between Adams and BDF methods, and stiffness handling. Validated its behaviour against the SBML Test Suite, with over 98% of semantic test cases passing.',
   },

    { title: 'Artificial Intelligence / Machine Learning Trainee', 
      place: 'National Institute of Electronics and Information Technology (NIELIT), Patna', 
      years: 'July 2023 - August 2023',
      note: 'Completed a 150+ hour AI/ML program with Grade A certification and built and evaluated 5+ machine learning models across classification, regression, clustering, and deep learning tasks.' },
  ],
  bio: [
    'I am Ayush Baranwal, a software engineer and open-source contributor with a strong interest in scientific computing, machine learning, and systems software. I enjoy working on problems where mathematics and computation meet — from implementing numerical algorithms to understanding the design and behaviour of software systems.',

    'I am pursuing a B.Tech. in Electronics and Communication Engineering at Jawaharlal Nehru University. Through projects, open-source contributions, and my Google Summer of Code experience, I have worked on numerical software, ordinary differential equation solvers, and machine learning tools. I primarily work with C++ and Python.',

    'This website is a space to document the things I build, the problems I explore, and the ideas I learn along the way. I write about software engineering, algorithms, mathematics, and excerpts from my learning journey, not limited to technical topics.',
  
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
  { label: 'Resume', href: '/Resume-AyushBaranwal.pdf', download: false },
  // { label: 'Learning', href: '/learning/' },
];
