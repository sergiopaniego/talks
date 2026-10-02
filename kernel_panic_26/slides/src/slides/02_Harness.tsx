import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";

const HARNESSES = [
  "Claude Code",
  "Codex",
  "OpenCode",
  "Cursor",
  "Cline",
  "Pi",
  "Goose",
  "Mini-SWE-Agent",
];

const OWNS: [string, string][] = [
  ["runs the loop", "it calls the model again and again, and decides when to stop"],
  ["picks the tools", "the model only gets the tools this harness exposes, under its names"],
  ["writes the context", "what the model reads is assembled, trimmed and compacted by the harness"],
  ["reads the reply", "and rejects it if the format is not the one it expects"],
];

export function HarnessSlide() {
  const { T } = useTheme();

  return (
    <SlideShell
      kicker="The vocabulary"
      title={
        <>
          An agent is a model plus a <span style={{ color: T.lavender }}>harness</span>
        </>
      }
    >
      <div style={{ position: "absolute", top: 222, left: 96, right: 96 }}>
        {/* the ones in the room's hands, as chips rather than a run-on list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}
        >
          {HARNESSES.map((h, i) => (
            <motion.span
              key={h}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              style={{
                fontFamily: MONO,
                fontSize: 15,
                padding: "6px 13px",
                borderRadius: 999,
                border: `1px solid ${T.border}`,
                color: T.textMuted,
                whiteSpace: "nowrap",
              }}
            >
              {h}
            </motion.span>
          ))}
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {OWNS.map(([head, body], i) => (
            <motion.div
              key={head}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring", damping: 22 }}
              style={{
                background: T.bgRaised,
                border: `1.5px solid ${T.border}`,
                borderRadius: 16,
                padding: "20px 22px",
                minHeight: 128,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 19,
                  fontWeight: 700,
                  color: T.white,
                  marginBottom: 9,
                }}
              >
                {head}
              </div>
              <div style={{ fontSize: 16, color: T.textMuted, lineHeight: 1.55 }}>{body}</div>
            </motion.div>
          ))}
        </div>

        {/* The second line is the thesis of the title and was missing from the
            whole deck: these are real programs people install, and the training
            story only counts if they keep running exactly as they ship. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          style={{ marginTop: 28, textAlign: "center" }}
        >
          <div style={{ fontSize: 22, color: T.text, lineHeight: 1.5 }}>
            Change the harness, and you change what the model sees and may do.
          </div>
          <div style={{ fontSize: 19, color: T.textDim, lineHeight: 1.5, marginTop: 8 }}>
            None of them was written with training in mind, and{" "}
            <span style={{ color: T.lavender }}>we do not change a line of their code</span>.
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
