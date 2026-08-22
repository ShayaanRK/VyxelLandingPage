import { useEffect, useRef, useState } from "react";
import { LeadConversionChart, MonthlyGrowthChart } from "./AnalyticsCharts";

/* ------------------------------------------------------------------ */
/* Icons (inlined so this component has zero external icon dependency) */
/* ------------------------------------------------------------------ */

const iconBase = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
};

const IconMenu = (props) => (
    <svg {...iconBase} width={props.size ?? 20} height={props.size ?? 20} className={props.className}>
        <path d="M4 5h16" />
        <path d="M4 12h16" />
        <path d="M4 19h16" />
    </svg>
);

const IconX = (props) => (
    <svg {...iconBase} width={props.size ?? 24} height={props.size ?? 24} className={props.className}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
);

const IconPlay = (props) => (
    <svg {...iconBase} width={props.size ?? 24} height={props.size ?? 24} className={props.className}>
        <path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" />
        <circle cx="12" cy="12" r="10" />
    </svg>
);

const IconZap = (props) => (
    <svg {...iconBase} width={props.size ?? 16} height={props.size ?? 16} className={props.className}>
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
);

const IconSparkles = (props) => (
    <svg {...iconBase} width={props.size ?? 28} height={props.size ?? 28} strokeWidth={1.5} className={props.className}>
        <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
        <path d="M20 2v4" />
        <path d="M22 4h-4" />
        <circle cx="4" cy="20" r="2" />
    </svg>
);

const IconUsers = (props) => (
    <svg {...iconBase} width={props.size ?? 28} height={props.size ?? 28} strokeWidth={props.thin ? 1.5 : 2} className={props.className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <circle cx="9" cy="7" r="4" />
    </svg>
);

const IconPhone = (props) => (
    <svg {...iconBase} width={props.size ?? 28} height={props.size ?? 28} strokeWidth={1.5} className={props.className}>
        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    </svg>
);

const IconTrendingUp = (props) => (
    <svg {...iconBase} width={props.size ?? 28} height={props.size ?? 28} strokeWidth={props.thin ? 1.5 : 2} className={props.className}>
        <path d="M16 7h6v6" />
        <path d="m22 7-8.5 8.5-5-5L2 17" />
    </svg>
);

const IconMail = (props) => (
    <svg {...iconBase} width={props.size ?? 28} height={props.size ?? 28} strokeWidth={1.5} className={props.className}>
        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
);

const IconChartColumn = (props) => (
    <svg {...iconBase} width={props.size ?? 28} height={props.size ?? 28} strokeWidth={props.thin ? 1.5 : 2} className={props.className}>
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
    </svg>
);

const IconCrown = (props) => (
    <svg {...iconBase} width={props.size ?? 16} height={props.size ?? 16} className={props.className}>
        <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
        <path d="M5 21h14" />
    </svg>
);

const IconCheck = (props) => (
    <svg {...iconBase} width={props.size ?? 20} height={props.size ?? 20} className={props.className}>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const IconStar = (props) => (
    <svg {...iconBase} width={props.size ?? 16} height={props.size ?? 16} className={props.className}>
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
);

const IconTarget = (props) => (
    <svg {...iconBase} width={props.size ?? 32} height={props.size ?? 32} className={props.className}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

const IconShield = (props) => (
    <svg {...iconBase} width={props.size ?? 32} height={props.size ?? 32} className={props.className}>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
);

const IconArrowRight = (props) => (
    <svg {...iconBase} width={props.size ?? 20} height={props.size ?? 20} className={props.className}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

const IconChevronDown = (props) => (
    <svg {...iconBase} width={props.size ?? 16} height={props.size ?? 16} className={props.className}>
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const IconHelpCircle = (props) => (
    <svg {...iconBase} width={props.size ?? 16} height={props.size ?? 16} className={props.className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
    </svg>
);

const IconFacebook = (props) => (
    <svg {...iconBase} width={props.size ?? 16} height={props.size ?? 16} className={props.className}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const IconLinkedin = (props) => (
    <svg {...iconBase} width={props.size ?? 16} height={props.size ?? 16} className={props.className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const IconInstagram = (props) => (
    <svg {...iconBase} width={props.size ?? 16} height={props.size ?? 16} className={props.className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

/* ------------------------------------------------------------------ */
/* Scroll-reveal helper — mirrors the original page's fade/slide-in    */
/* ------------------------------------------------------------------ */

function Reveal({ children, className = "", direction = "up", delay = 0, as: Tag = "div" }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const hiddenTransform =
        direction === "up"
            ? "translateY(40px)"
            : direction === "left"
                ? "translateX(-30px)"
                : direction === "none"
                    ? "none"
                    : "translateY(20px)";

    return (
        <Tag
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : hiddenTransform,
                transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
            }}
        >
            {children}
        </Tag>
    );
}

/* ------------------------------------------------------------------ */
/* Static content                                                      */
/* ------------------------------------------------------------------ */

const FEATURES = [
    {
        span: "md:col-span-2",
        icon: IconSparkles,
        title: "AI Lead Scoring",
        tag: "AI-Powered",
        desc: "Identify high-intent students instantly using predictive behavioral modeling with 95% accuracy.",
        glow: true,
    },
    {
        span: "md:col-span-2",
        icon: IconUsers,
        title: "Lead Management",
        tag: "Centralized",
        desc: "Centralize inquiries in a searchable database with smart routing.",
        glow: false,
    },
    {
        span: "md:col-span-2",
        icon: IconPhone,
        title: "Call Intelligence",
        tag: "Analytics",
        desc: "Auto-transcribe and analyze counselor interactions in real-time.",
        glow: false,
    },
    {
        span: "md:col-span-4",
        icon: IconTrendingUp,
        title: "Pipeline Tracking",
        tag: "Visual Funnel",
        desc: "A bird's-eye view of the student journey from first click to successful enrollment.",
        glow: true,
    },
    {
        span: "md:col-span-3",
        icon: IconMail,
        title: "Unified Comms",
        tag: "Omnichannel",
        desc: "Manage Email, SMS, and WhatsApp threads within a single interface.",
        glow: true,
    },
    {
        span: "md:col-span-3",
        icon: IconChartColumn,
        title: "Real-time Analytics",
        tag: "Forecasting",
        desc: "Track conversion rates and team performance with dynamic dashboards.",
        glow: true,
    },
];

const PRICING_PLANS = [
    {
        name: "Starter",
        blurb: "Perfect for small consultancies",
        price: "$59",
        highlighted: false,
        features: [
            "3 users included",
            "Lead management",
            "Student pipeline",
            "Follow-up reminders",
            "Document management",
            "Mobile app",
            "Extra users @ $12/user/month",
        ],
    },
    {
        name: "Growth",
        blurb: "For growing agencies",
        price: "$119",
        highlighted: true,
        badge: "Most Popular",
        features: [
            "10 users included",
            "Call logging",
            "Call recording",
            "WhatsApp integration",
            "Counselor dashboards",
            "Extra users @ $10/user/month",
        ],
    },
    {
        name: "Elite",
        blurb: "For large agencies",
        price: "$239",
        highlighted: false,
        features: [
            "25 users included",
            "AI call summaries",
            "AI lead scoring",
            "Automation workflows",
            "Advanced analytics",
            "Multi-branch support",
            "Extra users @ $9/user/month",
        ],
    },
];

const BENEFITS = [
    {
        icon: IconTarget,
        title: "Higher Conversions",
        desc: "Boost application completion by 35% with intelligent automation",
        stat: "+35% completion",
    },
    {
        icon: IconUsers,
        title: "Team Accountability",
        desc: "Track counselor performance metrics and optimize team productivity",
        stat: "Real-time tracking",
    },
    {
        icon: IconTrendingUp,
        title: "Scale Easily",
        desc: "Handle thousands of students without compromising on quality",
        stat: "Unlimited scale",
    },
    {
        icon: IconShield,
        title: "Secure & Compliant",
        desc: "Enterprise-grade security with GDPR and data protection compliance",
        stat: "SOC 2 certified",
    },
];

const FAQS = [
    {
        q: "How quickly can we get started?",
        a: "Most teams are up and running the same day. Import your existing leads, invite your counsellors, and your branches are ready to go.",
    },
    {
        q: "Can Vyxel integrate with our existing systems?",
        a: "Yes — Vyxel connects with your email provider, WhatsApp Business, and calendar tools, and supports CSV import/export for everything else.",
    },
    {
        q: "What support do you provide?",
        a: "Every plan includes onboarding support and email support, with priority support and a dedicated account manager on higher tiers.",
    },
    {
        q: "Is our data secure?",
        a: "Yes. Vyxel is SOC 2 certified and built with role-based access control, encryption in transit and at rest, and full GDPR compliance.",
    },
    {
        q: "Do you offer a free trial?",
        a: "Yes — every plan includes a 30-day free trial, no credit card required, and you can cancel anytime.",
    },
];

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function VyxelLandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const scrollToId = (id) => {
        setMobileMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="bg-white text-[#111827] overflow-x-hidden font-sans">
            {/* ---------------------------------------------------------- */}
            {/* Nav                                                        */}
            {/* ---------------------------------------------------------- */}
            <nav className="fixed top-6 left-0 right-0 z-[100] px-6">
                <div className="max-w-7xl mx-auto px-6 rounded-3xl border border-white/40 shadow-lg py-4 bg-white/30 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)]">
                    <div className="flex justify-between items-center h-6">
                        <button className="flex items-center gap-2.5 group cursor-pointer" onClick={() => scrollToId("hero")}>
                            <img src="/vyxel_logo.png" alt="Vyxel" className="h-10 w-auto transition-all duration-300 group-hover:scale-105" />
                        </button>

                        <div className="hidden md:flex items-center gap-10">
                            <button
                                className="text-xs font-medium text-[#1A202C]/60 hover:text-[#1A202C] transition-colors tracking-wide cursor-pointer"
                                onClick={() => scrollToId("features")}
                            >
                                Features
                            </button>
                            <button
                                className="text-xs font-medium text-[#1A202C]/60 hover:text-[#1A202C] transition-colors tracking-wide cursor-pointer"
                                onClick={() => scrollToId("pricing")}
                            >
                                Pricing
                            </button>
                            <button
                                className="text-xs font-medium text-[#1A202C]/60 hover:text-[#1A202C] transition-colors tracking-wide cursor-pointer"
                                onClick={() => scrollToId("faq")}
                            >
                                FAQ
                            </button>
                            <button
                                className="inline-flex items-center justify-center gap-2 px-6 rounded-full text-xs font-semibold h-9 shadow-sm transition-all hover:shadow-md hover:brightness-110 active:scale-95 cursor-pointer"
                                style={{ backgroundColor: "#2779F0", color: "#FFFFFF" }}
                            >
                                Book Demo
                            </button>
                        </div>

                        <button
                            className="md:hidden p-2 text-[#1A202C] opacity-70 hover:opacity-100 cursor-pointer"
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <IconX /> : <IconMenu />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden flex flex-col items-start gap-4 pt-4 mt-4 border-t border-white/40">
                            <button className="text-sm font-medium text-[#1A202C]/70" onClick={() => scrollToId("features")}>
                                Features
                            </button>
                            <button className="text-sm font-medium text-[#1A202C]/70" onClick={() => scrollToId("pricing")}>
                                Pricing
                            </button>
                            <button className="text-sm font-medium text-[#1A202C]/70" onClick={() => scrollToId("faq")}>
                                FAQ
                            </button>
                            <button
                                className="w-full text-center px-6 py-2 rounded-full text-xs font-semibold shadow-sm"
                                style={{ backgroundColor: "#2779F0", color: "#FFFFFF" }}
                            >
                                Book Demo
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* ---------------------------------------------------------- */}
            {/* Hero                                                       */}
            {/* ---------------------------------------------------------- */}
            <section id="hero" className="relative min-h-[85vh] flex flex-col items-center justify-center bg-white px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8 mt-30">
                    <Reveal direction="none" as="div" className="inline-block px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        Study Abroad Intelligence
                    </Reveal>

                    <Reveal delay={80}>
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.05]" style={{ color: "#111827" }}>
                            The{" "}
                            <span
                                className="font-bold bg-gradient-to-r bg-clip-text text-transparent"
                                style={{ backgroundImage: "linear-gradient(to right, #2779F0, #4DDCE2)" }}
                            >
                                CRM
                            </span>{" "}
                            foundation <br />
                            <span style={{ color: "#2AA8F3" }}>built for growth.</span>
                        </h1>
                    </Reveal>

                    <Reveal delay={160}>
                        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
                            Vyxel provides the permanent home for your student leads, workflows, and consultancy growth—evolving as
                            you do, and built to last.
                        </p>
                    </Reveal>

                    <Reveal delay={240} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <button
                            onClick={() => setVideoOpen(true)}
                            className="w-full sm:w-auto h-14 px-8 text-base font-medium rounded-xl border border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group justify-center"
                            style={{ color: "#111827", borderColor: "#B0E2F640" }}
                        >
                            <IconPlay size={20} className="opacity-60 group-hover:opacity-100 transition-all duration-300" />
                            <span>View Insights</span>
                        </button>
                        <button
                            className="w-full sm:w-auto h-14 px-8 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                            style={{ backgroundColor: "#2779F0", color: "#fff" }}
                        >
                            Get Started for Free
                        </button>
                    </Reveal>

                    <Reveal delay={320}>
                        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-[0.2em] pt-12">
                            Trusted by 500+ Consultancies
                        </p>
                    </Reveal>
                </div>

                <Reveal delay={200} className="max-w-6xl mx-auto mt-16 px-6">
                    <img src="/blobs.png" alt="Vyxel CRM Dashboard Mockup" className="w-full h-auto" />
                </Reveal>

                {/* Video modal */}
                {videoOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
                        <button
                            onClick={() => setVideoOpen(false)}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full"
                            aria-label="Close video"
                        >
                            <IconX />
                        </button>
                        <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
                            <video
                                src="/Vyxel Screen 1.mp4"
                                className="w-full h-full object-cover bg-black"
                                controls
                                controlsList="nodownload"
                                disablePictureInPicture
                                playsInline
                                autoPlay
                            />
                        </div>
                    </div>
                )}
            </section>

            {/* ---------------------------------------------------------- */}
            {/* Features                                                   */}
            {/* ---------------------------------------------------------- */}
            <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#FDFDFD" }} id="features">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right,#0D649308 1px,transparent 1px),linear-gradient(to bottom,#0D649308 1px,transparent 1px)",
                        backgroundSize: "40px 40px",
                        maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%,#000 70%,transparent 100%)",
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-20">
                        <Reveal direction="left" className="flex items-center gap-2 mb-6">
                            <div className="p-1.5 rounded-md shadow-sm bg-white border border-slate-200">
                                <IconZap className="w-4 h-4" style={{ color: "#2779F0" }} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#2779F0" }}>
                                Features
                            </span>
                        </Reveal>
                        <Reveal>
                            <h2 className="text-4xl md:text-6xl font-normal tracking-tighter leading-[1.1] mb-6" style={{ color: "#111827" }}>
                                Built for the next generation of admissions.
                            </h2>
                        </Reveal>
                        <Reveal delay={80}>
                            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "#4B5563" }}>
                                Automate your student recruitment cycle with our specialized toolkit designed for modern consultancies.
                            </p>
                        </Reveal>
                    </div>

                    <div className="feature-grid">
                        {FEATURES.map((f, i) => {
                            const Icon = f.icon;
                            const spanClass = ["feature-card-span-4", "feature-card-span-2", "feature-card-span-2", "feature-card-span-4", "feature-card-span-4", "feature-card-span-2"][i];
                            return (
                                <Reveal key={f.title} delay={i * 60}>
                                    <div className={`feature-card group ${spanClass}`}>
                                        <div className="feature-icon">
                                            <Icon />
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3>{f.title}</h3>
                                            <span className="feature-tag">{f.tag}</span>
                                        </div>
                                        <p>{f.desc}</p>
                                        {f.glow && <div className="feature-glow" />}
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* Analytics                                                  */}
            {/* ---------------------------------------------------------- */}
            <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#FDFDFD" }} id="analytics">
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
                            <div className="p-2 rounded-lg" style={{ background: "#2779F010" }}>
                                <IconChartColumn className="w-4 h-4" size={16} style={{ color: "#2779F0" }} />
                            </div>
                            <span
                                className="text-xs font-bold uppercase tracking-[0.2em]"
                                style={{ color: "#2779F0" }}
                            >
                                Analytics
                            </span>
                        </Reveal>
                        <Reveal>
                            <h2
                                className="text-4xl md:text-6xl font-normal tracking-tighter leading-[1.1] mb-6"
                                style={{ color: "#111827" }}
                            >
                                Real-time insights that drive decisions.
                            </h2>
                        </Reveal>
                        <Reveal delay={80}>
                            <p
                                className="text-lg leading-relaxed max-w-2xl"
                                style={{ color: "#4B5563" }}
                            >
                                Track performance, identify trends, and optimize your recruitment strategy with data that matters
                                most to your consultancy&apos;s growth.
                            </p>
                        </Reveal>
                    </div>

                    <Reveal className="mb-20">
                        <div className="analytics-dashboard-preview relative overflow-hidden border-0 shadow-2xl rounded-3xl bg-slate-100 inline-block">
                            <img
                                src="public/dashboard-preview.png"
                                alt="Dashboard Interface Preview"
                                width="1200"
                                height="675"
                                className="block w-full h-auto rounded-3xl"
                            />
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {["Lead Conversion Trends", "Monthly Growth"].map((title, i) => {
                            const Icon = i === 0 ? IconTrendingUp : IconChartColumn;
                            return (
                                <Reveal key={title} delay={i * 100} className="h-full">
                                    <div className="analytics-chart-card group relative h-full p-8 bg-white border border-slate-200 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden rounded-3xl">
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{ background: "radial-gradient(circle at top right, #2779F008, transparent 70%)" }}
                                        />
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div
                                                    className="p-2 rounded-lg transition-transform duration-500 group-hover:scale-110 text-white"
                                                    style={{ background: "linear-gradient(135deg, #2779F0, #2AA8F3)" }}
                                                >
                                                    <Icon size={20} />
                                                </div>
                                                <h3 className="text-xl font-bold tracking-tight" style={{ color: "#111827" }}>
                                                    {title}
                                                </h3>
                                            </div>
                                            {i === 0 ? <LeadConversionChart /> : <MonthlyGrowthChart />}
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>

                    <Reveal className="mt-16 flex justify-center">
                        <button className="group flex items-center gap-2 font-bold transition-all" style={{ color: "#2779F0" }}>
                            Get Started
                            <span className="transition-transform group-hover:translate-x-2">→</span>
                        </button>
                    </Reveal>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* Pricing                                                    */}
            {/* ---------------------------------------------------------- */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-white" id="pricing">
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
                            <div className="p-2 rounded-lg" style={{ background: "#2779F010" }}>
                                <IconCrown size={16} style={{ color: "#2779F0" }} />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#2779F0" }}>
                                Pricing
                            </span>
                        </Reveal>
                        <Reveal>
                            <h2 className="text-4xl md:text-6xl font-normal tracking-tighter mb-8 leading-[1.1]" style={{ color: "#111827" }}>
                                Simple pricing for growing consultancies.
                            </h2>
                        </Reveal>
                        <Reveal delay={80}>
                            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "#4B5563" }}>
                                Choose the perfect plan that scales with your business. No hidden fees, cancel anytime.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {PRICING_PLANS.map((plan, i) => (
                            <Reveal key={plan.name} delay={i * 100} className="h-full">
                                <div
                                    className={`group relative h-full p-8 transition-all duration-500 overflow-hidden rounded-3xl flex flex-col ${plan.highlighted
                                        ? "border-2 shadow-2xl md:scale-105 z-10"
                                        : "border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-xl"
                                        }`}
                                    style={plan.highlighted ? { borderColor: "#2779F0" } : undefined}
                                >
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{ background: "radial-gradient(circle at top right, #2779F008, transparent 70%)" }}
                                    />
                                    {plan.badge && (
                                        <div
                                            className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-bold uppercase tracking-widest text-white shadow-lg"
                                            style={{ background: "linear-gradient(to right, #2779F0, #2AA8F3)" }}
                                        >
                                            {plan.badge}
                                        </div>
                                    )}
                                    <div className="relative z-10 flex flex-col h-full">
                                        <h3 className="text-2xl font-bold mb-2 tracking-tight" style={{ color: "#111827" }}>
                                            {plan.name}
                                        </h3>
                                        <p className="text-sm mb-6 leading-relaxed" style={{ color: "#4B5563" }}>
                                            {plan.blurb}
                                        </p>
                                        <div className="mb-8 flex items-baseline gap-1">
                                            <span className="text-5xl font-bold tracking-tight" style={{ color: "#111827" }}>
                                                {plan.price}
                                            </span>
                                            <span className="text-sm font-medium" style={{ color: "#4B5563" }}>
                                                /month
                                            </span>
                                        </div>
                                        <button
                                            className={`w-full mb-8 h-12 rounded-xl font-bold transition-all duration-300 ${plan.highlighted
                                                ? "text-white shadow-md hover:shadow-xl hover:-translate-y-0.5"
                                                : "border-2 hover:bg-slate-50"
                                                }`}
                                            style={
                                                plan.highlighted
                                                    ? { background: "linear-gradient(135deg, #2779F0, #2AA8F3)", border: "none" }
                                                    : { borderColor: "#2779F030", color: "#2779F0", backgroundColor: "transparent" }
                                            }
                                        >
                                            Get Started
                                        </button>
                                        <ul className="space-y-4 mt-auto">
                                            {plan.features.map((feat) => (
                                                <li key={feat} className="flex items-center gap-3">
                                                    <IconCheck
                                                        size={20}
                                                        className="flex-shrink-0"
                                                        style={{ color: plan.highlighted ? "#2779F0" : "#2779F060" }}
                                                    />
                                                    <span className="text-sm font-medium" style={{ color: "#111827" }}>
                                                        {feat}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="mt-16 flex flex-col items-center gap-4">
                        <button className="group flex items-center gap-2 font-bold transition-all" style={{ color: "#2779F0" }}>
                            Compare all features
                            <span className="transition-transform group-hover:translate-x-2">→</span>
                        </button>
                        <p className="text-xs font-medium uppercase tracking-widest opacity-40">Secure checkout powered by Stripe</p>
                    </Reveal>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* Benefits                                                   */}
            {/* ---------------------------------------------------------- */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-white" id="benefits">
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
                            <div className="p-2 rounded-lg" style={{ background: "#2779F010" }}>
                                <IconStar size={16} style={{ color: "#2779F0" }} />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#2779F0" }}>
                                Benefits
                            </span>
                        </Reveal>
                        <Reveal>
                            <h2 className="text-4xl md:text-6xl font-normal tracking-tighter mb-8 leading-[1.1]" style={{ color: "#111827" }}>
                                Why leading consultancies choose Vyxel.
                            </h2>
                        </Reveal>
                        <Reveal delay={80}>
                            <p className="text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: "#4B5563" }}>
                                Experience the platform that transforms how consultancies manage student relationships and drive
                                growth.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {BENEFITS.map((b, i) => {
                            const Icon = b.icon;
                            return (
                                <Reveal key={b.title} delay={i * 80} className="h-full">
                                    <div className="group relative h-full p-8 bg-white border border-slate-200 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden rounded-3xl text-center flex flex-col items-center">
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{ background: "radial-gradient(circle at center, #2779F008, transparent 70%)" }}
                                        />
                                        <div className="relative z-10 flex flex-col items-center h-full">
                                            <div
                                                className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl transition-transform duration-500 group-hover:scale-110 shadow-sm text-white"
                                                style={{ background: "linear-gradient(135deg, #2779F0, #2AA8F3)" }}
                                            >
                                                <Icon />
                                            </div>
                                            <h3 className="text-xl font-bold mb-4 tracking-tight" style={{ color: "#111827" }}>
                                                {b.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed mb-8" style={{ color: "#4B5563" }}>
                                                {b.desc}
                                            </p>
                                            <div className="mt-auto">
                                                <span
                                                    className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                                    style={{ background: "#2779F010", color: "#2779F0", border: "1px solid #2779F020" }}
                                                >
                                                    {b.stat}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>

                    <Reveal className="mt-16 flex justify-center">
                        <button className="group flex items-center gap-2 font-bold transition-all hover:gap-4" style={{ color: "#2779F0" }}>
                            See success stories
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </Reveal>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* Final CTA                                                  */}
            {/* ---------------------------------------------------------- */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/20" id="cta">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
                        style={{ background: "radial-gradient(circle, #2779F015, #2AA8F310)" }}
                    />
                    <div
                        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
                        style={{ background: "radial-gradient(circle, #2AA8F315, #2779F010)" }}
                    />
                </div>
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right,#80808012 1px,transparent 1px),linear-gradient(to bottom,#80808012 1px,transparent 1px)",
                        backgroundSize: "40px 40px",
                        maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%,#000 70%,transparent 100%)",
                    }}
                />
                <div className="relative max-w-5xl mx-auto px-6 text-center">
                    <Reveal className="mb-12">
                        <h2 className="text-4xl md:text-6xl font-normal tracking-tighter mb-8 leading-[1.1]" style={{ color: "#111827" }}>
                            Ready to transform your consultancy?
                        </h2>
                        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: "#4B5563" }}>
                            Get a personalized walkthrough and discover how Vyxel can revolutionize your lead management, boost
                            conversions, and scale your operations.
                        </p>
                    </Reveal>

                    <Reveal delay={100} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button
                            className="group h-14 px-10 rounded-xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-2"
                            style={{ background: "linear-gradient(to right, #2779F0, #2AA8F3)" }}
                        >
                            Book a Free Demo
                            <IconArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                        <button
                            onClick={() => setVideoOpen(true)}
                            className="group h-14 px-10 rounded-xl font-semibold border-2 transition-all duration-300 hover:bg-white hover:shadow-lg inline-flex items-center justify-center gap-2"
                            style={{ borderColor: "#2779F0", color: "#2779F0" }}
                        >
                            <IconPlay size={20} />
                            Watch Demo
                        </button>
                    </Reveal>

                    <Reveal delay={180} className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center text-sm" >
                        <div style={{ color: "#4B5563" }} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#2779F0" }} />
                            <span>Start your free trial today</span>
                        </div>
                        <div style={{ color: "#4B5563" }} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#2779F0" }} />
                            <span>30-day free trial</span>
                        </div>
                        <div style={{ color: "#4B5563" }} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#2779F0" }} />
                            <span>Cancel anytime</span>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* FAQ                                                        */}
            {/* ---------------------------------------------------------- */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-white" id="faq">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right,#80808012 1px,transparent 1px),linear-gradient(to bottom,#80808012 1px,transparent 1px)",
                        backgroundSize: "40px 40px",
                        maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%,#000 70%,transparent 100%)",
                    }}
                />
                <div className="relative max-w-4xl mx-auto px-6">
                    <div className="max-w-3xl mb-20">
                        <Reveal direction="left" className="flex items-center gap-2 mb-6">
                            <div className="p-2 rounded-lg" style={{ background: "#2779F010" }}>
                                <IconHelpCircle size={16} style={{ color: "#2779F0" }} />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#2779F0" }}>
                                FAQ
                            </span>
                        </Reveal>
                        <Reveal>
                            <h2 className="text-4xl md:text-6xl font-normal tracking-tighter mb-8 leading-[1.1]" style={{ color: "#111827" }}>
                                Got questions? We&apos;ve got answers.
                            </h2>
                        </Reveal>
                        <Reveal delay={80}>
                            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "#4B5563" }}>
                                Everything you need to know about Vyxel and how it can transform your consultancy.
                            </p>
                        </Reveal>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((item, i) => {
                            const isOpen = openFaq === i;
                            return (
                                <Reveal key={item.q} delay={i * 60}>
                                    <div className="border border-slate-200 rounded-2xl px-8 bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        <h3 className="flex">
                                            <button
                                                type="button"
                                                aria-expanded={isOpen}
                                                onClick={() => setOpenFaq(isOpen ? null : i)}
                                                className="flex flex-1 items-center justify-between gap-4 text-left outline-none text-base font-semibold py-6 transition-colors duration-300"
                                                style={{ color: "#111827" }}
                                            >
                                                {item.q}
                                                <IconChevronDown
                                                    className="shrink-0 transition-transform duration-200"
                                                    style={{ transform: isOpen ? "rotate(180deg)" : "none", color: "#94a3b8" }}
                                                />
                                            </button>
                                        </h3>
                                        {isOpen && (
                                            <div className="pb-6 text-sm leading-relaxed" style={{ color: "#4B5563" }}>
                                                {item.a}
                                            </div>
                                        )}
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>

                    <Reveal className="mt-16 flex justify-center">
                        <button className="flex items-center gap-2 font-bold transition-all hover:gap-4" style={{ color: "#2779F0" }}>
                            Still have questions? Contact us →
                        </button>
                    </Reveal>
                </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* Footer                                                     */}
            {/* ---------------------------------------------------------- */}
            <footer className="relative py-12 md:py-14 overflow-hidden" style={{ backgroundColor: "#e0e0e0" }}>
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 mb-16">
                        <div>
                            <div className="mb-6">
                                <img src="/vyxel_logo.png" alt="Vyxel" className="h-10 w-auto" />
                            </div>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: "#4B5563" }}>
                                AI-powered CRM transforming how study abroad consultancies manage student relationships and drive
                                growth.
                            </p>
                            <div className="flex gap-3">
                                <a
                                    href="https://www.facebook.com/digiwireglobal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg border transition-all duration-300 hover:scale-110 hover:bg-white/10"
                                    style={{ borderColor: "rgba(39, 121, 240, 0.2)", color: "#4B5563" }}
                                >
                                    <IconFacebook />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/digi-wire/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg border transition-all duration-300 hover:scale-110 hover:bg-white/10"
                                    style={{ borderColor: "rgba(39, 121, 240, 0.2)", color: "#4B5563" }}
                                >
                                    <IconLinkedin />
                                </a>
                                <a
                                    href="https://www.instagram.com/digiwireglobal/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg border transition-all duration-300 hover:scale-110 hover:bg-white/10"
                                    style={{ borderColor: "rgba(39, 121, 240, 0.2)", color: "#4B5563" }}
                                >
                                    <IconInstagram />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: "#111827" }}>
                                Product
                            </h4>
                            <ul className="space-y-4">
                                <li>
                                    <a href="/features" className="text-sm transition-colors duration-300 hover:opacity-80" style={{ color: "#4B5563" }}>
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="/pricing" className="text-sm transition-colors duration-300 hover:opacity-80" style={{ color: "#4B5563" }}>
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="/inquiry" className="text-sm transition-colors duration-300 hover:opacity-80" style={{ color: "#4B5563" }}>
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: "#111827" }}>
                                Legal
                            </h4>
                            <ul className="space-y-4">
                                <li>
                                    <a href="/privacy" className="text-sm transition-colors duration-300 hover:opacity-80" style={{ color: "#4B5563" }}>
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="/terms" className="text-sm transition-colors duration-300 hover:opacity-80" style={{ color: "#4B5563" }}>
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="/refund" className="text-sm transition-colors duration-300 hover:opacity-80" style={{ color: "#4B5563" }}>
                                        Refund Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t" style={{ borderColor: "rgba(39, 121, 240, 0.15)" }}>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm" style={{ color: "#4B5563" }}>
                                © 2024 Vyxel CRM. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}