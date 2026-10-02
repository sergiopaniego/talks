import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Link } from "../components/Link";

// This used to be the link dump, which is now its own index slide after this
// one. What belongs here instead is the shortest honest path from "I just
// watched a talk" to "it is running", plus the credit.
//
// The closing line deliberately avoids repeating the code slide's "one
// argument, not a rewrite", and echoes the title instead.
const STEPS: [string, string][] = [
  ["Install", "openenv[harbor] on Python 3.12, and TRL from main until the worker ships"],
  ["Pick a task set", "any Harbor dataset on the Hub, ours or your own"],
  ["Pick the harnesses", "one string each, rotated per rollout"],
  ["Run the example", "examples/async_grpo_harbor, unchanged"],
];

export function RunItSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="Over to you" title="Run it yourself" titleSize={42}>
      <div style={{ position: "absolute", top: 216, left: 96, right: 96 }}>
        {STEPS.map(([what, how], i) => (
          <motion.div
            key={what}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.14 + i * 0.1, type: "spring", damping: 22 }}
            style={{
              display: "grid",
              gridTemplateColumns: "44px 230px 1fr",
              gap: 20,
              alignItems: "baseline",
              padding: "18px 0",
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 16, color: T.textDim }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, color: T.emerald }}>
              {what}
            </span>
            <span style={{ fontSize: 19, color: T.textMuted, lineHeight: 1.45 }}>{how}</span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62 }}
          style={{ marginTop: 20, display: "flex", gap: 24, alignItems: "baseline" }}
        >
          <Link href="https://github.com/huggingface/trl/tree/main/examples/async_grpo_harbor" size={15}>
            the example
          </Link>
          <Link href="https://huggingface.co/docs/openenv" size={15}>
            OpenEnv docs
          </Link>
          <Link href="https://github.com/adithya-s-k/FineEnvs" size={15}>
            the tutorials
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, type: "spring", damping: 22 }}
          style={{ marginTop: 40, fontSize: 27, color: T.white, fontWeight: 700, lineHeight: 1.4 }}
        >
          A harness you did not write is now somewhere you can train.
        </motion.div>

      </div>
    </SlideShell>
  );
}
