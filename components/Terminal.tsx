'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TerminalLine {
  id: string;
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 'welcome1', text: 'PranavOS v1.0.0 (Type "help" for a list of commands)', type: 'success' },
    { id: 'welcome2', text: 'Ready for connection...', type: 'output' },
  ]);
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 900);
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const promptStr = isMobile ? 'visitor:~$ ' : 'visitor@pranav-thormise:~$ ';
    const newLines: TerminalLine[] = [
      { id: Math.random().toString(), text: `${promptStr}${trimmed}`, type: 'input' }
    ];

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();

    switch (cmd) {
      case 'help':
        newLines.push({
          id: Math.random().toString(),
          text: 'Available commands:\n  about    - Who is Pranav A. Thormise?\n  skills   - Lists technical skills and expertise\n  projects - Showcases recent shipped projects\n  resume   - Opens/downloads Pranav\'s technical resume\n  contact  - Links for hiring, email, and social networks\n  clear    - Clears the terminal history',
          type: 'output'
        });
        break;
      case 'about':
        newLines.push({
          id: Math.random().toString(),
          text: 'Pranav Arvind Thormise is a B.E. Computer Engineering student at PVGCOE, Nashik.\nHe is a Software Engineer, AI Engineer, and co-founder of REKRAFT.\nHe specializes in distributed systems, full-stack architectures, and production-grade AI/ML pipelines.',
          type: 'output'
        });
        break;
      case 'skills':
        newLines.push({
          id: Math.random().toString(),
          text: 'TECHNICAL EXPERTISE:\n\n[========================] 92% - Core CS (DSA, OOD, Systems Design)\n[======================  ] 90% - Frontend & Full Stack (React, Next.js, TypeScript)\n[====================    ] 88% - Backend & Systems (FastAPI, Node.js, Fastify, REST APIs)\n[====================    ] 86% - AI/ML & LLM Systems (LangChain, Groq, PyTorch, Ollama)\n[==================      ] 85% - Databases (PostgreSQL, Redis Lua, MongoDB)\n[=================       ] 80% - DevOps & Infra (Docker, WebSockets, Celery, Linux)',
          type: 'output'
        });
        break;
      case 'projects':
        newLines.push({
          id: Math.random().toString(),
          text: 'RECENT PROJECTS:\n\n* TicketWala           - High-contention flash-reservation & seat inventory locking engine (10,800+ RPS, 50K users).\n  Stack: Next.js 15, Fastify, TypeScript, Redis (Lua), PostgreSQL, Docker\n  Live:  https://ticketwala-eight.vercel.app\n  Repo:  https://github.com/WolverineAryan/TicketWala\n\n* Roopantar-AI         - Multi-format GenAI transformation engine delivering 8 schema-validated deliverables in ~10s.\n  Stack: Next.js 14, FastAPI, Python, Groq LPU, TypeScript, Docker\n  Live:  https://roopantar-ai.vercel.app\n  Repo:  https://github.com/WolverineAryan/Roopantar-AI\n\n* Testvita             - Adaptive AI competitive programming coach with Monaco IDE & subprocess sandbox.\n  Stack: Next.js 14, FastAPI, Python, Monaco Editor, PostgreSQL, NVIDIA NIM\n  Live:  https://testvita.vercel.app\n  Repo:  https://github.com/WolverineAryan/Testvita\n\n* Rule_Zero            - Full-stack AI platform structuring Indian laws into a searchable library.\n  Stack: React, Next.js, Prisma, PostgreSQL, Firebase, GROQ API\n  Live:  https://rule-zero.vercel.app\n  Repo:  https://github.com/WolverineAryan/Rule_Zero\n\n* Aditya-L1 Flare Sys  - ML Ground Segment processor for ISRO Aditya-L1 solar telemetry forecasting.\n  Stack: Next.js, FastAPI, Python, TensorFlow, PyTorch, WebSockets\n  Live:  https://solarflaredetectionsystem.shreyashelar.tech/\n  Repo:  https://github.com/WolverineAryan/Solar_Flare_Detection_System\n\n* Levgress             - Gamified student milestone progress tracker with real-time feedback & Groq AI grading.\n  Stack: React, Vite, Node.js, Express, MongoDB, Socket.io, Firebase, GROQ API\n  Live:  https://levgress.vercel.app/\n  Repo:  https://github.com/WolverineAryan/Levgress',
          type: 'output'
        });
        break;
      case 'resume':
        window.open('/pranav_resume.pdf', '_blank');
        newLines.push({
          id: Math.random().toString(),
          text: 'Opening Pranav\'s Resume (pranav_resume.pdf) in a new tab...',
          type: 'success'
        });
        break;
      case 'contact':
        newLines.push({
          id: Math.random().toString(),
          text: 'GET IN TOUCH:\n\n* Email:    pranavthormise@gmail.com\n* LinkedIn: https://www.linkedin.com/in/pranav-thormise-332206283\n* GitHub:   https://github.com/WolverineAryan\n* Resume:   https://pranavthormiseportfolio-lovat.vercel.app/pranav_resume.pdf\n* REKRAFT:  https://rekraft.in',
          type: 'output'
        });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newLines.push({
          id: Math.random().toString(),
          text: `Command not found: "${cmd}". Type "help" for a list of valid commands.`,
          type: 'error'
        });
    }

    setHistory(prev => [...prev, ...newLines]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div
      onClick={focusInput}
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '2rem auto',
        backgroundColor: '#1b120f', // deep dark warm brown
        border: '1.5px solid var(--border)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 15px 35px rgba(82, 28, 13, 0.15)',
        cursor: 'text',
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          backgroundColor: 'var(--card-bg)',
          borderBottom: '1px solid var(--border)',
          padding: '0.8rem 1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--red)' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--orange)' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
        <span
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.68rem',
            color: 'var(--muted)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          developer-console -- bash
        </span>
      </div>

      {/* Terminal Content Screen */}
      <div
        ref={containerRef}
        className="terminal-screen"
        style={{
          height: '320px',
          overflowY: 'auto',
          padding: '1.5rem',
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.82rem',
          lineHeight: '1.6',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
        }}
      >
        {history.map((line) => {
          let color = '#fff8f4';
          if (line.type === 'input') color = 'var(--orange)';
          else if (line.type === 'error') color = '#f87171';
          else if (line.type === 'success') color = '#34d399';
          else if (line.type === 'output') color = '#e2e8f0';

          return (
            <div
              key={line.id}
              style={{
                color: color,
                whiteSpace: 'pre-wrap',
              }}
            >
              {line.text}
            </div>
          );
        })}

        {/* Input form prompt */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'var(--red)', marginRight: '0.5rem', whiteSpace: 'nowrap' }}>
            {isMobile ? 'visitor:~$ ' : 'visitor@pranav-thormise:~$ '}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--orange)',
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: '0.82rem',
              caretColor: 'var(--orange)',
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}
