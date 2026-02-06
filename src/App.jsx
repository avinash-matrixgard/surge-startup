import { useState, useRef } from "react";

const SECTIONS = [
  { id: "birth", title: "The Birth of the Idea", page: 1 },
  { id: "threep", title: "The 3P Framework", page: 2 },
  { id: "market", title: "Market Map", page: 3 },
  { id: "leverage", title: "Leverage Map", page: 4 },
  { id: "unlearn", title: "Unlearn to Earn", page: 5 },
  { id: "founder", title: "Founder Fit Test", page: 6 },
  { id: "canvas", title: "Validation Canvas", page: 7 },
  { id: "mvp", title: "MVP", page: 8 },
  { id: "team", title: "Early Team", page: 9 },
  { id: "checklist", title: "Validation Checklist", page: 10 },
];

const FOUNDER_STATEMENTS = [
  "I enjoy solving tough problems.",
  "I can handle chaos with calm.",
  "I learn quickly from mistakes.",
  "I can sell ideas I believe in.",
  "I stay focused under uncertainty.",
  "I attract motivated people.",
  "I can make decisions with limited info.",
  "I turn feedback into upgrades.",
  "I value impact over applause.",
  "I see failure as feedback, not fear.",
];

const CHECKLIST_ITEMS = [
  "I have defined my ideal customer clearly.",
  "I have validated the pain with at least 5 strangers.",
  "At least 3 of them said they will pay.",
  "I have priced my idea.",
  "I have one small MVP ready.",
  "I have received my first payment or promise to pay.",
  "I have refined my pitch after feedback.",
  "I have documented all feedback loops.",
  "I have set 30-day validation goals.",
  "I have built confidence through clarity.",
];

const LEVERAGE_ASSETS = [
  { asset: "Skill", example: "Sales, writing", leverage: "Offer your skill as a service first" },
  { asset: "Knowledge", example: "Industry insights", leverage: "Build content or consultancy" },
  { asset: "Network", example: "Colleagues, mentors", leverage: "Find early customers" },
  { asset: "Access", example: "Tools, platforms", leverage: "Build faster with what exists" },
  { asset: "Credibility", example: "Track record", leverage: "Convert trust into traction" },
  { asset: "Time", example: "Evenings/weekends", leverage: "Build without quitting" },
  { asset: "Energy", example: "Enthusiasm, drive", leverage: "Create consistent momentum" },
  { asset: "Tools", example: "Workfast.ai modules", leverage: "Automate early steps" },
  { asset: "Team", example: "Interns, collaborators", leverage: "Multiply execution" },
  { asset: "Social", example: "Audience or community", leverage: "Validate ideas publicly" },
];

const UNLEARN_HABITS = [
  { old: "Waiting for approval", replace: "Taking initiative" },
  { old: "Planning endlessly", replace: "Testing fast" },
  { old: "Avoiding risk", replace: "Embracing smart risk" },
  { old: "Measuring effort", replace: "Measuring outcomes" },
  { old: "Talking big", replace: "Doing small, consistent" },
  { old: "Blaming others", replace: "Owning the outcome" },
  { old: "Seeking validation", replace: "Seeking feedback" },
  { old: "Thinking perfect", replace: "Launching rough" },
  { old: "Holding fear", replace: "Holding faith" },
  { old: "Worrying about failure", replace: "Learning from failure" },
];

function useLocalData(key, initial) {
  const [data, setData] = useState(initial);
  return [data, setData];
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%", padding: "12px 14px", border: "2px solid #e0e0e0",
        borderRadius: "10px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
        resize: "vertical", background: "#fafafa", transition: "border-color 0.2s, box-shadow 0.2s",
        outline: "none", lineHeight: 1.6, boxSizing: "border-box",
      }}
      onFocus={(e) => { e.target.style.borderColor = "#FFB800"; e.target.style.boxShadow = "0 0 0 3px rgba(255,184,0,0.15)"; e.target.style.background = "#fff"; }}
      onBlur={(e) => { e.target.style.borderColor = "#e0e0e0"; e.target.style.boxShadow = "none"; e.target.style.background = "#fafafa"; }}
    />
  );
}

function Quote({ text, author }) {
  return (
    <div style={{
      borderLeft: "4px solid #FFB800", padding: "12px 18px", margin: "20px 0",
      background: "linear-gradient(135deg, #FFF9E6 0%, #FFF4D6 100%)",
      borderRadius: "0 10px 10px 0", fontStyle: "italic", color: "#5a4a00", fontSize: "14px", lineHeight: 1.5,
    }}>
      {"\u201C"}{text}{"\u201D"} {"\u2014"} {author || "SK"}
    </div>
  );
}

function SectionCard({ title, icon, children, story }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "16px", padding: "32px", marginBottom: "28px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        <span style={{ fontSize: "28px" }}>{icon}</span>
        <h2 style={{ margin: 0, fontSize: "22px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.3px" }}>{title}</h2>
      </div>
      {story && (
        <div style={{ background: "#f8f8f8", borderRadius: "10px", padding: "14px 18px", marginBottom: "20px", fontSize: "13.5px", color: "#555", lineHeight: 1.6, borderLeft: "3px solid #ddd" }}>
          <span style={{ fontWeight: 600, color: "#888", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Story</span><br />{story}
        </div>
      )}
      {children}
    </div>
  );
}

function StarRating({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => onChange(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", padding: "2px",
            color: star <= (hover || value) ? "#FFB800" : "#ddd", transition: "color 0.15s, transform 0.15s",
            transform: star <= (hover || value) ? "scale(1.15)" : "scale(1)",
          }}>{"\u2605"}</button>
      ))}
    </div>
  );
}

function ProgressBar({ value, max }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "8px 0" }}>
      <div style={{ flex: 1, height: "8px", background: "#eee", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: pct >= 80 ? "#22c55e" : pct >= 50 ? "#FFB800" : "#ef4444", borderRadius: "4px", transition: "width 0.4s ease" }} />
      </div>
      <span style={{ fontSize: "13px", fontWeight: 600, color: "#666", minWidth: "40px" }}>{pct}%</span>
    </div>
  );
}

function buildPdfHtml(data) {
  var d = data;
  var esc = function(s) { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>"); };
  var ans = function(v) { return v ? esc(v) : '<span style="color:#999;font-style:italic;">Not answered</span>'; };
  var starStr = function(n) { var f = n || 0; return "\u2605".repeat(f) + "\u2606".repeat(5 - f); };
  var idTotal = function(idea) { return (idea.passion||0)+(idea.pain||0)+(idea.profit||0)+(idea.marketFit||0)+(idea.skillMatch||0); };

  var css = "body{font-family:Helvetica,Arial,sans-serif;max-width:750px;margin:0 auto;padding:40px 30px;color:#1a1a1a;font-size:13px;line-height:1.6;}" +
    "h1{text-align:center;font-size:24px;margin-bottom:4px;}" +
    ".sub{text-align:center;color:#888;font-size:13px;margin-bottom:40px;}" +
    "h2{font-size:17px;border-bottom:3px solid #FFB800;padding-bottom:6px;margin-top:36px;margin-bottom:16px;page-break-after:avoid;}" +
    ".qa{margin-bottom:14px;}" +
    ".q{font-weight:600;color:#333;margin-bottom:3px;}" +
    ".a{background:#f8f8f8;border-left:3px solid #FFB800;padding:8px 12px;border-radius:0 6px 6px 0;min-height:18px;}" +
    "table{width:100%;border-collapse:collapse;margin:12px 0;font-size:12px;}" +
    "th{background:#FFB800;color:#fff;padding:8px 10px;text-align:left;font-weight:600;}" +
    "td{padding:7px 10px;border-bottom:1px solid #eee;}" +
    "tr:nth-child(even){background:#fafafa;}" +
    ".sbox{text-align:center;margin:16px 0;padding:16px;border:2px solid #FFB800;border-radius:10px;background:#FFFBEB;}" +
    ".snum{font-size:36px;font-weight:800;}" +
    ".slbl{font-size:15px;font-weight:600;color:#666;margin-top:4px;}" +
    ".done{color:#16a34a;font-weight:600;}" +
    ".pend{color:#999;}" +
    ".foot{text-align:center;margin-top:40px;padding-top:16px;border-top:2px solid #eee;color:#888;font-size:11px;}" +
    "@media print{body{padding:20px;}}";

  var qa = function(q, v) { return '<div class="qa"><div class="q">' + esc(q) + '</div><div class="a">' + ans(v) + '</div></div>'; };

  var parts = [];
  parts.push("<!DOCTYPE html><html><head><meta charset=\"utf-8\"/><title>Founders Compass Part 2</title><style>" + css + "</style></head><body>");
  parts.push("<h1>Founders Compass &mdash; Part 2</h1>");
  parts.push('<div class="sub">Idea to Validation &bull; Surge Startups &bull; workfast.ai/surge-startups</div>');

  // 1
  parts.push("<h2>1. The Birth of the Idea</h2>");
  parts.push(qa("What problem frustrates you enough to fix it?", d.birthReflection.q1));
  parts.push(qa("What do people around you constantly complain about?", d.birthReflection.q2));
  parts.push(qa("What idea do you find impossible to ignore?", d.birthReflection.q3));

  // 2
  parts.push("<h2>2. The 3P Framework: Passion, Pain, Profit</h2>");
  parts.push("<table><tr><th>Idea</th><th>Passion</th><th>Pain</th><th>Profit</th><th>Market Fit</th><th>Skill Match</th><th>Total</th></tr>");
  d.ideas.forEach(function(idea, i) {
    parts.push("<tr><td>" + esc(idea.name || ("Idea " + (i+1))) + "</td><td>" + starStr(idea.passion) + "</td><td>" + starStr(idea.pain) + "</td><td>" + starStr(idea.profit) + "</td><td>" + starStr(idea.marketFit) + "</td><td>" + starStr(idea.skillMatch) + "</td><td><strong>" + idTotal(idea) + "/25</strong></td></tr>");
  });
  parts.push("</table>");
  parts.push(qa("Which idea aligns with both your energy and expertise?", d.threepReflection));

  // 3
  parts.push("<h2>3. Market Map: TAM, SAM, SOM</h2>");
  parts.push(qa("TAM \u2014 Total Addressable Market", d.market.tam));
  parts.push(qa("SAM \u2014 Serviceable Available Market", d.market.sam));
  parts.push(qa("SOM \u2014 Serviceable Obtainable Market", d.market.som));
  parts.push(qa("Who exactly am I serving?", d.market.q1));
  parts.push(qa("How big is my real reachable market?", d.market.q2));
  parts.push(qa("What niche can I win first before I scale?", d.market.q3));

  // 4
  parts.push("<h2>4. Leverage Map</h2>");
  parts.push(qa("What 3 things do I already possess that can speed my journey?", d.leverageNotes.q1));
  parts.push(qa("Who in my network can open the first door?", d.leverageNotes.q2));
  parts.push(qa("What am I underutilizing that others would pay for?", d.leverageNotes.q3));

  // 5
  parts.push("<h2>5. Unlearn to Earn</h2>");
  parts.push(qa("Which habit is your biggest bottleneck?", d.unlearnNotes.biggest));
  parts.push(qa("What one belief can you unlearn this week?", d.unlearnNotes.q2));
  parts.push(qa("What will you replace it with?", d.unlearnNotes.q3));

  // 6
  parts.push("<h2>6. Founder Fit Test</h2>");
  parts.push("<table><tr><th>Statement</th><th>Rating</th></tr>");
  FOUNDER_STATEMENTS.forEach(function(stmt, i) {
    parts.push("<tr><td>" + esc(stmt) + "</td><td>" + starStr(d.founderScores[i]) + " (" + (d.founderScores[i]||0) + "/5)</td></tr>");
  });
  parts.push("</table>");
  parts.push('<div class="sbox"><div class="snum">' + d.founderTotal + '/50</div><div class="slbl">' + esc(d.founderLabel) + '</div></div>');

  // 7
  parts.push("<h2>7. The Validation Canvas</h2>");
  var canvasFields = [["Problem",d.canvas.problem],["Audience",d.canvas.audience],["Solution",d.canvas.solution],["Differentiator",d.canvas.differentiator],["Business Model",d.canvas.businessModel],["Validation",d.canvas.validation],["Feedback",d.canvas.feedback],["Pricing",d.canvas.pricing],["Channel",d.canvas.channel],["Next Step",d.canvas.nextStep]];
  canvasFields.forEach(function(pair) { parts.push(qa(pair[0], pair[1])); });
  parts.push(qa("Reflection", d.canvasReflection));

  // 8
  parts.push("<h2>8. Minimum Viable Proof (MVP)</h2>");
  parts.push(qa("What is the smallest version of my idea I can test today?", d.mvpReflection.q1));
  parts.push(qa("Can I explain it in one sentence?", d.mvpReflection.q2));
  parts.push(qa("Can I get one paying customer this week?", d.mvpReflection.q3));

  // 9
  parts.push("<h2>9. Early Team and Internship Formula</h2>");
  parts.push(qa("Who can I onboard with minimal cost and high energy?", d.teamReflection.q1));
  parts.push(qa("What clear goals will I assign?", d.teamReflection.q2));
  parts.push(qa("How will I mentor them to grow alongside me?", d.teamReflection.q3));

  // 10
  parts.push("<h2>10. Validation Checklist</h2>");
  parts.push("<table><tr><th>#</th><th>Action</th><th>Status</th></tr>");
  CHECKLIST_ITEMS.forEach(function(item, i) {
    parts.push('<tr><td>' + (i+1) + '</td><td>' + esc(item) + '</td><td class="' + (d.checklist[i]?'done':'pend') + '">' + (d.checklist[i]?"Done":"Pending") + '</td></tr>');
  });
  parts.push("</table>");
  parts.push('<div class="sbox"><div class="snum">' + d.checklist.filter(Boolean).length + '/10 Complete</div></div>');

  parts.push("<h2>Final Reflection</h2>");
  parts.push(qa("What is my one validated idea by the end of this month?", d.finalReflection.q1));
  parts.push(qa("Who are my first 3 customers?", d.finalReflection.q2));
  parts.push(qa("What lesson will I carry to Week 2?", d.finalReflection.q3));

  parts.push('<div class="foot">Generated from Founders Compass Interactive Workbook &bull; Surge Startups &bull; workfast.ai/surge-startups</div>');
  parts.push("</body></html>");
  return parts.join("");
}

export default function FoundersCompass() {
  const [activeSection, setActiveSection] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [birthReflection, setBirthReflection] = useLocalData("a", { q1: "", q2: "", q3: "" });
  const [ideas, setIdeas] = useLocalData("b", [
    { name: "", passion: 0, pain: 0, profit: 0, marketFit: 0, skillMatch: 0 },
    { name: "", passion: 0, pain: 0, profit: 0, marketFit: 0, skillMatch: 0 },
    { name: "", passion: 0, pain: 0, profit: 0, marketFit: 0, skillMatch: 0 },
  ]);
  const [threepReflection, setThreepReflection] = useLocalData("c", "");
  const [market, setMarket] = useLocalData("d", { tam: "", sam: "", som: "", q1: "", q2: "", q3: "" });
  const [leverageNotes, setLeverageNotes] = useLocalData("e", { q1: "", q2: "", q3: "" });
  const [unlearnNotes, setUnlearnNotes] = useLocalData("f", { q1: "", q2: "", q3: "", biggest: "" });
  const [founderScores, setFounderScores] = useLocalData("g", Array(10).fill(0));
  const [canvas, setCanvas] = useLocalData("h", {
    problem: "", audience: "", solution: "", differentiator: "",
    businessModel: "", validation: "", feedback: "", pricing: "",
    channel: "", nextStep: "",
  });
  const [canvasReflection, setCanvasReflection] = useLocalData("i", "");
  const [mvpReflection, setMvpReflection] = useLocalData("j", { q1: "", q2: "", q3: "" });
  const [teamReflection, setTeamReflection] = useLocalData("k", { q1: "", q2: "", q3: "" });
  const [checklist, setChecklist] = useLocalData("l", Array(10).fill(false));
  const [finalReflection, setFinalReflection] = useLocalData("m", { q1: "", q2: "", q3: "" });

  const founderTotal = founderScores.reduce(function(a, b) { return a + b; }, 0);
  const founderLabel = founderTotal >= 45 ? "Born Founder" : founderTotal >= 35 ? "Builder in Progress" : founderTotal >= 25 ? "Explorer" : "Needs Reboot";
  const founderColor = founderTotal >= 45 ? "#22c55e" : founderTotal >= 35 ? "#FFB800" : founderTotal >= 25 ? "#f97316" : "#ef4444";
  const checklistDone = checklist.filter(Boolean).length;

  const updateIdea = function(idx, field, val) {
    const copy = ideas.slice();
    copy[idx] = Object.assign({}, copy[idx]);
    copy[idx][field] = val;
    setIdeas(copy);
  };

  const ideaTotal = function(idea) {
    return (idea.passion||0)+(idea.pain||0)+(idea.profit||0)+(idea.marketFit||0)+(idea.skillMatch||0);
  };

  const contentRef = useRef(null);
  const scrollToTop = function() { if (contentRef.current) contentRef.current.scrollTop = 0; };
  const navTo = function(idx) { setActiveSection(idx); setSidebarOpen(false); scrollToTop(); };

  const handleExportPDF = function() {
    var html = buildPdfHtml({
      birthReflection: birthReflection, ideas: ideas, threepReflection: threepReflection,
      market: market, leverageNotes: leverageNotes, unlearnNotes: unlearnNotes,
      founderScores: founderScores, founderTotal: founderTotal, founderLabel: founderLabel,
      canvas: canvas, canvasReflection: canvasReflection, mvpReflection: mvpReflection,
      teamReflection: teamReflection, checklist: checklist, finalReflection: finalReflection,
    });
    var blob = new Blob([html], { type: "text/html" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "Founders_Compass_Part2_Responses.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const ls = { display: "block", fontWeight: 600, fontSize: "13.5px", color: "#333", marginBottom: "6px", marginTop: "14px" };

  const renderSection = function() {
    switch (activeSection) {
      case 0: return (
        <SectionCard title="The Birth of the Idea" icon={"\uD83D\uDCA1"}
          story={"SK once told a young founder, \u201CYou don\u2019t need 100 ideas \u2014 you need one that wakes you up at 3 a.m.\u201D That\u2019s where focus begins."}>
          <p style={{ color: "#555", lineHeight: 1.7, fontSize: "14.5px", marginBottom: "20px" }}>
            Every business starts with a spark — not just passion, but a purpose that meets a need. The goal is to find one powerful, clear, and monetizable concept.
          </p>
          <Quote text="The best business idea is the one that refuses to leave your mind." />
          <div style={{ marginTop: "20px" }}>
            <label style={ls}>1. What problem frustrates you enough to fix it?</label>
            <TextArea value={birthReflection.q1} onChange={function(v) { setBirthReflection(Object.assign({}, birthReflection, {q1: v})); }} placeholder="Write your answer..." />
            <label style={ls}>2. What do people around you constantly complain about?</label>
            <TextArea value={birthReflection.q2} onChange={function(v) { setBirthReflection(Object.assign({}, birthReflection, {q2: v})); }} placeholder="Write your answer..." />
            <label style={ls}>3. What idea do you find impossible to ignore?</label>
            <TextArea value={birthReflection.q3} onChange={function(v) { setBirthReflection(Object.assign({}, birthReflection, {q3: v})); }} placeholder="Write your answer..." />
          </div>
        </SectionCard>
      );
      case 1: return (
        <SectionCard title="The 3P Framework: Passion, Pain, Profit" icon={"\uD83D\uDD25"}
          story="A man loved cooking but was broke until he solved a problem \u2014 busy office workers who needed healthy meals. His passion turned practical.">
          <Quote text="Your heart starts the fire. Pain gives it direction. Profit keeps it alive." />
          <p style={{ color: "#555", fontSize: "14px", marginBottom: "16px" }}>Rate each idea from 1-5 across five dimensions. Click the stars to score.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: "13.5px" }}>
              <thead>
                <tr style={{ background: "#FFB800", color: "#fff" }}>
                  {["Idea","Passion","Pain","Profit","Market Fit","Skill Match","Total /25"].map(function(h, i) {
                    return <th key={i} style={{ padding: "10px 8px", textAlign: "center", fontWeight: 600, borderRadius: i===0?"8px 0 0 0":i===6?"0 8px 0 0":0 }}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {ideas.map(function(idea, idx) {
                  return (
                    <tr key={idx} style={{ background: idx%2===0?"#fafafa":"#fff" }}>
                      <td style={{ padding: "8px" }}>
                        <input value={idea.name} onChange={function(e) { updateIdea(idx, "name", e.target.value); }}
                          placeholder={"Idea " + (idx+1)} style={{ border: "1.5px solid #e0e0e0", borderRadius: "6px", padding: "6px 8px", width: "100%", fontSize: "13px", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif", background: "#fff" }} />
                      </td>
                      {["passion","pain","profit","marketFit","skillMatch"].map(function(field) {
                        return <td key={field} style={{ padding: "6px", textAlign: "center" }}><StarRating value={idea[field]} onChange={function(v) { updateIdea(idx, field, v); }} /></td>;
                      })}
                      <td style={{ padding: "8px", textAlign: "center", fontWeight: 700, fontSize: "18px", color: ideaTotal(idea) >= 20 ? "#22c55e" : ideaTotal(idea) >= 12 ? "#FFB800" : "#999" }}>{ideaTotal(idea)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: "20px" }}>
            <label style={ls}>Reflection: Which idea aligns with both your energy and expertise?</label>
            <TextArea value={threepReflection} onChange={setThreepReflection} placeholder="Write your reflection..." />
          </div>
          <Quote text="Passion is energy, not evidence. Validation turns energy into empire." />
        </SectionCard>
      );
      case 2: return (
        <SectionCard title="Market Map: TAM, SAM, SOM" icon={"\uD83D\uDDFA\uFE0F"}
          story="Netflix began by mailing DVDs to California, not the world. They focused small, grew smart, and scaled strong.">
          <Quote text={"You can\u2019t own the ocean, but you can dominate your pond."} />
          <div style={{ display: "grid", gap: "16px", marginBottom: "20px" }}>
            {[
              { key: "tam", label: "TAM \u2014 Total Addressable Market", desc: "Everyone who could ever buy", ph: "e.g., All cybersecurity teams globally" },
              { key: "sam", label: "SAM \u2014 Serviceable Available Market", desc: "Who you can actually reach", ph: "e.g., Indian startups with 10-50 engineers" },
              { key: "som", label: "SOM \u2014 Serviceable Obtainable Market", desc: "Who will likely buy from you soon", ph: "e.g., 50 startups in Chennai tech ecosystem" },
            ].map(function(item) {
              return (
                <div key={item.key} style={{ background: "#f8f9fa", borderRadius: "10px", padding: "16px", border: "1px solid #eee" }}>
                  <div style={{ fontWeight: 600, fontSize: "14px", color: "#1a1a1a", marginBottom: "2px" }}>{item.label}</div>
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "10px" }}>{item.desc}</div>
                  <TextArea value={market[item.key]} onChange={function(v) { var u = Object.assign({}, market); u[item.key] = v; setMarket(u); }} placeholder={item.ph} rows={2} />
                </div>
              );
            })}
          </div>
          <label style={ls}>1. Who exactly am I serving?</label>
          <TextArea value={market.q1} onChange={function(v) { setMarket(Object.assign({}, market, {q1:v})); }} placeholder="Your answer..." rows={2} />
          <label style={ls}>2. How big is my real reachable market?</label>
          <TextArea value={market.q2} onChange={function(v) { setMarket(Object.assign({}, market, {q2:v})); }} placeholder="Your answer..." rows={2} />
          <label style={ls}>3. What niche can I win first before I scale?</label>
          <TextArea value={market.q3} onChange={function(v) { setMarket(Object.assign({}, market, {q3:v})); }} placeholder="Your answer..." rows={2} />
          <Quote text="Dominate your lane before dreaming global." />
        </SectionCard>
      );
      case 3: return (
        <SectionCard title="Leverage Map: Use What You Already Have" icon={"\u26A1"}
          story={"Karthik built a bakery automation software using his IT skills and his family\u2019s bakery access. He didn\u2019t start new \u2014 he used what he had."}>
          <Quote text="Your next startup is hidden inside your existing assets." />
          <div style={{ overflowX: "auto", marginBottom: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: "13.5px" }}>
              <thead><tr style={{ background: "#2196F3", color: "#fff" }}>
                {["Asset","Example","Leverage"].map(function(h,i) { return <th key={i} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, borderRadius: i===0?"8px 0 0 0":i===2?"0 8px 0 0":0 }}>{h}</th>; })}
              </tr></thead>
              <tbody>{LEVERAGE_ASSETS.map(function(row, idx) {
                return <tr key={idx} style={{ background: idx%2===0?"#f8f9ff":"#fff" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1a1a1a" }}>{row.asset}</td>
                  <td style={{ padding: "10px 12px", color: "#666" }}>{row.example}</td>
                  <td style={{ padding: "10px 12px", color: "#555" }}>{row.leverage}</td>
                </tr>;
              })}</tbody>
            </table>
          </div>
          <label style={ls}>1. What 3 things do I already possess that can speed my journey?</label>
          <TextArea value={leverageNotes.q1} onChange={function(v) { setLeverageNotes(Object.assign({}, leverageNotes, {q1:v})); }} placeholder="Your answer..." />
          <label style={ls}>2. Who in my network can open the first door?</label>
          <TextArea value={leverageNotes.q2} onChange={function(v) { setLeverageNotes(Object.assign({}, leverageNotes, {q2:v})); }} placeholder="Your answer..." />
          <label style={ls}>3. What am I underutilizing that others would pay for?</label>
          <TextArea value={leverageNotes.q3} onChange={function(v) { setLeverageNotes(Object.assign({}, leverageNotes, {q3:v})); }} placeholder="Your answer..." />
          <Quote text={"Don\u2019t start from zero. Start from strength."} />
        </SectionCard>
      );
      case 4: return (
        <SectionCard title="Unlearn to Earn" icon={"\uD83D\uDD04"}
          story={"Rahul used to say, \u201CI\u2019ll start when I\u2019m ready.\u201D SK told him, \u201CYou\u2019ll never be ready. Start, and readiness will meet you halfway.\u201D"}>
          <Quote text="The version of you that built comfort cannot build freedom." />
          <div style={{ overflowX: "auto", marginBottom: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: "13.5px" }}>
              <thead><tr style={{ background: "#f44336", color: "#fff" }}>
                {["Old Habit","Replace With"].map(function(h,i) { return <th key={i} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, borderRadius: i===0?"8px 0 0 0":"0 8px 0 0" }}>{h}</th>; })}
              </tr></thead>
              <tbody>{UNLEARN_HABITS.map(function(row,idx) {
                return <tr key={idx} style={{ background: idx%2===0?"#fff5f5":"#fff" }}>
                  <td style={{ padding: "10px 14px", color: "#c62828", textDecoration: "line-through", opacity: 0.7 }}>{row.old}</td>
                  <td style={{ padding: "10px 14px", color: "#2e7d32", fontWeight: 500 }}>{row.replace}</td>
                </tr>;
              })}</tbody>
            </table>
          </div>
          <label style={ls}>Which of these habits is your biggest bottleneck?</label>
          <TextArea value={unlearnNotes.biggest} onChange={function(v) { setUnlearnNotes(Object.assign({}, unlearnNotes, {biggest:v})); }} placeholder="Pick one and explain..." />
          <label style={ls}>What one belief can you unlearn this week?</label>
          <TextArea value={unlearnNotes.q2} onChange={function(v) { setUnlearnNotes(Object.assign({}, unlearnNotes, {q2:v})); }} placeholder="Your answer..." />
          <label style={ls}>What will you replace it with?</label>
          <TextArea value={unlearnNotes.q3} onChange={function(v) { setUnlearnNotes(Object.assign({}, unlearnNotes, {q3:v})); }} placeholder="Your answer..." />
          <Quote text={"Unlearning is not forgetting. It\u2019s upgrading your operating system."} />
        </SectionCard>
      );
      case 5: return (
        <SectionCard title="Founder Fit Test" icon={"\uD83E\uDDEA"}
          story="Deepa scored 38 on her Founder Fit test \u2014 she was building confidence, not companies yet. Six months later, she scored 48.">
          <Quote text="Before you validate your product, validate your mindset." />
          <p style={{ color: "#555", fontSize: "14px", marginBottom: "16px" }}>Rate yourself 1-5 on each statement. Be ruthlessly honest.</p>
          <div style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
            {FOUNDER_STATEMENTS.map(function(stmt, idx) {
              return (
                <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: idx%2===0?"#f8f9fa":"#fff", borderRadius: "8px", border: "1px solid #eee", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ fontSize: "14px", color: "#333", flex: 1, minWidth: "200px" }}>{stmt}</span>
                  <StarRating value={founderScores[idx]} onChange={function(v) { var c = founderScores.slice(); c[idx] = v; setFounderScores(c); }} />
                </div>
              );
            })}
          </div>
          <div style={{ background: "linear-gradient(135deg, " + founderColor + "15, " + founderColor + "08)", border: "2px solid " + founderColor, borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "42px", fontWeight: 800, color: founderColor, fontFamily: "'Space Grotesk', sans-serif" }}>{founderTotal}/50</div>
            <div style={{ fontSize: "16px", fontWeight: 600, color: founderColor, marginTop: "4px" }}>{founderLabel}</div>
            <ProgressBar value={founderTotal} max={50} />
          </div>
          <Quote text={"Founders aren\u2019t born. They\u2019re built through pressure, patience, and perspective."} />
        </SectionCard>
      );
      case 6: return (
        <SectionCard title="The Validation Canvas" icon={"\uD83D\uDCCB"}
          story="Asha thought she needed a full app. SK asked her to sell on WhatsApp first \u2014 she got her first 10 paying customers that week.">
          <Quote text="Validation = real user + real feedback + real payment." />
          <div style={{ display: "grid", gap: "14px", marginBottom: "20px" }}>
            {[
              {key:"problem",label:"Problem",desc:"What pain are you solving?"},
              {key:"audience",label:"Audience",desc:"Who experiences it often?"},
              {key:"solution",label:"Solution",desc:"How do you solve it practically?"},
              {key:"differentiator",label:"Differentiator",desc:"Why are you unique?"},
              {key:"businessModel",label:"Business Model",desc:"How do you make money?"},
              {key:"validation",label:"Validation",desc:"Who paid or showed intent to pay?"},
              {key:"feedback",label:"Feedback",desc:"What did your test users say?"},
              {key:"pricing",label:"Pricing",desc:"What is the minimum people pay willingly?"},
              {key:"channel",label:"Channel",desc:"Where will you reach customers?"},
              {key:"nextStep",label:"Next Step",desc:"What is your 30-day validation plan?"},
            ].map(function(item) {
              return (
                <div key={item.key}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 600, fontSize: "14px", color: "#1a1a1a" }}>{item.label}</span>
                    <span style={{ fontSize: "12px", color: "#888" }}>{item.desc}</span>
                  </div>
                  <TextArea value={canvas[item.key]} onChange={function(v) { var u = Object.assign({}, canvas); u[item.key] = v; setCanvas(u); }} placeholder={item.desc} rows={2} />
                </div>
              );
            })}
          </div>
          <label style={ls}>Reflection</label>
          <TextArea value={canvasReflection} onChange={setCanvasReflection} placeholder="Who is the first stranger I can talk to about my idea?" />
          <Quote text={"Don\u2019t build until it hurts to not build."} />
        </SectionCard>
      );
      case 7: return (
        <SectionCard title="Minimum Viable Proof (MVP)" icon={"\uD83D\uDE80"}
          story="Vivek spent months coding. SK made him sell a landing page version \u2014 and it worked. He saved 6 months.">
          <p style={{ color: "#555", lineHeight: 1.7, fontSize: "14.5px", marginBottom: "16px" }}>
            Your MVP is not an app \u2014 it is an answer. Proof that someone outside your circle believes enough to pay.
          </p>
          <Quote text="Your code is not validation \u2014 your first sale is." />
          <label style={ls}>1. What is the smallest version of my idea I can test today?</label>
          <TextArea value={mvpReflection.q1} onChange={function(v) { setMvpReflection(Object.assign({}, mvpReflection, {q1:v})); }} placeholder="Your answer..." />
          <label style={ls}>2. Can I explain it in one sentence?</label>
          <TextArea value={mvpReflection.q2} onChange={function(v) { setMvpReflection(Object.assign({}, mvpReflection, {q2:v})); }} placeholder="One sentence pitch..." rows={2} />
          <label style={ls}>3. Can I get one paying customer this week?</label>
          <TextArea value={mvpReflection.q3} onChange={function(v) { setMvpReflection(Object.assign({}, mvpReflection, {q3:v})); }} placeholder="Your plan..." />
          <Quote text="Build validation, not versions." />
        </SectionCard>
      );
      case 8: return (
        <SectionCard title="Early Team and Internship Formula" icon={"\uD83D\uDC65"}
          story="SK guided a young founder to start with two college interns. Within 2 months, those interns became growth partners.">
          <div style={{ background: "#e8f5e9", borderRadius: "10px", padding: "16px", marginBottom: "20px", border: "1px solid #c8e6c9" }}>
            <div style={{ fontWeight: 600, color: "#2e7d32", fontSize: "14px", marginBottom: "6px" }}>The Formula</div>
            <div style={{ color: "#33691e", fontSize: "14px", lineHeight: 1.6 }}>
              Start with 2 interns ({"\u20B9"}5K{"\u2013"}{"\u20B9"}10K each):<br />
              {"\u2192"} One for validation and outreach<br />
              {"\u2192"} One for customer communication and market research
            </div>
          </div>
          <Quote text={"Don\u2019t hire employees first. Hire energy."} />
          <label style={ls}>1. Who can I onboard with minimal cost and high energy?</label>
          <TextArea value={teamReflection.q1} onChange={function(v) { setTeamReflection(Object.assign({}, teamReflection, {q1:v})); }} placeholder="Your answer..." />
          <label style={ls}>2. What clear goals will I assign?</label>
          <TextArea value={teamReflection.q2} onChange={function(v) { setTeamReflection(Object.assign({}, teamReflection, {q2:v})); }} placeholder="Your answer..." />
          <label style={ls}>3. How will I mentor them to grow alongside me?</label>
          <TextArea value={teamReflection.q3} onChange={function(v) { setTeamReflection(Object.assign({}, teamReflection, {q3:v})); }} placeholder="Your answer..." />
          <Quote text="Hire learners before you hire experts. Hunger beats experience early on." />
        </SectionCard>
      );
      case 9: return (
        <SectionCard title="The Validation Checklist \u2014 10-Step Proof Path" icon={"\u2705"}>
          <Quote text="Proof beats presentation. Show the world your first win, not your first logo." />
          <div style={{ background: "linear-gradient(135deg, " + (checklistDone>=8?"#22c55e":checklistDone>=5?"#FFB800":"#ef4444") + "10, transparent)", borderRadius: "10px", padding: "16px", marginBottom: "20px", textAlign: "center", border: "1px solid " + (checklistDone>=8?"#22c55e":checklistDone>=5?"#FFB800":"#ef4444") + "30" }}>
            <span style={{ fontSize: "28px", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>{checklistDone}/10 Complete</span>
            <ProgressBar value={checklistDone} max={10} />
          </div>
          <div style={{ display: "grid", gap: "8px", marginBottom: "24px" }}>
            {CHECKLIST_ITEMS.map(function(item, idx) {
              return (
                <label key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: checklist[idx]?"#f0fdf4":"#fafafa", borderRadius: "8px", cursor: "pointer", border: checklist[idx]?"1.5px solid #86efac":"1.5px solid #eee", transition: "all 0.2s" }}>
                  <input type="checkbox" checked={checklist[idx]} onChange={function() { var c = checklist.slice(); c[idx] = !c[idx]; setChecklist(c); }}
                    style={{ width: "18px", height: "18px", accentColor: "#22c55e", cursor: "pointer" }} />
                  <span style={{ fontSize: "14px", color: checklist[idx]?"#166534":"#555", textDecoration: checklist[idx]?"line-through":"none", flex: 1 }}>
                    <span style={{ fontWeight: 600, color: checklist[idx]?"#16a34a":"#999", marginRight: "8px" }}>Step {idx+1}</span>{item}
                  </span>
                </label>
              );
            })}
          </div>
          <div style={{ borderTop: "2px solid #eee", paddingTop: "20px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a1a", marginBottom: "12px" }}>Final Reflection</h3>
            <label style={ls}>1. What is my one validated idea by the end of this month?</label>
            <TextArea value={finalReflection.q1} onChange={function(v) { setFinalReflection(Object.assign({}, finalReflection, {q1:v})); }} placeholder="Your answer..." />
            <label style={ls}>2. Who are my first 3 customers?</label>
            <TextArea value={finalReflection.q2} onChange={function(v) { setFinalReflection(Object.assign({}, finalReflection, {q2:v})); }} placeholder="Your answer..." />
            <label style={ls}>3. What lesson will I carry to Week 2: The Builder's Blueprint?</label>
            <TextArea value={finalReflection.q3} onChange={function(v) { setFinalReflection(Object.assign({}, finalReflection, {q3:v})); }} placeholder="Your answer..." />
          </div>
          <div style={{ marginTop: "28px", textAlign: "center" }}>
            <button onClick={handleExportPDF} style={{ padding: "14px 36px", background: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)", color: "#FFB800", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: 700, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.3px", boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}>
              {"\uD83D\uDCC4"} Download All Responses as PDF
            </button>
            <div style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>Downloads an HTML file {"\u2014"} open it in your browser and use Print {"\u2192"} Save as PDF</div>
          </div>
        </SectionCard>
      );
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', sans-serif", background: "#f4f4f5", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet" />

      {/* Sidebar */}
      <div style={{ width: "280px", minWidth: "280px", background: "#1a1a1a", color: "#fff", display: "flex", flexDirection: "column", zIndex: 50 }}>
        <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #333" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>{"\u26A1"}</span>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "16px", letterSpacing: "-0.3px" }}>SURGE STARTUPS</div>
              <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{"Founder\u2019s Compass \u2014 Part 2"}</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
          {SECTIONS.map(function(sec, idx) {
            return (
              <button key={sec.id} onClick={function() { navTo(idx); }}
                style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "10px 12px", border: "none", borderRadius: "8px", cursor: "pointer", background: idx===activeSection?"#FFB800":"transparent", color: idx===activeSection?"#1a1a1a":"#ccc", fontSize: "13.5px", fontWeight: idx===activeSection?600:400, textAlign: "left", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif", marginBottom: "2px" }}>
                <span style={{ width: "24px", height: "24px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, background: idx===activeSection?"#1a1a1a":"#333", color: idx===activeSection?"#FFB800":"#888" }}>{idx+1}</span>
                {sec.title}
              </button>
            );
          })}
        </div>
        <div style={{ padding: "12px 20px", borderTop: "1px solid #333" }}>
          <button onClick={handleExportPDF} style={{ width: "100%", padding: "10px", background: "#FFB800", color: "#1a1a1a", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            {"\uD83D\uDCC4"} Export PDF
          </button>
        </div>
        <div style={{ padding: "8px 20px 16px", fontSize: "11px", color: "#666" }}>workfast.ai/surge-startups</div>
      </div>

      {/* Main */}
      <div ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "12px", color: "#888", fontWeight: 500 }}>Section {activeSection+1} of {SECTIONS.length}</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={function() { setActiveSection(Math.max(0, activeSection-1)); scrollToTop(); }} disabled={activeSection===0}
                style={{ padding: "6px 14px", border: "1.5px solid #ddd", borderRadius: "8px", background: "#fff", cursor: activeSection===0?"not-allowed":"pointer", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", opacity: activeSection===0?0.4:1, color: "#555" }}>
                {"\u2190"} Prev
              </button>
              <button onClick={function() { setActiveSection(Math.min(SECTIONS.length-1, activeSection+1)); scrollToTop(); }} disabled={activeSection===SECTIONS.length-1}
                style={{ padding: "6px 14px", border: "none", borderRadius: "8px", background: activeSection===SECTIONS.length-1?"#ddd":"#FFB800", cursor: activeSection===SECTIONS.length-1?"not-allowed":"pointer", fontSize: "13px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: "#1a1a1a" }}>
                Next {"\u2192"}
              </button>
            </div>
          </div>
          {renderSection()}
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", padding: "20px 0 40px" }}>
            {SECTIONS.map(function(_, idx) {
              return <button key={idx} onClick={function() { navTo(idx); }} style={{ width: idx===activeSection?"28px":"8px", height: "8px", borderRadius: "4px", border: "none", background: idx===activeSection?"#FFB800":"#ddd", cursor: "pointer", transition: "all 0.2s", padding: 0 }} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
