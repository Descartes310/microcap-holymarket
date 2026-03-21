import React, { useState, useEffect, useRef } from "react";
import AppConfig from 'Constants/AppConfig';
import { Link } from 'react-router-dom';
import {HOME} from "Url/frontendUrl";

/* ── GLOBAL STYLES ───────────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    --gold:       #d5ae05;
    --gold-deep:  #9B6110;
    --gold-light: #F0A830;
    --gold-pale:  #FDE68A;
    --gold-wash:  #FEF3C7;
    --gold-mist:  #FFFBF0;
    --white:      #FFFFFF;
    --ink:        #1C1409;
    --ink-2:      #3D2E10;
    --ink-3:      #6B5230;
    --muted:      #9C8660;
    --border:     rgba(196,127,23,.18);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--white);
    color: var(--ink);
    overflow-x: hidden;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(26px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:.4; transform:scale(.7); }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }

  .fadeUp    { animation: fadeUp .65s ease both; }
  .d1 { animation-delay:.05s; }
  .d2 { animation-delay:.15s; }
  .d3 { animation-delay:.25s; }
  .d4 { animation-delay:.38s; }
  .d5 { animation-delay:.50s; }
`;

/* ── SCROLL REVEAL HOOK ──────────────────────────────────────────── */
function useReveal(threshold = 0.14) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

/* ── SHARED TOKENS ───────────────────────────────────────────────── */
const labelStyle = {
    fontSize: ".7rem", fontWeight: 700, letterSpacing: ".18em",
    textTransform: "uppercase", color: "var(--gold)", marginBottom: 14,
    display: "block",
};
const h2Style = {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.9rem,3.2vw,2.9rem)", fontWeight: 900, lineHeight: 1.13,
    color: "var(--ink)", marginBottom: 20,
};
const subtitleStyle = {
    fontSize: ".98rem", lineHeight: 1.8,
    color: "var(--ink-3)", maxWidth: 540, fontWeight: 300,
};

/* ── BUTTONS ─────────────────────────────────────────────────────── */
function BtnPrimary({ href, children, style = {} }) {
    const [h, setH] = useState(false);
    return (
        <a href={href}
            onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
            style={{
                background: h ? "var(--gold-deep)" : "var(--gold)",
                color: "#fff", padding: "13px 30px", borderRadius: 3,
                fontWeight: 700, fontSize: ".83rem", letterSpacing: ".06em",
                textTransform: "uppercase", textDecoration: "none",
                transition: "all .22s", display: "inline-block",
                boxShadow: h ? "0 6px 20px rgba(196,127,23,.35)" : "0 2px 8px rgba(196,127,23,.2)",
                transform: h ? "translateY(-2px)" : "none",
                ...style,
            }}>{children}</a>
    );
}
function BtnOutline({ href, children }) {
    const [h, setH] = useState(false);
    return (
        <a href={href}
            onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
            style={{
                background: "transparent",
                color: h ? "var(--gold)" : "var(--ink-2)",
                padding: "13px 30px", borderRadius: 3,
                fontWeight: 600, fontSize: ".83rem", letterSpacing: ".06em",
                textTransform: "uppercase", textDecoration: "none",
                border: `2px solid ${h ? "var(--gold)" : "var(--border)"}`,
                transition: "all .22s", display: "inline-block",
            }}>{children}</a>
    );
}

/* ── NAV ─────────────────────────────────────────────────────────── */
function Nav({ active }) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const links = [
        { id: "vision", label: "Vision" },
        { id: "agir", label: "Agir" },
        { id: "challenge", label: "Challenge" },
        { id: "qui", label: "Qui sommes-nous" },
    ];

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 64px",
            background: scrolled ? "rgba(255,255,255,.96)" : "transparent",
            borderBottom: scrolled ? "1px solid var(--border)" : "none",
            backdropFilter: scrolled ? "blur(10px)" : "none",
            transition: "all .3s",
        }}>
            <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.55rem", fontWeight: 900, color: "var(--gold)",
            }}>
                <Link to={HOME}>
                    <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" />
                </Link>
            </div>

            <ul style={{ listStyle: "none", display: "flex", gap: 32 }}>
                {links.map(l => (
                    <li key={l.id}>
                        <a href={`#${l.id}`} style={{
                            textDecoration: "none",
                            color: active === l.id ? "var(--gold)" : "var(--ink-2)",
                            fontSize: ".82rem", fontWeight: 600, letterSpacing: ".08em",
                            textTransform: "uppercase", transition: "color .2s",
                            borderBottom: active === l.id ? "2px solid var(--gold)" : "2px solid transparent",
                            paddingBottom: 2,
                        }}>{l.label}</a>
                    </li>
                ))}
            </ul>

            <BtnPrimary href="#rejoindre">Rejoindre</BtnPrimary>
        </nav>
    );
}

/* ── HERO ────────────────────────────────────────────────────────── */
function Hero() {
    return (
        <section id="hero" style={{
            minHeight: "100vh",
            background: `
        radial-gradient(ellipse 70% 60% at 80% 40%, rgba(253,230,138,.55) 0%, transparent 65%),
        radial-gradient(ellipse 50% 50% at 20% 80%, rgba(240,168,48,.12) 0%, transparent 60%),
        #FFFDF7
      `,
            display: "grid", gridTemplateColumns: "1fr 1fr",
            position: "relative", overflow: "hidden",
        }}>
            {/* Decorative circles */}
            <div style={{
                position: "absolute", top: "8%", right: "42%",
                width: 320, height: 320, borderRadius: "50%",
                border: "1px solid rgba(196,127,23,.1)", pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", top: "12%", right: "40%",
                width: 200, height: 200, borderRadius: "50%",
                border: "1px solid rgba(196,127,23,.08)", pointerEvents: "none",
            }} />
            {/* Pattern dots */}
            <div style={{
                position: "absolute", bottom: 60, left: 60, opacity: .12,
                backgroundImage: "radial-gradient(var(--gold) 1.5px, transparent 1.5px)",
                backgroundSize: "20px 20px", width: 180, height: 140,
                pointerEvents: "none",
            }} />

            {/* LEFT */}
            <div style={{
                position: "relative", zIndex: 2,
                display: "flex", flexDirection: "column", justifyContent: "center",
                padding: "140px 56px 80px 80px",
            }}>
                <div className="fadeUp d1" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "rgba(196,127,23,.1)", border: "1px solid rgba(196,127,23,.25)",
                    color: "var(--gold-deep)", fontSize: ".7rem", fontWeight: 700,
                    letterSpacing: ".14em", textTransform: "uppercase",
                    padding: "7px 14px", borderRadius: 2, marginBottom: 36, width: "fit-content",
                }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block", animation: "pulse 2s infinite" }} />
                    Finance Solidaire · Diaspora Africaine
                </div>

                <h1 className="fadeUp d2" style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(3rem,5vw,4.6rem)", fontWeight: 900, lineHeight: 1.07,
                    color: "var(--ink)", marginBottom: 26,
                }}>
                    La révolution<br />
                    des petits<br />
                    <span style={{ color: "var(--gold)", fontStyle: "italic" }}>capitaux.</span>
                </h1>

                <p className="fadeUp d3" style={{
                    fontSize: "1.05rem", lineHeight: 1.8, color: "var(--ink-3)",
                    maxWidth: 440, marginBottom: 44, fontWeight: 300,
                }}>
                    MicroCap accompagne, structure, connecte et facilite l'accès aux financements
                    pour les entrepreneurs de la diaspora africaine ici et là-bas. À partir de{" "}
                    <strong style={{ color: "var(--gold)", fontWeight: 700 }}>3€</strong>.
                </p>

                <div className="fadeUp d4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <BtnPrimary href="#rejoindre">Rejoindre le réseau</BtnPrimary>
                    <BtnOutline href="#agir">Découvrir nos solutions</BtnOutline>
                </div>

                {/* mini stats */}
                <div className="fadeUp d5" style={{
                    display: "flex", gap: 36, marginTop: 52,
                    paddingTop: 36, borderTop: "1px solid var(--border)",
                }}>
                    {[["3€", "Placement minimum"], ["100", "PME à financer"], ["3", "ODD soutenus"]].map(([n, l]) => (
                        <div key={n}>
                            <div style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1.9rem", fontWeight: 900, color: "var(--gold)", lineHeight: 1,
                            }}>{n}</div>
                            <div style={{ fontSize: ".75rem", color: "var(--muted)", marginTop: 4, fontWeight: 400 }}>{l}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT — floating card */}
            <div className="fadeUp d5" style={{
                position: "relative", zIndex: 2,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "140px 80px 80px 40px",
            }}>
                <div style={{
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    padding: "40px 36px",
                    width: "100%", maxWidth: 400,
                    boxShadow: "0 24px 64px rgba(196,127,23,.13), 0 4px 16px rgba(0,0,0,.06)",
                    animation: "floatY 5s ease-in-out infinite",
                    position: "relative",
                }}>
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: 4,
                        background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
                        borderRadius: "8px 8px 0 0",
                    }} />

                    <span style={{
                        background: "var(--gold-wash)", color: "var(--gold-deep)",
                        fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em",
                        textTransform: "uppercase", padding: "4px 10px", borderRadius: 2,
                    }}>Pourquoi MicroCap ?</span>

                    <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)",
                        margin: "16px 0 20px", lineHeight: 1.3,
                    }}>
                        La tontine numérisée<br />pour l'entrepreneuriat
                    </h3>

                    <p style={{ fontSize: ".86rem", lineHeight: 1.72, color: "var(--ink-3)", fontWeight: 300, marginBottom: 28 }}>
                        Fondé sur deux pratiques éprouvées le{" "}
                        <strong style={{ fontWeight: 600, color: "var(--ink-2)" }}>codéveloppement</strong> et la{" "}
                        <strong style={{ fontWeight: 600, color: "var(--ink-2)" }}>tontine</strong> MicroCap transforme la force des communautés africaines en levier d'investissement productif.
                    </p>

                    <div style={{ height: 1, background: "var(--border)", margin: "0 0 24px" }} />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" }}>
                        {[
                            { label: "Réseau Nord-Sud" },
                            { label: "Projets sécurisés" },
                            { label: "Tiers de confiance" },
                            { label: "Plateforme SaaS" },
                        ].map(({ icon, label }) => (
                            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{
                                    width: 32, height: 32, borderRadius: 2,
                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".9rem",
                                    flexShrink: 0,
                                }}></span>
                                <span style={{ fontSize: ".8rem", color: "var(--ink-2)", fontWeight: 500 }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── VISION ──────────────────────────────────────────────────────── */
function VisionSection() {
    const [ref, visible] = useReveal();
    const pillars = [
        { title: "Trajectoires Nord-Sud durables", text: "Des connexions concrètes entre la diaspora et les entrepreneurs locaux du continent africain." },
        { title: "Tiers de confiance", text: "Un réseau social professionnel orienté projets, avec des outils SaaS pour structurer communautés et services." },
        { title: "Finance inclusive", text: "Des produits de placement à partir de 3€ pour insuffler une dynamique populaire et internationale." },
        { title: "Accompagnement stratégique", text: "Préparation, sécurisation et connexion des projets aux bons partenaires et intermédiaires habilités." },
    ];

    return (
        <section id="vision" ref={ref} style={{
            background: "var(--gold-mist)", padding: "100px 80px",
            borderTop: "1px solid var(--border)",
        }}>
            <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center",
                opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)",
                transition: "all .7s ease",
            }}>
                <div>
                    <span style={labelStyle}>Notre vision</span>
                    <div style={{ position: "relative", paddingLeft: 28, marginBottom: 28 }}>
                        <span style={{
                            position: "absolute", left: 0, top: -14,
                            fontFamily: "'Playfair Display', serif", fontSize: "5rem",
                            color: "var(--gold-light)", lineHeight: 1, opacity: .7,
                        }}>"</span>
                        <p style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.45rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink)",
                        }}>
                            Transformer la force des communautés en levier d'investissement productif.
                        </p>
                    </div>
                    <p style={{ ...subtitleStyle, marginBottom: 16 }}>
                        Nous sommes convaincus que la réussite des projets entrepreneuriaux repose autant sur la structuration et la confiance que sur le financement lui-même.
                    </p>
                    <p style={subtitleStyle}>
                        Faire émerger et développer des entrepreneurs à impact sur les marchés africains, construire des cadres d'excellence c'est possible et en cours.
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {pillars.map((p, i) => <PillarCard key={i} {...p} />)}
                </div>
            </div>
        </section>
    );
}

function PillarCard({ icon, title, text }) {
    const [h, setH] = useState(false);
    return (
        <div
            onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
            style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                padding: "18px 20px",
                background: h ? "#fff" : "rgba(255,255,255,.6)",
                border: `1px solid ${h ? "var(--gold)" : "var(--border)"}`,
                borderLeft: `4px solid ${h ? "var(--gold)" : "var(--gold-light)"}`,
                borderRadius: "0 4px 4px 0",
                boxShadow: h ? "0 4px 16px rgba(196,127,23,.12)" : "none",
                transition: "all .25s",
            }}
        >
            <div>
                <div style={{ fontWeight: 600, fontSize: ".9rem", marginBottom: 5, color: "var(--ink)" }}>{title}</div>
                <div style={{ fontSize: ".82rem", color: "var(--muted)", lineHeight: 1.55, fontWeight: 300 }}>{text}</div>
            </div>
        </div>
    );
}

/* ── AGIR ────────────────────────────────────────────────────────── */
function AgirSection() {
    const [ref, visible] = useReveal();
    const cards = [
        { n: "01", title: "Devenir membre du réseau", text: "Rejoignez le réseau de solidarité MicroCap. Vos versements sont libres à partir de 3€ sur votre compte ESH auprès d'un établissement financier partenaire.", cta: "S'inscrire", href: "#rejoindre" },
        { n: "02", title: "Financer votre projet", text: "Création ou développement d'entreprise, actionnariat, formation à l'entrepreneuriat. Choisissez l'abonnement PASS qui vous correspond.", cta: "Voir les PASS", href: "#" },
        { n: "03", title: "Devenir actionnaire d'une PME", text: "Réalisez un placement sécurisé dans une PME africaine à impact. Devenez acteur concret du développement économique des diasporas.", cta: "Explorer les PME", href: "#" },
        { n: "04", title: "Mécénat de compétence", text: "Mettez vos expertises au service des entrepreneurs de la diaspora. Accompagnez, mentorez, structurez des projets à fort impact social.", cta: "Proposer une compétence", href: "#" },
        { n: "05", title: "Devenir partenaire MicroCap", text: "Rejoignez l'écosystème en tant qu'établissement financier, structure d'accompagnement ou acteur institutionnel engagé dans l'inclusion.", cta: "Nous contacter", href: "#" },
        { n: "∞", title: "Aller plus loin", text: "Distribution de produits africains à l'international, top management africain comme avantage compétitif, développement d'offres pour les diasporas.", cta: "Découvrir", href: "#", highlight: true },
    ];

    return (
        <section id="agir" ref={ref} style={{ background: "#fff", padding: "100px 80px" }}>
            <div style={{
                textAlign: "center", marginBottom: 60,
                opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
                transition: "all .65s ease",
            }}>
                <span style={labelStyle}>Agir avec MicroCap</span>
                <h2 style={{ ...h2Style, marginBottom: 16 }}>Choisissez votre rôle<br />dans l'écosystème</h2>
                <p style={{ ...subtitleStyle, margin: "0 auto" }}>Pour une finance vertueuse et inclusive, devenez acteur d'une économie de proximité.</p>
            </div>

            <div style={{
                display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20,
                opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
                transition: "all .65s .14s ease",
            }}>
                {cards.map((c, i) => <AgirCard key={i} {...c} />)}
            </div>
        </section>
    );
}

function AgirCard({ n, icon, title, text, cta, href, highlight }) {
    const [h, setH] = useState(false);
    return (
        <div
            onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
            style={{
                background: highlight
                    ? h ? "var(--gold-wash)" : "var(--gold-mist)"
                    : h ? "var(--gold-mist)" : "#FAFAF8",
                border: `1px solid ${h || highlight ? "var(--gold)" : "rgba(196,127,23,.14)"}`,
                borderTop: `3px solid ${highlight ? "var(--gold)" : h ? "var(--gold)" : "rgba(196,127,23,.2)"}`,
                borderRadius: 4, padding: "36px 28px",
                position: "relative", overflow: "hidden",
                transition: "all .25s",
                boxShadow: h ? "0 8px 28px rgba(196,127,23,.14)" : "0 2px 8px rgba(0,0,0,.04)",
                transform: h ? "translateY(-3px)" : "none",
            }}
        >
            <div style={{
                position: "absolute", top: 14, right: 20,
                fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 900,
                color: "rgba(196,127,23,.08)", lineHeight: 1, userSelect: "none",
            }}>{n}</div>

            <div style={{
                width: 48, height: 48, borderRadius: 3,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.35rem", marginBottom: 20,
            }}></div>

            <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem", fontWeight: 700, marginBottom: 12,
                color: highlight ? "var(--gold-deep)" : "var(--ink)",
            }}>{title}</div>

            <p style={{ fontSize: ".84rem", lineHeight: 1.7, color: "var(--ink-3)", fontWeight: 300, marginBottom: 20 }}>{text}</p>

            <a href={href} style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                color: "var(--gold)", fontSize: ".78rem", fontWeight: 700,
                letterSpacing: ".07em", textTransform: "uppercase", textDecoration: "none",
            }}>{cta} →</a>
        </div>
    );
}

/* ── CHALLENGE ───────────────────────────────────────────────────── */
function ChallengeSection() {
    const [ref, visible] = useReveal();
    const items = [
        { text: "Il y'a eu un temps pour sensibiliser, éduquer, former", h: false },
        { text: "Aujourd'hui nous avons une opportunité unique d'agir efficacement", h: true },
        { text: "Financer et sécuriser les projets de la diaspora africaine", h: false },
        { text: "Créer des emplois durables sur les marchés africains", h: false },
        { text: "Construire des cadres d'excellence c'est possible et en cours", h: false },
    ];

    return (
        <section id="challenge" ref={ref} style={{
            background: "linear-gradient(135deg, var(--gold-wash) 0%, #FEF9EC 100%)",
            padding: "100px 80px",
            borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
            position: "relative", overflow: "hidden",
        }}>
            <div style={{
                position: "absolute", right: -30, top: "50%", transform: "translateY(-50%)",
                fontFamily: "'Playfair Display', serif", fontSize: "20rem", fontWeight: 900,
                color: "rgba(196,127,23,.07)", lineHeight: 1, userSelect: "none", pointerEvents: "none",
            }}>100</div>

            <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center",
                position: "relative", zIndex: 2,
                opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)",
                transition: "all .7s ease",
            }}>
                <div>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        background: "var(--gold)", color: "#fff",
                        fontSize: ".68rem", fontWeight: 700, letterSpacing: ".15em",
                        textTransform: "uppercase", padding: "6px 14px", borderRadius: 2, marginBottom: 24,
                    }}>⚡ Initiative nationale</div>

                    <h2 style={{ ...h2Style, fontSize: "clamp(1.8rem,3vw,3rem)", marginBottom: 20 }}>
                        Challenge MicroCap<br />
                        <span style={{ color: "var(--gold)", fontStyle: "italic" }}>«100 PME pour l'emploi»</span>
                    </h2>

                    <p style={{ ...subtitleStyle, marginBottom: 28 }}>
                        Rejoignez le mouvement. Aujourd'hui nous avons une opportunité unique d'agir efficacement pour faciliter le financement et sécuriser les projets de la diaspora africaine dans leur pays d'origine et de résidence.
                    </p>

                    <a href="https://100pme.microcap.fr" target="_blank" rel="noreferrer" style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        fontSize: ".88rem", fontWeight: 600, color: "var(--gold-deep)",
                        textDecoration: "none", marginBottom: 32,
                        background: "#fff", padding: "10px 18px", borderRadius: 3,
                        border: "1px solid var(--border)",
                        boxShadow: "0 2px 8px rgba(196,127,23,.1)",
                    }}>🔗 100pme.microcap.fr</a>

                    <br />
                    <BtnPrimary href="#rejoindre">Participer au challenge</BtnPrimary>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {items.map((item, i) => (
                        <div key={i} style={{
                            display: "flex", alignItems: "center", gap: 14,
                            padding: "14px 18px",
                            background: item.h ? "var(--gold)" : "#fff",
                            border: `1px solid ${item.h ? "var(--gold)" : "var(--border)"}`,
                            borderRadius: 3,
                            boxShadow: item.h ? "0 4px 14px rgba(196,127,23,.25)" : "none",
                        }}>
                            <div style={{
                                width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                                background: item.h ? "#fff" : "var(--gold-light)",
                            }} />
                            <span style={{
                                fontSize: ".88rem", fontWeight: item.h ? 700 : 400,
                                color: item.h ? "#fff" : "var(--ink-2)",
                            }}>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── QUI ─────────────────────────────────────────────────────────── */
function QuiSection() {
    const [ref, visible] = useReveal();
    const features = [
        { title: "Entreprendre et vendre en Afrique", text: "Accompagnement des entrepreneurs qui souhaitent s'implanter ou développer leur activité sur le continent." },
        { title: "S'approvisionner et produire en Afrique", text: "Structuration des chaînes d'approvisionnement et de production pour maximiser la valeur locale." },
        { title: "Distribuer des produits africains à l'international", text: "Ouverture des marchés internationaux aux produits et savoir-faire africains." },
    ];
    const blocks = [
        { title: "La plateforme MicroCap", text: "Delivre des prestations d'accompagnement de projets, de mise en réseau d'entrepreneurs et de facilitation d'accès au financement. Le moteur stratégique d'A+ Conseils grâce à une digitalisation avancée des parcours d'accompagnement." },
        { title: "La technologie : Codéveloppement & Tontine", text: "Deux concepts empiriques dont l'efficacité est déjà éprouvée. Ces pratiques courantes en Afrique et existantes en Europe sont numérisées pour créer une dynamique populaire inclusive et internationale." },
        { title: "Notre priorité", text: "Les entrepreneurs des diasporas africaines, qu'ils entreprennent dans leur pays de résidence, dans leur pays d'origine, ou en coopération avec des entrepreneurs locaux du continent." },
    ];

    return (
        <section id="qui" ref={ref} style={{ background: "#fff", padding: "100px 80px" }}>
            <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start",
                opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)",
                transition: "all .7s ease",
            }}>
                <div>
                    <span style={labelStyle}>Qui sommes-nous</span>
                    <h2 style={h2Style}>Un service d'A+ Conseils,<br />spécialiste des écosystèmes africains</h2>
                    <p style={{ ...subtitleStyle, marginBottom: 32 }}>
                        MicroCap est proposé par A+ Conseils, une société d'ingénierie et de conseil en management spécialisée sur les écosystèmes économiques africains et diasporiques, dans toutes leurs dimensions.
                    </p>
                    <div style={{ borderTop: "1px solid var(--border)" }}>
                        {features.map((f, i) => (
                            <div key={i} style={{
                                display: "flex", gap: 16, padding: "20px 0",
                                borderBottom: "1px solid var(--border)",
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: ".88rem", marginBottom: 4, color: "var(--ink)" }}>{f.title}</div>
                                    <div style={{ fontSize: ".82rem", lineHeight: 1.6, color: "var(--muted)", fontWeight: 300 }}>{f.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {blocks.map((b, i) => (
                        <div key={i} style={{
                            padding: "26px 28px",
                            background: "var(--gold-mist)",
                            border: "1px solid var(--border)",
                            borderLeft: "4px solid var(--gold)",
                            borderRadius: "0 4px 4px 0",
                        }}>
                            <div style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "1rem", fontWeight: 700, color: "var(--gold-deep)", marginBottom: 10,
                            }}>{b.title}</div>
                            <p style={{ fontSize: ".84rem", lineHeight: 1.72, color: "var(--ink-3)", fontWeight: 300 }}>{b.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── CTA ─────────────────────────────────────────────────────────── */
function CtaSection() {
    const [ref, visible] = useReveal();
    return (
        <section id="rejoindre" ref={ref} style={{
            background: "var(--gold)",
            padding: "100px 80px", textAlign: "center",
            position: "relative", overflow: "hidden",
        }}>
            <div style={{
                position: "absolute", inset: 0, opacity: .06,
                backgroundImage: "radial-gradient(#fff 1.5px, transparent 1.5px)",
                backgroundSize: "24px 24px", pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                width: 600, height: 600, borderRadius: "50%",
                background: "rgba(255,255,255,.06)", pointerEvents: "none",
            }} />

            <div style={{
                position: "relative", zIndex: 2,
                opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)",
                transition: "all .7s ease",
            }}>
                <div style={{
                    fontSize: ".7rem", fontWeight: 700, letterSpacing: ".18em",
                    textTransform: "uppercase", color: "rgba(255,255,255,.75)",
                    marginBottom: 14, display: "block",
                }}>Rejoindre le mouvement</div>

                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 900, lineHeight: 1.12,
                    color: "#fff", marginBottom: 18,
                }}>
                    Rejoignez le réseau de solidarité<br />MicroCap
                </h2>

                <p style={{ fontSize: ".98rem", lineHeight: 1.8, color: "rgba(255,255,255,.82)", maxWidth: 520, margin: "0 auto 32px", fontWeight: 300 }}>
                    Réussissez toutes vos campagnes de financement participatif. Accompagnez, structurez, connectez et facilitez l'accès aux financements ici ou là-bas.
                </p>

                <div style={{ marginBottom: 40 }}>
                    <span style={{ fontSize: "1rem", color: "rgba(255,255,255,.8)", fontFamily: "'Playfair Display', serif" }}>À partir de </span>
                    <span style={{ fontSize: "3.2rem", color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>3€</span>
                    <span style={{ fontSize: "1rem", color: "rgba(255,255,255,.8)", fontFamily: "'Playfair Display', serif" }}> / mois</span>
                </div>

                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                    <a href="#" style={{
                        background: "#fff", color: "var(--gold-deep)",
                        padding: "14px 32px", borderRadius: 3,
                        fontWeight: 700, fontSize: ".83rem", letterSpacing: ".06em",
                        textTransform: "uppercase", textDecoration: "none",
                        boxShadow: "0 4px 16px rgba(0,0,0,.15)",
                    }}>Créer mon compte gratuitement</a>
                    <a href="#" style={{
                        background: "transparent", color: "#fff",
                        padding: "14px 32px", borderRadius: 3,
                        fontWeight: 600, fontSize: ".83rem", letterSpacing: ".06em",
                        textTransform: "uppercase", textDecoration: "none",
                        border: "2px solid rgba(255,255,255,.5)",
                    }}>Voir les abonnements PASS</a>
                </div>
            </div>
        </section>
    );
}

/* ── FOOTER ──────────────────────────────────────────────────────── */
function Footer() {
    return (
        <footer style={{
            background: "var(--ink)", padding: "36px 80px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
            <div>
                <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem", fontWeight: 900, color: "var(--gold-light)",
                }}>MicroCap</div>
                <div style={{ fontSize: ".76rem", color: "rgba(253,230,138,.5)", fontWeight: 300, marginTop: 4 }}>
                    Un service A+ Conseils Finance inclusive pour la diaspora africaine
                </div>
            </div>
            <div style={{ fontSize: ".74rem", color: "rgba(255,255,255,.3)" }}>
                © 2026 MicroCap / A+ Conseils Tous droits réservés
            </div>
        </footer>
    );
}

/* ── ROOT ────────────────────────────────────────────────────────── */
export default function MicroCapPage() {
    const [active, setActive] = useState("hero");

    useEffect(() => {
        const ids = ["hero", "vision", "agir", "challenge", "qui", "rejoindre"];
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
            { threshold: 0.35 }
        );
        ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, []);

    return (
        <>
            <style>{globalStyles}</style>
            <Nav active={active} />
            <Hero />
            <VisionSection />
            <AgirSection />
            <ChallengeSection />
            <QuiSection />
            <CtaSection />
            <Footer />
        </>
    );
}