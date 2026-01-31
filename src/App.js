import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --cream: #F5F0E8;
    --cream-dark: #EBE4D5;
    --brown-deep: #2C1A0E;
    --brown-mid: #5C3D2E;
    --brown-light: #8B6F47;
    --gold: #C9A84C;
    --gold-light: #E2C97E;
    --gold-glow: rgba(201, 168, 76, 0.15);
    --text-primary: #2C1A0E;
    --text-secondary: #7A6352;
    --white: #FFFFFF;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--text-primary);
    overflow-x: hidden;
  }

  /* ─── NAVBAR ─── */
  .navbar {
    position: fixed; top: 0; left: 0; width: 100%; z-index: 100;
    padding: 20px 48px;
    display: flex; justify-content: space-between; align-items: center;
    transition: background 0.4s ease, box-shadow 0.4s ease, padding 0.4s ease;
  }
  .navbar.scrolled {
    background: rgba(245,240,232,0.92);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 20px rgba(44,26,14,0.08);
    padding: 14px 48px;
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; font-weight: 700;
    color: var(--brown-deep); letter-spacing: 0.5px;
  }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a {
    text-decoration: none; color: var(--text-secondary);
    font-size: 0.82rem; font-weight: 500; letter-spacing: 1.2px;
    text-transform: uppercase; position: relative;
    transition: color 0.3s;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0;
    width: 0; height: 1.5px; background: var(--gold);
    transition: width 0.3s ease;
  }
  .nav-links a:hover { color: var(--brown-deep); }
  .nav-links a:hover::after { width: 100%; }
  .nav-cta {
    padding: 10px 24px; border: 1.5px solid var(--gold);
    color: var(--gold); font-size: 0.78rem; font-weight: 600;
    letter-spacing: 1px; text-transform: uppercase;
    text-decoration: none; border-radius: 2px;
    transition: all 0.3s ease; cursor: pointer; background: transparent;
  }
  .nav-cta:hover { background: var(--gold); color: var(--white); box-shadow: 0 4px 18px var(--gold-glow); }

  /* ─── HERO ─── */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    position: relative; overflow: hidden;
    background: var(--brown-deep);
  }
  .hero-bg-pattern {
    position: absolute; inset: 0; opacity: 0.06;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(201,168,76,0.5) 79px, rgba(201,168,76,0.5) 80px),
      repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(201,168,76,0.5) 79px, rgba(201,168,76,0.5) 80px);
  }
  .hero-glow {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
    top: -100px; right: -100px; pointer-events: none;
  }
  .hero-glow-2 {
    position: absolute; width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
    bottom: 50px; left: -80px; pointer-events: none;
  }
  .hero-content { position: relative; z-index: 1; text-align: center; padding: 0 24px; max-width: 860px; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(201,168,76,0.35); border-radius: 20px;
    padding: 6px 18px; margin-bottom: 36px;
    animation: fadeInDown 0.8s ease both;
  }
  .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); }
  .hero-badge span { color: var(--gold-light); font-size: 0.72rem; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.6rem, 6vw, 4.4rem);
    font-weight: 700; line-height: 1.15; color: var(--white);
    animation: fadeInUp 0.9s ease 0.2s both;
  }
  .hero h1 em { font-style: italic; color: var(--gold-light); }
  .hero-sub {
    margin-top: 24px; color: rgba(255,255,255,0.5);
    font-size: 1rem; font-weight: 300; line-height: 1.7; max-width: 580px; margin-left: auto; margin-right: auto;
    animation: fadeInUp 0.9s ease 0.4s both;
  }
  .hero-actions {
    margin-top: 44px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
    animation: fadeInUp 0.9s ease 0.6s both;
  }
  .btn-primary {
    padding: 14px 32px; background: var(--gold); color: var(--brown-deep);
    font-size: 0.78rem; font-weight: 600; letter-spacing: 1.2px;
    text-transform: uppercase; text-decoration: none; border-radius: 2px;
    transition: all 0.3s ease; cursor: pointer; border: none;
    box-shadow: 0 6px 24px var(--gold-glow);
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 10px 32px rgba(201,168,76,0.35); }
  .btn-ghost {
    padding: 14px 32px; background: transparent;
    color: rgba(255,255,255,0.7); font-size: 0.78rem; font-weight: 500;
    letter-spacing: 1.2px; text-transform: uppercase; text-decoration: none;
    border-radius: 2px; border: 1px solid rgba(255,255,255,0.2);
    transition: all 0.3s ease; cursor: pointer;
  }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.5); color: var(--white); }

  .hero-scroll-hint {
    position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    animation: fadeInUp 1s ease 1s both;
  }
  .hero-scroll-hint span { color: rgba(255,255,255,0.3); font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase; }
  .scroll-line { width: 1px; height: 36px; background: linear-gradient(to bottom, var(--gold), transparent); animation: scrollPulse 2s ease infinite; }

  /* ─── STATS BAR ─── */
  .stats-bar {
    background: var(--brown-mid); padding: 28px 48px;
    display: flex; justify-content: center; gap: 64px; flex-wrap: wrap;
  }
  .stat-item { text-align: center; }
  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 1.9rem; font-weight: 700; color: var(--gold-light);
  }
  .stat-label { color: rgba(255,255,255,0.45); font-size: 0.7rem; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px; }

  /* ─── SECTION COMMONS ─── */
  .section { padding: 100px 48px; }
  .section-tag {
    display: inline-flex; align-items: center; gap: 10px; margin-bottom: 16px;
  }
  .section-tag-line { width: 32px; height: 1.5px; background: var(--gold); }
  .section-tag span { color: var(--gold); font-size: 0.7rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.7rem); font-weight: 700;
    color: var(--brown-deep); line-height: 1.25; max-width: 540px;
  }
  .section-title em { font-style: italic; color: var(--brown-light); }

  /* ─── SERVICES ─── */
  .services { background: var(--cream); }
  .services-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px; margin-top: 56px; max-width: 1100px; margin-left: auto; margin-right: auto;
  }
  .service-card {
    background: var(--white); border: 1px solid rgba(44,26,14,0.07);
    border-radius: 4px; padding: 40px 32px; position: relative; overflow: hidden;
    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    cursor: default;
  }
  .service-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 3px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
  }
  .service-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(44,26,14,0.1); border-color: rgba(201,168,76,0.3); }
  .service-card:hover::before { transform: scaleX(1); }
  .service-icon {
    width: 48px; height: 48px; border-radius: 8px;
    background: var(--gold-glow); display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px; font-size: 1.3rem;
  }
  .service-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem; font-weight: 600; margin-bottom: 12px; color: var(--brown-deep);
  }
  .service-card p { color: var(--text-secondary); font-size: 0.87rem; line-height: 1.7; font-weight: 300; }
  .service-num {
    position: absolute; top: 20px; right: 24px;
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem; font-weight: 700; color: rgba(44,26,14,0.04);
  }

  /* ─── WHY ROC ─── */
  .why-roc { background: var(--cream-dark); }
  .why-roc-inner {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }
  .why-visual {
    position: relative; padding: 40px;
  }
  .why-card-main {
    background: var(--brown-deep); border-radius: 6px; padding: 48px 40px;
    position: relative; overflow: hidden;
  }
  .why-card-main::after {
    content: ''; position: absolute; top: -60px; right: -60px;
    width: 180px; height: 180px; border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.15);
  }
  .why-card-main h4 {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem; color: var(--white); font-weight: 600; margin-bottom: 12px; position: relative; z-index: 1;
  }
  .why-card-main p { color: rgba(255,255,255,0.45); font-size: 0.85rem; line-height: 1.7; position: relative; z-index: 1; }
  .why-floating-badge {
    position: absolute; bottom: -16px; right: 32px;
    background: var(--gold); border-radius: 4px; padding: 14px 22px;
    box-shadow: 0 8px 32px rgba(201,168,76,0.3);
  }
  .why-floating-badge strong { color: var(--brown-deep); font-size: 1.1rem; font-family: 'Playfair Display', serif; }
  .why-floating-badge span { color: var(--brown-mid); font-size: 0.65rem; letter-spacing: 1px; text-transform: uppercase; display: block; margin-top: 2px; }
  .why-list { margin-top: 40px; display: flex; flex-direction: column; gap: 28px; }
  .why-item { display: flex; gap: 18px; align-items: flex-start; }
  .why-check {
    width: 36px; height: 36px; min-width: 36px; border-radius: 50%;
    border: 1.5px solid var(--gold); display: flex; align-items: center; justify-content: center;
    color: var(--gold); font-size: 0.85rem; margin-top: 2px;
  }
  .why-item h5 { font-size: 0.95rem; font-weight: 600; color: var(--brown-deep); margin-bottom: 4px; }
  .why-item p { color: var(--text-secondary); font-size: 0.82rem; line-height: 1.6; font-weight: 300; }

  /* ─── PROCESS ─── */
  .process { background: var(--cream); }
  .process-inner { max-width: 900px; margin: 0 auto; }
  .process-header { text-align: center; margin-bottom: 64px; }
  .process-header .section-tag { justify-content: center; }
  .process-header .section-title { max-width: 100%; text-align: center; margin: 0 auto; }
  .process-steps { display: flex; flex-direction: column; gap: 0; position: relative; padding-left: 24px; }
  .process-steps::before {
    content: ''; position: absolute; left: 23px; top: 8px; bottom: 8px;
    width: 1px; background: linear-gradient(to bottom, var(--gold), rgba(201,168,76,0.1));
  }
  .process-step { display: flex; gap: 32px; align-items: flex-start; position: relative; padding-bottom: 48px; }
  .process-step:last-child { padding-bottom: 0; }
  .step-dot {
    width: 18px; height: 18px; min-width: 18px; border-radius: 50%;
    background: var(--gold); border: 3px solid var(--cream); box-shadow: 0 0 0 2px var(--gold);
    position: relative; z-index: 1; margin-top: 6px;
  }
  .step-content { flex: 1; }
  .step-number { color: var(--gold); font-size: 0.65rem; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; }
  .step-content h4 { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 600; color: var(--brown-deep); margin-bottom: 8px; }
  .step-content p { color: var(--text-secondary); font-size: 0.84rem; line-height: 1.7; font-weight: 300; }

  /* ─── TESTIMONIAL ─── */
  .testimonial { background: var(--brown-deep); padding: 100px 48px; text-align: center; position: relative; overflow: hidden; }
  .testimonial::before {
    content: ''; position: absolute; top: -200px; left: 50%; transform: translateX(-50%);
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
  }
  .testimonial-inner { max-width: 700px; margin: 0 auto; position: relative; z-index: 1; }
  .testimonial .section-tag { justify-content: center; }
  .quote-mark { font-family: 'Playfair Display', serif; font-size: 5rem; color: var(--gold); opacity: 0.3; line-height: 1; margin-bottom: 8px; }
  .testimonial blockquote {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: clamp(1.1rem, 2vw, 1.4rem); color: rgba(255,255,255,0.75);
    line-height: 1.7; margin: 20px 0 32px;
  }
  .testimonial-author { display: flex; align-items: center; justify-content: center; gap: 14px; }
  .author-avatar {
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--brown-light));
    display: flex; align-items: center; justify-content: center;
    color: var(--white); font-weight: 600; font-size: 0.9rem;
  }
  .author-info { text-align: left; }
  .author-name { color: var(--white); font-size: 0.85rem; font-weight: 600; }
  .author-role { color: rgba(255,255,255,0.35); font-size: 0.72rem; letter-spacing: 0.8px; }

  /* ─── CTA ─── */
  .cta-section { background: var(--cream-dark); padding: 100px 48px; text-align: center; }
  .cta-inner { max-width: 680px; margin: 0 auto; }
  .cta-inner .section-tag { justify-content: center; }
  .cta-inner .section-title { max-width: 100%; text-align: center; margin: 0 auto; }
  .cta-inner p { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.7; margin: 20px 0 40px; font-weight: 300; }
  .cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .btn-primary-dark {
    padding: 14px 32px; background: var(--brown-deep); color: var(--white);
    font-size: 0.78rem; font-weight: 600; letter-spacing: 1.2px;
    text-transform: uppercase; text-decoration: none; border-radius: 2px;
    transition: all 0.3s ease; cursor: pointer; border: none;
  }
  .btn-primary-dark:hover { background: var(--brown-mid); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(44,26,14,0.2); }
  .btn-outline-dark {
    padding: 14px 32px; background: transparent; color: var(--brown-deep);
    font-size: 0.78rem; font-weight: 600; letter-spacing: 1.2px;
    text-transform: uppercase; text-decoration: none; border-radius: 2px;
    border: 1.5px solid var(--brown-deep); transition: all 0.3s ease; cursor: pointer;
  }
  .btn-outline-dark:hover { background: var(--brown-deep); color: var(--white); }

  /* ─── FOOTER ─── */
  .footer { background: var(--brown-deep); padding: 72px 48px 32px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 48px; max-width: 1100px; margin: 0 auto; }
  .footer-brand .nav-logo { font-size: 1.2rem; margin-bottom: 16px; display: block; }
  .footer-brand p { color: rgba(255,255,255,0.35); font-size: 0.8rem; line-height: 1.7; max-width: 280px; }
  .footer h5 { color: var(--white); font-size: 0.7rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 20px; }
  .footer ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .footer ul li a { color: rgba(255,255,255,0.4); font-size: 0.8rem; text-decoration: none; transition: color 0.3s; }
  .footer ul li a:hover { color: var(--gold-light); }
  .footer-contact p { color: rgba(255,255,255,0.4); font-size: 0.8rem; line-height: 1.9; }
  .footer-contact a { color: var(--gold-light); text-decoration: none; }
  .footer-bottom {
    max-width: 1100px; margin: 56px auto 0; padding-top: 28px;
    border-top: 1px solid rgba(255,255,255,0.08);
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
  }
  .footer-bottom p { color: rgba(255,255,255,0.25); font-size: 0.72rem; }

  /* ─── KEYFRAMES ─── */
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes scrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

  /* ─── REVEAL ANIMATION ─── */
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 768px) {
    .navbar { padding: 18px 24px; }
    .nav-links { display: none; }
    .section { padding: 72px 24px; }
    .why-roc-inner { grid-template-columns: 1fr; gap: 48px; }
    .why-visual { padding: 0; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .stats-bar { gap: 32px; padding: 24px; }
  }
  @media (max-width: 480px) {
    .footer-grid { grid-template-columns: 1fr; }
    .hero-actions { flex-direction: column; align-items: center; }
  }
`;

/* ────────────────────── COMPONENTS ────────────────────── */
const NavBar = ({ scrolled }) => (
  <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
    <div className="nav-logo">
      Richard Olokodana <span>Consulting</span>
    </div>
    <ul className="nav-links">
      <li>
        <a href="#services">Services</a>
      </li>
      <li>
        <a href="#about">About</a>
      </li>
      <li>
        <a href="#process">Process</a>
      </li>
      <li>
        <a href="#contact">Contact</a>
      </li>
    </ul>
    <a href="#contact" className="nav-cta">
      Get In Touch
    </a>
  </nav>
);

const Hero = () => (
  <section className="hero">
    <div className="hero-bg-pattern" />
    <div className="hero-glow" />
    <div className="hero-glow-2" />
    <div className="hero-content">
      <div className="hero-badge">
        <div className="hero-badge-dot" />
        <span>Licensed Estate Surveyors & Valuers</span>
      </div>
      <h1>
        Precision in every
        <br />
        <em>inch of land.</em>
      </h1>
      <p className="hero-sub">Richard Olokodana Consulting delivers expert land surveying, property valuation, and estate management services built on decades of professional excellence.</p>
      <div className="hero-actions">
        <a href="#services" className="btn-primary">
          Explore Services
        </a>
        <a href="#contact" className="btn-ghost">
          Request a Consultation
        </a>
      </div>
    </div>
    <div className="hero-scroll-hint">
      <span>Scroll</span>
      <div className="scroll-line" />
    </div>
  </section>
);

const StatsBar = () => {
  const stats = [
    { number: "25+", label: "Years Experience" },
    { number: "1,200+", label: "Surveys Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Properties Valued" },
  ];
  return (
    <div className="stats-bar">
      {stats.map((s, i) => (
        <div className="stat-item" key={i}>
          <div className="stat-number">{s.number}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const RevealDiv = ({ children, className = "", delay = 0 }) => {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Services = () => {
  const services = [
    { icon: "📐", title: "Land Surveying", desc: "Boundary determination, topographic mapping, and site investigation with state-of-the-art GPS and total station equipment.", num: "01" },
    { icon: "🏛️", title: "Property Valuation", desc: "Comprehensive market and income-based valuations for residential, commercial, and industrial properties across Nigeria.", num: "02" },
    { icon: "📋", title: "Estate Management", desc: "End-to-end management of real estate portfolios including maintenance, tenant relations, and regulatory compliance.", num: "03" },
    { icon: "🗺️", title: "GIS Mapping", desc: "Geographic Information System solutions for spatial data analysis, land-use planning, and custom cartographic outputs.", num: "04" },
    { icon: "⚖️", title: "Dispute Resolution", desc: "Expert witness services and boundary dispute analysis supported by rigorous survey evidence and legal documentation.", num: "05" },
    { icon: "📄", title: "Title & Deed Services", desc: "Facilitating title searches, deed preparations, and land registry interactions to secure your property rights.", num: "06" },
  ];
  return (
    <section className="section services" id="services">
      <RevealDiv>
        <div className="section-tag">
          <div className="section-tag-line" />
          <span>What We Do</span>
        </div>
        <h2 className="section-title">
          Services tailored to your
          <br />
          <em>property needs</em>
        </h2>
      </RevealDiv>
      <div className="services-grid">
        {services.map((s, i) => (
          <RevealDiv key={i} delay={i * 80}>
            <div className="service-card">
              <div className="service-num">{s.num}</div>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </RevealDiv>
        ))}
      </div>
    </section>
  );
};

const WhyROC = () => {
  const reasons = [
    { title: "Certified Professionals", desc: "Our team holds full ESVAR certifications and adheres to the highest professional standards set by the Estate Surveyors and Valuers Registration Council." },
    { title: "Modern Technology", desc: "We leverage cutting-edge GPS, LiDAR, and drone technology to deliver accurate, efficient, and reliable survey results." },
    { title: "Transparent Pricing", desc: "No hidden fees. We provide clear, itemised quotes upfront so you can plan and budget with confidence." },
    { title: "Local & National Reach", desc: "Headquartered in Lagos with project experience spanning across Nigeria's diverse landscapes and jurisdictions." },
  ];
  return (
    <section className="section why-roc" id="about">
      <div className="why-roc-inner">
        <RevealDiv>
          <div className="why-visual">
            <div className="why-card-main">
              <h4>Trusted by developers, investors & individuals</h4>
              <p>ROC has been the go-to firm for accurate, legally defensible surveying and valuation work across Nigeria's real estate sector.</p>
            </div>
            <div className="why-floating-badge">
              <strong>Est. 1999</strong>
              <span>Over Two Decades</span>
            </div>
          </div>
        </RevealDiv>
        <div>
          <RevealDiv>
            <div className="section-tag">
              <div className="section-tag-line" />
              <span>Why Choose Us</span>
            </div>
            <h2 className="section-title">
              The ROC
              <br />
              <em>difference</em>
            </h2>
          </RevealDiv>
          <div className="why-list">
            {reasons.map((r, i) => (
              <RevealDiv key={i} delay={i * 100}>
                <div className="why-item">
                  <div className="why-check">✓</div>
                  <div>
                    <h5>{r.title}</h5>
                    <p>{r.desc}</p>
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: "Initial Consultation", desc: "We begin with a detailed discussion to understand your project scope, objectives, and timeline. Our team assesses feasibility and outlines the best approach." },
    { title: "Site Assessment", desc: "Our surveyors conduct an on-ground inspection using precision instruments, collecting data on boundaries, topography, and existing structures." },
    { title: "Data Processing & Analysis", desc: "Raw field data is processed through advanced GIS software to produce accurate maps, models, and valuation reports." },
    { title: "Report & Delivery", desc: "A comprehensive, legally compliant report is prepared and delivered. We walk you through findings and are available for any follow-up queries." },
  ];
  return (
    <section className="section process" id="process">
      <div className="process-inner">
        <RevealDiv>
          <div className="process-header">
            <div className="section-tag">
              <div className="section-tag-line" />
              <span>How It Works</span>
            </div>
            <h2 className="section-title">
              A seamless process
              <br />
              <em>from start to finish</em>
            </h2>
          </div>
        </RevealDiv>
        <div className="process-steps">
          {steps.map((s, i) => (
            <RevealDiv key={i} delay={i * 120}>
              <div className="process-step">
                <div className="step-dot" />
                <div className="step-content">
                  <div className="step-number">Step {String(i + 1).padStart(2, "0")}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => (
  <section className="testimonial">
    <div className="testimonial-inner">
      <RevealDiv>
        <div className="section-tag">
          <div className="section-tag-line" />
          <span>Testimonial</span>
        </div>
        <div className="quote-mark">"</div>
        <blockquote>ROC delivered a flawless boundary survey for our 5-acre development site. Their professionalism, accuracy, and timely delivery made the entire process stress-free. I wouldn't hesitate to recommend them.</blockquote>
        <div className="testimonial-author">
          <div className="author-avatar">AO</div>
          <div className="author-info">
            <div className="author-name">Adebayo Ogundimu</div>
            <div className="author-role">Property Developer, Lagos</div>
          </div>
        </div>
      </RevealDiv>
    </div>
  </section>
);

const CTA = () => (
  <section className="cta-section" id="contact">
    <RevealDiv>
      <div className="cta-inner">
        <div className="section-tag">
          <div className="section-tag-line" />
          <span>Get Started</span>
        </div>
        <h2 className="section-title">
          Ready to get your
          <br />
          <em>project underway?</em>
        </h2>
        <p>Whether you need a boundary survey, property valuation, or full estate management — our team is ready to deliver with precision and professionalism.</p>
        <div className="cta-actions">
          <button className="btn-primary-dark">Book a Consultation</button>
          <button className="btn-outline-dark">View Our Work</button>
        </div>
      </div>
    </RevealDiv>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <div className="nav-logo">
          Richard Olokodana <span>Consulting</span>
        </div>
        <p>A leading firm of estate surveyors and valuers committed to delivering precision, integrity, and excellence in every engagement.</p>
      </div>
      <div>
        <h5>Services</h5>
        <ul>
          <li>
            <a href="#">Land Surveying</a>
          </li>
          <li>
            <a href="#">Property Valuation</a>
          </li>
          <li>
            <a href="#">Estate Management</a>
          </li>
          <li>
            <a href="#">GIS Mapping</a>
          </li>
        </ul>
      </div>
      <div>
        <h5>Company</h5>
        <ul>
          <li>
            <a href="#">About ROC</a>
          </li>
          <li>
            <a href="#">Our Team</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </ul>
      </div>
      <div className="footer-contact">
        <h5>Contact Us</h5>
        <p>
          12 Surveyor's Avenue
          <br />
          Victoria Island, Lagos
          <br />
          Nigeria
          <br />
          <br />
          📞 +234 (0) 800 123 4567
          <br />
          ✉️ <a href="mailto:info@roconsulting.ng">info@roconsulting.ng</a>
        </p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2025 Richard Olokodana Consulting. All rights reserved.</p>
      <p>Registered with ESVAR Nigeria</p>
    </div>
  </footer>
);

/* ────────────────────── MAIN APP ────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <NavBar scrolled={scrolled} />
      <Hero />
      <StatsBar />
      <Services />
      <WhyROC />
      <Process />
      <Testimonial />
      <CTA />
      <Footer />
    </>
  );
}
