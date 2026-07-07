'use client';

import React, { useEffect, useState, useRef } from 'react';
import AvatarDisplay from '@/components/AvatarDisplay';
import Terminal from '@/components/Terminal';
import ScrollStar from '@/components/ScrollStar';
import ProjectImageSlider from '@/components/ProjectImageSlider';

const typewriterWords = ["scalable applications", "immersive experiences", "AI integration", "stellar interfaces", "highly polished code"];

const categorizedSkills = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React / Next.js (App Router, SSR)", pct: 90 },
      { name: "HTML5 / CSS3 / Vanilla JS", pct: 95 },
      { name: "TailwindCSS & GSAP Animations", pct: 85 },
      { name: "UI/UX & Interactive Design", pct: 85 }
    ]
  },
  {
    category: "Backend & Systems",
    skills: [
      { name: "Node.js / Express Architecture", pct: 88 },
      { name: "REST APIs & WebSocket Systems", pct: 85 },
      { name: "Database Engineering (MongoDB, PostgreSQL)", pct: 82 },
      { name: "Systems Analysis & SDLC Lifecycle", pct: 80 }
    ]
  },
  {
    category: "AI-ML & Mobile SDKs",
    skills: [
      { name: "Python / Data Science Pipelines", pct: 75 },
      { name: "Machine Learning (Scikit-Learn, NumPy)", pct: 70 },
      { name: "Kotlin & Android SDK Development", pct: 78 },
      { name: "Cloud & DevOps (Git, Docker, Actions)", pct: 68 }
    ]
  }
];

const projectsData = [
  {
    num: "01",
    name: "Rule_Zero",
    type: "AI Compliance",
    desc: "Built a full-stack platform that structures Indian laws and regulations into a searchable library, using AI to simplify legal language for citizens and startups.",
    images: [
      "/projects/rulezero_1.png",
      "/projects/rulezero_2.png",
      "/projects/rulezero_3.png",
      "/projects/rulezero_4.png",
      "/projects/rulezero_5.png",
      "/projects/rulezero_6.png"
    ],
    stack: ["React", "Next.js", "Prisma", "PostgreSQL", "Firebase", "GROQ API"],
    demo: "https://rule-zero.vercel.app",
    git: "https://github.com/WolverineAryan/Rule_Zero"
  },
  {
    num: "02",
    name: "Smotly_ai",
    type: "AI SaaS Platform",
    desc: "Built an AI SaaS platform integrating LLM workflows with background task queues (Celery/Redis) and real-time streaming notifications over WebSockets.",
    images: [
      "/projects/Smotly_1.png",
      "/projects/Smotly_2.png",
      "/projects/Smotly_3.png",
      "/projects/Smotly_4.png",
      "/projects/Smotly_5.png",
      "/projects/Smotly_6.png",
      "/projects/Smotly_7.png",
      "/projects/Smotly_8.png",
      "/projects/Smotly_9.png",
      "/projects/Smotly_10.png",
      "/projects/Smotly_11.png"
    ],
    stack: ["FastAPI", "LangChain", "Celery", "Redis", "WebSockets", "GROQ API"],
    demo: "https://smotly-ai.vercel.app",
    git: "https://github.com/WolverineAryan/Smotly_ai"
  },
  {
    num: "03",
    name: "Groundwater Stewardship",
    type: "Socio-Hydro Tech",
    desc: "A technology platform bridging hydrology and social impact — enabling communities to monitor and manage groundwater sustainably.",
    images: [
      "/projects/groundwater_1.png",
      "/projects/groundwater_2.png",
      "/projects/groundwater_3.png",
      "/projects/groundwater_4.png",
      "/projects/groundwater_5.png"
    ],
    stack: ["React", "Python", "Flask", "FastAPI", "Leaflet GIS"],
    demo: "#",
    git: "https://github.com/WolverineAryan/Ground_water_stewardship"
  },
  {
    num: "04",
    name: "Attendance Prediction System",
    type: "AI / ML System",
    desc: "Developed an AI-driven analytics tool achieving 86–87% prediction accuracy on a 1,000+ record dataset, surfacing trend insights and answering user questions through an integrated AI assistant.",
    images: [
      "/projects/APS1.png",
      "/projects/APS2.png",
      "/projects/APS3.png",
      "/projects/APS4.png",
      "/projects/APS5.png",
      "/projects/APS6.png",
      "/projects/APS7.png",
      "/projects/APS8.png"
    ],
    stack: ["React", "Vite", "Tailwind", "Python", "Ollama", "JWT"],
    demo: "https://attendance-prediction-l5rxmkb1n-wolverinearyans-projects.vercel.app/",
    git: "https://github.com/WolverineAryan/Attendance-Prediction"
  },
  {
    num: "05",
    name: "Levgress",
    type: "Web Platform",
    desc: "Built a gamified student progress-tracking platform where students submit project milestones to earn XP and badges, and instructors review submissions with real-time feedback via Socket.io and AI-assisted grading through the Groq API.",
    images: ["/projects/levgress.png",
      "/projects/levgress (2).png",
      "/projects/levgress (3).png",
      "/projects/levgress (4).png",
      "/projects/levgress (5).png",
      "/projects/levgress (6).png",
      "/projects/levgress (7).png",
      "/projects/levgress (8).png",
      "/projects/levgress (9).png",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Socket.io", "Firebase Auth", "GROQ API"],
    demo: "https://levgress.vercel.app/",
    git: "https://github.com/WolverineAryan/Levgress"
  },
  {
    num: "06",
    name: "Solar-Flare Detection System",
    type: "ML based System  ",
    desc: "An end-to-end, production-ready Ground Segment processor and visualization dashboard designed to ingest, clean, and analyze real-time solar X-ray telemetry from the SoLEXS (Soft X-Ray) and HEL1OS (Hard X-Ray) instruments onboard ISRO's Aditya-L1 observatory.",
    images: ["/projects/solar1.png",
      "/projects/solar2.png",
      "/projects/solar3.png",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Firebase", "Cloudinary", "Android SDK"],
    demo: "https://solarflaredetectionsystem.shreyashelar.tech/",
    git: "https://github.com/WolverineAryan/Solar_Flare_Detection_System"
  },
  {
    num: "07",
    name: "UNI-CLUBB",
    type: "Mobile App",
    desc: "A mobile application built with Kotlin connecting university students to clubs, events, and communities — all in one place.",
    images: ["/projects/coming_soon.png"],
    inProgress: true,
    stack: ["Kotlin", "Jetpack Compose", "Firebase", "Cloudinary", "Android SDK"],
    
    git: "https://github.com/shreyash-leo/UniClubb"
  }
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const isSnapping = useRef(false);
  
  // Typewriter state
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');

  // Particles state
  const [particles, setParticles] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  // Story state
  const [activeStory, setActiveStory] = useState('s2024');

  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const animationEnd = windowHeight * 0.75;
  const scrollProgress = Math.min(1, Math.max(0, scrollY / (animationEnd || 1)));

  // Interpolate hero background color from #521C0D (rgb(82, 28, 13)) to #F4E7E1 (rgb(244, 231, 225))
  const r = Math.round(82 + (244 - 82) * scrollProgress);
  const g = Math.round(28 + (231 - 28) * scrollProgress);
  const b = Math.round(13 + (225 - 13) * scrollProgress);
  const heroBgColor = `rgb(${r}, ${g}, ${b})`;

  // Scroll listeners
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Only apply scrolled background class when hero transition is mostly complete
      const triggerLimit = (windowHeight * 0.75) * 0.85;
      setIsScrolled(window.scrollY > triggerLimit);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [windowHeight]);

  // Scroll snapping logic for hero runway
  useEffect(() => {
    let snapTimer: NodeJS.Timeout;

    const handleUserInteraction = () => {
      isSnapping.current = false;
      clearTimeout(snapTimer);
    };

    const handleScrollSnap = () => {
      if (window.innerWidth <= 900) return;
      const currentScroll = window.scrollY;
      const snapLimit = windowHeight * 0.75;

      if (isSnapping.current) {
        if (currentScroll === 0 || Math.abs(currentScroll - snapLimit) < 3) {
          isSnapping.current = false;
        }
        return;
      }

      clearTimeout(snapTimer);

      if (currentScroll > 0 && currentScroll < snapLimit) {
        snapTimer = setTimeout(() => {
          isSnapping.current = true;
          if (currentScroll < snapLimit * 0.5) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: snapLimit, behavior: 'smooth' });
          }
        }, 250); // 250ms debounce after scroll stops
      }
    };

    window.addEventListener('scroll', handleScrollSnap, { passive: true });
    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('mousedown', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollSnap);
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
      clearTimeout(snapTimer);
    };
  }, [windowHeight]);

  // Typewriter loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = typewriterWords[wordIdx];
    
    if (isDeleting) {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setTypewriterText(currentWord.substring(0, charIdx - 1));
          setCharIdx(prev => prev - 1);
        }, 40);
      } else {
        setIsDeleting(false);
        setWordIdx(prev => (prev + 1) % typewriterWords.length);
      }
    } else {
      if (charIdx < currentWord.length) {
        timer = setTimeout(() => {
          setTypewriterText(currentWord.substring(0, charIdx + 1));
          setCharIdx(prev => prev + 1);
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timer);
  }, [wordIdx, charIdx, isDeleting]);

  // Generate particles
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      const size = Math.random() * 4 + 2;
      const op = Math.random() * 0.4 + 0.1;
      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * -10;
      arr.push({
        id: i,
        style: {
          position: 'absolute' as const,
          width: `${size}px`,
          height: `${size}px`,
          background: 'var(--red)',
          borderRadius: '50%',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: op,
          animation: `particleDrift ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }
      });
    }
    setParticles(arr);
  }, []);

  // Intersection observer for fading elements in and animating skill bars
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger skillbar fill if it's a skill item
            const fill = entry.target.querySelector('.skill-fill') as HTMLElement;
            if (fill) {
              const pct = fill.getAttribute('data-pct');
              fill.style.width = `${pct}%`;
            }
            
            // Trigger glow-line in title
            const title = entry.target.classList.contains('section-title') ? entry.target : null;
            if (title) title.classList.add('in-view');

            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      const elements = document.querySelectorAll('.timeline-item, .project-card, .project-row, .skill-item, .story-card, .section-title');
      elements.forEach(el => observer?.observe(el));
    }, 150);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  // Story timeline card intersection observer
  useEffect(() => {
    let storyObserver: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) setActiveStory(id);
          }
        });
      }, { threshold: 0.5, rootMargin: '-10% 0px -40% 0px' });

      const cards = document.querySelectorAll('.story-card');
      cards.forEach(card => storyObserver?.observe(card));
    }, 150);

    return () => {
      clearTimeout(timer);
      storyObserver?.disconnect();
    };
  }, []);

  // Magnetic button hover handler
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty('--mx', `${x}%`);
    btn.style.setProperty('--my', `${y}%`);
  };

  const handleStoryNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      {/* SCROLL-BOUND SHOOTING STAR */}
      <ScrollStar />

      {/* Native Cursor Used */}



      {/* NAV */}
      <nav 
        id="navbar" 
        className={isScrolled ? 'scrolled' : ''}
        style={{
          opacity: scrollProgress,
          pointerEvents: scrollProgress < 0.15 ? 'none' : 'auto',
          transition: 'opacity 0.15s ease, background 0.4s, backdrop-filter 0.4s, box-shadow 0.4s',
        }}
      >
        <a href="#hero-scroll-wrapper" className="nav-logo">P<span>.</span>AT</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#console">Console</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/pranav_resume.pdf" download="Pranav_Thormise_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
        </ul>
        <a 
          href="mailto:pranavthormise@gmail.com" 
          className="nav-cta"
          onMouseMove={handleButtonMouseMove}
        >
          Hire Me
        </a>
      </nav>

      {/* HERO WRAPPER FOR SCROLL RUNWAY */}
      <div id="hero-scroll-wrapper">
        {/* HERO */}
        <section id="hero" style={{ backgroundColor: heroBgColor }}>
          <div 
            className="hero-bg-word" 
            id="heroBgWord"
            style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.25}px))` }}
          >
            PRANAV
          </div>

          {/* Particles container */}
          <div id="heroParticles" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
            {particles.map(p => (
              <div key={p.id} style={p.style} />
            ))}
          </div>

          <div 
            className="hero-content" 
            id="heroContent"
            style={{
              opacity: scrollProgress,
              transform: `translateX(${(1 - scrollProgress) * -100}px)`,
              pointerEvents: scrollProgress < 0.15 ? 'none' : 'auto',
              transition: 'opacity 0.1s ease, transform 0.1s ease',
            }}
          >
            <div className="hero-eyebrow">Full Stack Developer &amp; UI/UX Designer</div>
            <h1 className="hero-name">
              PRANAV<br />
              <span className="highlight">THORMISE</span>
            </h1>
            <p className="hero-subtitle">
              Full Stack developer crafting <span id="typewriter">{typewriterText}</span><br />
              — turning ideas into immersive, scalable digital experiences.
            </p>
            <div className="hero-actions">
              <a 
                href="#projects" 
                className="btn-primary"
                onMouseMove={handleButtonMouseMove}
              >
                View Work
              </a>
              <a 
                href="/pranav_resume.pdf" 
                download="Pranav_Thormise_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                onMouseMove={handleButtonMouseMove}
              >
                Resume
              </a>
              <a 
                href="#contact" 
                className="btn-outline"
                onMouseMove={handleButtonMouseMove}
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* 3D AVATAR CARD WITH SCROLL PROGRESS */}
          <AvatarDisplay scrollProgress={scrollProgress} />
        </section>
      </div>

      {/* MARQUEE STRIP */}
      <div className="marquee-container">
        <div className="marquee-wrapper" aria-hidden="true">
          {/* Row 1: left-moving */}
          <div className="marquee-track row1">
            <span className="marquee-item">Software Engineering</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">System Design</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">SDLC</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Scalable Apps</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">Agentic Engineer</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Full Stack</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">UI / UX Design</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">AI · ML</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">Full Stack Dev</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Cloud Architecture</span><span className="marquee-sep dim"></span>
            {/* duplicate for seamless loop */}
            <span className="marquee-item">Software Engineering</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">System Design</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">SDLC</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Scalable Apps</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">Agentic Engineer</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Full Stack</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">UI / UX Design</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">AI · ML</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">Full Stack Dev</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Cloud Architecture</span><span className="marquee-sep dim"></span>
          </div>
          {/* Row 2: right-moving */}
          <div className="marquee-track row2">
            <span className="marquee-item accent">Vibe Coding</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">REST APIs</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Product Thinking</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">Database Design</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Startup Builder</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">DevOps</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Mobile Apps</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">Open Source</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Performance Optimization</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">Clean Code</span><span className="marquee-sep"></span>
            {/* duplicate */}
            <span className="marquee-item accent">Vibe Coding</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">REST APIs</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Product Thinking</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">Database Design</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Startup Builder</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">DevOps</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Mobile Apps</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">Open Source</span><span className="marquee-sep"></span>
            <span className="marquee-item accent">Performance Optimization</span><span className="marquee-sep dim"></span>
            <span className="marquee-item">Clean Code</span><span className="marquee-sep"></span>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="section-label">01 — About</div>
        <h2 className="section-title">Crafted from <em>curiosity</em></h2>
        <div className="about-container">
          <div className="about-main-row">
            <div className="about-photo-side">
              <div className="about-photo-wrapper">
                <img src="/profile.jpg" alt="Pranav A. Thormise" className="about-photo" />
              </div>
            </div>
            <div className="about-info-side">
              <div className="about-keywords">
                <span className="keyword-badge">Full Stack Developer</span>
                <span className="keyword-badge">UI/UX Designer</span>
                <span className="keyword-badge">Startup Founder</span>
                <span className="keyword-badge">AI-ML Explorer</span>
              </div>
              <p className="about-text">
                I'm <strong>Pranav Arvind Thormise</strong>, a B.E. Computer Engineering student at PVGCOE, Nashik —
                a full-stack developer and UI/UX designer who builds things that <strong>feel alive</strong>.
              </p>
              <p className="about-text" style={{ marginTop: '1rem' }}>
                My work sits at the intersection of <strong>engineering and aesthetics</strong>. I care about clean code and
                even cleaner interfaces. From AI pipelines to sleek mobile apps, I bring both depth and polish.
              </p>
              <p className="about-text" style={{ marginTop: '1rem' }}>
                Currently exploring <strong>AI-ML</strong>, vibe coding, and the idea that every product should feel like it was built by someone who genuinely cared.
              </p>
              <div className="about-links">
                <a href="https://github.com/WolverineAryan" className="about-link" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                <a href="https://www.linkedin.com/in/pranav-thormise-332206283" className="about-link" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                <a href="/pranav_resume.pdf" download="Pranav_Thormise_Resume.pdf" target="_blank" rel="noopener noreferrer" className="about-link">Resume</a>
                <a href="mailto:pranavthormise@gmail.com" className="about-link">Email ↗</a>
              </div>
            </div>
          </div>
          <div className="about-stats-row">
            <div className="stat-card">
              <div className="stat-num">3+</div>
              <div className="stat-desc">Years Building</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">6+</div>
              <div className="stat-desc">Projects Shipped</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">4</div>
              <div className="stat-desc">Roles Held</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">∞</div>
              <div className="stat-desc">Things to Build</div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-label">02 — Experience</div>
        <h2 className="section-title">Where I've <em>leveled up</em></h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-year">Jul 2026 — Present</div>
            <div className="timeline-role">Full Stack Developer Intern</div>
            <div className="timeline-org">Fortech Media &amp; Marketing Pvt. Ltd.</div>
            <p className="timeline-desc">Built and shipped 2 enterprise websites for client companies, and currently developing CRM software solutions, taking features from requirement to production deployment.</p>
            <div className="timeline-tags">
              <span className="tag">Next.js</span>
              <span className="tag">React</span>
              <span className="tag">CRM Development</span>
              <span className="tag">Full Stack</span>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-year">Oct 2025 — Mar 2026</div>
            <div className="timeline-role">Co-founder &amp; General Manager</div>
            <div className="timeline-org">Rekraft (E-commerce Startup)</div>
            <p className="timeline-desc">Led product strategy, UI/UX design, and business development for a refurbished-laptop e-commerce platform. Completed 60+ customer orders at a 15% profit margin, managing vendor sourcing, pricing, and customer acquisition end-to-end.</p>
            <div className="timeline-tags">
              <span className="tag">Product Strategy</span>
              <span className="tag">UI/UX Design</span>
              <span className="tag">Business Dev</span>
              <span className="tag">Entrepreneurship</span>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-year">Jan 2026 — Feb 2026</div>
            <div className="timeline-role">AI/ML Intern</div>
            <div className="timeline-org">Technokraft Training &amp; Solutions Pvt. Ltd.</div>
            <p className="timeline-desc">Built an AI prediction system achieving 86–87% accuracy on a 1,000+ record dataset, covering data preprocessing, feature engineering, and model optimization using Python.</p>
            <div className="timeline-tags">
              <span className="tag">Machine Learning</span>
              <span className="tag">Python</span>
              <span className="tag">Data Science</span>
              <span className="tag">Model Tuning</span>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-year">2025 — 2026</div>
            <div className="timeline-role">Secretary</div>
            <div className="timeline-org">Skill Up Club, PVGCOE</div>
            <p className="timeline-desc">Organized 5+ technical workshops and coding competitions for 100+ students. Mentored junior students in web development fundamentals and project building.</p>
            <div className="timeline-tags">
              <span className="tag">Leadership</span>
              <span className="tag">Event Management</span>
              <span className="tag">Mentorship</span>
              <span className="tag">Community</span>
            </div>
          </div>
        </div>
        <div className="experience-avatar-container">
          <img src="/avatar_full.png" alt="Experience Avatar" className="experience-avatar" />
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-label">03 — Projects</div>
        <h2 className="section-title">Things I've <em>built</em></h2>
        <div className="projects-list">
          {projectsData.map((project, idx) => (
            <div key={idx} className={`project-row ${idx % 2 === 1 ? 'reverse' : ''}`}>
              {/* Image side */}
              <div className="project-img-side">
                <ProjectImageSlider images={project.images} name={project.name} />
              </div>
              
              {/* Text details side */}
              <div className="project-info-side">
                <div className="project-num">{project.num}</div>
                <div className="project-type">{project.type}</div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.desc}</p>
                
                {/* Tech stack badges */}
                <div className="project-tech-badges">
                  {project.stack.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-badge">{tech}</span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="project-links">
                  {!project.inProgress && project.demo !== "#" && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link-btn primary"
                      onMouseMove={handleButtonMouseMove}
                    >
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                      Live Demo
                    </a>
                  )}
                  <a 
                    href={project.git} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link-btn outline"
                    onMouseMove={handleButtonMouseMove}
                  >
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    GitHub Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-label">04 — Skills</div>
        <h2 className="section-title">My <em>toolkit</em></h2>
        <div className="skills-categories">
          {categorizedSkills.map((cat, i) => (
            <div key={i} className="skills-panel">
              <h3 className="skills-panel-title">{cat.category}</h3>
              <div className="skills-grid">
                {cat.skills.map((skill, j) => (
                  <div key={j} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-pct">{skill.pct}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" data-pct={skill.pct} style={{ width: '0%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section id="story">
        <div className="section-label">05 — My Story</div>
        <h2 className="section-title">The <em>journey</em> so far<span className="glow-line"></span></h2>

        <div className="story-layout">
          {/* Sticky nav */}
          <div className="story-nav">
            <div className="story-nav-buttons">
              <button 
                className={`story-nav-item ${activeStory === 's2024' ? 'active' : ''}`}
                onClick={() => handleStoryNavClick('s2024')}
              >
                2026 — Present
              </button>
              <button 
                className={`story-nav-item ${activeStory === 's2023' ? 'active' : ''}`}
                onClick={() => handleStoryNavClick('s2023')}
              >
                2025
              </button>
              <button 
                className={`story-nav-item ${activeStory === 's2022' ? 'active' : ''}`}
                onClick={() => handleStoryNavClick('s2022')}
              >
                2024
              </button>
              <button 
                className={`story-nav-item ${activeStory === 's2021' ? 'active' : ''}`}
                onClick={() => handleStoryNavClick('s2021')}
              >
                2023
              </button>
              <button 
                className={`story-nav-item ${activeStory === 's2019' ? 'active' : ''}`}
                onClick={() => handleStoryNavClick('s2019')}
              >
                2019
              </button>
            </div>

            {/* Story Section Avatar Cutout */}
            {/* 
            <div className="story-avatar-container">
              <img src="/2ndavatar.png" alt="Journey Avatar" className="story-avatar" />
            </div>
            */}
          </div>

          {/* Cards */}
          <div className="story-cards">
            <div className="story-card" id="s2024">
              <div className="story-year-col">
                <div className="story-year">2026</div>
                <div className="story-connector"></div>
              </div>
              <div className="story-body">
                <div className="story-phase">Chapter 05 · Building for Real</div>
                <div className="story-heading">Final Year BE — Founder, Engineer, Designer</div>
                <p className="story-text">Co-founded REKRAFT (Oct 2025 – Mar 2026) — my first real venture. Simultaneously completed an AI/ML internship at Technokraft and served as Secretary of the Skill Up Club. Currently working as a Full Stack Developer Intern at Fortech Media &amp; Marketing, building enterprise platforms and CRM solutions while in my final year of B.E. Computer Engineering.</p>
                <span className="story-badge">Co-founder · Full Stack Intern · B.E. Final Year</span>
              </div>
            </div>

            <div className="story-card" id="s2023">
              <div className="story-year-col">
                <div className="story-year">2025</div>
                <div className="story-connector"></div>
              </div>
              <div className="story-body">
                <div className="story-phase">Chapter 04 · Growing Fast</div>
                <div className="story-heading">SE / TE — From Student to Builder</div>
                <p className="story-text">Second and third year were transformative. Dove deep into the Full stack, discovered UI/UX design, and started building real products — not just assignments. Focused on database engineering, building scalable frontend designs, and learning the fundamentals of AI integration. Every project taught me something assignments never could.</p>
                <span className="story-badge">SE→TE · Full Stack · Product Development</span>
              </div>
            </div>

            <div className="story-card" id="s2022">
              <div className="story-year-col">
                <div className="story-year">2024</div>
                <div className="story-connector"></div>
              </div>
              <div className="story-body">
                <div className="story-phase">Chapter 03 · First Code, First Build</div>
                <div className="story-heading">FE @ PVGCOE, Nashik — The Real World</div>
                <p className="story-text">Entered PVGCOE's Computer Engineering program. First year was a firehose — C, C++, Data Structures, and the realization that building software is an art form. Wrote my first real program, got my first error, stayed up fixing it, and loved every second. The builder in me woke up.</p>
                <span className="story-badge">PVGCOE Nashik · B.E. Computer Engineering</span>
              </div>
            </div>

            <div className="story-card" id="s2021">
              <div className="story-year-col">
                <div className="story-year">2023</div>
                <div className="story-connector"></div>
              </div>
              <div className="story-body">
                <div className="story-phase">Chapter 02 · The Foundation</div>
                <div className="story-heading">12th Grade — Choosing Engineering</div>
                <p className="story-text">Complete HSC with a focus on Mathematics, Physics, and Computer Science. The JEE prep sharpened my logical thinking and problem-solving instincts in ways no classroom could. Made the decisive choice — Computer Engineering. Not just a degree, but a direction.</p>
                <span className="story-badge">HSC Complete · Engineering Pathway Locked</span>
              </div>
            </div>

            <div className="story-card" id="s2019">
              <div className="story-year-col">
                <div className="story-year">2019</div>
                <div className="story-connector"></div>
              </div>
              <div className="story-body">
                <div className="story-phase">Chapter 01 · The Spark</div>
                <div className="story-heading">10th Grade — Where It All Began</div>
                <p className="story-text">Scored well in SSC boards and chose the Science stream — not because everyone did, but because computers had already started pulling me in. My first interaction with a computer wasn't just curiosity, it was a calling. I didn't know it yet, but the path was already forming.</p>
                <span className="story-badge">SSC Boards · Science Stream Selected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONSOLE / TERMINAL */}
      <section id="console" style={{ background: 'var(--cream)', padding: '5rem 3rem' }}>
        <div className="section-label">06 — Console</div>
        <h2 className="section-title">Interactive <em>console</em></h2>
        <Terminal />
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-label">07 — Contact</div>
        <h2 className="section-title">Let's <em>build</em> together</h2>
        <p className="contact-subtitle">Open to internships, freelance projects, and roles where I can build something that matters.</p>
        <a href="mailto:pranavthormise@gmail.com" className="contact-email">pranavthormise@gmail.com</a>
        <div className="contact-links">
          <a href="https://github.com/WolverineAryan" className="contact-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/pranav-thormise-332206283" className="contact-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
      </section>

      <footer>
        <span>© 2026 Pranav A. Thormise</span>
        <span>Designed &amp; Built with intent</span>
      </footer>
    </>
  );
}
