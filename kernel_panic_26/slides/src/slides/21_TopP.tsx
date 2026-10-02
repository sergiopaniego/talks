import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";

export function TopPSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="How it works" title="One setting that quietly breaks the maths" titleSize={40}>
      <div style={{ position: "absolute", top: 260, left: 96, right: 96 }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          style={{ fontSize: 21, color: T.text, lineHeight: 1.6, marginBottom: 30 }}
        >
          The proxy samples from the <span style={{ color: T.white, fontWeight: 700 }}>full</span>{" "}
          distribution, with no <span style={{ fontFamily: MONO, color: T.lavender }}>top_p</span> and no{" "}
          <span style={{ fontFamily: MONO, color: T.lavender }}>top_k</span>. Truncating it biases what
          the policy samples away from what it would sample on its own, which is a known route to
          entropy collapse, and vLLM computes its logprobs after the truncation, so they would not
          match the policy either.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 30 }}
        >
          <div style={{ flex: 1, textAlign: "center", padding: "18px 0", borderRadius: 12,
            border: `1px solid ${T.border}` }}>
            <div style={{ fontFamily: MONO, fontSize: 15, color: T.textDim }}>default top_p</div>
            <div style={{ fontFamily: MONO, fontSize: 32, fontWeight: 800, color: T.textMuted, marginTop: 8 }}>
              0.985 to 0.993
            </div>
          </div>
          <span style={{ fontSize: 26, color: T.textDim }}>→</span>
          <div style={{ flex: 1, textAlign: "center", padding: "18px 0", borderRadius: 12,
            border: `1px solid ${T.emerald}` }}>
            <div style={{ fontFamily: MONO, fontSize: 15, color: T.textDim }}>top_p = 1.0</div>
            <div style={{ fontFamily: MONO, fontSize: 32, fontWeight: 800, color: T.emerald, marginTop: 8 }}>
              0.9984 to 0.9999
            </div>
          </div>
        </motion.div>
        <div style={{ textAlign: "center", fontSize: 16, color: T.textDim, marginTop: -18, marginBottom: 24 }}>
          importance ratio, measured on our runs
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{ fontFamily: MONO, fontSize: 16, color: T.text, padding: "14px 18px",
            borderRadius: 10, background: T.bgRaised }}
        >
          <span style={{ color: T.textDim }}>$ </span>vllm serve &lt;model&gt;{" "}
          <span style={{ color: T.emerald }}>--return-tokens-as-token-ids</span>{" "}
          <span style={{ color: T.emerald }}>--logprobs-mode processed_logprobs</span>
        </motion.div>
      </div>
    </SlideShell>
  );
}
