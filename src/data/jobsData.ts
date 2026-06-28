interface Job {
  id: number;
  title: string;
  tags: string[];
  location: string;
  roleOverview: string;
  keyResponsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  whatWeOffer: string[];
}

export const allJobs: Job[] = [
  {
    id: 1,
    title: "Product Designer",
    tags: ["Remote", "Full-time"],
    location: "Belgrade",
    roleOverview:
      "As a Product Designer, you will work on the initial design stages of various products. Your responsibilities include creating user-friendly interfaces, establishing consistent visual brands, and working with the team to meet user needs and business goals.",
    keyResponsibilities: [
      "UX/UI Design: Create wireframes, prototypes, and final designs for multiple AI-enhanced SaaS products within your assigned work stream.",
      "Brand Development: Define and maintain visual brand elements, including logos, color schemes, and style guides.",
      "User Research: Conduct research and testing to understand user needs and validate design decisions within your scope of work.",
      "Design Systems: Develop and maintain design systems and reusable components for consistent and efficient design workflows.",
      "Collaboration: Work closely with product managers and developers to ensure alignment between design solutions and product requirements.",
      "Adaptability: Manage multiple projects in your assigned work stream and adapt to changing priorities.",
      "AI Integration: Use AI tools to improve your design workflow and productivity.",
    ],
    requirements: [
      "Experience: At least 3 years of professional product design experience, ideally with digital and early-stage products.",
      "UX & Visual Skills: Ability to create intuitive user experiences and establish strong visual identities.",
      "Tools: Proficiency in Figma, Sketch, Adobe Creative Suite, or similar design tools. Familiarity with AI-assisted tools and basic web technologies (HTML/CSS) is a plus.",
      "Communication: Clear communication skills to present and discuss ideas effectively with various stakeholders.",
      "Versatility: Ability to handle multiple projects within your work stream and adjust to a fast-paced environment.",
    ],
    whatWeOffer: [
      "Influence: Play a key role in shaping the design of new, AI-enhanced products at an early stage.",
      "Team Environment: Join a supportive team backed by Egzakta Group, collaborating with entrepreneurs, engineers, and product managers.",
      "Growth Opportunities: Expand your skills by working across different product areas.",
      "Competitive Compensation: Receive a salary and benefits package that reflects your experience and contributions.",
    ],
  },
  {
    id: 2,
    title: "Python Back-end Developer",
    tags: ["Remote", "Full-time"],
    location: "Belgrade",
    roleOverview:
      "We are looking for a Python Developer who is passionate about AI infrastructure and high-performance back-end development. You will design and develop key components of our AI platform, ensuring that data, orchestration, and system interactions perform efficiently and securely. This role offers an opportunity to work on complex systems that merge AI, data engineering, and software reliability in one environment.",
    keyResponsibilities: [
      "Design and implement Python back-end components supporting AI workflows and integrations.",
      "Develop and optimize the multi-step data ingestion pipeline for diverse data sources.",
      "Build reliable communication and coordination layers using RabbitMQ and containerized services.",
      "Collaborate with AI engineers to integrate and operationalize model-driven functionalities.",
      "Maintain robust permission management, logging, and monitoring across services.",
      "Contribute to scalability, resilience, and observability improvements.",
      "Participate in technical discussions and continuous architecture evolution.",
    ],
    requirements: [
      "3+ years of experience in Python back-end development.",
      "Proficiency with FastAPI, Flask, or similar frameworks.",
      "Hands-on experience with Kubernetes, Docker, and RabbitMQ.",
      "Strong understanding of databases, data processing, and modular architecture.",
      "Familiarity with AI-related systems (e.g., RAG, data pipelines, or orchestration logic).",
      "Focus on code quality, security, and performance optimization.",
      "Ability to work independently in a fast-moving, product-driven environment.",
    ],
    niceToHave: [
      "Experience with distributed data processing, multi-agent frameworks, or observability systems.",
      "Background in secure or isolated (air-gapped) deployments.",
      "Interest in AI infrastructure, data governance, or enterprise integration.",
    ],
    whatWeOffer: [
      "Work on a next-generation AI platform with full control over architecture and implementation.",
      "A high-autonomy environment within a strong and stable corporate ecosystem.",
      "Collaboration with experts in AI, data engineering, and enterprise technology.",
      "Competitive compensation and clear growth opportunities.",
    ],
  },
  {
    id: 3,
    title: "AI-Engineer ",
    tags: ["Remote", "Full-time"],
    location: "Belgrade",
    roleOverview:
      "As an AI Engineer, you will independently develop AI models, build advanced pipelines, optimize performance, and integrate AI components into production environments. You will collaborate closely with senior engineers and architects, take ownership of tasks, and actively contribute to system design decisions. This role is ideal for an engineer seeking to work on sophisticated AI systems, multi-agent architectures, and scalable vertical integrated solutions.",
    keyResponsibilities: [
      "AI Pipeline Development: Build and maintain end-to-end AI pipelines, including data ingestion, preprocessing, training, evaluation, and deployment.",
      "Model Development & Optimization: Design, train, fine-tune, and optimize machine learning and deep learning models; conduct evaluation, prompt engineering, and performance debugging.",
      "Multi-Agent Architectures: Participate in designing and implementing multi-agent systems and orchestration workflows.",
      "Software Integration: Develop and maintain APIs and backend services that integrate AI components into SaaS products, ensuring stability and scalability.",
      "MLOps & Automation: Implement CI/CD workflows for AI components and automate model training and deployment processes where applicable.",
      "Task Ownership: Manage tasks in Jira, estimate workload, set priorities, and provide consistent updates.",
      "Documentation & Collaboration: Produce clear technical documentation, participate in code reviews, and contribute to architectural discussions.",
      "AI Tools: Use AI-assisted development and debugging tools to enhance productivity and improve development workflows.",
    ],
    requirements: [
      "Educational Background: Bachelor's degree in Computer Science, Data Science, Mathematics, or a related field, or equivalent practical experience.",
      "Experience: 2–4 years of experience building AI/ML models, backend services, and AI pipelines in Python; experience exposing models via REST/gRPC services and working with cloud or on-prem pipelines.",
      "Technical Proficiency - Frameworks & Languages: Strong Python skills and familiarity with libraries such as PyTorch, HuggingFace, LangChain, or LlamaIndex.",
      "Technical Proficiency - Vector Databases: Experience with vector database technologies such as Pinecone or ChromaDB.",
      "Technical Proficiency - Multi-agentic Architecture: Understanding multi-agent concepts and experience developing agent-based workflows.",
      "Testing & QA: Experience implementing and maintaining unit, integration, and snapshot tests.",
      "Task Management: Familiarity with Jira for sprint management, backlog organization, and task tracking.",
      "Communication: Ability to clearly explain technical decisions and present solutions to cross-functional teams.",
      "Versatility: Ability to work across multiple projects and adapt quickly to new technologies and product requirements.",
    ],
    whatWeOffer: [
      "Influence: Direct influence on the development of AI-powered SaaS products and system architectures from an early stage.",
      "Team Environment: Collaboration with a supportive, multidisciplinary team backed by Egzakta Group.",
      "Growth Opportunities: Exposure to state-of-the-art AI technologies and complex architectural challenges.",
      "Competitive Compensation: A salary and benefits package that reflects your expertise and contributions.",
    ],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    tags: ["Remote", "Full-time"],
    location: "Belgrade",
    roleOverview:
      "As a DevOps Engineer, you'll collaborate with seasoned engineers to design, automate, and deploy resilient cloud-and-on-prem infrastructure. You'll build and refine CI/CD pipelines, implement observability, and gain hands-on experience with container orchestration, infrastructure-as-code, and distributed systems. This role is ideal for someone eager to launch their DevOps career in a dynamic, supportive environment.",
    keyResponsibilities: [
      "Infrastructure Automation: Build and maintain end-to-end deployment pipelines and Infrastructure-as-Code for both cloud and on-prem environments, from provisioning to blue/green releases.",
      "CI/CD Enablement: Design and optimize CI/CD workflows that streamline code integration, automated testing, and reliable releases for AI-driven services.",
      "Containerization & Orchestration: Manage Docker images and Kubernetes (or similar) clusters, ensuring high availability, scalability, and efficient resource use.",
      "Systems Integration: Collaborate with engineers to embed AI microservices into SaaS products, enforcing reliability, security, and performance standards.",
      "Monitoring & Incident Response: Implement observability stacks (logs, metrics, traces), establish alerting and on-call processes, and drive root-cause analysis.",
      "Security & Compliance: Apply DevSecOps practices—secrets management, vulnerability scanning, and automated compliance checks.",
      "Agile Collaboration: Track work in Jira (or similar), document infrastructure and runbooks, participate in code reviews, and champion automation best practices.",
      "Continuous Improvement: Explore emerging DevOps/MLOps tools, share insights with the team, and introduce innovations that accelerate delivery and stability.",
    ],
    requirements: [
      "Education: Bachelor's degree in Computer Science, Software Engineering, or a related field — or equivalent practical experience.",
      "Experience: 2–5 years in DevOps, owning CI/CD and cloud infrastructure (on-prem a plus); mentoring and incident-response exposure desirable.",
      "Technical Proficiency - Languages & Scripting: Solid grasp of Python or Bash and strong Git fundamentals.",
      "Technical Proficiency - Containers & Orchestration: Hands-on knowledge of Docker and introductory work with Kubernetes (or an equivalent platform).",
      "Technical Proficiency - CI/CD Pipelines: Understanding of tools such as GitHub Actions, GitLab CI, or Jenkins for automated builds, testing, and deployments.",
      "Technical Proficiency - Monitoring & Observability: Familiarity with stacks like Prometheus / Grafana or ELK for logging, metrics, and alerting.",
      "Testing & Quality: Experience writing infrastructure or integration tests (e.g., Testinfra, Terratest) is advantageous.",
      "Task Management: Comfortable using Jira (or similar) to plan sprints, manage backlogs, and track issues.",
      "Communication: Able to explain infrastructure decisions clearly and keep cross-functional teams informed.",
      "Versatility: Ready to juggle multiple projects, adapt to evolving requirements, and learn new DevOps/MLOps tools quickly.",
    ],
    whatWeOffer: [
      "Influence: Play a key role in shaping the infrastructure of AI-enhanced products at an early stage.",
      "Team Environment: Collaborate with a supportive, cross-functional team backed by the Egzakta Group.",
      "Growth Opportunities: Engage with cutting-edge AI technologies and diverse product architectures, expanding your skill set.",
      "Competitive Compensation: Receive a salary and benefits package that reflects your experience and contributions.",
    ],
  },
  {
    id: 5,
    title: "Front-end Developer",
    tags: ["Remote", "Full-time"],
    location: "Belgrade",
    roleOverview:
      "As a Front-End Developer, you will work on user-facing features and responsive designs, closely collaborating with designers, product managers, and back-end developers. You will be responsible for creating scalable front-end architectures that can accommodate complex, AI-powered functionalities and rapidly evolving requirements.",
    keyResponsibilities: [
      "Front-End Development: Implement user interfaces using React, ensuring performance, modularity, and scalability.",
      "Responsive Design: Ensure interfaces are optimized for various devices and screen sizes.",
      "Code Quality & Testing: Write clean, testable code and follow coding standards, including unit testing and integration testing where applicable.",
      "Integration with AI-Driven Features: Collaborate with back-end and AI-engineering teams to integrate AI-based recommendations, generative interfaces (such as dynamic UI elements or data-driven visualizations), and real-time analytics into the front-end.",
      "Task Management: Use Jira or similar project tracking tools to manage, prioritize, and update tasks effectively.",
      "Collaboration: Work closely with designers to implement pixel-perfect layouts and ensure smooth user experience, and with product managers and developers to align solutions with overall product goals.",
      "Adaptability: Handle multiple projects within your assigned work stream and quickly adjust to shifting priorities and new insights from AI-driven user data.",
      "AI Tools: Leverage AI-assisted development and debugging tools to optimize your workflow and productivity.",
    ],
    requirements: [
      "Experience: At least 3 years of professional experience in front-end development, ideally including work on SaaS products.",
      "Technical Proficiency - Frameworks & Languages: Strong proficiency in React (incl. Redux, TailWind, React Router, shadcn, etc.), Vite, TypeScript, JavaScript (ES6+), HTML, and CSS.",
      "Technical Proficiency - State Management: Familiarity with state management libraries (e.g., Redux) for handling complex data flows.",
      "Technical Proficiency - Tooling & Version Control: Experience with Git, building tools (e.g., Webpack), and CI/CD pipelines.",
      "AI-Enhanced SaaS Knowledge - Data Integration: Exposure to front-end integration with APIs that deliver AI-driven insights, recommendations, or data visualizations.",
      "AI-Enhanced SaaS Knowledge - Performance & Optimization: Understanding of how to optimize front-end performance for AI-heavy applications (e.g., handling large data sets, streaming data, or dynamically generated content).",
      "Testing & Quality Assurance: Experience implementing unit tests, snapshot tests, and/or end-to-end tests with frameworks like Jest or Cypress.",
      "Task Management: Comfort using Jira or similar tools to manage sprints, backlog, and issue tracking.",
      "Performance & Accessibility: Knowledge of common performance optimization techniques (lazy loading, memoization) and familiarity with accessibility standards (WCAG).",
      "Communication: Ability to clearly explain technical decisions and provide updates to cross-functional team members.",
      "Versatility: Comfort handling multiple projects within your work stream, adapting quickly as new product features emerge and requirements evolve.",
    ],
    whatWeOffer: [
      "Influence: Play a key role in shaping the interfaces of AI-enhanced SaaS products at an early stage.",
      "Team Environment: Collaborate with a supportive, cross-functional team backed by the Egzakta Group.",
      "Growth Opportunities: Engage with cutting-edge AI technologies and diverse product architectures, expanding your skill set.",
      "Competitive Compensation: Receive a salary and benefits package that reflects your experience and contributions.",
    ],
  },
];
