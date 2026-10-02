import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { Accent } from "../components/primitives";

// Divider: the turn from "this is the problem" to "here is the open stack".
export function MissingSlide() {
  const { T } = useTheme();
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 130px" }}>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ fontFamily: MONO, fontSize: 19, letterSpacing: 6, color: T.textDim,
          textTransform: "uppercase", marginBottom: 38 }}
      >
        So what is missing
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", damping: 20 }}
        style={{ fontSize: 50, fontWeight: 800, color: T.white, lineHeight: 1.25, maxWidth: 1040 }}
      >
        An <Accent color="emerald" glow>open</Accent> way to train inside{" "}
        <Accent color="lavender">any harness</Accent>, without touching its code
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ fontSize: 22, color: T.textMuted, marginTop: 36, lineHeight: 1.6, maxWidth: 900 }}
      >
        It has to capture everything RL needs from a program you do not control,
        and feed whichever trainer you already use.
      </motion.div>
      {/* A supporting stat, not a terminal line: the numbers carry it, the
          attribution sits quietly underneath. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, type: "spring", damping: 22 }}
        style={{
          marginTop: 46, paddingTop: 26, borderTop: `1px solid ${T.border}`,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 15, letterSpacing: 3, color: T.textDim, textTransform: "uppercase" }}>
          and it does not take a frontier budget
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <span style={{ fontSize: 46, fontWeight: 800, color: T.textMuted }}>41.8%</span>
          <span style={{ fontSize: 26, color: T.textDim }}>&#8594;</span>
          <span style={{ fontSize: 46, fontWeight: 800, color: T.emerald }}>56.4%</span>
          <span style={{ fontSize: 19, color: T.textMuted, marginLeft: 8 }}>on SWE-bench Verified</span>
        </div>
        <div style={{ fontSize: 17, color: T.textDim }}>
          Agent Lightning, Qwen3.5-9B, with roughly 6,000 training examples
        </div>
      </motion.div>
    </div>
  );
}
