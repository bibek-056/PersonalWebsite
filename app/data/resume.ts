export type ResumeItem = {
  id: string;
  type: "experience" | "project" | "education";
  eyebrow: string;
  title: string;
  organization: string;
  date: string;
  location?: string;
  summary: string;
  details: string[];
  highlights?: string[];
  technologies?: string[];
};

export const profile = {
  name: "Bibek Adhikari",
  role: "Software engineer",
  location: "Lalitpur, Nepal",
  phone: "(977) 982 7188066",
  email: "adh.bibek056@gmail.com",
  introduction:
    "I build data-intensive software, modernize the systems behind it, and make room for what comes next.",
};

export const resumeItems: ResumeItem[] = [
  {
    id: "verisk",
    type: "experience",
    eyebrow: "Current role",
    title: "Software Engineer",
    organization: "Verisk Nepal",
    date: "February 2024 — Present",
    location: "Lalitpur, Nepal",
    summary:
      "Building ETL software for proprietary insurance data and helping modernize long-lived systems.",
    details: [
      "Working to build Extract, Transform and Load (ETL) software tools to compute a large amount of proprietary insurance data for underwriting processes.",
      "Conducted internal research to assess software quality based on static metrics and estimate the technical debt associated with legacy software systems under maintenance.",
      "Led efforts to refactor legacy software modules with over a decade of version history to prepare them for AI integration, and upgraded ETL data pipelines to improve data integrity and throughput.",
      "Configured and maintained AWS services essential for project development and deployment.",
    ],
    technologies: [
      "C#",
      ".NET Core",
      "Python",
      "Snowflake DB",
      "AWS SageMaker",
      "EKS",
      "DynamoDB",
      "S3",
      "Lambda",
      "SQS",
    ],
  },
  {
    id: "inspire",
    type: "experience",
    eyebrow: "Research fellowship",
    title: "Solutions Developer",
    organization: "INSPIRE Nepal",
    date: "August 2023 — January 2024",
    location: "Lalitpur, Nepal",
    summary:
      "Led a student team building a healthcare support system and location-aware emergency blood donor alerts.",
    details: [
      "Selected as a research fellow in the Nepal wing of the INSPIRE program conducted by Professor Daniela Damian of the University of Victoria in Canada.",
      "Conducted original research on software requirements engineering, agile work methods, and experiential learning while building a software system to support healthcare providers in rural and underserved regions of Nepal.",
      "Developed a solution to send personalized alerts to blood donors based on their geo-locations during hospital emergencies.",
      "Led undergraduate students and collaborated with non-government organizations and local-level government in West Rukum district to deploy the web application.",
      "Project page: BloodSync | INSPIRE.",
      "Related research paper: A Sense of Giving Back: Sustainability Lens in a STEM Program.",
    ],
    technologies: [
      "Requirements engineering",
      "Agile",
      "Web development",
      "Geolocation",
      "Team leadership",
    ],
  },
  {
    id: "tech-debt-research",
    type: "project",
    eyebrow: "Research · Submitted to Tech Debt 2026",
    title:
      "An Analysis of How Academic Approaches to Software Debt Align with Industry Realities",
    organization: "Independent research",
    date: "2026",
    summary:
      "Examines where academic approaches to technical debt meet — and diverge from — everyday software practice.",
    details: [
      "Explores recent primary and secondary research to identify academic consensus on technical debt classification and mitigation strategies.",
      "Evaluates how those strategies apply in real-world software development environments, highlighting the gap between academic approaches and industry practices.",
      "Manuscript available upon request.",
    ],
  },
  {
    id: "decentralized-finance",
    type: "project",
    eyebrow: "Undergraduate dissertation",
    title: "Decentralized Finance",
    organization: "Tribhuvan University",
    date: "2023",
    summary:
      "A decentralized finance application on Ethereum with a Solidity liquidity pool, staking, and borrowing.",
    details: [
      "Developed a decentralized finance web application on the Ethereum network, implementing a Solidity-based liquidity pool and an interest-driven revenue model.",
      "Simulated user transactions on the Ethereum Test Net to evaluate fund management and commercial viability.",
      "Included staking and borrowing features for asset-based lending.",
      "Successfully defended before a panel of university faculty and industry experts.",
    ],
    technologies: ["Ethereum", "Solidity", "Web3", "Smart contracts"],
  },
  {
    id: "health-monitoring",
    type: "project",
    eyebrow: "Undergraduate electronics project",
    title: "Health Monitoring System using Internet of Things",
    organization: "Tribhuvan University",
    date: "2022",
    summary:
      "A connected health monitoring system for sharing patient vital signs securely with caregivers.",
    details: [
      "Designed and developed a health monitoring system for bedridden patients to track vital health signs and share them securely with caregivers online.",
      "Integrated sensors for body temperature and pulse rate, and used processed data to estimate SpO₂ levels.",
      "Programmed a NodeMCU device for real-time data transmission and built a web interface with credential-based access control to protect patient data.",
    ],
    technologies: ["IoT", "NodeMCU", "Sensors", "Web development"],
  },
  {
    id: "tribhuvan-university",
    type: "education",
    eyebrow: "Bachelor of Engineering",
    title: "Electronics and Information Engineering",
    organization: "Tribhuvan University, Institute of Engineering",
    date: "November 2018 — July 2023",
    location: "Pokhara, Nepal",
    summary:
      "B.E. in Electronics and Information Engineering · GPA 71.35%.",
    details: [
      "Bachelor of Engineering in Electronics and Information Engineering.",
      "GPA: 71.35%.",
      "Relevant coursework: Engineering Mathematics, Data Structure and Algorithm, Discrete Mathematics, Object Oriented Programming, Numerical Methods, Software Engineering, Database Management Systems, and Artificial Intelligence.",
    ],
  },
  {
    id: "sos-school",
    type: "education",
    eyebrow: "High school",
    title: "Science",
    organization: "SOS Hermann Gmeiner School",
    date: "August 2018",
    location: "Pokhara, Nepal",
    summary: "Graduated with a concentration in the science stream · GPA 3/4.",
    details: [
      "High School, with a concentration in Science: Physics, Chemistry, and Mathematics.",
      "GPA: 3/4.",
    ],
  },
];

export const credentials = [
  {
    name: "Professional Engineer (PE) — Electronics and Communication",
    issuer: "Nepal Engineering Council",
    detail: "Reg. No. 82091 · Issued December 2023",
  },
  {
    name: "Enterprise Design Thinking Practitioner",
    issuer: "IBM",
    detail: "January 2025",
  },
];

export const languages = [
  {
    name: "English",
    detail: "IELTS Academic 8.5/9 · Reading 9 · Listening 9 · Speaking 8 · Writing 7 · 2024",
  },
  { name: "Nepali", detail: "Native" },
];

export const skillGroups = [
  {
    name: "Programming",
    skills: ["C# (Advanced)", "Python (Advanced)", "C++", "JavaScript"],
  },
  {
    name: "Frameworks & cloud",
    skills: [".NET Core", "Angular", "React", "AWS · EKS · S3 · Lambda"],
  },
  {
    name: "AI tools",
    skills: ["GitHub Copilot", "Figma Make", "AWS SageMaker", "AWS Bedrock"],
  },
  {
    name: "Data",
    skills: ["Snowflake", "PostgreSQL", "MS-SQL", "MongoDB"],
  },
  {
    name: "Ways of working",
    skills: ["Git", "Docker", "SonarQube"],
  },
];
