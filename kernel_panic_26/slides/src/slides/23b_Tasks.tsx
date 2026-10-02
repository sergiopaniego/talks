import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Link } from "../components/Link";
import { Panel } from "../components/primitives";

// The setup slide used to name SmolDataEnvs in a single row and move on, which
// left the room with no idea what the model was actually being asked to do, nor
// why the reward can be trusted. Both matter: a deterministic grader is the
// reason none of the later numbers depend on a judge model.
const STATS: [string, string][] = [
  ["5,000", "training tasks"],
  ["250", "held-out, harder on purpose"],
  ["471", "Kaggle datasets behind them"],
];

// The same suite in three shapes, so people pick the one that matches what they
// are doing rather than reverse-engineering it from the training set.
const SHAPES: [string, string, string][] = [
  [
    "SmolDataEnvs",
    "the tasks as plain rows, load it and prompt any model",
    "https://huggingface.co/datasets/FineEnvs/SmolDataEnvs",
  ],
  [
    "-harbor-train",
    "the same tasks as runnable, sandboxed Harbor environments",
    "https://huggingface.co/datasets/FineEnvs/SmolDataEnvs-harbor-train",
  ],
  [
    "-multiharness-sft",
    "agent trajectories to fine-tune on, per harness",
    "https://huggingface.co/datasets/FineEnvs/SmolDataEnvs-multiharness-sft",
  ],
];

export function TasksSlide() {
  const { T } = useTheme();

  return (
    <SlideShell
      kicker="The runs"
      title={
        <>
          The tasks: <span style={{ color: T.emerald }}>SmolDataEnvs</span>
        </>
      }
      titleSize={42}
    >
      <div style={{ position: "absolute", top: 192, left: 96, right: 96 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14 }}
          style={{ fontSize: 20, color: T.textMuted, lineHeight: 1.5, marginBottom: 22 }}
        >
          One task is a real table, a question about it, and a gold answer. They come from real
          data-science notebooks, through the{" "}
          <Link href="https://huggingface.co/datasets/jupyter-agent/jupyter-agent-dataset" size={19} color={T.text}>
            jupyter-agent dataset
          </Link>
          .
        </motion.div>

        <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
          {STATS.map(([n, label], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring", damping: 22 }}
              style={{ textAlign: "center", flex: 1 }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 46,
                  fontWeight: 800,
                  color: T.emerald,
                  letterSpacing: -2,
                }}
              >
                {n}
              </div>
              <div style={{ fontSize: 16, color: T.textMuted, marginTop: 4 }}>{label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62 }}>
          <Panel accent={T.lavender} style={{ padding: "18px 22px" }}>
            <div style={{ fontSize: 19, color: T.textMuted, lineHeight: 1.55 }}>
              <span style={{ color: T.white, fontWeight: 700 }}>
                Verified by a checker, not judged by a model.
              </span>{" "}
              Every task had to be solved in a live sandbox before it was kept, and grading is an
              exact comparison against the known answer. No model sits in the reward path, so the
              signal cannot drift.
            </div>
          </Panel>
        </motion.div>

        <div style={{ marginTop: 20 }}>
          {SHAPES.map(([name, what, href], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.08, type: "spring", damping: 22 }}
              style={{
                display: "grid",
                gridTemplateColumns: "230px 1fr",
                gap: 20,
                alignItems: "baseline",
                padding: "9px 0",
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              <span>
                <Link href={href} size={16} color={T.emerald}>
                  {name}
                </Link>
              </span>
              <span style={{ fontSize: 16, color: T.textDim, lineHeight: 1.4 }}>{what}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
