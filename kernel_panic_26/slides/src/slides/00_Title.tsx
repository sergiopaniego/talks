import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { Accent } from "../components/primitives";
import { HFMark } from "../components/figures";

// The one place the deck is tied to an event. Change these two lines to re-run
// the talk somewhere else; nothing else in the deck dates.
const EVENT = "Kernel Panic, AI Open Models Conference";
const WHERE = "Madrid, 06 Oct 2026";

const HANDLE = "@sergiopaniego";

export function TitleSlide() {
  const { T } = useTheme();
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "0 110px" }}>
      <motion.div
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: "spring", damping: 22 }}
        style={{ fontSize: 64, fontWeight: 800, color: T.white, letterSpacing: -2, lineHeight: 1.02 }}
      >
        Training a coding agent
        <br />
        through a harness
        <br />
        <Accent color="lavender" glow>you did not write</Accent>
      </motion.div>

      {/* The handle gets its own line at display size rather than hiding inside
          the byline: this slide is up while the room settles, and it is the one
          thing people photograph or type while they wait. */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 46 }}
      >
        <span style={{ fontSize: 23, fontWeight: 700, color: T.text }}>Sergio Paniego</span>
        <span style={{ width: 1, height: 24, background: T.border }} />
        <span style={{ fontFamily: MONO, fontSize: 25, fontWeight: 700, color: T.emerald }}>
          {HANDLE}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 9, marginLeft: 4 }}>
          <HFMark size={24} />
          <span style={{ fontSize: 19, color: T.textMuted }}>Hugging Face</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }}
        style={{ fontFamily: MONO, fontSize: 16, color: T.textDim, marginTop: 22, lineHeight: 1.75 }}
      >
        {EVENT}
        <br />
        {WHERE}
      </motion.div>
    </div>
  );
}
