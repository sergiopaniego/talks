import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Link } from "../components/Link";

const ROWS: [string, string][] = [
  ["model", "LFM2.5-2.6B, trained by Liquid AI in Hermes Agent and OpenClaw, neither of them ours"],
  ["tasks", "1,000 of those training tasks, 400 medium and 600 hard, in one fixed order"],
  ["test", "250 held-out tasks, each run under all four harnesses: 1,000 cells"],
  ["two runs", "one in OpenCode alone, one rotating the four across GRPO groups"],
  ["recipe", "async GRPO in TRL, 1,000 steps, 2x H100, one E2B sandbox per rollout"],
  ["time", "32 h for OpenCode-only, 46 h for multi-harness"],
];

export function SetupSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="The runs" title="The setup" titleSize={42}>
      <div style={{ position: "absolute", top: 232, left: 96, right: 96 }}>
        {ROWS.map(([k, v], i) => (
          <motion.div key={k}
            initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1, type: "spring", damping: 22 }}
            style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 24,
              alignItems: "baseline", padding: "12px 0", borderBottom: `1px solid ${T.border}` }}
          >
            <span style={{ fontFamily: MONO, fontSize: 16, color: T.emerald, fontWeight: 700 }}>{k}</span>
            <span style={{ fontSize: 18, color: T.textMuted, lineHeight: 1.45 }}>{v}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          style={{ marginTop: 20, display: "flex", gap: 22, alignItems: "baseline" }}
        >
          <Link href="https://huggingface.co/LiquidAI/LFM2.5-2.6B" size={14}>LiquidAI/LFM2.5-2.6B</Link>
          <Link href="https://huggingface.co/collections/FineEnvs/smoldataenvs" size={14}>FineEnvs/SmolDataEnvs</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          style={{ fontSize: 18, color: T.textDim, marginTop: 18, lineHeight: 1.5 }}
        >
          Both runs follow the same task order, and both are evaluated the same way,
          including under the three harnesses the OpenCode-only run never saw.
        </motion.div>
      </div>
    </SlideShell>
  );
}
