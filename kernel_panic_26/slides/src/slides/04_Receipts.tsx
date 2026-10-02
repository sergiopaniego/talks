import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";

// Numbers that only make sense once you know a harness was attached to them.
const ROWS: [string, string, string, string][] = [
  ["Kimi K2", "Terminal-Bench", "25.0", "under Terminus"],
  ["Kimi K2", "Terminal-Bench", "30.0", "under their own framework"],
  ["Claude Opus 4.5", "SWE-bench Pro", "45.9%", "on the SEAL leaderboard"],
  ["Claude Opus 4.5", "SWE-bench Pro", "55.4%", "inside Claude Code"],
];

export function ReceiptsSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="The problem" title="Benchmark scores now come with a harness attached">
      <div style={{ position: "absolute", top: 264, left: 96, right: 96 }}>
        {ROWS.map(([model, bench, score, where], i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.14, type: "spring", damping: 22 }}
            style={{
              display: "grid", gridTemplateColumns: "230px 230px 120px 1fr",
              alignItems: "baseline", gap: 18, padding: "14px 0",
              borderBottom: `1px solid ${T.border}`, fontFamily: MONO,
            }}
          >
            <span style={{ fontSize: 18, color: i % 2 ? T.textDim : T.white, fontWeight: i % 2 ? 400 : 700 }}>
              {i % 2 ? "" : model}
            </span>
            <span style={{ fontSize: 16, color: T.textDim }}>{i % 2 ? "" : bench}</span>
            <span style={{ fontSize: 26, fontWeight: 800, color: i % 2 ? T.emerald : T.textMuted }}>{score}</span>
            <span style={{ fontSize: 16, color: T.textMuted }}>{where}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          style={{ fontSize: 22, color: T.text, marginTop: 34, lineHeight: 1.5 }}
        >
          Same weights, same benchmark. The harness is part of the result now,
          and the reports have started saying so.
        </motion.div>
        <div style={{ fontFamily: MONO, fontSize: 13, color: T.textDim, marginTop: 16 }}>
          Kimi K2 tech report, Zhang et al. 2026, SEAL leaderboard
        </div>
      </div>
    </SlideShell>
  );
}
