/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  ExamPuri — Static Exam Data  (assets/exam-data.js)              ║
 * ╠═══════════════════════════════════════════════════════════════════╣
 * ║  HOW TO ADD / UPDATE EXAMS:                                       ║
 * ║  1. Find the category under the right page key (ssc/banking…)    ║
 * ║  2. Add exam objects inside its `exams: []` array                ║
 * ║  3. Each exam needs:                                              ║
 * ║       name  — display name                                        ║
 * ║       url   — path from prepare.exampuri.in  e.g. /tests/123/…  ║
 * ║       image — image path, or "" to auto-generate avatar          ║
 * ║                                                                   ║
 * ║  To get exam URLs fast:                                           ║
 * ║    Open prepare.exampuri.in → go to any test series page         ║
 * ║    Copy the path from the address bar after the domain            ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

window.EP_EXAMS = {

  /* ═══════════════════════════════════════════════════════
     SSC — 12 categories confirmed from API L1/531
  ═══════════════════════════════════════════════════════ */
  ssc: [
    {
      id: 82, name: "SSC CGL (Tier 1 & 2)", icon: "📝",
      categoryUrl: "/ecatalog/82/ssc-cgl-tier-1-2",
      exams: [
        { name: "SSC CGL Tier 1 — Full Mock Test",     url: "/ecatalog/82/ssc-cgl-tier-1-2", image: "" },
        { name: "SSC CGL Tier 2 — Full Mock Test",     url: "/ecatalog/82/ssc-cgl-tier-1-2", image: "" },
        { name: "SSC CGL Previous Year Papers",        url: "/ecatalog/82/ssc-cgl-tier-1-2", image: "" },
        { name: "SSC CGL Sectional Tests",             url: "/ecatalog/82/ssc-cgl-tier-1-2", image: "" },
      ],
    },
    {
      id: 73, name: "SSC CHSL (10+2 Level)", icon: "📋",
      categoryUrl: "/ecatalog/73/chsl-combined-higher-secondary-level",
      exams: [
        { name: "SSC CHSL Tier 1 — Full Mock Test",    url: "/ecatalog/73/chsl-combined-higher-secondary-level", image: "" },
        { name: "SSC CHSL Tier 2 — Full Mock Test",    url: "/ecatalog/73/chsl-combined-higher-secondary-level", image: "" },
        { name: "SSC CHSL Previous Year Papers",       url: "/ecatalog/73/chsl-combined-higher-secondary-level", image: "" },
      ],
    },
    {
      id: 88, name: "SSC MTS", icon: "📄",
      categoryUrl: "/ecatalog/88/ssc-mts",
      exams: [
        { name: "SSC MTS Paper 1 — Full Mock Test",    url: "/ecatalog/88/ssc-mts", image: "" },
        { name: "SSC MTS Paper 2 — Full Mock Test",    url: "/ecatalog/88/ssc-mts", image: "" },
        { name: "SSC MTS Previous Year Papers",        url: "/ecatalog/88/ssc-mts", image: "" },
      ],
    },
    {
      id: 134, name: "SSC CPO (Sub Inspector)", icon: "🚔",
      categoryUrl: "/ecatalog/134/ssc-sub-inspector-cpo",
      exams: [
        { name: "SSC CPO Paper 1 — Full Mock Test",    url: "/ecatalog/134/ssc-sub-inspector-cpo", image: "" },
        { name: "SSC CPO Paper 2 — Full Mock Test",    url: "/ecatalog/134/ssc-sub-inspector-cpo", image: "" },
        { name: "SSC CPO Previous Year Papers",        url: "/ecatalog/134/ssc-sub-inspector-cpo", image: "" },
      ],
    },
    {
      id: 80, name: "SSC Constable GD", icon: "👮",
      categoryUrl: "/ecatalog/80/ssc-constable-gd",
      exams: [
        { name: "SSC GD Constable — Full Mock Test",   url: "/ecatalog/80/ssc-constable-gd", image: "" },
        { name: "SSC GD Constable — PYQ Papers",       url: "/ecatalog/80/ssc-constable-gd", image: "" },
      ],
    },
    {
      id: 142, name: "Stenographer (Grade C & D)", icon: "⌨️",
      categoryUrl: "/ecatalog/142/stenographer-grades-c-and-d",
      exams: [
        { name: "Steno Grade C — Full Mock Test",      url: "/ecatalog/142/stenographer-grades-c-and-d", image: "" },
        { name: "Steno Grade D — Full Mock Test",      url: "/ecatalog/142/stenographer-grades-c-and-d", image: "" },
      ],
    },
    {
      id: 1373, name: "SSC CET (Common Entrance Test)", icon: "📝",
      categoryUrl: "/ecatalog/1373/ssc-common-entrance-test-cet",
      exams: [
        { name: "SSC CET — Full Mock Test",            url: "/ecatalog/1373/ssc-common-entrance-test-cet", image: "" },
        { name: "SSC CET — Previous Year Papers",      url: "/ecatalog/1373/ssc-common-entrance-test-cet", image: "" },
      ],
    },
    {
      id: 839, name: "SSC Selection Post", icon: "🏅",
      categoryUrl: "/ecatalog/839/ssc-selection-post",
      exams: [
        { name: "SSC Selection Post Phase 12",         url: "/ecatalog/839/ssc-selection-post", image: "" },
        { name: "SSC Selection Post Previous Years",   url: "/ecatalog/839/ssc-selection-post", image: "" },
      ],
    },
    {
      id: 190, name: "BSSC (Bihar SSC)", icon: "🏅",
      categoryUrl: "/ecatalog/190/bihar-staff-selection-commission-bssc",
      exams: [
        // Confirmed from API L2/190
        { name: "BSSC CGL",          url: "/tests/2057/bssc-cgl",         image: "/static/media/wl_client/251995/l2_exam_images/fda3948419084ddcb213ca6b30c64326.png" },
        { name: "BSSC Stenographer", url: "/tests/191/bssc-stenographer",  image: "/static/media/wl_client/251995/l2_exam_images/89d4c55b296848b9bae050e4bc4c49f3.png" },
        { name: "BSSC Inter Level",  url: "/tests/1705/bssc-inter-level",  image: "/static/media/wl_client_exam_images/1/6fcdafed86d64c7eb0bf40c11c0dad65.JPG" },
      ],
    },
    {
      id: 889, name: "SSC Pradhyapak", icon: "🎓",
      categoryUrl: "/ecatalog/889/ssc-pradhyapak",
      exams: [
        { name: "SSC Pradhyapak — Full Mock Test",     url: "/ecatalog/889/ssc-pradhyapak", image: "" },
      ],
    },
    {
      id: 697, name: "SSC Translator", icon: "🗣️",
      categoryUrl: "/ecatalog/697/ssc-translator",
      exams: [
        { name: "SSC Junior Translator — Mock Test",   url: "/ecatalog/697/ssc-translator", image: "" },
      ],
    },
    {
      id: 1169, name: "SSC Scientific Assistant", icon: "🔬",
      categoryUrl: "/ecatalog/1169/ssc-scientific-assistant",
      exams: [
        { name: "SSC Scientific Assistant IMD",        url: "/ecatalog/1169/ssc-scientific-assistant", image: "" },
      ],
    },
  ],

  /* ═══════════════════════════════════════════════════════
     BANKING — share prepare.exampuri.in/exams/banking/...
     and I'll fill these exactly like SSC above
  ═══════════════════════════════════════════════════════ */
  banking: [
    {
      id: 201, name: "SBI PO", icon: "🏦",
      categoryUrl: "/",
      exams: [
        { name: "SBI PO Prelims — Full Mock",          url: "/", image: "" },
        { name: "SBI PO Mains — Full Mock",            url: "/", image: "" },
        { name: "SBI PO Previous Year Papers",         url: "/", image: "" },
      ],
    },
    {
      id: 202, name: "IBPS PO", icon: "📋",
      categoryUrl: "/",
      exams: [
        { name: "IBPS PO Prelims — Full Mock",         url: "/", image: "" },
        { name: "IBPS PO Mains — Full Mock",           url: "/", image: "" },
      ],
    },
    {
      id: 203, name: "IBPS Clerk", icon: "📝",
      categoryUrl: "/",
      exams: [
        { name: "IBPS Clerk Prelims — Full Mock",      url: "/", image: "" },
        { name: "IBPS Clerk Mains — Full Mock",        url: "/", image: "" },
      ],
    },
    {
      id: 204, name: "SBI Clerk", icon: "🏦",
      categoryUrl: "/",
      exams: [
        { name: "SBI Clerk Prelims — Full Mock",       url: "/", image: "" },
        { name: "SBI Clerk Mains — Full Mock",         url: "/", image: "" },
      ],
    },
    {
      id: 205, name: "RRB PO / Clerk", icon: "🚂",
      categoryUrl: "/",
      exams: [
        { name: "RRB PO Prelims — Full Mock",          url: "/", image: "" },
        { name: "RRB Clerk Prelims — Full Mock",       url: "/", image: "" },
      ],
    },
    {
      id: 206, name: "LIC AAO / ADO", icon: "💼",
      categoryUrl: "/",
      exams: [
        { name: "LIC AAO Prelims — Full Mock",         url: "/", image: "" },
        { name: "LIC ADO Prelims — Full Mock",         url: "/", image: "" },
      ],
    },
  ],

  /* ═══════════════════════════════════════════════════════
     RAILWAY — share prepare.exampuri.in/exams/railway/...
  ═══════════════════════════════════════════════════════ */
  railway: [
    {
      id: 301, name: "RRB NTPC", icon: "🚂",
      categoryUrl: "/",
      exams: [
        { name: "RRB NTPC CBT 1 — Full Mock",          url: "/", image: "" },
        { name: "RRB NTPC CBT 2 — Full Mock",          url: "/", image: "" },
        { name: "RRB NTPC Previous Year Papers",       url: "/", image: "" },
      ],
    },
    {
      id: 302, name: "RRB Group D", icon: "⚙️",
      categoryUrl: "/",
      exams: [
        { name: "RRB Group D CBT — Full Mock",         url: "/", image: "" },
        { name: "RRB Group D Previous Year",           url: "/", image: "" },
      ],
    },
    {
      id: 303, name: "RRB ALP", icon: "🔧",
      categoryUrl: "/",
      exams: [
        { name: "RRB ALP CBT 1 — Full Mock",           url: "/", image: "" },
        { name: "RRB ALP CBT 2 — Full Mock",           url: "/", image: "" },
      ],
    },
    {
      id: 304, name: "RRB JE", icon: "📐",
      categoryUrl: "/",
      exams: [
        { name: "RRB JE CBT 1 — Full Mock",            url: "/", image: "" },
        { name: "RRB JE CBT 2 — Full Mock",            url: "/", image: "" },
      ],
    },
  ],

  /* ═══════════════════════════════════════════════════════
     UPSC — share prepare.exampuri.in/exams/upsc/...
  ═══════════════════════════════════════════════════════ */
  upsc: [
    {
      id: 401, name: "UPSC CSE Prelims", icon: "🏛️",
      categoryUrl: "/",
      exams: [
        { name: "GS Paper 1 — Full Mock",              url: "/", image: "" },
        { name: "CSAT — Full Mock",                    url: "/", image: "" },
        { name: "UPSC Prelims PYQ Papers",             url: "/", image: "" },
      ],
    },
    {
      id: 402, name: "UPSC CSE Mains", icon: "📜",
      categoryUrl: "/",
      exams: [
        { name: "GS Paper 1 Mains Mock",               url: "/", image: "" },
        { name: "GS Paper 2 Mains Mock",               url: "/", image: "" },
        { name: "Essay Paper Mock",                    url: "/", image: "" },
      ],
    },
    {
      id: 403, name: "CAPF", icon: "🎖️",
      categoryUrl: "/",
      exams: [
        { name: "CAPF Paper 1 — Full Mock",            url: "/", image: "" },
        { name: "CAPF Paper 2 — Full Mock",            url: "/", image: "" },
      ],
    },
  ],

};
