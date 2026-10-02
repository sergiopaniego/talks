import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Panel } from "../components/primitives";

// This used to embed the article's three-by-five transfer matrix, which asks the
// room to hold which model was trained where, two benchmarks, two colours and a
// footnote, all inside a minute. The matrix also invites a reading the paper does
// not support: both OpenSWE-32B and Orchard's model were fine-tuned on two
// harnesses, so the spread between them is not a harness-count comparison.
//
// What the paper does name, and what is genuinely a new beat after the hook, is
// the two shapes of failure. The hook says the score moves. This says the run can
// end. Numbers are Orchard, SWE-bench Verified, identical tasks under every
// harness, with Kimi-CLI unseen by every system compared.
const CASES: [string, string, string, string][] = [
  [
    "degraded",
    "the model still works, and solves less",
    "OpenSWE-32B keeps 54.9% when it moves to Mini-SWE-Agent, then falls to 3.6% under Kimi-CLI, from 62.4% at home. On Terminal-Bench 2.0 it scores zero.",
    "lavender",
  ],
  [
    "catastrophic",
    "the output stops being usable at all",
    "Scale-SWE stops producing valid tool calls anywhere but the harness it was trained in. Orchard has no number to report for those cells.",
    "minus",
  ],
];

export function LockinSlide() {
  const { T } = useTheme();
  const hue = (k: string) => (k === "minus" ? T.diffMinus : T.lavender);

  return (
    <SlideShell
      kicker="The cost"
      title="Leaving the harness you trained in can end the run"
      titleSize={40}
    >
      <div style={{ position: "absolute", top: 196, left: 96, right: 96 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14 }}
          style={{ fontSize: 20, color: T.textMuted, lineHeight: 1.5, marginBottom: 28 }}
        >
          Orchard took finished coding models and ran each one under three harnesses, on the same
          tasks. One of the three, <span style={{ color: T.white }}>Kimi-CLI</span>, none of them had
          used in training. Two things went wrong.
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          {CASES.map(([name, gloss, body, key], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34 + i * 0.16, type: "spring", damping: 22 }}
            >
              <Panel accent={hue(key)} style={{ padding: "26px 26px", minHeight: 212 }}>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 23,
                    fontWeight: 700,
                    color: hue(key),
                    marginBottom: 4,
                  }}
                >
                  {name}
                </div>
                <div style={{ fontSize: 16, color: T.textDim, marginBottom: 16 }}>{gloss}</div>
                <div style={{ fontSize: 19, color: T.text, lineHeight: 1.55 }}>{body}</div>
              </Panel>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.78 }}
          style={{ fontSize: 22, color: T.text, marginTop: 30, lineHeight: 1.5 }}
        >
          Kimi-CLI was new to both of them, and they had each seen two harnesses in training.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{ fontFamily: MONO, fontSize: 13, color: T.textDim, marginTop: 14 }}
        >
          Orchard, SWE-bench Verified and Terminal-Bench 2.0, same tasks under every harness
        </motion.div>
      </div>
    </SlideShell>
  );
}
