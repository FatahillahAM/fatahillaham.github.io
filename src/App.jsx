import React, { useState, useEffect } from "react";

/* ─── EDIT DATA KAMU DI SINI ─────────────────────────────────────────────── */
const data = {
  name: "Your Name",
  role: "Full-Stack Developer",
  tagline: "Building thoughtful digital experiences with clean code and purposeful design.",
  about: "I'm a developer based in Semarang, Indonesia. I specialize in React, Node.js, and Python — crafting web applications that are both performant and a pleasure to use.",
  cv: [
    { year: "2023–Now", title: "Thesis Research", place: "Universitas Diponegoro", desc: "Adaptive Line Balancing System using Computer Vision (MediaPipe) & Robust Optimization algorithms." },
    { year: "2022", title: "Frontend Intern", place: "PT. Kreasi Digital", desc: "Built responsive web interfaces using React and Tailwind CSS for enterprise clients." },
    { year: "2021", title: "B.Sc. Informatics", place: "Universitas Diponegoro", desc: "Graduated with distinction. Focus on software engineering and data systems." },
  ],
  projects: [
    { id: "01", name: "Adaptive Line Balancing System", tags: ["Python", "Laravel", "MediaPipe", "MySQL"], desc: "Web-based system combining Computer Vision with Robust Optimization to analyze garment production efficiency.", year: "2024" },
    { id: "02", name: "Inventory Dashboard", tags: ["React", "Node.js", "PostgreSQL"], desc: "Real-time inventory management dashboard with predictive restocking alerts and export reports.", year: "2023" },
    { id: "03", name: "Weather Forecast App", tags: ["Vue.js", "OpenWeather API"], desc: "7-day weather forecasting app with geolocation and animated weather conditions.", year: "2022" },
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/yourusername" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
    { label: "Email", url: "mailto:you@email.com" },
  ],
};
/* ─────────────────────────────────────────────────────────────────────────── */

const light = {
  bg: "#F7F5F0", fg: "#1A1916", muted: "#8A8880",
  accent: "#C4562A", border: "#D8D5CE", card: "#EFECE6",
};
const dark = {
  bg: "#111110", fg: "#E8E5DF", muted: "#5A5855",
  accent: "#E0724A", border: "#2A2926", card: "#1A1916",
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = isDark ? dark : light;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const s = {
    // layout
    body: { fontFamily: "'Segoe UI', sans-serif", background: t.bg, color: t.fg, margin: 0, padding: 0, transition: "background .3s, color .3s", minHeight: "100vh" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 3rem", background: t.bg, borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent", transition: "border-color .3s, background .3s" },
    navLogo: { fontFamily: "Georgia, serif", fontSize: "1.2rem", color: t.fg, textDecoration: "none", fontWeight: 400 },
    navRight: { display: "flex", alignItems: "center", gap: "2rem" },
    navLinks: { display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 },
    navLink: { fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.muted, textDecoration: "none" },
    toggleBtn: { background: t.card, border: `1px solid ${t.border}`, borderRadius: "20px", padding: "0.3rem 0.8rem", cursor: "pointer", fontSize: "0.75rem", color: t.muted, display: "flex", alignItems: "center", gap: "0.4rem" },
    // hero
    hero: { minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 3rem 4rem", maxWidth: "1000px", margin: "0 auto" },
    eyebrow: { fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: t.accent, marginBottom: "1.5rem" },
    heroName: { fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 1.5rem" },
    heroItalic: { fontStyle: "italic", color: t.accent },
    heroTagline: { fontSize: "1rem", color: t.muted, lineHeight: 1.8, maxWidth: "500px", marginBottom: "2.5rem" },
    heroCta: { display: "flex", gap: "1.5rem", alignItems: "center" },
    btnPrimary: { fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.bg, background: t.fg, border: `1px solid ${t.fg}`, padding: "0.8rem 1.8rem", textDecoration: "none", cursor: "pointer" },
    btnGhost: { fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: t.fg, textDecoration: "none" },
    // sections
    section: { padding: "6rem 3rem", maxWidth: "1000px", margin: "0 auto", borderTop: `1px solid ${t.border}` },
    sectionHeader: { display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "3rem" },
    sectionNum: { fontFamily: "monospace", fontSize: "0.68rem", color: t.accent, letterSpacing: "0.1em" },
    sectionTitle: { fontFamily: "Georgia, serif", fontSize: "2rem", fontWeight: 400, margin: 0 },
    sectionLine: { flex: 1, height: "1px", background: t.border },
    // about
    aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" },
    aboutText: { fontSize: "0.95rem", color: t.muted, lineHeight: 1.9 },
    // timeline
    tlItem: { display: "grid", gridTemplateColumns: "80px 1fr", gap: "1.2rem", padding: "1.2rem 0", borderBottom: `1px solid ${t.border}` },
    tlYear: { fontFamily: "monospace", fontSize: "0.65rem", color: t.accent, paddingTop: "0.2rem" },
    tlTitle: { fontSize: "0.9rem", fontWeight: 500, marginBottom: "0.2rem" },
    tlPlace: { fontFamily: "monospace", fontSize: "0.65rem", color: t.muted, marginBottom: "0.4rem" },
    tlDesc: { fontSize: "0.82rem", color: t.muted, lineHeight: 1.6 },
    // projects
    projItem: { display: "grid", gridTemplateColumns: "44px 1fr 24px", gap: "1.5rem", padding: "1.8rem 0", borderBottom: `1px solid ${t.border}`, cursor: "pointer" },
    projNum: { fontFamily: "monospace", fontSize: "0.65rem", color: t.border, paddingTop: "0.3rem" },
    projYear: { fontFamily: "monospace", fontSize: "0.62rem", color: t.border, marginTop: "0.3rem" },
    projName: { fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 400, marginBottom: "0.5rem", color: t.fg },
    projDesc: { fontSize: "0.85rem", color: t.muted, lineHeight: 1.7, marginBottom: "0.8rem" },
    tagsWrap: { display: "flex", flexWrap: "wrap", gap: "0.4rem" },
    tag: { fontFamily: "monospace", fontSize: "0.6rem", color: t.muted, border: `1px solid ${t.border}`, padding: "0.15rem 0.5rem", background: t.card },
    // contact
    contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" },
    contactText: { fontFamily: "Georgia, serif", fontSize: "2.2rem", fontWeight: 300, lineHeight: 1.3, color: t.fg },
    socialLink: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.1rem 0", borderBottom: `1px solid ${t.border}`, textDecoration: "none", color: t.fg, fontSize: "0.95rem" },
    // footer
    footer: { borderTop: `1px solid ${t.border}`, padding: "1.5rem 3rem", display: "flex", justifyContent: "space-between" },
    footerText: { fontFamily: "monospace", fontSize: "0.65rem", color: t.muted, letterSpacing: "0.08em" },
  };

  const [first, ...rest] = data.name.split(" ");

  return (
    <div style={s.body}>
      {/* NAV */}
      <nav style={s.nav}>
        <a href="#" style={s.navLogo}>{first}<span style={{ fontStyle: "italic", color: t.accent }}>.</span></a>
        <div style={s.navRight}>
          <ul style={s.navLinks}>
            {["about", "projects", "contact"].map(sec => (
              <li key={sec}><a href={`#${sec}`} style={s.navLink}>{sec}</a></li>
            ))}
          </ul>
          <button style={s.toggleBtn} onClick={() => setIsDark(d => !d)}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={s.hero}>
        <p style={s.eyebrow}>{data.role}</p>
        <h1 style={s.heroName}>
          {first}<br />
          <em style={s.heroItalic}>{rest.join(" ")}</em>
        </h1>
        <p style={s.heroTagline}>{data.tagline}</p>
        <div style={s.heroCta}>
          <a href="#projects" style={s.btnPrimary}>View Work</a>
          <a href="#contact" style={s.btnGhost}>Get in Touch ↓</a>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={s.section}>
        <div style={s.sectionHeader}>
          <span style={s.sectionNum}>01</span>
          <h2 style={s.sectionTitle}>About & CV</h2>
          <div style={s.sectionLine} />
        </div>
        <div style={s.aboutGrid}>
          <p style={s.aboutText}>{data.about}</p>
          <div>
            {data.cv.map((item, i) => (
              <div key={i} style={{ ...s.tlItem, ...(i === 0 ? { borderTop: `1px solid ${t.border}` } : {}) }}>
                <span style={s.tlYear}>{item.year}</span>
                <div>
                  <div style={s.tlTitle}>{item.title}</div>
                  <div style={s.tlPlace}>{item.place}</div>
                  <div style={s.tlDesc}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={s.section}>
        <div style={s.sectionHeader}>
          <span style={s.sectionNum}>02</span>
          <h2 style={s.sectionTitle}>Selected Work</h2>
          <div style={s.sectionLine} />
        </div>
        {data.projects.map((p, i) => (
          <div key={i} style={{ ...s.projItem, ...(i === 0 ? { borderTop: `1px solid ${t.border}` } : {}) }}>
            <div>
              <div style={s.projNum}>{p.id}</div>
              <div style={s.projYear}>{p.year}</div>
            </div>
            <div>
              <div style={s.projName}>{p.name}</div>
              <div style={s.projDesc}>{p.desc}</div>
              <div style={s.tagsWrap}>{p.tags.map(tag => <span key={tag} style={s.tag}>{tag}</span>)}</div>
            </div>
            <span style={{ color: t.muted, fontSize: "1rem" }}>↗</span>
          </div>
        ))}
      </section>

      {/* CONTACT */}
      <section id="contact" style={s.section}>
        <div style={s.sectionHeader}>
          <span style={s.sectionNum}>03</span>
          <h2 style={s.sectionTitle}>Contact</h2>
          <div style={s.sectionLine} />
        </div>
        <div style={s.contactGrid}>
          <div style={s.contactText}>
            Let's build something<br />
            <em style={{ fontStyle: "italic", color: t.accent }}>remarkable</em><br />
            together.
          </div>
          <div>
            {data.socials.map((sc, i) => (
              <a key={i} href={sc.url} style={{ ...s.socialLink, ...(i === 0 ? { borderTop: `1px solid ${t.border}` } : {}) }} target="_blank" rel="noopener noreferrer">
                <span>{sc.label}</span>
                <span style={{ color: t.muted }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <span style={s.footerText}>© 2025 {data.name}</span>
        <span style={s.footerText}>Built with React</span>
      </footer>
    </div>
  );
}
