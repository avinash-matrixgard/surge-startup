import { useState, useRef, useEffect } from "react";

const SECTIONS = [
  { id: "birth", title: "The Birth of the Idea" },
  { id: "threep", title: "The 3P Framework" },
  { id: "market", title: "Market Map" },
  { id: "leverage", title: "Leverage Map" },
  { id: "unlearn", title: "Unlearn to Earn" },
  { id: "founder", title: "Founder Fit Test" },
  { id: "canvas", title: "Validation Canvas" },
  { id: "mvp", title: "MVP" },
  { id: "team", title: "Early Team" },
  { id: "checklist", title: "Validation Checklist" },
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
  var s = useState(initial);
  return [s[0], s[1]];
}

function useIsMobile() {
  var s = useState(window.innerWidth < 768);
  useEffect(function() {
    var handler = function() { s[1](window.innerWidth < 768); };
    window.addEventListener("resize", handler);
    return function() { window.removeEventListener("resize", handler); };
  }, []);
  return s[0];
}

function TextArea(props) {
  return (
    <textarea
      value={props.value}
      onChange={function(e) { props.onChange(e.target.value); }}
      placeholder={props.placeholder}
      rows={props.rows || 3}
      style={{
        width: "100%", padding: "12px 14px", border: "2px solid #e0e0e0",
        borderRadius: "10px", fontSize: "16px", fontFamily: "'DM Sans', sans-serif",
        resize: "vertical", background: "#fafafa", outline: "none", lineHeight: 1.6,
        boxSizing: "border-box", WebkitAppearance: "none",
      }}
    />
  );
}

function Quote(props) {
  return (
    <div style={{
      borderLeft: "4px solid #FFB800", padding: "12px 16px", margin: "20px 0",
      background: "linear-gradient(135deg, #FFF9E6 0%, #FFF4D6 100%)",
      borderRadius: "0 10px 10px 0", fontStyle: "italic", color: "#5a4a00", fontSize: "14px", lineHeight: 1.5,
    }}>
      {"“"}{props.text}{"”"} {"—"} {props.author || "SK"}
    </div>
  );
}

function SectionCard(props) {
  return (
    <div style={{
      background: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)", border: "1px solid #f0f0f0",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "26px" }}>{props.icon}</span>
        <h2 style={{ margin: 0, fontSize: "20px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.3px" }}>{props.title}</h2>
      </div>
      {props.story && (
        <div style={{ background: "#f8f8f8", borderRadius: "10px", padding: "12px 14px", marginBottom: "16px", fontSize: "13px", color: "#555", lineHeight: 1.6, borderLeft: "3px solid #ddd" }}>
          <span style={{ fontWeight: 600, color: "#888", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Story</span><br />{props.story}
        </div>
      )}
      {props.children}
    </div>
  );
}

function StarRating(props) {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map(function(star) {
        return (
          <button key={star} onClick={function() { props.onChange(star); }}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "26px", padding: "4px",
              color: star <= props.value ? "#FFB800" : "#ddd", lineHeight: 1,
            }}>{"★"}</button>
        );
      })}
    </div>
  );
}

function ProgressBar(props) {
  var pct = Math.round((props.value / props.max) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "8px 0" }}>
      <div style={{ flex: 1, height: "8px", background: "#eee", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: pct >= 80 ? "#22c55e" : pct >= 50 ? "#FFB800" : "#ef4444", borderRadius: "4px", transition: "width 0.4s ease" }} />
      </div>
      <span style={{ fontSize: "13px", fontWeight: 600, color: "#666", minWidth: "40px" }}>{pct}%</span>
    </div>
  );
}

// Responsive table wrapper
function TableWrap(props) {
  return <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", margin: "0 -4px", padding: "0 4px" }}>{props.children}</div>;
}

// ─── PDF ───────────────────────────────────────────────────────
function buildPdfHtml(d) {
  var esc = function(s) { return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>"); };
  var ans = function(v) { return v ? esc(v) : '<span style="color:#999;font-style:italic;">Not answered</span>'; };
  var starStr = function(n) { var f=n||0; return "★".repeat(f)+"☆".repeat(5-f); };
  var idTotal = function(idea) { return (idea.passion||0)+(idea.pain||0)+(idea.profit||0)+(idea.marketFit||0)+(idea.skillMatch||0); };
  var qa = function(q,v) { return '<div class="qa"><div class="q">'+esc(q)+'</div><div class="a">'+ans(v)+'</div></div>'; };

  var css = "body{font-family:Helvetica,Arial,sans-serif;max-width:750px;margin:0 auto;padding:40px 30px;color:#1a1a1a;font-size:13px;line-height:1.6;}"+
    "h1{text-align:center;font-size:24px;margin-bottom:4px;}"+
    ".sub{text-align:center;color:#888;font-size:13px;margin-bottom:40px;}"+
    "h2{font-size:17px;border-bottom:3px solid #FFB800;padding-bottom:6px;margin-top:36px;margin-bottom:16px;page-break-after:avoid;}"+
    ".qa{margin-bottom:14px;}"+".q{font-weight:600;color:#333;margin-bottom:3px;}"+
    ".a{background:#f8f8f8;border-left:3px solid #FFB800;padding:8px 12px;border-radius:0 6px 6px 0;min-height:18px;}"+
    "table{width:100%;border-collapse:collapse;margin:12px 0;font-size:12px;}"+
    "th{background:#FFB800;color:#fff;padding:8px 10px;text-align:left;font-weight:600;}"+
    "td{padding:7px 10px;border-bottom:1px solid #eee;}tr:nth-child(even){background:#fafafa;}"+
    ".sbox{text-align:center;margin:16px 0;padding:16px;border:2px solid #FFB800;border-radius:10px;background:#FFFBEB;}"+
    ".snum{font-size:36px;font-weight:800;}.slbl{font-size:15px;font-weight:600;color:#666;margin-top:4px;}"+
    ".done{color:#16a34a;font-weight:600;}.pend{color:#999;}"+
    ".foot{text-align:center;margin-top:40px;padding-top:16px;border-top:2px solid #eee;color:#888;font-size:11px;}"+
    "@media print{body{padding:20px;}}";

  var p = [];
  p.push('<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Founders Compass Part 2</title><style>'+css+'</style></head><body>');
  p.push("<h1>Founders Compass &mdash; Part 2</h1>");
  p.push('<div class="sub">Idea to Validation &bull; Surge Startups</div>');
  p.push("<h2>1. The Birth of the Idea</h2>");
  p.push(qa("What problem frustrates you enough to fix it?",d.birthReflection.q1));
  p.push(qa("What do people around you constantly complain about?",d.birthReflection.q2));
  p.push(qa("What idea do you find impossible to ignore?",d.birthReflection.q3));
  p.push("<h2>2. The 3P Framework</h2>");
  p.push("<table><tr><th>Idea</th><th>Passion</th><th>Pain</th><th>Profit</th><th>Market Fit</th><th>Skill Match</th><th>Total</th></tr>");
  d.ideas.forEach(function(idea,i){p.push("<tr><td>"+esc(idea.name||("Idea "+(i+1)))+"</td><td>"+starStr(idea.passion)+"</td><td>"+starStr(idea.pain)+"</td><td>"+starStr(idea.profit)+"</td><td>"+starStr(idea.marketFit)+"</td><td>"+starStr(idea.skillMatch)+"</td><td><strong>"+idTotal(idea)+"/25</strong></td></tr>");});
  p.push("</table>");
  p.push(qa("Which idea aligns with both your energy and expertise?",d.threepReflection));
  p.push("<h2>3. Market Map: TAM, SAM, SOM</h2>");
  p.push(qa("TAM",d.market.tam));p.push(qa("SAM",d.market.sam));p.push(qa("SOM",d.market.som));
  p.push(qa("Who exactly am I serving?",d.market.q1));p.push(qa("How big is my real reachable market?",d.market.q2));p.push(qa("What niche can I win first?",d.market.q3));
  p.push("<h2>4. Leverage Map</h2>");
  p.push(qa("What 3 things do I already possess?",d.leverageNotes.q1));p.push(qa("Who in my network can open the first door?",d.leverageNotes.q2));p.push(qa("What am I underutilizing?",d.leverageNotes.q3));
  p.push("<h2>5. Unlearn to Earn</h2>");
  p.push(qa("Biggest bottleneck habit?",d.unlearnNotes.biggest));p.push(qa("Belief to unlearn this week?",d.unlearnNotes.q2));p.push(qa("Replace it with?",d.unlearnNotes.q3));
  p.push("<h2>6. Founder Fit Test</h2>");
  p.push("<table><tr><th>Statement</th><th>Rating</th></tr>");
  FOUNDER_STATEMENTS.forEach(function(stmt,i){p.push("<tr><td>"+esc(stmt)+"</td><td>"+starStr(d.founderScores[i])+" ("+(d.founderScores[i]||0)+"/5)</td></tr>");});
  p.push("</table>");
  p.push('<div class="sbox"><div class="snum">'+d.founderTotal+'/50</div><div class="slbl">'+esc(d.founderLabel)+'</div></div>');
  p.push("<h2>7. Validation Canvas</h2>");
  [["Problem",d.canvas.problem],["Audience",d.canvas.audience],["Solution",d.canvas.solution],["Differentiator",d.canvas.differentiator],["Business Model",d.canvas.businessModel],["Validation",d.canvas.validation],["Feedback",d.canvas.feedback],["Pricing",d.canvas.pricing],["Channel",d.canvas.channel],["Next Step",d.canvas.nextStep]].forEach(function(x){p.push(qa(x[0],x[1]));});
  p.push(qa("Reflection",d.canvasReflection));
  p.push("<h2>8. MVP</h2>");
  p.push(qa("Smallest version to test today?",d.mvpReflection.q1));p.push(qa("One sentence explanation?",d.mvpReflection.q2));p.push(qa("One paying customer this week?",d.mvpReflection.q3));
  p.push("<h2>9. Early Team</h2>");
  p.push(qa("Who to onboard?",d.teamReflection.q1));p.push(qa("Clear goals?",d.teamReflection.q2));p.push(qa("How to mentor?",d.teamReflection.q3));
  p.push("<h2>10. Validation Checklist</h2>");
  p.push("<table><tr><th>#</th><th>Action</th><th>Status</th></tr>");
  CHECKLIST_ITEMS.forEach(function(item,i){p.push('<tr><td>'+(i+1)+'</td><td>'+esc(item)+'</td><td class="'+(d.checklist[i]?'done':'pend')+'">'+(d.checklist[i]?"Done":"Pending")+'</td></tr>');});
  p.push("</table>");
  p.push("<h2>Final Reflection</h2>");
  p.push(qa("Validated idea this month?",d.finalReflection.q1));p.push(qa("First 3 customers?",d.finalReflection.q2));p.push(qa("Lesson for Week 2?",d.finalReflection.q3));
  p.push('<div class="foot">Founders Compass Interactive Workbook &bull; Surge Startups</div></body></html>');
  return p.join("");
}

// ─── Main ──────────────────────────────────────────────────────
export default function FoundersCompass() {
  var isMobile = useIsMobile();
  var sa = useState(0); var activeSection = sa[0]; var setActiveSection = sa[1];
  var sb = useState(false); var sidebarOpen = sb[0]; var setSidebarOpen = sb[1];

  var s1 = useLocalData("a",{q1:"",q2:"",q3:""}); var birthReflection=s1[0]; var setBirthReflection=s1[1];
  var s2 = useLocalData("b",[{name:"",passion:0,pain:0,profit:0,marketFit:0,skillMatch:0},{name:"",passion:0,pain:0,profit:0,marketFit:0,skillMatch:0},{name:"",passion:0,pain:0,profit:0,marketFit:0,skillMatch:0}]); var ideas=s2[0]; var setIdeas=s2[1];
  var s3 = useLocalData("c",""); var threepReflection=s3[0]; var setThreepReflection=s3[1];
  var s4 = useLocalData("d",{tam:"",sam:"",som:"",q1:"",q2:"",q3:""}); var market=s4[0]; var setMarket=s4[1];
  var s5 = useLocalData("e",{q1:"",q2:"",q3:""}); var leverageNotes=s5[0]; var setLeverageNotes=s5[1];
  var s6 = useLocalData("f",{q1:"",q2:"",q3:"",biggest:""}); var unlearnNotes=s6[0]; var setUnlearnNotes=s6[1];
  var s7 = useLocalData("g",Array(10).fill(0)); var founderScores=s7[0]; var setFounderScores=s7[1];
  var s8 = useLocalData("h",{problem:"",audience:"",solution:"",differentiator:"",businessModel:"",validation:"",feedback:"",pricing:"",channel:"",nextStep:""}); var canvas=s8[0]; var setCanvas=s8[1];
  var s9 = useLocalData("i",""); var canvasReflection=s9[0]; var setCanvasReflection=s9[1];
  var s10 = useLocalData("j",{q1:"",q2:"",q3:""}); var mvpReflection=s10[0]; var setMvpReflection=s10[1];
  var s11 = useLocalData("k",{q1:"",q2:"",q3:""}); var teamReflection=s11[0]; var setTeamReflection=s11[1];
  var s12 = useLocalData("l",Array(10).fill(false)); var checklist=s12[0]; var setChecklist=s12[1];
  var s13 = useLocalData("m",{q1:"",q2:"",q3:""}); var finalReflection=s13[0]; var setFinalReflection=s13[1];

  var founderTotal = founderScores.reduce(function(a,b){return a+b;},0);
  var founderLabel = founderTotal>=45?"Born Founder":founderTotal>=35?"Builder in Progress":founderTotal>=25?"Explorer":"Needs Reboot";
  var founderColor = founderTotal>=45?"#22c55e":founderTotal>=35?"#FFB800":founderTotal>=25?"#f97316":"#ef4444";
  var checklistDone = checklist.filter(Boolean).length;

  var updateIdea = function(idx,field,val) { var c=ideas.slice(); c[idx]=Object.assign({},c[idx]); c[idx][field]=val; setIdeas(c); };
  var ideaTotal = function(idea) { return (idea.passion||0)+(idea.pain||0)+(idea.profit||0)+(idea.marketFit||0)+(idea.skillMatch||0); };

  var contentRef = useRef(null);
  var scrollToTop = function() { if(contentRef.current) contentRef.current.scrollTop=0; };
  var navTo = function(idx) { setActiveSection(idx); setSidebarOpen(false); scrollToTop(); };

  var handleExportPDF = function() {
    var html = buildPdfHtml({birthReflection:birthReflection,ideas:ideas,threepReflection:threepReflection,market:market,leverageNotes:leverageNotes,unlearnNotes:unlearnNotes,founderScores:founderScores,founderTotal:founderTotal,founderLabel:founderLabel,canvas:canvas,canvasReflection:canvasReflection,mvpReflection:mvpReflection,teamReflection:teamReflection,checklist:checklist,finalReflection:finalReflection});
    var blob = new Blob([html],{type:"text/html"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a"); a.href=url; a.download="Founders_Compass_Part2_Responses.html";
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  var ls = {display:"block",fontWeight:600,fontSize:"14px",color:"#333",marginBottom:"6px",marginTop:"14px"};

  // ─── Mobile card layout for 3P scoring ─────────────────────
  var renderIdeaCards = function() {
    return ideas.map(function(idea,idx) {
      return (
        <div key={idx} style={{background:"#f8f9fa",borderRadius:"12px",padding:"16px",marginBottom:"12px",border:"1px solid #eee"}}>
          <input value={idea.name} onChange={function(e){updateIdea(idx,"name",e.target.value);}}
            placeholder={"Idea "+(idx+1)} style={{border:"1.5px solid #e0e0e0",borderRadius:"8px",padding:"10px 12px",width:"100%",fontSize:"16px",boxSizing:"border-box",fontFamily:"'DM Sans',sans-serif",background:"#fff",marginBottom:"12px"}} />
          {["passion","pain","profit","marketFit","skillMatch"].map(function(field) {
            var label = field==="marketFit"?"Market Fit":field==="skillMatch"?"Skill Match":field.charAt(0).toUpperCase()+field.slice(1);
            return (
              <div key={field} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                <span style={{fontSize:"13px",color:"#555",fontWeight:500}}>{label}</span>
                <StarRating value={idea[field]} onChange={function(v){updateIdea(idx,field,v);}} />
              </div>
            );
          })}
          <div style={{textAlign:"right",fontSize:"20px",fontWeight:700,color:ideaTotal(idea)>=20?"#22c55e":ideaTotal(idea)>=12?"#FFB800":"#999",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid #eee"}}>
            {ideaTotal(idea)}/25
          </div>
        </div>
      );
    });
  };

  // ─── Desktop table for 3P scoring ──────────────────────────
  var renderIdeaTable = function() {
    return (
      <TableWrap>
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:0,fontSize:"13.5px"}}>
          <thead><tr style={{background:"#FFB800",color:"#fff"}}>
            {["Idea","Passion","Pain","Profit","Market Fit","Skill Match","Total /25"].map(function(h,i){
              return <th key={i} style={{padding:"10px 8px",textAlign:"center",fontWeight:600,borderRadius:i===0?"8px 0 0 0":i===6?"0 8px 0 0":0}}>{h}</th>;
            })}
          </tr></thead>
          <tbody>{ideas.map(function(idea,idx) {
            return (
              <tr key={idx} style={{background:idx%2===0?"#fafafa":"#fff"}}>
                <td style={{padding:"8px"}}><input value={idea.name} onChange={function(e){updateIdea(idx,"name",e.target.value);}} placeholder={"Idea "+(idx+1)} style={{border:"1.5px solid #e0e0e0",borderRadius:"6px",padding:"6px 8px",width:"100%",fontSize:"13px",boxSizing:"border-box",fontFamily:"'DM Sans',sans-serif",background:"#fff"}} /></td>
                {["passion","pain","profit","marketFit","skillMatch"].map(function(field){return <td key={field} style={{padding:"6px",textAlign:"center"}}><StarRating value={idea[field]} onChange={function(v){updateIdea(idx,field,v);}} /></td>;})}
                <td style={{padding:"8px",textAlign:"center",fontWeight:700,fontSize:"18px",color:ideaTotal(idea)>=20?"#22c55e":ideaTotal(idea)>=12?"#FFB800":"#999"}}>{ideaTotal(idea)}</td>
              </tr>
            );
          })}</tbody>
        </table>
      </TableWrap>
    );
  };

  var renderSection = function() {
    switch(activeSection) {
      case 0: return (
        <SectionCard title="The Birth of the Idea" icon={"💡"} story={"SK once told a young founder, “You don’t need 100 ideas — you need one that wakes you up at 3 a.m.”"}>
          <p style={{color:"#555",lineHeight:1.7,fontSize:"14.5px",marginBottom:"20px"}}>Every business starts with a spark — not just passion, but a purpose that meets a need.</p>
          <Quote text="The best business idea is the one that refuses to leave your mind." />
          <label style={ls}>1. What problem frustrates you enough to fix it?</label>
          <TextArea value={birthReflection.q1} onChange={function(v){setBirthReflection(Object.assign({},birthReflection,{q1:v}));}} placeholder="Write your answer..." />
          <label style={ls}>2. What do people around you constantly complain about?</label>
          <TextArea value={birthReflection.q2} onChange={function(v){setBirthReflection(Object.assign({},birthReflection,{q2:v}));}} placeholder="Write your answer..." />
          <label style={ls}>3. What idea do you find impossible to ignore?</label>
          <TextArea value={birthReflection.q3} onChange={function(v){setBirthReflection(Object.assign({},birthReflection,{q3:v}));}} placeholder="Write your answer..." />
        </SectionCard>
      );
      case 1: return (
        <SectionCard title="The 3P Framework" icon={"🔥"} story="A man loved cooking but was broke until he solved a problem — busy office workers who needed healthy meals.">
          <Quote text="Your heart starts the fire. Pain gives it direction. Profit keeps it alive." />
          <p style={{color:"#555",fontSize:"14px",marginBottom:"16px"}}>Rate each idea 1-5 across five dimensions.</p>
          {isMobile ? renderIdeaCards() : renderIdeaTable()}
          <label style={ls}>Reflection: Which idea aligns with your energy and expertise?</label>
          <TextArea value={threepReflection} onChange={setThreepReflection} placeholder="Write your reflection..." />
          <Quote text="Passion is energy, not evidence. Validation turns energy into empire." />
        </SectionCard>
      );
      case 2: return (
        <SectionCard title="Market Map: TAM, SAM, SOM" icon={"🗺️"} story="Netflix began by mailing DVDs to California, not the world.">
          <Quote text={"You can’t own the ocean, but you can dominate your pond."} />
          {[{key:"tam",label:"TAM — Total Addressable Market",ph:"e.g., All cybersecurity teams globally"},{key:"sam",label:"SAM — Serviceable Available Market",ph:"e.g., Indian startups with 10-50 engineers"},{key:"som",label:"SOM — Serviceable Obtainable Market",ph:"e.g., 50 startups in Chennai"}].map(function(item){
            return (<div key={item.key} style={{background:"#f8f9fa",borderRadius:"10px",padding:"14px",border:"1px solid #eee",marginBottom:"12px"}}>
              <div style={{fontWeight:600,fontSize:"14px",color:"#1a1a1a",marginBottom:"8px"}}>{item.label}</div>
              <TextArea value={market[item.key]} onChange={function(v){var u=Object.assign({},market);u[item.key]=v;setMarket(u);}} placeholder={item.ph} rows={2} />
            </div>);
          })}
          <label style={ls}>1. Who exactly am I serving?</label>
          <TextArea value={market.q1} onChange={function(v){setMarket(Object.assign({},market,{q1:v}));}} placeholder="Your answer..." rows={2} />
          <label style={ls}>2. How big is my real reachable market?</label>
          <TextArea value={market.q2} onChange={function(v){setMarket(Object.assign({},market,{q2:v}));}} placeholder="Your answer..." rows={2} />
          <label style={ls}>3. What niche can I win first?</label>
          <TextArea value={market.q3} onChange={function(v){setMarket(Object.assign({},market,{q3:v}));}} placeholder="Your answer..." rows={2} />
          <Quote text="Dominate your lane before dreaming global." />
        </SectionCard>
      );
      case 3: return (
        <SectionCard title="Leverage Map" icon={"⚡"} story={"Karthik built bakery automation software using his IT skills and his family’s bakery access."}>
          <Quote text="Your next startup is hidden inside your existing assets." />
          {isMobile ? LEVERAGE_ASSETS.map(function(row,idx){
            return (<div key={idx} style={{background:idx%2===0?"#f8f9ff":"#fff",padding:"12px",borderRadius:"8px",marginBottom:"8px",border:"1px solid #eee"}}>
              <div style={{fontWeight:600,color:"#1a1a1a",fontSize:"14px"}}>{row.asset}</div>
              <div style={{fontSize:"13px",color:"#666"}}>{row.example}</div>
              <div style={{fontSize:"13px",color:"#2196F3",marginTop:"4px"}}>{"→"} {row.leverage}</div>
            </div>);
          }) : (
            <TableWrap>
              <table style={{width:"100%",borderCollapse:"separate",borderSpacing:0,fontSize:"13.5px",marginBottom:"16px"}}>
                <thead><tr style={{background:"#2196F3",color:"#fff"}}>{["Asset","Example","Leverage"].map(function(h,i){return <th key={i} style={{padding:"10px 12px",textAlign:"left",fontWeight:600}}>{h}</th>;})}</tr></thead>
                <tbody>{LEVERAGE_ASSETS.map(function(row,idx){return <tr key={idx} style={{background:idx%2===0?"#f8f9ff":"#fff"}}><td style={{padding:"10px 12px",fontWeight:600}}>{row.asset}</td><td style={{padding:"10px 12px",color:"#666"}}>{row.example}</td><td style={{padding:"10px 12px",color:"#555"}}>{row.leverage}</td></tr>;})}</tbody>
              </table>
            </TableWrap>
          )}
          <label style={ls}>1. What 3 things do I already possess?</label>
          <TextArea value={leverageNotes.q1} onChange={function(v){setLeverageNotes(Object.assign({},leverageNotes,{q1:v}));}} placeholder="Your answer..." />
          <label style={ls}>2. Who in my network can open the first door?</label>
          <TextArea value={leverageNotes.q2} onChange={function(v){setLeverageNotes(Object.assign({},leverageNotes,{q2:v}));}} placeholder="Your answer..." />
          <label style={ls}>3. What am I underutilizing?</label>
          <TextArea value={leverageNotes.q3} onChange={function(v){setLeverageNotes(Object.assign({},leverageNotes,{q3:v}));}} placeholder="Your answer..." />
          <Quote text={"Don’t start from zero. Start from strength."} />
        </SectionCard>
      );
      case 4: return (
        <SectionCard title="Unlearn to Earn" icon={"🔄"} story={"Rahul used to say, “I’ll start when I’m ready.” SK told him, “Start, and readiness will meet you halfway.”"}>
          <Quote text="The version of you that built comfort cannot build freedom." />
          {UNLEARN_HABITS.map(function(row,idx){
            return (<div key={idx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:idx%2===0?"#fff5f5":"#fff",borderRadius:"8px",marginBottom:"4px",gap:"12px",flexWrap:"wrap"}}>
              <span style={{color:"#c62828",textDecoration:"line-through",opacity:0.7,fontSize:"13px",flex:1,minWidth:"120px"}}>{row.old}</span>
              <span style={{color:"#2e7d32",fontWeight:500,fontSize:"13px",flex:1,minWidth:"120px",textAlign:"right"}}>{"→"} {row.replace}</span>
            </div>);
          })}
          <label style={ls}>Biggest bottleneck habit?</label>
          <TextArea value={unlearnNotes.biggest} onChange={function(v){setUnlearnNotes(Object.assign({},unlearnNotes,{biggest:v}));}} placeholder="Pick one and explain..." />
          <label style={ls}>Belief to unlearn this week?</label>
          <TextArea value={unlearnNotes.q2} onChange={function(v){setUnlearnNotes(Object.assign({},unlearnNotes,{q2:v}));}} placeholder="Your answer..." />
          <label style={ls}>What will you replace it with?</label>
          <TextArea value={unlearnNotes.q3} onChange={function(v){setUnlearnNotes(Object.assign({},unlearnNotes,{q3:v}));}} placeholder="Your answer..." />
        </SectionCard>
      );
      case 5: return (
        <SectionCard title="Founder Fit Test" icon={"🧪"} story="Deepa scored 38 on her Founder Fit test. Six months later, she scored 48.">
          <Quote text="Before you validate your product, validate your mindset." />
          <div style={{display:"grid",gap:"10px",marginBottom:"20px"}}>
            {FOUNDER_STATEMENTS.map(function(stmt,idx){
              return (<div key={idx} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:idx%2===0?"#f8f9fa":"#fff",borderRadius:"8px",border:"1px solid #eee",flexWrap:"wrap",gap:"8px"}}>
                <span style={{fontSize:"14px",color:"#333",flex:1,minWidth:"180px"}}>{stmt}</span>
                <StarRating value={founderScores[idx]} onChange={function(v){var c=founderScores.slice();c[idx]=v;setFounderScores(c);}} />
              </div>);
            })}
          </div>
          <div style={{background:"linear-gradient(135deg,"+founderColor+"15,"+founderColor+"08)",border:"2px solid "+founderColor,borderRadius:"12px",padding:"20px",textAlign:"center"}}>
            <div style={{fontSize:"42px",fontWeight:800,color:founderColor,fontFamily:"'Space Grotesk',sans-serif"}}>{founderTotal}/50</div>
            <div style={{fontSize:"16px",fontWeight:600,color:founderColor,marginTop:"4px"}}>{founderLabel}</div>
            <ProgressBar value={founderTotal} max={50} />
          </div>
        </SectionCard>
      );
      case 6: return (
        <SectionCard title="The Validation Canvas" icon={"📋"} story="Asha thought she needed a full app. SK asked her to sell on WhatsApp first — she got 10 paying customers that week.">
          <Quote text="Validation = real user + real feedback + real payment." />
          {[{key:"problem",label:"Problem",desc:"What pain are you solving?"},{key:"audience",label:"Audience",desc:"Who experiences it often?"},{key:"solution",label:"Solution",desc:"How do you solve it?"},{key:"differentiator",label:"Differentiator",desc:"Why are you unique?"},{key:"businessModel",label:"Business Model",desc:"How do you make money?"},{key:"validation",label:"Validation",desc:"Who paid or showed intent?"},{key:"feedback",label:"Feedback",desc:"What did test users say?"},{key:"pricing",label:"Pricing",desc:"Minimum people pay willingly?"},{key:"channel",label:"Channel",desc:"Where will you reach customers?"},{key:"nextStep",label:"Next Step",desc:"30-day validation plan?"}].map(function(item){
            return (<div key={item.key} style={{marginBottom:"12px"}}>
              <div style={{display:"flex",alignItems:"baseline",gap:"8px",marginBottom:"4px",flexWrap:"wrap"}}>
                <span style={{fontWeight:600,fontSize:"14px",color:"#1a1a1a"}}>{item.label}</span>
                <span style={{fontSize:"12px",color:"#888"}}>{item.desc}</span>
              </div>
              <TextArea value={canvas[item.key]} onChange={function(v){var u=Object.assign({},canvas);u[item.key]=v;setCanvas(u);}} placeholder={item.desc} rows={2} />
            </div>);
          })}
          <label style={ls}>Reflection</label>
          <TextArea value={canvasReflection} onChange={setCanvasReflection} placeholder="Who is the first stranger I can talk to?" />
        </SectionCard>
      );
      case 7: return (
        <SectionCard title="Minimum Viable Proof (MVP)" icon={"🚀"} story="Vivek spent months coding. SK made him sell a landing page version — it worked. He saved 6 months.">
          <Quote text="Your code is not validation — your first sale is." />
          <label style={ls}>1. Smallest version I can test today?</label>
          <TextArea value={mvpReflection.q1} onChange={function(v){setMvpReflection(Object.assign({},mvpReflection,{q1:v}));}} placeholder="Your answer..." />
          <label style={ls}>2. Can I explain it in one sentence?</label>
          <TextArea value={mvpReflection.q2} onChange={function(v){setMvpReflection(Object.assign({},mvpReflection,{q2:v}));}} placeholder="One sentence pitch..." rows={2} />
          <label style={ls}>3. Can I get one paying customer this week?</label>
          <TextArea value={mvpReflection.q3} onChange={function(v){setMvpReflection(Object.assign({},mvpReflection,{q3:v}));}} placeholder="Your plan..." />
          <Quote text="Build validation, not versions." />
        </SectionCard>
      );
      case 8: return (
        <SectionCard title="Early Team and Internship Formula" icon={"👥"} story="SK guided a young founder to start with two college interns. Within 2 months, they became growth partners.">
          <div style={{background:"#e8f5e9",borderRadius:"10px",padding:"14px",marginBottom:"16px",border:"1px solid #c8e6c9"}}>
            <div style={{fontWeight:600,color:"#2e7d32",fontSize:"14px",marginBottom:"6px"}}>The Formula</div>
            <div style={{color:"#33691e",fontSize:"14px",lineHeight:1.6}}>
              Start with 2 interns ({"₹"}5K{"–"}{"₹"}10K each):<br/>
              {"→"} One for validation and outreach<br/>
              {"→"} One for customer communication and market research
            </div>
          </div>
          <label style={ls}>1. Who can I onboard?</label>
          <TextArea value={teamReflection.q1} onChange={function(v){setTeamReflection(Object.assign({},teamReflection,{q1:v}));}} placeholder="Your answer..." />
          <label style={ls}>2. What clear goals will I assign?</label>
          <TextArea value={teamReflection.q2} onChange={function(v){setTeamReflection(Object.assign({},teamReflection,{q2:v}));}} placeholder="Your answer..." />
          <label style={ls}>3. How will I mentor them?</label>
          <TextArea value={teamReflection.q3} onChange={function(v){setTeamReflection(Object.assign({},teamReflection,{q3:v}));}} placeholder="Your answer..." />
        </SectionCard>
      );
      case 9: return (
        <SectionCard title="Validation Checklist" icon={"✅"}>
          <Quote text="Proof beats presentation. Show the world your first win, not your first logo." />
          <div style={{borderRadius:"10px",padding:"16px",marginBottom:"20px",textAlign:"center",background:"#f8f9fa",border:"1px solid #eee"}}>
            <span style={{fontSize:"28px",fontWeight:800,fontFamily:"'Space Grotesk',sans-serif"}}>{checklistDone}/10</span>
            <ProgressBar value={checklistDone} max={10} />
          </div>
          <div style={{display:"grid",gap:"8px",marginBottom:"24px"}}>
            {CHECKLIST_ITEMS.map(function(item,idx){
              return (<label key={idx} style={{display:"flex",alignItems:"flex-start",gap:"12px",padding:"12px 14px",background:checklist[idx]?"#f0fdf4":"#fafafa",borderRadius:"8px",cursor:"pointer",border:checklist[idx]?"1.5px solid #86efac":"1.5px solid #eee"}}>
                <input type="checkbox" checked={checklist[idx]} onChange={function(){var c=checklist.slice();c[idx]=!c[idx];setChecklist(c);}} style={{width:"20px",height:"20px",accentColor:"#22c55e",cursor:"pointer",marginTop:"2px",flexShrink:0}} />
                <span style={{fontSize:"14px",color:checklist[idx]?"#166534":"#555",textDecoration:checklist[idx]?"line-through":"none",flex:1}}>
                  <span style={{fontWeight:600,color:checklist[idx]?"#16a34a":"#999",marginRight:"6px"}}>Step {idx+1}</span>{item}
                </span>
              </label>);
            })}
          </div>
          <div style={{borderTop:"2px solid #eee",paddingTop:"20px"}}>
            <h3 style={{fontSize:"16px",fontWeight:700,color:"#1a1a1a",marginBottom:"12px"}}>Final Reflection</h3>
            <label style={ls}>1. Validated idea by end of this month?</label>
            <TextArea value={finalReflection.q1} onChange={function(v){setFinalReflection(Object.assign({},finalReflection,{q1:v}));}} placeholder="Your answer..." />
            <label style={ls}>2. Who are my first 3 customers?</label>
            <TextArea value={finalReflection.q2} onChange={function(v){setFinalReflection(Object.assign({},finalReflection,{q2:v}));}} placeholder="Your answer..." />
            <label style={ls}>3. Lesson for Week 2?</label>
            <TextArea value={finalReflection.q3} onChange={function(v){setFinalReflection(Object.assign({},finalReflection,{q3:v}));}} placeholder="Your answer..." />
          </div>
          <div style={{marginTop:"28px",textAlign:"center"}}>
            <button onClick={handleExportPDF} style={{padding:"14px 28px",background:"linear-gradient(135deg,#1a1a1a,#333)",color:"#FFB800",border:"none",borderRadius:"12px",fontSize:"15px",fontWeight:700,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",boxShadow:"0 4px 14px rgba(0,0,0,0.2)",width:isMobile?"100%":"auto"}}>
              {"📄"} Download All Responses
            </button>
            <div style={{fontSize:"12px",color:"#888",marginTop:"8px"}}>Downloads HTML {"—"} open in browser, Print {"→"} Save as PDF</div>
          </div>
        </SectionCard>
      );
      default: return null;
    }
  };

  // ─── Layout ────────────────────────────────────────────────
  return (
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',sans-serif",background:"#f4f4f5",overflow:"hidden",position:"relative"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet" />

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div onClick={function(){setSidebarOpen(false);}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:90}} />
      )}

      {/* Sidebar */}
      <div style={{
        width:"280px",minWidth:"280px",background:"#1a1a1a",color:"#fff",display:"flex",flexDirection:"column",zIndex:100,
        position:isMobile?"fixed":"relative",
        left:isMobile?(sidebarOpen?"0":"-300px"):"0",
        top:0,bottom:0,
        transition:"left 0.25s ease",
        boxShadow:isMobile&&sidebarOpen?"4px 0 20px rgba(0,0,0,0.3)":"none",
      }}>
        <div style={{padding:"20px 16px 14px",borderBottom:"1px solid #333",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{fontSize:"22px"}}>{"⚡"}</span>
            <div>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"15px"}}>SURGE STARTUPS</div>
              <div style={{fontSize:"10px",color:"#888"}}>{"Founder’s Compass — Part 2"}</div>
            </div>
          </div>
          {isMobile && <button onClick={function(){setSidebarOpen(false);}} style={{background:"none",border:"none",color:"#888",fontSize:"24px",cursor:"pointer",padding:"4px"}}>{"✕"}</button>}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"8px"}}>
          {SECTIONS.map(function(sec,idx){
            return (<button key={sec.id} onClick={function(){navTo(idx);}}
              style={{display:"flex",alignItems:"center",gap:"10px",width:"100%",padding:"10px 12px",border:"none",borderRadius:"8px",cursor:"pointer",background:idx===activeSection?"#FFB800":"transparent",color:idx===activeSection?"#1a1a1a":"#ccc",fontSize:"13.5px",fontWeight:idx===activeSection?600:400,textAlign:"left",fontFamily:"'DM Sans',sans-serif",marginBottom:"2px"}}>
              <span style={{width:"22px",height:"22px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:700,background:idx===activeSection?"#1a1a1a":"#333",color:idx===activeSection?"#FFB800":"#888",flexShrink:0}}>{idx+1}</span>
              {sec.title}
            </button>);
          })}
        </div>
        <div style={{padding:"10px 16px",borderTop:"1px solid #333"}}>
          <button onClick={handleExportPDF} style={{width:"100%",padding:"10px",background:"#FFB800",color:"#1a1a1a",border:"none",borderRadius:"8px",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
            {"📄"} Export PDF
          </button>
        </div>
        <div style={{padding:"6px 16px 12px",fontSize:"10px",color:"#666"}}>workfast.ai/surge-startups</div>
      </div>

      {/* Main content */}
      <div ref={contentRef} style={{flex:1,overflowY:"auto",padding:isMobile?"16px":"32px"}}>
        <div style={{maxWidth:"780px",margin:"0 auto"}}>
          {/* Top bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px",gap:"8px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
              {isMobile && (
                <button onClick={function(){setSidebarOpen(true);}} style={{background:"#fff",border:"1.5px solid #ddd",borderRadius:"8px",padding:"8px 10px",cursor:"pointer",fontSize:"18px",lineHeight:1,display:"flex",alignItems:"center"}}>
                  {"☰"}
                </button>
              )}
              <div style={{fontSize:"12px",color:"#888",fontWeight:500}}>Section {activeSection+1}/{SECTIONS.length}</div>
            </div>
            <div style={{display:"flex",gap:"6px"}}>
              <button onClick={function(){setActiveSection(Math.max(0,activeSection-1));scrollToTop();}} disabled={activeSection===0}
                style={{padding:"8px 12px",border:"1.5px solid #ddd",borderRadius:"8px",background:"#fff",cursor:activeSection===0?"not-allowed":"pointer",fontSize:"13px",fontFamily:"'DM Sans',sans-serif",opacity:activeSection===0?0.4:1,color:"#555"}}>
                {"\u2190"}
              </button>
              <button onClick={function(){setActiveSection(Math.min(SECTIONS.length-1,activeSection+1));scrollToTop();}} disabled={activeSection===SECTIONS.length-1}
                style={{padding:"8px 12px",border:"none",borderRadius:"8px",background:activeSection===SECTIONS.length-1?"#ddd":"#FFB800",cursor:activeSection===SECTIONS.length-1?"not-allowed":"pointer",fontSize:"13px",fontWeight:600,fontFamily:"'DM Sans',sans-serif",color:"#1a1a1a"}}>
                {"→"}
              </button>
            </div>
          </div>

          {renderSection()}

          {/* Dot nav */}
          <div style={{display:"flex",justifyContent:"center",gap:"6px",padding:"16px 0 40px",flexWrap:"wrap"}}>
            {SECTIONS.map(function(_,idx){
              return <button key={idx} onClick={function(){navTo(idx);}} style={{width:idx===activeSection?"24px":"8px",height:"8px",borderRadius:"4px",border:"none",background:idx===activeSection?"#FFB800":"#ddd",cursor:"pointer",transition:"all 0.2s",padding:0}} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
