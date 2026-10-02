import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";

export function HeadlineSlide() {
  const { T } = useTheme();
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "0 110px" }}>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ fontFamily: MONO, fontSize: 18, letterSpacing: 5, color: T.textDim,
          textTransform: "uppercase", marginBottom: 44 }}
      >
        Trained across all four
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, type: "spring", damping: 20 }}
        style={{ display: "flex", alignItems: "center", gap: 36 }}
      >
        <span style={{ fontSize: 110, fontWeight: 800, color: T.textMuted, letterSpacing: -5 }}>42%</span>
        <span style={{ fontSize: 44, color: T.textDim }}>→</span>
        <span style={{ fontSize: 110, fontWeight: 800, color: T.emerald, letterSpacing: -5 }}>54%</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ fontSize: 20, color: T.textMuted, marginTop: 16 }}
      >
        held-out tasks solved, averaged over the four harnesses
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
        style={{ marginTop: 52, display: "flex", gap: 70, textAlign: "center" }}
      >
        <div>
          <div style={{ fontSize: 52, fontWeight: 800, color: T.lavender }}>31%</div>
          <div style={{ fontSize: 17, color: T.textMuted, marginTop: 8 }}>fewer tool calls</div>
        </div>
        <div>
          <div style={{ fontSize: 52, fontWeight: 800, color: T.white }}>4 / 4</div>
          <div style={{ fontSize: 17, color: T.textMuted, marginTop: 8 }}>harnesses improved</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        style={{ fontSize: 21, color: T.text, marginTop: 50, textAlign: "center", lineHeight: 1.5 }}
      >
        Trained in OpenCode alone it reaches 58% <span style={{ color: T.textDim }}>there</span>,
        and gains much less everywhere else.
      </motion.div>
    </div>
  );
}
