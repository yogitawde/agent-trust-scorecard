import { useState } from "react";

const dimensions = [
  {
    id: "intent",
    letter: "I",
    label: "Intent Clarity",
    color: "#4ADE80",
    description: "How clearly defined is the agent's purpose, goal, and scope?",
    rubric: [
      { level: 1, label: "Undefined", desc: "No documented purpose. The agent's goal is understood informally but not written down. Scope is entirely open-ended." },
      { level: 2, label: "Informal", desc: "A rough goal exists but it's vague. Stakeholders would describe the agent's purpose differently if asked separately." },
      { level: 3, label: "Documented", desc: "A written purpose statement exists. Scope is broadly defined but edge cases are unaddressed." },
      { level: 4, label: "Clear", desc: "Purpose is precise and agreed upon. Scope boundaries are explicit. Out-of-scope cases are documented." },
      { level: 5, label: "Optimized", desc: "Purpose is measurable with success criteria. Scope is versioned and reviewed. All stakeholders are aligned." },
    ],
  },
  {
    id: "memory",
    letter: "M",
    label: "Memory Safety",
    color: "#60A5FA",
    description: "How responsibly is user data handled, retained, and protected?",
    rubric: [
      { level: 1, label: "Uncontrolled", desc: "No data retention policy. The agent stores everything indefinitely with no user awareness or control." },
      { level: 2, label: "Ad hoc", desc: "Some data limits exist but are inconsistently applied. Users have no visibility into what is stored." },
      { level: 3, label: "Managed", desc: "A retention policy exists. Users can request deletion. Sensitive data is identified but not fully minimized." },
      { level: 4, label: "Controlled", desc: "Data minimization is practiced. Retention windows are defined. Users have self-serve controls over their data." },
      { level: 5, label: "Optimized", desc: "Minimal data stored by design. Full user control with audit logs. Compliant with relevant data regulations." },
    ],
  },
  {
    id: "planning",
    letter: "P",
    label: "Action Boundaries",
    color: "#C084FC",
    description: "How well-defined are the limits of what the agent can do autonomously?",
    rubric: [
      { level: 1, label: "Unbounded", desc: "No action limits defined. The agent can attempt any action without restriction or review." },
      { level: 2, label: "Informal limits", desc: "Some actions are avoided by convention but not enforced. No reversibility analysis has been done." },
      { level: 3, label: "Categorized", desc: "Actions are grouped into categories. High-risk actions are identified but human review is inconsistent." },
      { level: 4, label: "Taxonomized", desc: "Full action taxonomy exists. Reversible vs. irreversible actions are documented. Human review is triggered for high-risk actions." },
      { level: 5, label: "Optimized", desc: "Action limits are enforced in the system, not just documented. Confidence thresholds are defined and tested." },
    ],
  },
  {
    id: "autonomy",
    letter: "A",
    label: "Autonomy Control",
    color: "#FCD34D",
    description: "How much control do users and operators have over the agent's autonomy level?",
    rubric: [
      { level: 1, label: "Fixed", desc: "Autonomy is hardcoded. Neither users nor operators can adjust how independently the agent acts." },
      { level: 2, label: "Limited override", desc: "A single global setting exists (e.g. pause/resume) but no nuanced control over specific action types." },
      { level: 3, label: "Configurable", desc: "Users can adjust autonomy within predefined options. Rollback is possible but requires manual effort." },
      { level: 4, label: "Adaptive", desc: "Autonomy expands based on trust signals. Users can fine-tune per action type. Rollback is straightforward." },
      { level: 5, label: "Adaptive", desc: "Autonomy is dynamically calibrated using explicit metrics. Rollback is automated when thresholds are breached." },
    ],
  },
  {
    id: "comms",
    letter: "C",
    label: "Transparency",
    color: "#F9A8D4",
    description: "How clearly does the agent communicate its reasoning, status, and decisions?",
    rubric: [
      { level: 1, label: "Black box", desc: "The agent provides no explanation of its actions or decisions. Users have no visibility into what it is doing or why." },
      { level: 2, label: "Minimal", desc: "The agent surfaces outputs but not reasoning. Users can see what happened but not why." },
      { level: 3, label: "Explained", desc: "Key decisions include brief rationale. Users are notified of major actions before or after they occur." },
      { level: 4, label: "Legible", desc: "The agent surfaces its plan in plain language before acting. Uncertainty is communicated clearly. Users can intervene." },
      { level: 5, label: "Optimized", desc: "Step-by-step reasoning is available on demand. Users can inspect, correct, and replay any decision the agent made." },
    ],
  },
  {
    id: "safety",
    letter: "T",
    label: "Safety Rails",
    color: "#FB923C",
    description: "How robust are the guardrails against harmful or unintended agent behavior?",
    rubric: [
      { level: 1, label: "None", desc: "No guardrails exist. No incident response plan. No kill switch. The agent has no mechanism to prevent harmful actions." },
      { level: 2, label: "Minimal", desc: "A few content filters exist but they are untested. No formal risk register or incident playbook." },
      { level: 3, label: "Basic rails", desc: "A risk register exists. Prohibited actions are documented. A kill switch exists but may not be accessible to all operators." },
      { level: 4, label: "Tested", desc: "Guardrails are tested against adversarial inputs. Incident response is documented and has been rehearsed." },
      { level: 5, label: "Optimized", desc: "Guardrails are enforced at the system level. Prompt injection is mitigated. Kill switch is accessible and regularly tested." },
    ],
  },
];

function getVerdict(score) {
  if (score >= 5) return { label: "Ship-ready", color: "#4ADE80", bg: "#052e16", desc: "Your agent meets senior PM trust standards across all dimensions." };
  if (score >= 4) return { label: "Nearly there", color: "#FCD34D", bg: "#1c1a07", desc: "Strong foundation — a few dimensions need tightening before launch." };
  if (score >= 3) return { label: "Needs work", color: "#FB923C", bg: "#1c0f05", desc: "Core trust gaps exist. Revisit weaker dimensions before building further." };
  return { label: "Not ready", color: "#F87171", bg: "#1c0505", desc: "Critical trust foundations are missing. Pause and address before proceeding." };
}

function Gauge({ score }) {
  const verdict = getVerdict(score);
  const pct = ((score - 1) / 4) * 100;
  const radius = 72;
  const stroke = 8;
  const nr = radius - stroke / 2;
  const circ = Math.PI * nr;
  const progress = (pct / 100) * circ;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0 12px" }}>
      <svg width={radius * 2 + stroke} height={radius + stroke + 8} overflow="visible">
        <path
          d={`M ${stroke / 2} ${radius + stroke / 2} A ${nr} ${nr} 0 0 1 ${radius * 2 + stroke / 2} ${radius + stroke / 2}`}
          fill="none" stroke="#222" strokeWidth={stroke} strokeLinecap="round"
        />
        <path
          d={`M ${stroke / 2} ${radius + stroke / 2} A ${nr} ${nr} 0 0 1 ${radius * 2 + stroke / 2} ${radius + stroke / 2}`}
          fill="none" stroke={verdict.color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${progress} ${circ}`}
          style={{ transition: "stroke-dasharray 0.5s ease, stroke 0.4s ease" }}
        />
        <text x={radius + stroke / 2} y={radius - 10} textAnchor="middle"
          fill={verdict.color} fontSize="32" fontWeight="700" fontFamily="inherit"
          style={{ transition: "fill 0.4s ease" }}>
          {score.toFixed(1)}
        </text>
        <text x={radius + stroke / 2} y={radius + 12} textAnchor="middle"
          fill="#555" fontSize="10" fontFamily="inherit" letterSpacing="1">
          OUT OF 5
        </text>
      </svg>
      <div style={{ marginTop: 10, fontSize: 16, fontWeight: 700, color: verdict.color, transition: "color 0.4s" }}>
        {verdict.label}
      </div>
      <div style={{ fontSize: 12, color: "#666", marginTop: 4, textAlign: "center", maxWidth: 220, lineHeight: 1.5 }}>
        {verdict.desc}
      </div>
    </div>
  );
}

export default function AgentTrustScorecard() {
  const [scores, setScores] = useState(Object.fromEntries(dimensions.map(d => [d.id, 3])));
  const [expanded, setExpanded] = useState(null);

  const avg = Object.values(scores).reduce((a, b) => a + b, 0) / dimensions.length;
  const weakest = [...dimensions].sort((a, b) => scores[a.id] - scores[b.id])[0];

  return (
    <div style={{
      fontFamily: "'DM Mono', 'Courier New', monospace",
      background: "#111",
      minHeight: "100vh",
      color: "#D4D4C8",
    }}>
      {/* Header */}
      <div style={{ padding: "28px 36px 20px", borderBottom: "1px solid #1E1E1E" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#444", marginBottom: 4 }}>
          AGENTIC PRODUCT TOOLKIT — PART OF THE IMPACT FRAMEWORK
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(20px, 4vw, 32px)", fontWeight: 700, color: "#EFEFEA", letterSpacing: "-0.02em" }}>
          Agent Trust Scorecard
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#555" }}>
          Score your agent across 6 trust dimensions. Click any dimension to see the full rubric.
        </p>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px" }}>

        {/* Left — Dimensions */}
        <div style={{ padding: "24px 36px", borderRight: "1px solid #1E1E1E" }}>
          {dimensions.map(dim => {
            const score = scores[dim.id];
            const rubricItem = dim.rubric[score - 1];
            const isOpen = expanded === dim.id;

            return (
              <div key={dim.id} style={{ marginBottom: 14 }}>
                {/* Card */}
                <div
                  onClick={() => setExpanded(isOpen ? null : dim.id)}
                  style={{
                    border: `1px solid ${isOpen ? dim.color + "55" : "#1E1E1E"}`,
                    borderRadius: 6,
                    background: isOpen ? "#161616" : "#141414",
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                >
                  {/* Top row */}
                  <div style={{ padding: "14px 16px 10px", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: dim.color, minWidth: 16 }}>{dim.letter}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#EFEFEA" }}>{dim.label}</div>
                      <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{dim.description}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: dim.color }}>{score}</div>
                      <div style={{ fontSize: 10, color: "#555" }}>/ 5</div>
                    </div>
                  </div>

                  {/* Score buttons */}
                  <div style={{ padding: "0 16px 14px", display: "flex", gap: 6 }}>
                    {dim.rubric.map(r => (
                      <button
                        key={r.level}
                        onClick={e => { e.stopPropagation(); setScores(s => ({ ...s, [dim.id]: r.level })); }}
                        style={{
                          flex: 1,
                          padding: "6px 0",
                          border: `1px solid ${score === r.level ? dim.color : "#222"}`,
                          borderRadius: 4,
                          background: score === r.level ? dim.color + "22" : "transparent",
                          color: score === r.level ? dim.color : "#444",
                          fontSize: 11,
                          fontWeight: score === r.level ? 700 : 400,
                          cursor: "pointer",
                          transition: "all 0.15s",
                          fontFamily: "inherit",
                        }}
                      >
                        {r.level}
                      </button>
                    ))}
                  </div>

                  {/* Current level label */}
                  <div style={{
                    margin: "0 16px 12px",
                    padding: "8px 12px",
                    borderLeft: `3px solid ${dim.color}`,
                    background: "#0E0E0E",
                    borderRadius: "0 4px 4px 0",
                  }}>
                    <div style={{ fontSize: 11, color: dim.color, fontWeight: 700, marginBottom: 3 }}>
                      Level {score} — {rubricItem.label}
                    </div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>
                      {rubricItem.desc}
                    </div>
                  </div>

                  {/* Expanded rubric */}
                  {isOpen && (
                    <div style={{ borderTop: "1px solid #1E1E1E", padding: "14px 16px" }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#444", marginBottom: 12 }}>
                        FULL RUBRIC
                      </div>
                      {dim.rubric.map(r => (
                        <div key={r.level} style={{
                          display: "flex", gap: 12, marginBottom: 10,
                          opacity: score === r.level ? 1 : 0.45,
                          transition: "opacity 0.2s",
                        }}>
                          <div style={{
                            minWidth: 28, height: 28, borderRadius: "50%",
                            border: `1px solid ${score === r.level ? dim.color : "#333"}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, fontWeight: 700,
                            color: score === r.level ? dim.color : "#444",
                            flexShrink: 0,
                          }}>
                            {r.level}
                          </div>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: score === r.level ? dim.color : "#555", marginBottom: 2 }}>
                              {r.label}
                            </div>
                            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{r.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right — Score panel */}
        <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
          <Gauge score={avg} />

          {/* Breakdown */}
          <div style={{ borderTop: "1px solid #1E1E1E", paddingTop: 18 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#444", marginBottom: 14 }}>BREAKDOWN</div>
            {dimensions.map(dim => (
              <div key={dim.id} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 11 }}>
                  <span style={{ color: "#666" }}>{dim.label}</span>
                  <span style={{ color: dim.color, fontWeight: 700 }}>{scores[dim.id]}/5</span>
                </div>
                <div style={{ height: 3, background: "#1E1E1E", borderRadius: 2 }}>
                  <div style={{
                    height: "100%",
                    width: `${(scores[dim.id] / 5) * 100}%`,
                    background: dim.color,
                    borderRadius: 2,
                    transition: "width 0.3s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Focus area */}
          <div style={{ borderTop: "1px solid #1E1E1E", paddingTop: 16 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#444", marginBottom: 10 }}>FOCUS AREA</div>
            <div style={{
              padding: "10px 12px",
              borderLeft: `3px solid ${weakest.color}`,
              background: "#141414",
              borderRadius: "0 4px 4px 0",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: weakest.color, marginBottom: 4 }}>{weakest.label}</div>
              <div style={{ fontSize: 11, color: "#555", lineHeight: 1.6 }}>
                Level {scores[weakest.id]} — {weakest.rubric[scores[weakest.id] - 1].label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "12px 36px", borderTop: "1px solid #1A1A1A",
        display: "flex", justifyContent: "space-between",
        fontSize: 10, color: "#333", letterSpacing: "0.08em",
      }}>
        <span>Click any card to expand the full rubric</span>
        <span>IMPACT Framework — Agent Trust Scorecard</span>
      </div>
    </div>
  );
}
