"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart3 } from "lucide-react";
import { LeadConversionChart, MonthlyGrowthChart } from "./AnalyticsCharts.jsx";

const Icon = ({ children, size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>{children}</svg>
);
const MenuIcon = ({ size = 20 }) => <Icon size={size}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>;
const CloseIcon = ({ size = 20 }) => <Icon size={size}><path d="m6 6 12 12M18 6 6 18" /></Icon>;
const ArrowIcon = ({ size = 18 }) => <Icon size={size}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>;
const PlayIcon = ({ size = 20 }) => <Icon size={size}><circle cx="12" cy="12" r="10" /><path d="m10 8 5 4-5 4z" fill="currentColor" stroke="none" /></Icon>;
const CheckIcon = ({ size = 18 }) => <Icon size={size}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></Icon>;
const PriceCheckIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const SparkleIcon = ({ size = 22 }) => <Icon size={size}><path d="m12 3-1.3 5.2a3 3 0 0 1-2.2 2.2L3 12l5.5 1.6a3 3 0 0 1 2.2 2.2L12 21l1.3-5.2a3 3 0 0 1 2.2-2.2L21 12l-5.5-1.6a3 3 0 0 1-2.2-2.2z" /></Icon>;
const UsersIcon = ({ size = 22 }) => <Icon size={size}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.1a4 4 0 0 1 0 7.8M22 21v-2a4 4 0 0 0-3-3.9M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /></Icon>;
const IconChartColumn = ({ size = 22 }) => (
  <Icon size={size}>
    <path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16V4M20 16v-7" />
  </Icon>
);
const TrendIcon = ({ size = 22 }) => <Icon size={size}><path d="M3 17 9 11l4 4 8-8M15 7h6v6" /></Icon>;
const ChartIcon = ({ size = 22 }) => <Icon size={size}><path d="M4 19V5M4 19h16M8 16v-4M12 16V7M16 16v-6M20 16v-9" /></Icon>;
const ShieldIcon = ({ size = 22 }) => <Icon size={size}><path d="M12 3 4 6v5c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z" /><path d="m9 12 2 2 4-4" /></Icon>;

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/digiwireglobal", label: "Facebook", SocialSvg: FacebookIcon },
  { href: "https://www.linkedin.com/company/digi-wire/", label: "LinkedIn", SocialSvg: LinkedinIcon },
  { href: "https://www.instagram.com/digiwireglobal/", label: "Instagram", SocialSvg: InstagramIcon },
];

function SocialLinks() {
  return <div className="flex gap-3 mt-5">
    {SOCIAL_LINKS.map(({ href, label, SocialSvg }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="p-2 rounded-lg border transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:text-[#ff9d61]"
        style={{ borderColor: "rgba(255, 157, 97, 0.25)", color: "#99958e" }}
      >
        <SocialSvg />
      </a>
    ))}
  </div>;
}

const FEATURES = [
  { icon: SparkleIcon, title: "AI Lead Scoring", tag: "AI-POWERED", desc: "Identify high-intent students instantly using predictive behavioral modeling with 95% accuracy." },
  { icon: UsersIcon, title: "Lead Management", tag: "CENTRALIZED", desc: "Centralize inquiries in a searchable database with smart routing." },
  { icon: TrendIcon, title: "Call Intelligence", tag: "ANALYTICS", desc: "Auto-transcribe and analyze counselor interactions in real-time." },
  { icon: TrendIcon, title: "Pipeline Tracking", tag: "VISUAL FUNNEL", desc: "A bird's-eye view of the student journey from first click to successful enrollment.", big: true },
  { icon: ChartIcon, title: "Unified Comms", tag: "OMNICHANNEL", desc: "Manage Email, SMS, and WhatsApp threads within a single interface." },
  { icon: ChartIcon, title: "Real-time Analytics", tag: "FORECASTING", desc: "Track conversion rates and team performance with dynamic dashboards." },
];

const PRICING_PLANS = [
  { name: "Starter", blurb: "Perfect for small consultancies", price: "₹4,999", features: ["3 users included", "Lead management", "Student pipeline", "Follow-up reminders", "Document management", "Mobile app", "Extra users @ $12/user/month"] },
  { name: "Growth", blurb: "For growing agencies", price: "₹9,999", badge: "Most Popular", features: ["10 users included", "Call logging", "Call recording", "WhatsApp integration", "Counselor dashboards", "Extra users @ $10/user/month"] },
  { name: "Elite", blurb: "For large agencies", price: "₹19,999", features: ["25 users included", "AI call summaries", "AI lead scoring", "Automation workflows", "Advanced analytics", "Multi-branch support", "Extra users @ $9/user/month"] },
];

const BENEFITS = [
  { icon: TrendIcon, title: "Higher Conversions", desc: "Boost application completion by 35% with intelligent automation", stat: "+35% completion" },
  { icon: UsersIcon, title: "Team Accountability", desc: "Track counselor performance metrics and optimize team productivity", stat: "Real-time tracking" },
  { icon: TrendIcon, title: "Scale Easily", desc: "Handle thousands of students without compromising on quality", stat: "Unlimited scale" },
  { icon: ShieldIcon, title: "Secure & Compliant", desc: "Enterprise-grade security with GDPR and data protection compliance", stat: "SOC 2 certified" },
];

const FAQS = [
  { q: "How quickly can we get started?", a: "Most teams are up and running within 24 hours. Our onboarding team will guide you through setup and ensure your team is trained on all features." },
  { q: "Can Vyxel integrate with our existing systems?", a: "Yes! We offer integrations with email providers, communication tools, and custom API integrations. Our technical team can help with complex setups." },
  { q: "What support do you provide?", a: "We offer 24/7 email support for all plans, priority support for Growth and Enterprise plans, and dedicated account managers for Enterprise customers." },
  { q: "Is our data secure?", a: "Absolutely. We use enterprise-grade encryption, regular security audits, and comply with GDPR and data protection regulations." },
  { q: "Do you offer a free trial?", a: "Yes! We offer a 14-day free trial of all features. Book a demo if you want a personalized walkthrough." },
];

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    observer.observe(node);
    const updateOffset = () => {
      const distanceFromCenter = window.innerHeight / 2 - node.getBoundingClientRect().top;
      setScrollOffset(Math.max(-10, Math.min(10, distanceFromCenter * 0.025)));
    };
    window.addEventListener("scroll", updateOffset, { passive: true });
    updateOffset();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateOffset);
    };
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ "--reveal-delay": `${delay}ms`, transform: visible ? `translateY(${scrollOffset}px)` : "translateY(36px)" }}>{children}</div>;
}

function Brand() {
  return <a className="brand" href="#hero" aria-label="Vyxel home">
    <img src="/vyxel_logo_2.svg" alt="Logo" style={{ height: "70px", width: "auto" }} />
  </a>;
}

function Button({ children, href = "#pricing", secondary = false, onClick }) {
  const props = { className: `button ${secondary ? "button-secondary" : ""}`, href, onClick };
  return href ? <a {...props}>{children}</a> : <button {...props}>{children}</button>;
}

function DashboardMockup() {
  return <div className="dashboard-wrap">
    <div className="dashboard-shell">
      <div className="dashboard-top"><span className="dash-brand"><span className="mini-mark" />Vyxel</span><strong>Dashboard overview</strong><span className="dash-user">Michelle F.</span></div>
      <div className="dashboard-body">
        <aside className="dashboard-sidebar"><span className="search-bar" />{["Overview", "Notifications", "Calendar", "Analytics", "Product", "Order", "Report"].map((item, i) => <span className={i === 0 ? "active" : ""} key={item}>{item}</span>)}</aside>
        <div className="dashboard-content"><div className="dash-card chart-card"><div className="dash-card-head"><span>Product Statistic</span><b>⋯</b></div><div className="line-chart"><i /><i /><i /><i /><i /></div></div><div className="dash-card orange-stat"><span>Product performance</span><b>95.6%</b><small>Overall Performance Score</small><p>Great product performance overall and increased by 30%.</p></div><div className="dash-card gauge-card"><span>Product Monitored</span><strong>80%</strong><small>Good progress</small></div><div className="dash-card bars-card"><span>Sales Analytics</span><div className="bar-chart">{[36, 58, 47, 72, 52, 88, 63].map((height, i) => <i style={{ height: `${height}%` }} key={i} />)}</div></div></div>
      </div>
    </div>
    <div className="review-card"><span>★★★★★</span><strong>Over 100+ 5 star reviews</strong></div>
    <div className="score-card"><small>Student performance</small><b>92.6%</b><span>Overall Conversion Score</span><p>Your admissions performance is strong and increased by 60% from last month.</p><div className="score-line" /></div>
  </div>;
}

function VideoModal({ onClose }) {
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Vyxel product demo" onClick={onClose}><div className="video-modal" onClick={(event) => event.stopPropagation()}><button className="icon-button modal-close" onClick={onClose} aria-label="Close video"><CloseIcon /></button><div className="video-placeholder"><PlayIcon size={66} /></div><h2>Vyxel product demo</h2><p>See how modern study abroad teams turn student relationships into sustainable growth.</p></div></div>;
}

export default function VyxelLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const scrollToId = (id) => { setMobileMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return <div className="vyxel-page">
    <header className="nav-shell"><div className="nav-inner"><Brand /><nav className={`nav-links ${mobileMenuOpen ? "is-open" : ""}`}><button onClick={() => scrollToId("features")}>Features</button><button onClick={() => scrollToId("pricing")}>Pricing</button><button onClick={() => scrollToId("faq")}>FAQ</button></nav><div className="nav-actions"><Button href="#pricing">Book Demo</Button></div><button className="menu-toggle" onClick={() => setMobileMenuOpen((value) => !value)} aria-label="Toggle menu">{mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}</button></div></header>

    <main>
      <section id="hero" className="hero section-grid"><Reveal><div className="eyebrow"><span className="eyebrow-dot" />Study Abroad Intelligence</div><h1>The <em>CRM</em> foundation<br />built for growth.</h1><p className="hero-copy">Vyxel provides the permanent home for your student leads, workflows, and consultancy growth—evolving as you do, and built to last.</p><div className="hero-actions"><Button href="#pricing">Get started for free</Button><button className="button button-secondary" onClick={() => setVideoOpen(true)}><PlayIcon />View insights</button></div><div className="trust-row"><span>Trusted by 500+ consultancies</span><div className="trust-logos"><b>Admissions</b><b>Study abroad</b><b>Global teams</b><b>Vyxel</b></div></div></Reveal><DashboardMockup /></section>

      {/* <section className="intro section-grid"><Reveal><div className="eyebrow">Built for the next generation of admissions</div><h2>Reduce complexity.<br /><em>Build stronger connections.</em></h2><p className="section-copy">Vyxel empowers study abroad consultancies to unlock the value of everyday student interactions. Manage relationships, streamline workflows, and deliver consistent experiences across every touchpoint.</p><div className="pill-row"><span><TrendIcon />Track leads</span><span><SparkleIcon />Scale your business</span><span><UsersIcon />24/7 customer support</span></div></Reveal></section> */}

      <section id="features" className="feature-section"><div className="feature-inner"><Reveal><div className="eyebrow light">All-in-one powerful CRM tools</div><h2 className="light-heading">Built for the <em>next generation</em><br />of admissions.</h2><p className="section-copy light-copy">Automate your student recruitment cycle with our specialized toolkit designed for modern consultancies.</p></Reveal><div className="feature-grid">{FEATURES.map((feature, index) => { const FeatureIcon = feature.icon; const spanClass = ["feature-card-span-4", "feature-card-span-2", "feature-card-span-2", "feature-card-span-4", "feature-card-span-3", "feature-card-span-3"][index]; return <Reveal key={feature.title} delay={index * 50} className={spanClass}><div className={`feature-card group ${feature.big ? "feature-card-large" : ""}`}><div className="feature-card-header"><div className="feature-icon"><FeatureIcon /></div><div className="feature-card-heading"><h3>{feature.title}</h3><span className="feature-tag">{feature.tag}</span></div></div><p>{feature.desc}</p></div></Reveal>; })}</div></div></section>
      {/* ---------------------------------------------------------- */}
      {/* Analytics Section - UPDATED WITH CHART DATA */}
      {/* ---------------------------------------------------------- */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-white" id="analytics">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right,#80808012 1px,transparent 1px),linear-gradient(to bottom,#80808012 1px,transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%,#000 70%,transparent 100%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <Reveal direction="left" className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg" style={{ background: "#f8751610" }}>
                <BarChart3 className="w-4 h-4" size={16} style={{ color: "#f87516" }} />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#f87516" }}>
                Analytics
              </span>
            </Reveal>
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-normal tracking-tighter mb-8 leading-[1.1]" style={{ color: "#111827" }}>
                Real-time insights that drive decisions.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: "#4B5563" }}>
                Track performance, identify trends, and optimize your recruitment strategy with data that matters most to your consultancy's growth.
              </p>
            </Reveal>
          </div>

          <Reveal className="mb-20">
            <div class="wrapper">
              <div class="image-hover-wrapper">
                <img src="/new_dashboard.png" alt="Dashboard Interface Preview" width="1" height="1" className="block w-full h-auto rounded-3xl" /></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { title: "Lead Conversion Trends", icon: TrendIcon },
              { title: "Monthly Growth", icon: ChartIcon },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100} className="h-full">
                <div className="group relative h-full p-8 bg-white border border-slate-200 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden rounded-3xl">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle at top right, #f8751608, transparent 70%)" }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div
                        className="p-2 rounded-lg transition-transform duration-500 group-hover:scale-110 text-white"
                        style={{ background: "linear-gradient(135deg, #f87516, #ff9b63)" }}
                      >
                        <item.icon size={25} />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight" style={{ color: "#111827" }}>
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-full h-[300px] flex items-center justify-center text-sm text-slate-300 border border-dashed border-slate-200 rounded-xl">
                      {i === 0 ? <LeadConversionChart /> : <MonthlyGrowthChart />}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 flex justify-center">
            <button className="get-started-btn" role="button">Get Started</button>

          </Reveal>
        </div>
      </section>

      <section id="pricing" className="pricing-section section-grid"><Reveal direction="left" className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg" style={{ background: "#f8751610" }}>
          <BarChart3 className="w-4 h-4" size={16} style={{ color: "#f87516" }} />
        </div>
        <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#f87516" }}>
          PRICING
        </span>
      </Reveal><Reveal><div className="eyebrow">Simple, transparent pricing</div><h2>Simple plans.<br /><em>Built to scale.</em></h2><p className="section-copy">Choose the perfect plan that scales with your business. No hidden fees, cancel anytime.</p></Reveal><div className="pricing-grid">{PRICING_PLANS.map((plan, index) => <Reveal key={plan.name} delay={index * 80} className={`price-card ${plan.badge ? "featured-price" : ""}`}>{plan.badge && <span className="popular">{plan.badge}</span>}<h3>{plan.name}</h3><p>{plan.blurb}</p><div className="price">{plan.price}<small>/month</small></div><Button href="#contact">Get started</Button><ul>{plan.features.map((feature) => <li key={feature}><PriceCheckIcon />{feature}</li>)}</ul></Reveal>)}</div>
        <div className="mt-16 flex flex-col items-center gap-4">
          <button className="group flex items-center gap-2 font-bold transition-all" style={{ color: "var(--primary)" }}>
            Compare all features
            <span className="transition-transform group-hover:translate-x-2">→</span>
          </button>
          <p className="text-xs font-medium uppercase tracking-widest opacity-40">
            Secure checkout powered by Stripe
          </p>
        </div>
      </section>

      <section className="benefits-section section-grid">
        <Reveal direction="left" className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg" style={{ background: "#f8751610" }}>
            <BarChart3 className="w-4 h-4" size={16} style={{ color: "#f87516" }} />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#f87516" }}>
            BENEFITS
          </span>
        </Reveal>
        <Reveal>
          <div className="eyebrow">Everything you need to grow with confidence.</div>
          <h2>Why leading consultancies <em>choose Vyxel.</em></h2>
          <p className="section-copy">Powerful tools, thoughtful automation, and the visibility your team needs to create better student outcomes.</p>
        </Reveal>
        <div className="benefit-grid">{BENEFITS.map((benefit, index) => {
          const BenefitIcon = benefit.icon;
          return <Reveal delay={index * 70} className="benefit-card" key={benefit.title}><div className="benefit-icon"><BenefitIcon /></div><h3>{benefit.title}</h3><p>{benefit.desc}</p><strong>{benefit.stat}</strong></Reveal>;
        })}</div></section>

      <section id="contact" className="cta-section section-grid"><Reveal><div className="eyebrow light">Start your Vyxel journey today</div><h2>Transform your consultancy<br /><em>with Vyxel CRM.</em></h2><p className="section-copy light-copy">Get a personalized walkthrough and discover how Vyxel can revolutionize your lead management, boost conversions, and scale your operations.</p><div className="hero-actions"><Button href="https://vyxel.digi-wire.com/inquiry">Book a Free Demo</Button><Button href="#faq" secondary>Watch demo</Button></div></Reveal><div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center text-sm" style={{ color: "#fff", opacity: 0.95, fontFamily: "'Manrope', sans-serif", fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase", fontSize: "0.78rem" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.75)" }} />
          <span>Start your free trial today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.75)" }} />
          <span>30-day free trial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.75)" }} />
          <span>Cancel anytime</span>
        </div>
      </div></section>

      <section id="faq" className="faq-section section-grid">
        <Reveal direction="up" className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-lg" style={{ background: "#f8751610" }}>
            <BarChart3 className="w-4 h-4" size={16} style={{ color: "#f87516" }} />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#f87516" }}>
            FAQ
          </span>
        </Reveal><div className="faq-intro"><Reveal><div className="eyebrow">Answers, without the fine print.</div><h2>Got questions?<br /><em>We've got answers.</em></h2><p className="section-copy">Everything you need to know - <a href="https://vyxel.digi-wire.com/inquiry">Talk to our team <ArrowIcon /></a></p></Reveal></div><div className="faq-list">{FAQS.map((faq, index) => <Reveal key={faq.q} delay={index * 60} className={`faq-item ${openFaq === index ? "is-open" : ""}`}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{faq.q}</span><span className="faq-plus">+</span></button><div className="faq-answer"><p>{faq.a}</p></div></Reveal>)}</div></section>
    </main>

    <footer className="footer"><div className="footer-inner"><div><img src="/vyxel_logo_black.png" alt="Logo" style={{ height: "70px", width: "auto" }} /><p>AI-powered CRM for consultancies<br />that care about student success.</p><SocialLinks /></div><div className="footer-links">
      <div><b>PRODUCT</b>
        <a href="https://vyxel.digi-wire.com/features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="https://vyxel.digi-wire.com/inquiry">Product</a>
      </div>
      <div><b>LEGAL</b>
        <a href="https://vyxel.digi-wire.com/privacy">Privacy Policy</a>
        <a href="https://vyxel.digi-wire.com/terms">Terms Of Service</a>
        <a href="https://vyxel.digi-wire.com/refund">Refund Policy</a></div></div></div><div className="footer-bottom"><span>© 2026 Vyxel. All Rights Reserved.</span><span>Built for modern admissions teams.</span></div></footer>
    {videoOpen && <VideoModal onClose={() => setVideoOpen(false)} />}
  </div>;
}
