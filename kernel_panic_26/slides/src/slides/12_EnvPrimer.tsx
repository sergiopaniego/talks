import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";

// What RL asks for, and what a coding harness already is. This was a sentence,
// which buried the one-to-one mapping that makes the next slide obvious.
const MAPPING: [string, string][] = [
  ["state", "the filesystem the agent works in"],
  ["actions", "its own write, bash and edit tools"],
  ["reward", "tests that either pass or do not"],
];

export function EnvPrimerSlide() {
  const { T } = useTheme();
  const Box = ({ label, sub, delay, accent }: { label: string; sub: string; delay: number; accent?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", damping: 22 }}
      style={{
        flex: 1, padding: "26px 18px", borderRadius: 12, textAlign: "center",
        border: `1px solid ${accent ? T.emerald : T.border}`,
        background: accent ? "transparent" : T.bgRaised,
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 24, fontWeight: 700, color: accent ? T.emerald : T.white }}>
        {label}
      </div>
      <div style={{ fontSize: 17, color: T.textMuted, marginTop: 8 }}>{sub}</div>
    </motion.div>
  );

  return (
    <SlideShell kicker="The background" title="An RL environment is where it practises" titleSize={42}>
      <div style={{ position: "absolute", top: 222, left: 96, right: 96 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Box label="reset()" sub="a fresh task" delay={0.2} />
          <span style={{ fontSize: 24, color: T.textDim }}>→</span>
          <Box label="step()" sub="the model acts" delay={0.32} />
          <span style={{ fontSize: 24, color: T.textDim }}>→</span>
          <Box label="observation" sub="what happened" delay={0.44} />
          <span style={{ fontSize: 24, color: T.textDim }}>→</span>
          <Box label="reward" sub="a number" delay={0.56} accent />
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.78 }}
          style={{ fontSize: 22, color: T.textMuted, marginTop: 40, marginBottom: 20 }}
        >
          A coding harness already has every one of those.
        </motion.div>

        {MAPPING.map(([need, has], i) => (
          <motion.div
            key={need}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.86 + i * 0.1, type: "spring", damping: 22 }}
            style={{
              display: "grid", gridTemplateColumns: "210px 40px 1fr", gap: 18,
              alignItems: "baseline", padding: "13px 0",
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, color: T.emerald }}>{need}</span>
            <span style={{ fontSize: 20, color: T.textDim }}>&#8592;</span>
            <span style={{ fontSize: 20, color: T.text }}>{has}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ fontSize: 27, fontWeight: 700, color: T.emerald, marginTop: 30 }}
        >
          A coding harness was already an environment.
        </motion.div>
      </div>
    </SlideShell>
  );
}
