import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";

const LABS: [string, string][] = [
  ["Kimi K3", "builds Claude Code, Codex and others from composable modules, and trains across them"],
  ["Qwen3-Coder-Next", "generates its agentic coding data in six different harnesses"],
  ["MiMo-V2.6", "trains on a pool of task-adapted mini-harnesses"],
  ["Poolside Laguna", "1.3B tokens of OpenHands, OpenCode and Mini-SWE-Agent trajectories"],
  ["Liquid LFM2.5", "picks a harness at random for each training task"],
];

export function LabsSlide() {
  const { T } = useTheme();
  return (
    <SlideShell
      kicker="Who already does this"
      title="This is how frontier labs train coding models today"
      titleSize={40}
    >
      <div style={{ position: "absolute", top: 196, left: 96, right: 96 }}>
        {/* Said plainly, because the room will otherwise read the list as five
            research curiosities instead of current production practice. */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
          style={{ fontSize: 19, color: T.textMuted, lineHeight: 1.5, marginBottom: 18 }}
        >
          In 2025 most model reports did not say which harness a number came from. These are all
          2026, and every one trains inside real harnesses on purpose, over large pools of RL
          environments at once.
        </motion.div>
        {LABS.map(([name, what], i) => (
          <motion.div key={name}
            initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18 + i * 0.12, type: "spring", damping: 22 }}
            style={{
              display: "grid", gridTemplateColumns: "250px 1fr", gap: 24,
              alignItems: "baseline", padding: "13px 0", borderBottom: `1px solid ${T.border}`,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 700, color: T.white }}>{name}</span>
            <span style={{ fontSize: 17, color: T.textMuted, lineHeight: 1.45 }}>{what}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          style={{ marginTop: 22, fontSize: 20, color: T.text, lineHeight: 1.5 }}
        >
          OpenForgeRL checked whether the variety costs peak performance. It does not:{" "}
          <span style={{ color: T.emerald, fontWeight: 700 }}>three</span> harnesses beat{" "}
          <span style={{ color: T.white }}>one</span>,{" "}
          <span style={{ color: T.emerald }}>even on that one’s home turf</span> (48.5 vs 46.0).
        </motion.div>
      </div>
    </SlideShell>
  );
}
