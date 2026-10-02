import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";

// The whole talk in one comparison: one set of weights, two harnesses.
export function HookSlide() {
  const { T } = useTheme();
  const Side = ({ pct, name, color, delay }: { pct: number; name: string; color: string; delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", damping: 20 }}
      style={{ textAlign: "center" }}
    >
      <div style={{ fontSize: 132, fontWeight: 800, color, letterSpacing: -6, lineHeight: 1 }}>
        {pct}%
      </div>
      <div style={{ fontFamily: MONO, fontSize: 19, color: T.textMuted, marginTop: 14 }}>{name}</div>
    </motion.div>
  );

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "0 100px" }}>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ fontFamily: MONO, fontSize: 19, letterSpacing: 5, color: T.textDim,
          textTransform: "uppercase", marginBottom: 54 }}
      >
        The same weights, on the same tasks
      </motion.div>

      <div style={{ display: "flex", alignItems: "center", gap: 110 }}>
        <Side pct={62} name="Mini-SWE-Agent" color={T.emerald} delay={0.3} />
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
          style={{ fontFamily: MONO, fontSize: 34, color: T.textDim }}
        >
          vs
        </motion.div>
        <Side pct={33} name="Claude Code" color={T.lavender} delay={0.5} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
        style={{ fontSize: 27, color: T.text, marginTop: 56, textAlign: "center", lineHeight: 1.5 }}
      >
        The only difference is the program wrapped around the model.
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25 }}
        style={{ fontFamily: MONO, fontSize: 15, color: T.textDim, marginTop: 20 }}
      >
        LFM2.5-2.6B, 250 held-out SmolDataEnvs tasks, before any training
      </motion.div>
    </div>
  );
}
