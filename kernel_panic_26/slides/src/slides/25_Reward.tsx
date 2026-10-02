import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Panel } from "../components/primitives";

export function RewardSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="The runs" title="What we rewarded" titleSize={42}>
      <div style={{ position: "absolute", top: 239, left: 96, right: 96 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 34 }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, type: "spring", damping: 22 }}>
            <Panel accent={T.emerald} style={{ padding: "26px 24px", minHeight: 140 }}>
              <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 700, color: T.white, marginBottom: 8 }}>
                correctness
              </div>
              <div style={{ fontSize: 17, color: T.textMuted, lineHeight: 1.5 }}>
                1 for a correct answer, 0 for a wrong one. Graded by the task’s own verifier.
              </div>
            </Panel>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, type: "spring", damping: 22 }}>
            <Panel accent={T.lavender} style={{ padding: "26px 24px", minHeight: 140 }}>
              <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 700, color: T.white, marginBottom: 8 }}>
                tool efficiency
              </div>
              <div style={{ fontSize: 17, color: T.textMuted, lineHeight: 1.5 }}>
                at most 0.1, and only on a correct answer, for taking fewer calls.
              </div>
            </Panel>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          style={{ fontSize: 22, color: T.text, lineHeight: 1.6 }}
        >
          The bonus is tiny, and it is the reason the run works. GRPO learns from differences{" "}
          <span style={{ color: T.white, fontWeight: 700 }}>inside a group</span>. When all eight
          rollouts are correct, correctness alone makes them identical and the group teaches nothing.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          style={{ marginTop: 26, display: "flex", gap: 36, alignItems: "baseline" }}
        >
          <div>
            <span style={{ fontFamily: MONO, fontSize: 40, fontWeight: 800, color: T.emerald }}>22.6%</span>
            <span style={{ fontSize: 17, color: T.textMuted, marginLeft: 14 }}>
              of multi-harness groups were all-correct with different tool counts.
            </span>
          </div>
        </motion.div>
        <div style={{ fontSize: 17, color: T.textDim, marginTop: 10 }}>
          For those, the bonus was the only thing telling the eight rollouts apart.
        </div>
      </div>
    </SlideShell>
  );
}
