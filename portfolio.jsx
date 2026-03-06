import { useState, useEffect } from "react";

const data = {
  name: "Your Name",
  role: "Full-Stack Developer",
  tagline: "Building thoughtful digital experiences with clean code and purposeful design.",
  about:
    "I'm a developer based in Jakarta, Indonesia. I specialize in React, Node.js, and Python — crafting web applications that are both performant and a pleasure to use. Currently finishing my thesis on Adaptive Line Balancing Systems for garment manufacturing.",
  cv: [
    { year: "2023 – Now", title: "Thesis Research", place: "Universitas Diponegoro", desc: "Adaptive Line Balancing System using Computer Vision (MediaPipe) & Robust Optimization algorithms." },
    { year: "2022", title: "Frontend Intern", place: "PT. Kreasi Digital", desc: "Built responsive web interfaces using React and Tailwind CSS for enterprise clients." },
    { year: "2021", title: "B.Sc. Informatics", place: "Universitas Diponegoro", desc: "Graduated with distinction. Focus on software engineering and data systems." },
  ],
  projects: [
    { id: "01", name: "Adaptive Line Balancing System", tags: ["Python", "Laravel", "MediaPipe", "MySQL"], desc: "Web-based system combining Computer Vision with Robust Optimization to analyze garment production efficiency in real-time.", year: "2024" },
    { id: "02", name: "Inventory Dashboard", tags: ["React", "Node.js", "PostgreSQL"], desc: "Real-time inventory management dashboard with predictive restocking alerts and export reports.", year: "2023" },
    { id: "03", name: "Weather Forecast App", tags: ["Vue.js", "OpenWeather API"], desc: "7-day weather forecasting app with geolocation support and animated weather conditions.", year: "2022" },
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/yourusername" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
    { label: "Email", url: "mailto:you@email.com" },
    { label: "Twitter / X", url: "https://twitter.com/yourusername" },
  ],
};

const THEMES = {
  light: {
    "--bg": "#F7F5F0", "--fg": "#1A1916", "--muted": "#8A8880",
    "--accent": "#C4562A", "--border": "#D8D5CE", "--card": "#EFECE6",
    "--nav-bg": "rgba(247,245,240,0.92)",
  },
  dark: {
    "--bg": "#111110", "--fg": "#E8E5DF", "--muted": "#6B6964",
    "--accent": "#E0724A", "--border": "#2A2926", "--card": "#1A1916",
    "--nav-bg": "rgba(17,17,16,0.92)",
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&family=Outfit:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--fg);font-family:'Outfit',sans-serif;font-weight:300;line-height:1.6;overflow-x:hidden;transition:background .35s,color .35s}
  ::selection{background:var(--accent);color:#fff}
  ::-webkit-scrollbar{width:4px}
  ::-webkit-scrollbar-track{background:var(--bg)}
  ::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}

  nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:1.5rem 4rem;background:var(--nav-bg);backdrop-filter:blur(12px);border-bottom:1px solid transparent;transition:border-color .3s,background .35s}
  nav.scrolled{border-color:var(--border)}
  .nav-logo{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:400;letter-spacing:.02em;color:var(--fg);text-decoration:none}
  .nav-right{display:flex;align-items:center;gap:2.5rem}
  .nav-links{display:flex;gap:2.5rem;list-style:none}
  .nav-links a{font-family:'DM Mono',monospace;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
  .nav-links a:hover{color:var(--fg)}

  .theme-btn{display:flex;align-items:center;gap:.5rem;background:var(--card);border:1px solid var(--border);border-radius:20px;padding:.35rem .75rem .35rem .5rem;cursor:pointer;transition:border-color .2s,background .2s}
  .theme-btn:hover{border-color:var(--muted)}
  .theme-icon{font-size:.9rem;line-height:1}
  .theme-label{font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}

  .hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding-top:8rem;max-width:1100px;margin:0 auto;padding-left:4rem;padding-right:4rem}
  .hero-eyebrow{font-family:'DM Mono',monospace;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:1.5rem;opacity:0;animation:fadeUp .8s .2s forwards}
  .hero-name{font-family:'Cormorant Garamond',serif;font-size:clamp(3.5rem,8vw,7rem);font-weight:300;line-height:1.0;letter-spacing:-.02em;margin-bottom:2rem;opacity:0;animation:fadeUp .9s .35s forwards}
  .hero-name em{font-style:italic;color:var(--accent)}
  .hero-tagline{max-width:560px;font-size:1.05rem;color:var(--muted);line-height:1.75;margin-bottom:3rem;opacity:0;animation:fadeUp .9s .5s forwards}
  .hero-cta{display:flex;gap:1.5rem;align-items:center;opacity:0;animation:fadeUp .9s .65s forwards}
  .btn-primary{font-family:'DM Mono',monospace;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--bg);background:var(--fg);border:1px solid var(--fg);padding:.85rem 2rem;text-decoration:none;transition:background .25s,color .25s,border-color .25s}
  .btn-primary:hover{background:var(--accent);border-color:var(--accent);color:#fff}
  .btn-ghost{font-family:'DM Mono',monospace;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--fg);text-decoration:none;display:flex;align-items:center;gap:.5rem;transition:color .2s}
  .btn-ghost:hover{color:var(--accent)}
  .btn-ghost::after{content:'↓';font-size:1rem}

  section{padding:7rem 4rem;max-width:1100px;margin:0 auto}
  .section-header{display:flex;align-items:center;gap:1.5rem;margin-bottom:3.5rem}
  .section-number{font-family:'DM Mono',monospace;font-size:.68rem;color:var(--accent);letter-spacing:.1em}
  .section-title{font-family:'Cormorant Garamond',serif;font-size:2.25rem;font-weight:400;letter-spacing:-.01em}
  .section-line{flex:1;height:1px;background:var(--border)}

  .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start}
  .about-text{font-size:1.05rem;color:var(--muted);line-height:1.9}
  .about-text strong{color:var(--fg);font-weight:400}
  .timeline{display:flex;flex-direction:column}
  .timeline-item{display:grid;grid-template-columns:90px 1fr;gap:1.5rem;padding:1.5rem 0;border-bottom:1px solid var(--border)}
  .timeline-item:first-child{border-top:1px solid var(--border)}
  .tl-year{font-family:'DM Mono',monospace;font-size:.68rem;color:var(--accent);letter-spacing:.08em;padding-top:.2rem}
  .tl-title{font-size:.95rem;font-weight:500;margin-bottom:.2rem}
  .tl-place{font-family:'DM Mono',monospace;font-size:.68rem;color:var(--muted);letter-spacing:.08em;margin-bottom:.5rem}
  .tl-desc{font-size:.88rem;color:var(--muted);line-height:1.65}

  .projects-list{display:flex;flex-direction:column}
  .project-item{display:grid;grid-template-columns:48px 1fr auto;gap:2rem;align-items:start;padding:2rem 0;border-bottom:1px solid var(--border);cursor:pointer;transition:all .2s}
  .project-item:first-child{border-top:1px solid var(--border)}
  .project-item:hover .project-name{color:var(--accent)}
  .project-item:hover .project-arrow{opacity:1;transform:translate(2px,-2px)}
  .proj-num{font-family:'DM Mono',monospace;font-size:.68rem;color:var(--border);padding-top:.3rem}
  .project-name{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:400;letter-spacing:-.01em;margin-bottom:.5rem;transition:color .2s}
  .project-desc{font-size:.88rem;color:var(--muted);line-height:1.7;max-width:520px;margin-bottom:1rem}
  .project-tags{display:flex;flex-wrap:wrap;gap:.5rem}
  .tag{font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.08em;color:var(--muted);border:1px solid var(--border);padding:.2rem .6rem;background:var(--card)}
  .project-arrow{font-size:1.2rem;color:var(--fg);opacity:0;transition:all .2s;padding-top:.3rem}
  .project-year{font-family:'DM Mono',monospace;font-size:.65rem;color:var(--border);margin-top:.3rem}

  .contact-inner{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start}
  .contact-text{font-family:'Cormorant Garamond',serif;font-size:2.5rem;font-weight:300;line-height:1.25;letter-spacing:-.02em}
  .contact-text em{font-style:italic;color:var(--accent)}
  .socials{display:flex;flex-direction:column}
  .social-link{display:flex;justify-content:space-between;align-items:center;padding:1.25rem 0;border-bottom:1px solid var(--border);text-decoration:none;color:var(--fg);transition:all .2s}
  .social-link:first-child{border-top:1px solid var(--border)}
  .social-link:hover{padding-left:.5rem}
  .social-link:hover .social-name{color:var(--accent)}
  .social-link:hover .social-arrow{opacity:1}
  .social-name{font-size:1rem;font-weight:400;transition:color .2s}
  .social-arrow{font-size:.85rem;opacity:0;transition:opacity .2s}

  footer{border-top:1px solid var(--border);padding:2rem 4rem;display:flex;justify-content:space-between;align-items:center}
  .footer-text{font-family:'DM Mono',monospace;font-size:.68rem;color:var(--muted);letter-spacing:.08em}

  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
  .reveal.visible{opacity:1;transform:translateY(0)}

  @media(max-width:768px){
    nav{padding:1.25rem 1.5rem}
    .nav-links{gap:1.5rem}
    section,.hero{padding-left:1.5rem;padding-right:1.5rem}
    .about-grid,.contact-inner{grid-template-columns:1fr;gap:3rem}
    .project-item{grid-template-columns:40px 1fr}
    .project-arrow{display:none}
    footer{flex-direction:column;gap:.5rem;text-align:center}
    .theme-label{display:none}
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("theme") === "dark"; } catch { return false; }
  });
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(isDark ? THEMES.dark : THEMES.light).forEach(([k, v]) => root.style.setProperty(k, v));
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch {}
  }, [isDark]);
  return [isDark, setIsDark];
}

function Nav({ isDark, setIsDark }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="#" className="nav-logo">
        {data.name.split(" ")[0]}<em style={{ fontStyle: "italic", color: "var(--accent)" }}>.</em>
      </a>
      <div className="nav-right">
        <ul className="nav-links">
          {["about", "projects", "contact"].map((s) => (
            <li key={s}><a href={`#${s}`}>{s}</a></li>
          ))}
        </ul>
        <button className="theme-btn" onClick={() => setIsDark((d) => !d)} aria-label="Toggle theme">
          <span className="theme-icon">{isDark ? "🌙" : "☀️"}</span>
          <span className="theme-label">{isDark ? "Dark" : "Light"}</span>
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  const [first, ...rest] = data.name.split(" ");
  return (
    <div className="hero">
      <p className="hero-eyebrow">{data.role}</p>
      <h1 className="hero-name">{first}<br /><em>{rest.join(" ")}</em></h1>
      <p className="hero-tagline">{data.tagline}</p>
      <div className="hero-cta">
        <a href="#projects" className="btn-primary">View Work</a>
        <a href="#contact" className="btn-ghost">Get in Touch</a>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about">
      <div className="section-header reveal">
        <span className="section-number">01</span>
        <h2 className="section-title">About & CV</h2>
        <div className="section-line" />
      </div>
      <div className="about-grid">
        <p className="about-text reveal"
          dangerouslySetInnerHTML={{ __html: data.about.replace(/React|Node\.js|Python|MediaPipe/g, (m) => `<strong>${m}</strong>`) }}
        />
        <div className="timeline reveal">
          {data.cv.map((item, i) => (
            <div className="timeline-item" key={i}>
              <span className="tl-year">{item.year}</span>
              <div>
                <div className="tl-title">{item.title}</div>
                <div className="tl-place">{item.place}</div>
                <div className="tl-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="section-header reveal">
        <span className="section-number">02</span>
        <h2 className="section-title">Selected Work</h2>
        <div className="section-line" />
      </div>
      <div className="projects-list">
        {data.projects.map((p, i) => (
          <div className="project-item reveal" key={i}>
            <div>
              <div className="proj-num">{p.id}</div>
              <div className="project-year">{p.year}</div>
            </div>
            <div>
              <div className="project-name">{p.name}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
            </div>
            <div className="project-arrow">↗</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="section-header reveal">
        <span className="section-number">03</span>
        <h2 className="section-title">Contact</h2>
        <div className="section-line" />
      </div>
      <div className="contact-inner">
        <div className="contact-text reveal">
          Let's build something<br /><em>remarkable</em><br />together.
        </div>
        <div className="socials reveal">
          {data.socials.map((s, i) => (
            <a href={s.url} className="social-link" key={i} target="_blank" rel="noopener noreferrer">
              <span className="social-name">{s.label}</span>
              <span className="social-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [isDark, setIsDark] = useTheme();
  useReveal();
  return (
    <>
      <style>{css}</style>
      <Nav isDark={isDark} setIsDark={setIsDark} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer>
        <span className="footer-text">© 2025 {data.name}</span>
        <span className="footer-text">Designed & Built with React</span>
      </footer>
    </>
  );
}
