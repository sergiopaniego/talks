import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { Accent } from "../components/primitives";

export function ResultsDividerSlide() {
  const { T } = useTheme();
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ fontFamily: MONO, fontSize: 19, letterSpacing: 6, color: T.textDim,
          textTransform: "uppercase", marginBottom: 34 }}
      >
        So we ran it
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", damping: 20 }}
        style={{ fontSize: 54, fontWeight: 800, color: T.white, lineHeight: 1.2, maxWidth: 1000 }}
      >
        One 2.6B model, <Accent color="emerald" glow>four harnesses</Accent>, 1,000 steps
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ fontFamily: MONO, fontSize: 17, color: T.textMuted, marginTop: 34, lineHeight: 1.9 }}
      >
        OpenCode&nbsp;&nbsp; Claude Code&nbsp;&nbsp; Codex&nbsp;&nbsp; Mini-SWE-Agent
      </motion.div>
    </div>
  );
}
