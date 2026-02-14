import { useState, useEffect } from "react";

// ── Design Tokens ──────────────────────────────────────────────
const T = {
  bg: "#F7F8FC",
  surface: "#FFFFFF",
  surfaceAlt: "#F0F2FA",
  border: "#E8EAF2",
  text: "#1A1D2E",
  textSub: "#6B7280",
  textMuted: "#9CA3AF",
  primary: "#5B6CF8",
  primaryLight: "#EEF0FE",
  primaryGlow: "rgba(91,108,248,0.15)",
  accent: "#FF6B6B",
  accentLight: "#FFF0F0",
  teal: "#0EA5AA",
  tealLight: "#E6F9FA",
  amber: "#F59E0B",
  amberLight: "#FFFBEB",
  green: "#10B981",
  greenLight: "#ECFDF5",
  shadow: "0 2px 12px rgba(91,108,248,0.08)",
  shadowMd: "0 8px 32px rgba(91,108,248,0.1)",
  shadowLg: "0 16px 48px rgba(91,108,248,0.15)",
};

const TRIPS = [
  {
    id: 1, title: "Himalayan Odyssey", location: "Manali, India",
    type: "mountains", travel: "national", activity: "adventure",
    days: 7, budget: "medium", traveler: "single",
    bestFor: ["Trekking", "Snow", "Spiritual"],
    rating: 4.9, reviews: 2341, price: 28000, temp: "−2°C", img: "🏔️",
    cardBg: "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
    tag: "Adventure", tagColor: "#764BA2",
    month: ["November", "December", "January", "February"],
  },
  {
    id: 2, title: "Goa Sun & Soul", location: "North Goa, India",
    type: "beaches", travel: "national", activity: "relaxing",
    days: 5, budget: "low", traveler: "family",
    bestFor: ["Beach", "Nightlife", "Seafood"],
    rating: 4.7, reviews: 5821, price: 18000, temp: "28°C", img: "🌊",
    cardBg: "linear-gradient(135deg, #11998E 0%, #38EF7D 100%)",
    tag: "Beach", tagColor: "#11998E",
    month: ["October", "November", "December"],
  },
  {
    id: 3, title: "Bali Serenity", location: "Ubud, Bali",
    type: "both", travel: "international", activity: "relaxing",
    days: 10, budget: "high", traveler: "family",
    bestFor: ["Temples", "Wellness", "Rice Fields"],
    rating: 4.8, reviews: 9102, price: 85000, temp: "27°C", img: "🌺",
    cardBg: "linear-gradient(135deg, #F093FB 0%, #F5576C 100%)",
    tag: "Wellness", tagColor: "#F5576C",
    month: ["April", "May", "June", "July", "August"],
  },
  {
    id: 4, title: "Swiss Alpine Dream", location: "Interlaken, Switzerland",
    type: "mountains", travel: "international", activity: "adventure",
    days: 8, budget: "high", traveler: "single",
    bestFor: ["Skiing", "Paragliding", "Scenic Trains"],
    rating: 4.95, reviews: 3412, price: 220000, temp: "5°C", img: "🎿",
    cardBg: "linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)",
    tag: "Ski", tagColor: "#4FACFE",
    month: ["December", "January", "February", "March"],
  },
  {
    id: 5, title: "Maldives Escape", location: "North Malé Atoll",
    type: "beaches", travel: "international", activity: "relaxing",
    days: 6, budget: "high", traveler: "family",
    bestFor: ["Overwater Villa", "Snorkeling", "Sunset"],
    rating: 4.9, reviews: 7821, price: 300000, temp: "30°C", img: "🐚",
    cardBg: "linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)",
    tag: "Luxury", tagColor: "#0EA5AA",
    month: ["November", "December", "January", "February", "March", "April"],
  },
  {
    id: 6, title: "Rajasthan Heritage", location: "Jaipur & Jodhpur",
    type: "neither", travel: "national", activity: "relaxing",
    days: 6, budget: "medium", traveler: "family",
    bestFor: ["Forts", "Camels", "Royal Cuisine"],
    rating: 4.6, reviews: 4231, price: 22000, temp: "22°C", img: "🏰",
    cardBg: "linear-gradient(135deg, #FA8231 0%, #F7B731 100%)",
    tag: "Heritage", tagColor: "#FA8231",
    month: ["October", "November", "December", "January", "February"],
  },
];

const QUESTIONS = [
  { id: "travel", question: "Where to explore?", subtitle: "Choose your travel zone",
    options: [
      { value: "national", label: "Within India", icon: "🇮🇳", desc: "Domestic" },
      { value: "international", label: "Abroad", icon: "✈️", desc: "International" },
      { value: "both", label: "Open to Both", icon: "🌍", desc: "Anywhere!" },
    ],
  },
  { id: "type", question: "What landscape?", subtitle: "Pick your terrain",
    options: [
      { value: "mountains", label: "Mountains", icon: "⛰️", desc: "Peaks & valleys" },
      { value: "beaches", label: "Beaches", icon: "🏖️", desc: "Sun & waves" },
      { value: "both", label: "Both!", icon: "🌈", desc: "Why choose?" },
    ],
  },
  { id: "traveler", question: "Who's coming?", subtitle: "Plan your group",
    options: [
      { value: "single", label: "Solo", icon: "🧳", desc: "Just me" },
      { value: "couple", label: "Couple", icon: "💑", desc: "Romantic" },
      { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦", desc: "Everyone" },
      { value: "friends", label: "Friends", icon: "🎉", desc: "Squad" },
    ],
  },
  { id: "month", question: "When are you going?", subtitle: "Pick a season",
    options: [
      { value: "December", label: "Dec–Feb", icon: "❄️", desc: "Winter" },
      { value: "March", label: "Mar–May", icon: "🌸", desc: "Spring" },
      { value: "June", label: "Jun–Aug", icon: "☀️", desc: "Summer" },
      { value: "September", label: "Sep–Nov", icon: "🍂", desc: "Autumn" },
    ],
  },
  { id: "activity", question: "Your travel vibe?", subtitle: "Set the mood",
    options: [
      { value: "adventure", label: "Adventure", icon: "🧗", desc: "Adrenaline" },
      { value: "relaxing", label: "Relaxing", icon: "🧘", desc: "Unwind" },
      { value: "cultural", label: "Cultural", icon: "🎭", desc: "History & art" },
      { value: "both", label: "Mix it up", icon: "⚡", desc: "All of it" },
    ],
  },
  { id: "days", question: "How long?", subtitle: "Duration of your trip",
    options: [
      { value: "short", label: "Weekend", icon: "⚡", desc: "2–3 days" },
      { value: "week", label: "A Week", icon: "📅", desc: "5–7 days" },
      { value: "long", label: "Extended", icon: "🗓️", desc: "8–14 days" },
      { value: "month", label: "Long Trip", icon: "🌟", desc: "15+ days" },
    ],
  },
  { id: "budget", question: "What's your budget?", subtitle: "We'll find the best value",
    options: [
      { value: "low", label: "Budget", icon: "💚", desc: "Under ₹20K" },
      { value: "medium", label: "Moderate", icon: "💛", desc: "₹20K–₹60K" },
      { value: "high", label: "Premium", icon: "💎", desc: "₹60K+" },
    ],
  },
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@500;600;700;800&display=swap');
  @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes bounceIn { 0%{transform:scale(0.3);opacity:0} 60%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(0.92)} }
  @keyframes barGrow { from{width:0} to{width:100%} }
  * { box-sizing:border-box; -webkit-font-smoothing:antialiased; }
  ::-webkit-scrollbar { display:none; }
`;

const phoneShell = {
  width: "390px", height: "844px", margin: "0 auto",
  background: T.bg, borderRadius: "44px",
  boxShadow: "0 40px 80px rgba(91,108,248,0.18), 0 0 0 1px rgba(91,108,248,0.06)",
  fontFamily: "'Nunito', sans-serif",
  position: "relative", overflow: "hidden", display: "flex", flexDirection: "column",
};

// ── Light background blobs ────────────────────────────────────
const Blobs = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
    <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(91,108,248,0.1) 0%, transparent 70%)" }} />
    <div style={{ position: "absolute", bottom: "80px", left: "-60px", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)" }} />
    <div style={{ position: "absolute", top: "45%", right: "-30px", width: "160px", height: "160px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)" }} />
  </div>
);

// ── Trip Card ─────────────────────────────────────────────────
const TripCard = ({ trip, onSave, saved }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: T.surface, borderRadius: "20px", overflow: "hidden", border: `1px solid ${T.border}`, boxShadow: hov ? T.shadowLg : T.shadowMd, transform: hov ? "translateY(-4px)" : "none", transition: "all 0.25s ease", cursor: "pointer" }}
    >
      {/* Image */}
      <div style={{ height: "118px", background: trip.cardBg, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "44px", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.18))" }}>{trip.img}</span>
        <div style={{ position: "absolute", top: "9px", left: "9px", background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)", borderRadius: "20px", padding: "2px 9px", fontSize: "10px", fontWeight: "800", color: "#fff", letterSpacing: "0.4px" }}>{trip.tag}</div>
        <button onClick={(e) => { e.stopPropagation(); onSave(trip.id); }} style={{ position: "absolute", top: "7px", right: "7px", width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", border: "none", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.12)", transition: "transform 0.2s", transform: saved ? "scale(1.18)" : "scale(1)" }}>{saved ? "❤️" : "🤍"}</button>
        <div style={{ position: "absolute", bottom: "8px", right: "9px", background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)", borderRadius: "10px", padding: "2px 7px", fontSize: "10px", color: "#fff", fontWeight: "700" }}>{trip.temp}</div>
      </div>
      {/* Info */}
      <div style={{ padding: "11px 13px 13px" }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700", fontSize: "13px", color: T.text, lineHeight: "1.2", marginBottom: "2px" }}>{trip.title}</div>
        <div style={{ fontSize: "10px", color: T.textMuted, marginBottom: "9px" }}>📍 {trip.location}</div>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "9px" }}>
          {trip.bestFor.slice(0, 2).map((tag) => (
            <span key={tag} style={{ background: T.primaryLight, color: T.primary, borderRadius: "20px", padding: "2px 7px", fontSize: "9px", fontWeight: "700" }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", fontWeight: "800", color: T.primary }}>₹{(trip.price / 1000).toFixed(0)}K</div>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <span style={{ color: T.amber, fontSize: "11px" }}>★</span>
            <span style={{ fontSize: "11px", fontWeight: "800", color: T.text }}>{trip.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({});
  const [savedTrips, setSavedTrips] = useState([1, 3]);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [activeTab, setActiveTab] = useState("home");
  const [animating, setAnimating] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRecs, setAiRecs] = useState([]);

  useEffect(() => { const t = setTimeout(() => setScreen("login"), 2200); return () => clearTimeout(t); }, []);

  const login = (provider) => {
    const profiles = {
      google:   { name: "Arjun Sharma",  email: "arjun@gmail.com",  avatar: "AS", color: "#FF6B6B" },
      facebook: { name: "Priya Nair",    email: "priya@fb.com",     avatar: "PN", color: "#5B6CF8" },
      apple:    { name: "Rahul Mehta",   email: "rahul@icloud.com", avatar: "RM", color: "#10B981" },
    };
    setUser(profiles[provider]);
    setPreferences({ travel: "national", type: "both", budget: "medium", activity: "relaxing" });
    setScreen("home");
  };

  const filtered = TRIPS.filter((t) => {
    if (preferences.travel && preferences.travel !== "both" && t.travel !== preferences.travel) return false;
    if (preferences.type && preferences.type !== "both" && t.type !== preferences.type && t.type !== "both") return false;
    if (preferences.budget && t.budget !== preferences.budget) return false;
    if (preferences.activity && preferences.activity !== "both" && t.activity !== preferences.activity) return false;
    return true;
  });

  const handleAnswer = (qid, val) => {
    setAnimating(true);
    setTimeout(() => {
      const next = { ...quizAnswers, [qid]: val };
      setQuizAnswers(next);
      if (quizStep < QUESTIONS.length - 1) { setQuizStep(quizStep + 1); setAnimating(false); }
      else { setAnimating(false); fetchAI(next); }
    }, 270);
  };

  const fetchAI = async (answers) => {
    setAiLoading(true); setScreen("airesults");
    const prompt = `You are a travel expert. Based on these preferences, recommend 3 specific destinations.
Preferences: ${JSON.stringify(answers)}
Respond ONLY with a JSON array of 3 trips:
[{"title":"","location":"","emoji":"","why":"","highlights":["","",""],"bestMonth":"","estimatedBudget":"","rating":4.8,"tip":""}]`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-5-20250929", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }) });
      const data = await res.json();
      const txt = data.content?.map((c) => c.text || "").join("");
      setAiRecs(JSON.parse(txt.replace(/```json|```/g, "").trim()));
    } catch {
      setAiRecs([
        { title: "Ziro Valley", location: "Arunachal Pradesh, India", emoji: "🌿", why: "Hidden gem for nature lovers", highlights: ["Rice fields", "Apatani tribe", "Music festival"], bestMonth: "October", estimatedBudget: "₹25,000–₹40,000", rating: 4.7, tip: "Visit during the Ziro Music Festival in September" },
        { title: "Coorg Coffee Trails", location: "Kodagu, Karnataka", emoji: "☕", why: "Peaceful misty mountain escape", highlights: ["Coffee estates", "Misty hills", "Waterfalls"], bestMonth: "September", estimatedBudget: "₹15,000–₹30,000", rating: 4.6, tip: "Stay at a working coffee estate for full immersion" },
        { title: "Andaman Islands", location: "Port Blair, Andaman", emoji: "🐠", why: "Crystal waters for the ultimate beach escape", highlights: ["Snorkeling", "Radhanagar Beach", "History"], bestMonth: "November", estimatedBudget: "₹35,000–₹55,000", rating: 4.8, tip: "Book ferry tickets at least 2 weeks in advance" },
      ]);
    }
    setAiLoading(false);
  };

  const toggleSave = (id) => setSavedTrips((p) => p.includes(id) ? p.filter((t) => t !== id) : [...p, id]);

  // ─────────────────────────────────────────────────────────
  // SPLASH
  // ─────────────────────────────────────────────────────────
  if (screen === "splash") return (
    <div style={phoneShell}>
      <style>{STYLES}</style>
      <Blobs />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
        <div style={{ width: "88px", height: "88px", borderRadius: "26px", background: "linear-gradient(135deg, #5B6CF8, #FF6B6B)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "42px", boxShadow: "0 16px 48px rgba(91,108,248,0.32)", animation: "bounceIn 0.7s cubic-bezier(0.68,-0.55,0.27,1.55) both, floatY 3s ease-in-out 0.8s infinite", marginBottom: "22px" }}>
          🌍
        </div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "34px", fontWeight: "800", color: T.text, letterSpacing: "-1.5px", animation: "fadeUp 0.5s ease 0.4s both" }}>
          Wander<span style={{ color: T.primary }}>AI</span>
        </div>
        <div style={{ fontSize: "12px", color: T.textMuted, marginTop: "6px", fontWeight: "700", letterSpacing: "2.5px", textTransform: "uppercase", animation: "fadeUp 0.5s ease 0.6s both" }}>
          Smart Travel Companion
        </div>
        <div style={{ display: "flex", gap: "6px", marginTop: "36px", animation: "fadeUp 0.5s ease 0.8s both" }}>
          {[1, 0, 0].map((active, i) => (
            <div key={i} style={{ width: active ? "22px" : "6px", height: "6px", borderRadius: "3px", background: active ? T.primary : T.border, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────────────────────
  if (screen === "login") return (
    <div style={phoneShell}>
      <style>{STYLES}</style>
      <Blobs />

      {/* Hero area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: "320px", position: "relative", zIndex: 1, textAlign: "center", padding: "60px 28px 280px" }}>
        <div style={{ width: "76px", height: "76px", borderRadius: "24px", background: "linear-gradient(135deg, #5B6CF8, #FF6B6B)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 16px", boxShadow: "0 14px 40px rgba(91,108,248,0.28)", animation: "floatY 3.5s ease-in-out infinite" }}>
          🌍
        </div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "30px", fontWeight: "800", color: T.text, letterSpacing: "-1px" }}>
          Wander<span style={{ color: T.primary }}>AI</span>
        </div>
        <div style={{ fontSize: "13px", color: T.textSub, marginTop: "5px", fontWeight: "600" }}>Your AI-powered travel planner</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginTop: "18px" }}>
          {["🏔️ Mountains", "🏖️ Beaches", "🎭 Culture", "✈️ Global"].map((tag) => (
            <span key={tag} style={{ background: T.primaryLight, color: T.primary, borderRadius: "20px", padding: "5px 13px", fontSize: "11px", fontWeight: "800" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: T.surface, borderRadius: "32px 32px 0 0", padding: "26px 28px 48px", boxShadow: "0 -8px 40px rgba(91,108,248,0.1)", border: `1px solid ${T.border}`, borderBottom: "none", zIndex: 2 }}>
        <div style={{ width: "36px", height: "4px", background: T.border, borderRadius: "2px", margin: "0 auto 22px" }} />
        <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: "800", color: T.text, textAlign: "center", marginBottom: "4px" }}>Welcome back 👋</div>
        <div style={{ fontSize: "12px", color: T.textMuted, textAlign: "center", marginBottom: "22px", fontWeight: "600" }}>Sign in to discover your perfect trip</div>

        {[
          { p: "google",   icon: "G", label: "Continue with Google",   bg: T.surface, border: T.border, color: T.text,  iconBg: "#FEF3F2", iconColor: "#EA4335" },
          { p: "facebook", icon: "f", label: "Continue with Facebook", bg: "#1877F2", border: "#1877F2", color: "#fff", iconBg: "rgba(255,255,255,0.18)", iconColor: "#fff" },
          { p: "apple",    icon: "🍎", label: "Continue with Apple",   bg: T.text,    border: T.text,    color: "#fff", iconBg: "rgba(255,255,255,0.1)",  iconColor: "#fff" },
        ].map(({ p, icon, label, bg, border, color, iconBg, iconColor }) => (
          <button key={p} onClick={() => login(p)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", background: bg, color, border: `1.5px solid ${border}`, borderRadius: "14px", padding: "13px 18px", marginBottom: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "700", fontFamily: "'Nunito', sans-serif", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "transform 0.15s, box-shadow 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; }}
          >
            <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "800", color: iconColor, flexShrink: 0 }}>{icon}</span>
            {label}
          </button>
        ))}
        <div style={{ textAlign: "center", marginTop: "12px", fontSize: "11px", color: T.textMuted }}>
          By continuing you agree to our Terms & Privacy Policy
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────
  // QUIZ
  // ─────────────────────────────────────────────────────────
  if (screen === "quiz") {
    const q = QUESTIONS[quizStep];
    const pct = (quizStep / QUESTIONS.length) * 100;
    return (
      <div style={phoneShell}>
        <style>{STYLES}</style>
        <Blobs />
        <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", padding: "54px 24px 28px" }}>
          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" }}>
            <button onClick={() => quizStep > 0 ? setQuizStep(quizStep - 1) : setScreen("home")} style={{ width: "40px", height: "40px", borderRadius: "13px", background: T.surface, border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "16px", color: T.text, boxShadow: T.shadow, flexShrink: 0 }}>
              ←
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
                <span style={{ fontSize: "11px", color: T.textMuted, fontWeight: "700" }}>{quizStep + 1} / {QUESTIONS.length}</span>
                <span style={{ fontSize: "11px", color: T.primary, fontWeight: "800" }}>{Math.round(pct)}%</span>
              </div>
              <div style={{ height: "7px", background: T.border, borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${T.primary}, ${T.accent})`, borderRadius: "4px", transition: "width 0.4s ease" }} />
              </div>
            </div>
          </div>

          {/* Question */}
          <div style={{ marginBottom: "26px", animation: animating ? "none" : "fadeUp 0.35s ease" }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "24px", fontWeight: "800", color: T.text, letterSpacing: "-0.5px", lineHeight: "1.2", marginBottom: "6px" }}>{q.question}</div>
            <div style={{ fontSize: "13px", color: T.textSub, fontWeight: "600" }}>{q.subtitle}</div>
          </div>

          {/* Options */}
          <div style={{ display: "grid", gridTemplateColumns: q.options.length === 3 ? "1fr 1fr 1fr" : "1fr 1fr", gap: "12px", animation: animating ? "none" : "fadeUp 0.35s ease 0.07s both" }}>
            {q.options.map((opt) => {
              const sel = quizAnswers[q.id] === opt.value;
              return (
                <button key={opt.value} onClick={() => handleAnswer(q.id, opt.value)} style={{ background: sel ? T.primary : T.surface, border: `2px solid ${sel ? T.primary : T.border}`, borderRadius: "18px", padding: "18px 10px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", transition: "all 0.2s", fontFamily: "'Nunito', sans-serif", boxShadow: sel ? `0 8px 24px rgba(91,108,248,0.28)` : T.shadow, transform: sel ? "scale(0.97)" : "scale(1)" }}>
                  <span style={{ fontSize: "28px" }}>{opt.icon}</span>
                  <span style={{ fontSize: "12px", fontWeight: "800", color: sel ? "#fff" : T.text }}>{opt.label}</span>
                  <span style={{ fontSize: "10px", color: sel ? "rgba(255,255,255,0.72)" : T.textMuted, textAlign: "center" }}>{opt.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Step dots */}
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "auto", paddingTop: "16px" }}>
            {QUESTIONS.map((_, i) => (
              <div key={i} style={{ width: i === quizStep ? "22px" : "6px", height: "6px", borderRadius: "3px", background: i < quizStep ? T.green : i === quizStep ? T.primary : T.border, transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // AI RESULTS
  // ─────────────────────────────────────────────────────────
  if (screen === "airesults") return (
    <div style={phoneShell}>
      <style>{STYLES}</style>
      <Blobs />
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "54px 24px 14px", flexShrink: 0 }}>
          <button onClick={() => { setScreen("home"); setQuizStep(0); setQuizAnswers({}); }} style={{ width: "40px", height: "40px", borderRadius: "13px", background: T.surface, border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "16px", color: T.text, boxShadow: T.shadow, marginBottom: "16px" }}>
            ←
          </button>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "800", color: T.text }}>{aiLoading ? "✨ Finding your perfect trips..." : "🎯 Curated Just for You"}</div>
          <div style={{ fontSize: "12px", color: T.textMuted, marginTop: "3px", fontWeight: "600" }}>{aiLoading ? "AI is analysing your preferences…" : "Powered by Claude AI"}</div>
        </div>

        {aiLoading ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }}>
            <div style={{ fontSize: "56px", animation: "floatY 1.5s ease-in-out infinite" }}>🌍</div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[0, 0.2, 0.4].map((d, i) => <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: T.primary, animation: `pulse 0.9s ease ${d}s infinite` }} />)}
            </div>
            <div style={{ fontSize: "13px", color: T.textSub, textAlign: "center", maxWidth: "200px", fontWeight: "600" }}>Searching thousands of destinations…</div>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>
            {aiRecs.map((rec, i) => (
              <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "20px", marginBottom: "14px", overflow: "hidden", boxShadow: T.shadowMd, animation: `fadeUp 0.45s ease ${i * 0.12}s both` }}>
                <div style={{ background: `linear-gradient(135deg, ${T.primaryLight}, ${T.accentLight})`, padding: "15px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <span style={{ fontSize: "30px" }}>{rec.emoji}</span>
                    <div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px", fontWeight: "800", color: T.text }}>{rec.title}</div>
                      <div style={{ fontSize: "11px", color: T.textMuted, fontWeight: "600" }}>📍 {rec.location}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "13px", color: T.amber, fontWeight: "800" }}>★ {rec.rating}</div>
                    <div style={{ fontSize: "10px", color: T.textMuted, fontWeight: "600" }}>{rec.bestMonth}</div>
                  </div>
                </div>
                <div style={{ padding: "14px 18px" }}>
                  <div style={{ fontSize: "12px", color: T.textSub, fontStyle: "italic", marginBottom: "10px", paddingLeft: "10px", borderLeft: `3px solid ${T.primary}`, fontWeight: "600" }}>"{rec.why}"</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
                    {rec.highlights?.map((h) => <span key={h} style={{ background: T.primaryLight, color: T.primary, borderRadius: "20px", padding: "2px 10px", fontSize: "10px", fontWeight: "700" }}>{h}</span>)}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "9px", borderTop: `1px solid ${T.border}`, marginBottom: "8px" }}>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", fontWeight: "800", color: T.green }}>{rec.estimatedBudget}</div>
                  </div>
                  <div style={{ background: T.amberLight, borderRadius: "10px", padding: "8px 10px", fontSize: "11px", color: "#92400E", fontWeight: "700" }}>💡 {rec.tip}</div>
                </div>
              </div>
            ))}
            <button onClick={() => { setScreen("home"); setActiveTab("home"); setPreferences({ ...preferences, ...quizAnswers }); setQuizStep(0); setQuizAnswers({}); }} style={{ width: "100%", background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, border: "none", borderRadius: "16px", padding: "16px", color: "#fff", fontSize: "15px", fontWeight: "800", cursor: "pointer", fontFamily: "'Nunito', sans-serif", boxShadow: "0 8px 28px rgba(91,108,248,0.28)", marginTop: "4px" }}>
              Save & Go Home 🏠
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────
  // HOME APP
  // ─────────────────────────────────────────────────────────
  return (
    <div style={phoneShell}>
      <style>{STYLES}</style>
      <Blobs />

      {/* Body */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, overflowY: "auto", paddingBottom: "88px" }}>

        {/* ── HOME ── */}
        {activeTab === "home" && (
          <>
            <div style={{ padding: "54px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "12px", color: T.textMuted, fontWeight: "700", marginBottom: "2px" }}>Good evening 👋</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "22px", fontWeight: "800", color: T.text, letterSpacing: "-0.5px" }}>{user?.name?.split(" ")[0]}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button style={{ width: "40px", height: "40px", borderRadius: "13px", background: T.surface, border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "17px", boxShadow: T.shadow }}>🔔</button>
                <div style={{ width: "40px", height: "40px", borderRadius: "13px", background: `linear-gradient(135deg, ${user?.color || T.primary}, ${T.primary}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "800", color: "#fff", boxShadow: `0 4px 14px ${user?.color || T.primary}40` }}>
                  {user?.avatar}
                </div>
              </div>
            </div>

            {/* Search */}
            <div style={{ padding: "14px 24px" }}>
              <div style={{ background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: "16px", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px", boxShadow: T.shadow }}>
                <span style={{ fontSize: "16px" }}>🔍</span>
                <span style={{ fontSize: "13px", color: T.textMuted, fontWeight: "600" }}>Search destinations…</span>
                <div style={{ marginLeft: "auto", background: T.primaryLight, borderRadius: "10px", padding: "4px 11px", fontSize: "11px", color: T.primary, fontWeight: "800" }}>Filter</div>
              </div>
            </div>

            {/* AI CTA banner */}
            <div style={{ margin: "0 24px 22px" }}>
              <div onClick={() => { setScreen("quiz"); setQuizStep(0); }} style={{ background: `linear-gradient(135deg, ${T.primary} 0%, ${T.accent} 100%)`, borderRadius: "22px", padding: "20px 22px", cursor: "pointer", position: "relative", overflow: "hidden", boxShadow: "0 12px 36px rgba(91,108,248,0.28)" }}>
                <div style={{ position: "absolute", right: "-18px", bottom: "-18px", fontSize: "88px", opacity: 0.15 }}>✈️</div>
                <div style={{ position: "absolute", top: "-24px", left: "45%", width: "130px", height: "130px", borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: "700", marginBottom: "5px" }}>AI Travel Planner</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: "800", color: "#fff", marginBottom: "14px", lineHeight: "1.2" }}>Find Your Perfect Trip ✨</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.18)", borderRadius: "30px", padding: "8px 18px", fontSize: "13px", color: "#fff", fontWeight: "800", backdropFilter: "blur(4px)" }}>
                  Start Quiz →
                </div>
              </div>
            </div>

            {/* Pref chips */}
            <div style={{ padding: "0 24px 16px" }}>
              <div style={{ fontSize: "11px", color: T.textMuted, fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "9px" }}>Your Preferences</div>
              <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                {Object.entries(preferences).map(([k, v]) => (
                  <span key={k} style={{ background: T.primaryLight, color: T.primary, borderRadius: "20px", padding: "5px 14px", fontSize: "11px", fontWeight: "800", textTransform: "capitalize" }}>{v}</span>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div style={{ padding: "0 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "800", color: T.text }}>Recommended for You</div>
                <span style={{ background: T.greenLight, color: T.green, borderRadius: "20px", padding: "3px 11px", fontSize: "11px", fontWeight: "800" }}>{filtered.length} trips</span>
              </div>
              {filtered.length === 0
                ? <div style={{ textAlign: "center", padding: "36px 20px", background: T.surface, borderRadius: "20px", border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
                    <div style={{ fontSize: "36px", marginBottom: "10px" }}>🔍</div>
                    <div style={{ fontSize: "13px", color: T.textSub, fontWeight: "600" }}>No trips match. Try updating preferences!</div>
                  </div>
                : <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    {filtered.map((trip) => <TripCard key={trip.id} trip={trip} saved={savedTrips.includes(trip.id)} onSave={toggleSave} />)}
                  </div>
              }

              {TRIPS.filter((t) => !filtered.find((f) => f.id === t.id)).length > 0 && (
                <>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: "800", color: T.text, margin: "22px 0 14px" }}>Explore All</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    {TRIPS.filter((t) => !filtered.find((f) => f.id === t.id)).map((trip) => <TripCard key={trip.id} trip={trip} saved={savedTrips.includes(trip.id)} onSave={toggleSave} />)}
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* ── SAVED ── */}
        {activeTab === "saved" && (
          <div style={{ padding: "54px 24px 0" }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "22px", fontWeight: "800", color: T.text, marginBottom: "4px" }}>Saved Trips ❤️</div>
            <div style={{ fontSize: "12px", color: T.textMuted, fontWeight: "700", marginBottom: "22px" }}>{savedTrips.length} destinations saved</div>
            {savedTrips.length === 0
              ? <div style={{ textAlign: "center", padding: "60px 20px", background: T.surface, borderRadius: "24px", border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
                  <div style={{ fontSize: "48px", marginBottom: "14px" }}>🤍</div>
                  <div style={{ fontSize: "14px", color: T.textSub, fontWeight: "600" }}>No saved trips yet. Heart a destination!</div>
                </div>
              : <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  {TRIPS.filter((t) => savedTrips.includes(t.id)).map((trip) => <TripCard key={trip.id} trip={trip} saved onSave={toggleSave} />)}
                </div>
            }
          </div>
        )}

        {/* ── PROFILE ── */}
        {activeTab === "profile" && (
          <div style={{ padding: "54px 24px 0" }}>
            <div style={{ textAlign: "center", marginBottom: "22px" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "22px", background: `linear-gradient(135deg, ${user?.color || T.primary}, ${T.primary}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "800", color: "#fff", margin: "0 auto 10px", boxShadow: `0 8px 28px ${user?.color || T.primary}40` }}>
                {user?.avatar}
              </div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", fontWeight: "800", color: T.text }}>{user?.name}</div>
              <div style={{ fontSize: "12px", color: T.textMuted, marginTop: "2px", fontWeight: "600" }}>{user?.email}</div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "18px" }}>
              {[
                { label: "Saved",   val: savedTrips.length, icon: "❤️", bg: T.accentLight,  c: T.accent  },
                { label: "Trips",   val: 3,                 icon: "✈️", bg: T.primaryLight, c: T.primary },
                { label: "Wishlist",val: 8,                 icon: "🌟", bg: T.amberLight,   c: T.amber   },
              ].map((s) => (
                <div key={s.label} style={{ background: s.bg, borderRadius: "16px", padding: "16px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: "22px", marginBottom: "4px" }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", fontWeight: "800", color: s.c }}>{s.val}</div>
                  <div style={{ fontSize: "10px", color: T.textMuted, fontWeight: "700" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Preferences */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: "20px", padding: "18px", marginBottom: "14px", boxShadow: T.shadow }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: "800", color: T.text, marginBottom: "14px" }}>Travel Preferences</div>
              {Object.entries(preferences).map(([k, v], idx, arr) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: idx < arr.length - 1 ? "10px" : 0, marginBottom: idx < arr.length - 1 ? "10px" : 0, borderBottom: idx < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                  <span style={{ fontSize: "12px", color: T.textSub, fontWeight: "700", textTransform: "capitalize" }}>{k}</span>
                  <span style={{ fontSize: "12px", fontWeight: "800", color: T.primary, background: T.primaryLight, borderRadius: "20px", padding: "2px 11px", textTransform: "capitalize" }}>{v}</span>
                </div>
              ))}
            </div>

            <button onClick={() => { setScreen("quiz"); setQuizStep(0); }} style={{ width: "100%", background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, border: "none", borderRadius: "16px", padding: "16px", color: "#fff", fontSize: "14px", fontWeight: "800", cursor: "pointer", fontFamily: "'Nunito', sans-serif", boxShadow: "0 8px 24px rgba(91,108,248,0.24)", marginBottom: "10px" }}>
              ✨ Update Preferences via Quiz
            </button>
            <button onClick={() => setScreen("login")} style={{ width: "100%", background: T.surface, border: `1.5px solid ${T.border}`, borderRadius: "16px", padding: "14px", color: T.textSub, fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, background: T.surface, borderTop: `1px solid ${T.border}`, borderRadius: "0 0 44px 44px", padding: "10px 0 26px", display: "flex", justifyContent: "space-around", boxShadow: "0 -4px 20px rgba(91,108,248,0.07)" }}>
        {[
          { id: "home",    icon: "🏠", label: "Home"     },
          { id: "quiz",    icon: "✨", label: "Discover" },
          { id: "saved",   icon: "❤️", label: "Saved"    },
          { id: "profile", icon: "👤", label: "Profile"  },
        ].map((tab) => {
          const active = activeTab === tab.id && tab.id !== "quiz";
          return (
            <button key={tab.id} onClick={() => tab.id === "quiz" ? (setScreen("quiz"), setQuizStep(0)) : setActiveTab(tab.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "4px 16px", fontFamily: "'Nunito', sans-serif" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", background: active ? T.primaryLight : "transparent", transition: "all 0.2s", fontSize: "19px" }}>
                {tab.icon}
              </div>
              <span style={{ fontSize: "10px", color: active ? T.primary : T.textMuted, fontWeight: active ? "800" : "600", transition: "color 0.2s" }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
