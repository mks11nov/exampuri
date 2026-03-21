/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   ExamPuri — Master Configuration File                       ║
 * ║   Edit this file to update all pages simultaneously          ║
 * ║   No other file needs to be touched for data/API changes     ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║   ⚠️  LOCAL DEVELOPMENT — CORS NOTE                          ║
 * ║   The API at prepare.exampuri.in blocks requests from        ║
 * ║   origin:null (which is what file:// sends).                 ║
 * ║                                                              ║
 * ║   ✅  Works automatically on: https://exampuri.in            ║
 * ║   ✅  Works locally with a server:                           ║
 * ║       npx serve .          (Node — no install needed)        ║
 * ║       python -m http.server 8000  (Python built-in)          ║
 * ║       Then open: http://localhost:8000/pages/ssc.html        ║
 * ║                                                              ║
 * ║   ❌  Does NOT work: opening ssc.html directly as a file     ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

window.EP_CONFIG = {

  /* ─────────────────────────────────────────
     BRAND
  ───────────────────────────────────────── */
  brand: {
    name:      "ExamPuri",
    logo:      "https://prepare.exampuri.in/static/media/wl_client_images/66c76db57aaf4247bfd09bf13b0c6aae.jpeg",
    phone:     "+91-96317 15181",
    phoneHref: "tel:+919631715181",
    email:     "mynewguruji@gmail.com",
    whatsapp:  "https://wa.me/919631715181",
    baseUrl:   "https://prepare.exampuri.in",   // product URL all CTAs point to
    siteUrl:   "https://exampuri.in",           // marketing site URL
  },

  /* ─────────────────────────────────────────
     API ENDPOINTS  ← Change these anytime
     All pages read from here automatically

     HOW THE PROXY WORKS:
     ┌─────────────────────────────────────────────────────┐
     │  Browser → localhost:3000/proxy/api/...             │
     │         → server.js forwards to prepare.exampuri.in │
     │         → adds CORS headers → returns to browser    │
     └─────────────────────────────────────────────────────┘

     On production (exampuri.in), the browser calls
     prepare.exampuri.in directly — no proxy needed.
  ───────────────────────────────────────── */
  api: {
    // Auto-detect environment:
    //   localhost → use proxy (avoids CORS)
    //   production → call API directly
    get baseUrl() {
      const h = window.location.hostname;
      if (h === 'localhost' || h === '127.0.0.1') {
        return window.location.origin + '/proxy';   // → server.js proxy
      }
      return 'https://prepare.exampuri.in';          // → direct in production
    },

    // L1: returns exam categories for a catalog node
    l1:          "/api/v1/ecatalog/L1/{nodeId}",

    // L2: returns exam list for a category
    l2:          "/api/v1/ecatalog/L2/{categoryId}",

    // Image base URL for exam thumbnails
    imgBase:     "https://prepare.exampuri.in",

    // Fallback image when exam image fails to load
    imgFallback: "https://prepare.exampuri.in/static/images/Image1_wl.png",
  },

  /* ─────────────────────────────────────────
     PAGES — one entry per landing page
     nodeId:    L1 API node to load categories from
     categories: pre-seeded list, refreshed from API at runtime
  ───────────────────────────────────────── */
  pages: {

    ssc: {
      nodeId:       531,          // ← L1 API node ID for SSC
      examShort:    "SSC",
      slug:         "ssc",
      title:        { en: "SSC",       hi: "SSC" },
      subtitle:     { en: "CGL · CHSL · MTS · CPO · GD · Steno",
                      hi: "CGL · CHSL · MTS · CPO · GD · Steno" },
      heroHeadline: { en: "SSC Mein 20+ Marks Badhao — Ya Paise Wapas",
                      hi: "SSC में 20+ Marks बढ़ाओ — या पैसे वापस" },
      heroSub:      { en: "Real exam-level questions · Negative marking mastery · All India Rank · 2,500+ full tests",
                      hi: "Real exam-level questions · Negative marking mastery · All India Rank · 2,500+ full tests" },
      price:        "₹299",
      priceOld:     "₹999",
      discount:     "70% OFF",
      freeLink:     "https://prepare.exampuri.in",
      buyLink:      "https://prepare.exampuri.in",
      color:        "#E8380D",     // accent for this exam page
      icon:         "📝",
      timerHours:   11,
      waMessage:    "SSC%20Test%20Series%20ke%20bare%20mein%20janna%20chahta%20hoon",
    },

    banking: {
      nodeId:       532,          // ← L1 API node ID for Banking  (update if different)
      examShort:    "Banking",
      slug:         "banking",
      title:        { en: "Banking",   hi: "बैंकिंग" },
      subtitle:     { en: "SBI PO · IBPS PO · Clerk · RRB · LIC",
                      hi: "SBI PO · IBPS PO · Clerk · RRB · LIC" },
      heroHeadline: { en: "Bank Exam Crack Karo — Guaranteed Strategy",
                      hi: "Bank Exam Crack करो — Guaranteed Strategy" },
      heroSub:      { en: "DI & Reasoning mastery · Sectional cutoff tracker · 1,800+ tests · All India Rank",
                      hi: "DI & Reasoning mastery · Sectional cutoff tracker · 1,800+ tests · All India Rank" },
      price:        "₹399",
      priceOld:     "₹1,299",
      discount:     "69% OFF",
      freeLink:     "https://prepare.exampuri.in",
      buyLink:      "https://prepare.exampuri.in",
      color:        "#1565C0",
      icon:         "🏦",
      timerHours:   11,
      waMessage:    "Banking%20Test%20Series%20ke%20bare%20mein%20puchna%20tha",
    },

    railway: {
      nodeId:       533,          // ← L1 API node ID for Railway (update if different)
      examShort:    "Railway",
      slug:         "railway",
      title:        { en: "Railway",   hi: "रेलवे" },
      subtitle:     { en: "RRB NTPC · Group D · ALP · JE",
                      hi: "RRB NTPC · Group D · ALP · JE" },
      heroHeadline: { en: "Railway Job Pakki Karo — Smart Hindi Preparation",
                      hi: "Railway Job पक्की करो — Smart Hindi Preparation" },
      heroSub:      { en: "100% Hindi medium · CBT simulation · Weekly GK updates · 1,200+ tests",
                      hi: "100% Hindi medium · CBT simulation · Weekly GK updates · 1,200+ tests" },
      price:        "₹199",
      priceOld:     "₹799",
      discount:     "75% OFF",
      freeLink:     "https://prepare.exampuri.in",
      buyLink:      "https://prepare.exampuri.in",
      color:        "#2E7D32",
      icon:         "🚂",
      timerHours:   11,
      waMessage:    "Railway%20Test%20Series%20ke%20bare%20mein%20janna%20chahta%20hoon",
    },

    upsc: {
      nodeId:       534,
      examShort:    "UPSC",
      slug:         "upsc",
      title:        { en: "UPSC",      hi: "UPSC" },
      subtitle:     { en: "CSE · CAPF · CDS · NDA",
                      hi: "CSE · CAPF · CDS · NDA" },
      heroHeadline: { en: "UPSC Crack Karo — Structured Smart Practice",
                      hi: "UPSC Crack करो — Structured Smart Practice" },
      heroSub:      { en: "GS Paper I–IV · CSAT · Essay evaluation · 800+ tests · All India Rank",
                      hi: "GS Paper I–IV · CSAT · Essay evaluation · 800+ tests · All India Rank" },
      price:        "₹699",
      priceOld:     "₹2,499",
      discount:     "72% OFF",
      freeLink:     "https://prepare.exampuri.in",
      buyLink:      "https://prepare.exampuri.in",
      color:        "#F9A825",
      icon:         "🏛️",
      timerHours:   11,
      waMessage:    "UPSC%20Test%20Series%20ke%20bare%20mein%20janna%20chahta%20hoon",
    },

  },

  /* ─────────────────────────────────────────
     PRICING TABLE  (used on pricing.html)
  ───────────────────────────────────────── */
  pricing: [
    {
      id:       "free",
      label:    { en: "Free Starter",     hi: "Free Starter" },
      badge:    "badge-blue",
      icon:     "🆓",
      price:    "₹0",
      priceOld: null,
      period:   { en: "Forever free",     hi: "हमेशा के लिए free" },
      popular:  false,
      features: [
        { ok: true,  text: { en: "5 Full Mock Tests",           hi: "5 Full Mock Tests" } },
        { ok: true,  text: { en: "Basic Analytics",             hi: "Basic Analytics" } },
        { ok: true,  text: { en: "Sample PYQ Questions",        hi: "Sample PYQ Questions" } },
        { ok: false, text: { en: "All India Rank",              hi: "All India Rank" } },
        { ok: false, text: { en: "Negative Marking Drill",      hi: "Negative Marking Drill" } },
        { ok: false, text: { en: "Doubt Solving",               hi: "Doubt Solving" } },
      ],
      cta:      { en: "Start Free",       hi: "Free शुरू करो" },
      link:     "https://prepare.exampuri.in",
      btnClass: "btn-secondary",
    },
    {
      id:       "ssc",
      label:    { en: "SSC Complete",     hi: "SSC Complete" },
      badge:    "badge-accent",
      icon:     "📝",
      price:    "₹299",
      priceOld: "₹999",
      discount: "70% OFF",
      period:   { en: "One-time · Full validity", hi: "One-time · Full validity" },
      popular:  true,
      features: [
        { ok: true, text: { en: "2,500+ SSC Mock Tests",        hi: "2,500+ SSC Mock Tests" } },
        { ok: true, text: { en: "AI Performance Analysis",      hi: "AI Performance Analysis" } },
        { ok: true, text: { en: "PYQ Bank 2015–2024",           hi: "PYQ Bank 2015–2024" } },
        { ok: true, text: { en: "All India Live Rank",          hi: "All India Live Rank" } },
        { ok: true, text: { en: "Negative Marking Drill",       hi: "Negative Marking Drill" } },
        { ok: true, text: { en: "Doubt Solving (Hindi+English)", hi: "Doubt Solving (Hindi+English)" } },
      ],
      cta:      { en: "Get SSC Access",   hi: "SSC Access लो" },
      link:     "https://prepare.exampuri.in",
      btnClass: "btn-primary",
    },
    {
      id:       "banking",
      label:    { en: "Banking Complete", hi: "Banking Complete" },
      badge:    "badge-blue",
      icon:     "🏦",
      price:    "₹399",
      priceOld: "₹1,299",
      discount: "69% OFF",
      period:   { en: "One-time · Full validity", hi: "One-time · Full validity" },
      popular:  false,
      features: [
        { ok: true, text: { en: "1,800+ Banking Mock Tests",    hi: "1,800+ Banking Mock Tests" } },
        { ok: true, text: { en: "DI & Reasoning Focus",         hi: "DI & Reasoning Focus" } },
        { ok: true, text: { en: "Sectional Cutoff Tracker",     hi: "Sectional Cutoff Tracker" } },
        { ok: true, text: { en: "All India Rank",               hi: "All India Rank" } },
        { ok: true, text: { en: "Doubt Solving",                hi: "Doubt Solving" } },
      ],
      cta:      { en: "Get Banking Access", hi: "Banking Access लो" },
      link:     "https://prepare.exampuri.in",
      btnClass: "btn-blue",
    },
    {
      id:       "railway",
      label:    { en: "Railway Complete", hi: "Railway Complete" },
      badge:    "badge-green",
      icon:     "🚂",
      price:    "₹199",
      priceOld: "₹799",
      discount: "75% OFF",
      period:   { en: "One-time · Full validity", hi: "One-time · Full validity" },
      popular:  false,
      features: [
        { ok: true, text: { en: "1,200+ Railway Mock Tests",    hi: "1,200+ Railway Mock Tests" } },
        { ok: true, text: { en: "100% Hindi Medium",            hi: "100% Hindi Medium" } },
        { ok: true, text: { en: "CBT Interface Simulation",     hi: "CBT Interface Simulation" } },
        { ok: true, text: { en: "Weekly GK Updates",            hi: "Weekly GK Updates" } },
        { ok: true, text: { en: "All India Rank",               hi: "All India Rank" } },
      ],
      cta:      { en: "Get Railway Access", hi: "Railway Access लो" },
      link:     "https://prepare.exampuri.in",
      btnClass: "btn-green",
    },
    {
      id:       "upsc",
      label:    { en: "UPSC Complete",    hi: "UPSC Complete" },
      badge:    "badge-gold",
      icon:     "🏛️",
      price:    "₹699",
      priceOld: "₹2,499",
      discount: "72% OFF",
      period:   { en: "One-time · Full validity", hi: "One-time · Full validity" },
      popular:  false,
      features: [
        { ok: true, text: { en: "800+ Tests (Pre + Mains)",     hi: "800+ Tests (Pre + Mains)" } },
        { ok: true, text: { en: "GS Paper I–IV Coverage",       hi: "GS Paper I–IV Coverage" } },
        { ok: true, text: { en: "Essay Evaluation",             hi: "Essay Evaluation" } },
        { ok: true, text: { en: "CSAT Practice",                hi: "CSAT Practice" } },
        { ok: true, text: { en: "All India Rank",               hi: "All India Rank" } },
      ],
      cta:      { en: "Get UPSC Access",  hi: "UPSC Access लो" },
      link:     "https://prepare.exampuri.in",
      btnClass: "btn-gold",
    },
    {
      id:       "all",
      label:    { en: "All Access",       hi: "All Access" },
      badge:    "badge-gold",
      icon:     "👑",
      price:    "₹999",
      priceOld: "₹4,999",
      discount: "80% OFF",
      period:   { en: "One-time · Lifetime validity", hi: "One-time · Lifetime validity" },
      popular:  false,
      featured: true,
      features: [
        { ok: true, text: { en: "All Exam Packs Included",      hi: "सभी Exam Packs Included" } },
        { ok: true, text: { en: "10,000+ Tests",                hi: "10,000+ Tests" } },
        { ok: true, text: { en: "Priority Doubt Solving",       hi: "Priority Doubt Solving" } },
        { ok: true, text: { en: "Lifetime Validity",            hi: "Lifetime Validity" } },
        { ok: true, text: { en: "Early Access to New Tests",    hi: "New Tests का Early Access" } },
      ],
      cta:      { en: "Get All Access",   hi: "All Access लो" },
      link:     "https://prepare.exampuri.in",
      btnClass: "btn-primary",
    },
  ],

  /* ─────────────────────────────────────────
     TESTIMONIALS  (shown across all pages)
  ───────────────────────────────────────── */
  testimonials: [
    { name:"Rohit Verma",   city:"Lucknow",  exam:"SSC CGL 2024",  color:"#E8380D",
      text:{ en:"Scored 115 before, now consistently 138+. The negative marking drill changed everything.",
             hi:"पहले 115 marks आते थे, अब consistently 138+ आ रहे हैं। Negative marking drill ने game बदल दिया।" }},
    { name:"Priya Yadav",   city:"Patna",    exam:"SBI PO 2024",   color:"#1565C0",
      text:{ en:"Feels exactly like the real exam. Analytics pinpointed exactly where I was losing marks.",
             hi:"Bilkul real exam jaisa feel hota hai. Analytics ne exactly bataya kahan marks ja rahe the." }},
    { name:"Amit Singh",    city:"Kanpur",   exam:"SSC CGL Mains", color:"#2E7D32",
      text:{ en:"₹299 for all this? 10x better than coaching. Cleared cut-off by 12 marks on first attempt.",
             hi:"₹299 mein itna? Coaching se 10x better. Pehle attempt mein cut-off se 12 marks zyada." }},
    { name:"Sunita Devi",   city:"Varanasi", exam:"RRB NTPC 2024", color:"#F9A825",
      text:{ en:"Hindi medium interface is perfect. Cleared CBT 1 in first attempt after 30 days of practice.",
             hi:"Hindi medium interface bilkul perfect. 30 din ki practice ke baad pehle attempt mein CBT 1 clear." }},
    { name:"Rahul Gupta",   city:"Gorakhpur",exam:"IBPS PO 2024",  color:"#7C3AED",
      text:{ en:"DI practice on ExamPuri is the best I found. Sectional cutoff tracker is a game-changer.",
             hi:"ExamPuri par DI practice best hai. Sectional cutoff tracker game-changer hai." }},
    { name:"Pooja Sharma",  city:"Jaipur",   exam:"SSC CHSL 2024", color:"#0D47A1",
      text:{ en:"7-day refund gave me confidence to try. Now permanent user. Results prove everything!",
             hi:"7-day refund ne try karne ka confidence diya. Ab permanent user hoon. Results sab bol dete hain!" }},
  ],

  /* ─────────────────────────────────────────
     FAQ  (per-page overrides possible)
  ───────────────────────────────────────── */
  faq: [
    { q:{ en:"Is this for Hindi medium students?",
          hi:"क्या यह Hindi medium students के लिए है?" },
      a:{ en:"Yes! All explanations in Hindi. Simple mobile-friendly UI designed for Hindi-medium aspirants.",
          hi:"हाँ! सभी explanations Hindi में। Simple mobile-friendly UI जो Hindi-medium aspirants के लिए बनाया है।" }},
    { q:{ en:"How long is the access validity?",
          hi:"Access validity कितनी है?" },
      a:{ en:"Full exam validity — access until your target exam date. No early expiry.",
          hi:"Full exam validity — exam date तक access। Early expiry नहीं होगी।" }},
    { q:{ en:"What if my marks don't improve?",
          hi:"अगर marks improve नहीं हुए तो?" },
      a:{ en:"7-day money-back guarantee — full refund, no questions asked.",
          hi:"7-day money-back guarantee — full refund, कोई सवाल नहीं।" }},
    { q:{ en:"What does the free plan include?",
          hi:"Free plan में क्या मिलता है?" },
      a:{ en:"5 full mock tests, basic analytics, sample PYQs — completely free, no credit card needed.",
          hi:"5 full mock tests, basic analytics, sample PYQs — bilkul free, credit card नहीं चाहिए।" }},
    { q:{ en:"Does it work on mobile?",
          hi:"क्या mobile पर काम करता है?" },
      a:{ en:"100%! Full app-like experience in your mobile browser. No download needed. Android & iOS both.",
          hi:"100%! Mobile browser में ही full app-like experience। Download नहीं चाहिए। Android & iOS दोनों।" }},
    { q:{ en:"Is one-time payment really for the full exam period?",
          hi:"One-time payment में पूरे exam period तक access मिलेगी?" },
      a:{ en:"Yes. You pay once and get full access until your exam. No monthly charges, no renewals.",
          hi:"हाँ। एक बार pay करो और exam तक full access। कोई monthly charges नहीं, कोई renewal नहीं।" }},
  ],

  /* ─────────────────────────────────────────
     ANALYTICS (replace with real IDs)
  ───────────────────────────────────────── */
  analytics: {
    ga4Id:       "G-XXXXXXXXXX",     // Google Analytics 4 ID
    metaPixelId: "XXXXXXXXXXXXXXXX", // Meta Pixel ID
    enabled:     false,              // set true to activate
  },

};
