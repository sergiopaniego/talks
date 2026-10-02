import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";

// The turn from "the labs do this" to "and you cannot follow them". Without
// this beat the next divider ("what is missing") has nothing to push against:
// the audience has just been told the practice is mainstream, so the obvious
// question is why anyone still needs an open answer.
//
// Careful with the claim: several of these harnesses are themselves open
// (OpenCode, Mini-SWE-Agent). What is closed is the training-side assembly, so
// the columns talk about the pool, the mix and the plumbing, never the tools.
const GET: string[] = [
  "Open weights, often a strong model",
  "A benchmark table",
  "A paragraph naming the harnesses",
];

const MISSING: string[] = [
  "The harness pool, wired the way they ran it",
  "The environment mix, and how it was sampled",
  "The capture layer that turns a harness loop into training samples",
  "The trainer wiring on the other side of it",
];

export function ClosedSlide() {
  const { T } = useTheme();

  const Col = ({
    head,
    items,
    accent,
    mark,
    delay,
  }: {
    head: string;
    items: string[];
    accent: string;
    mark: string;
    delay: number;
  }) => (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
        style={{
          fontFamily: MONO,
          fontSize: 15,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: accent,
          marginBottom: 20,
        }}
      >
        {head}
      </motion.div>
      {items.map((t, i) => (
        <motion.div
          key={t}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.1 + i * 0.09, type: "spring", damping: 22 }}
          style={{
            display: "flex",
            gap: 14,
            alignItems: "baseline",
            padding: "14px 0",
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <span style={{ color: accent, fontSize: 19, fontWeight: 800, lineHeight: 1 }}>{mark}</span>
          <span style={{ fontSize: 19, color: T.textMuted, lineHeight: 1.45 }}>{t}</span>
        </motion.div>
      ))}
    </div>
  );

  return (
    <SlideShell
      kicker="Who already does this"
      title="Open weights, closed training surface"
      titleSize={42}
    >
      <div style={{ position: "absolute", top: 190, left: 96, right: 96 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44 }}>
          <Col head="What you get" items={GET} accent={T.emerald} mark="+" delay={0.18} />
          <Col head="What you do not" items={MISSING} accent={T.lavender} mark="&#8722;" delay={0.42} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, type: "spring", damping: 22 }}
          style={{
            marginTop: 50,
            paddingTop: 28,
            borderTop: `1px solid ${T.border}`,
            fontSize: 25,
            color: T.text,
            lineHeight: 1.5,
          }}
        >
          Every one of those reports describes the practice without handing you{" "}
          <span style={{ color: T.white, fontWeight: 700 }}>anything you can run</span>.
        </motion.div>
      </div>
    </SlideShell>
  );
}
