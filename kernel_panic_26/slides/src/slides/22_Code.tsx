import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";

// Comments sit on their own column, so they are kept short enough never to wrap:
// a wrapped comment pushes its code line out of alignment with the rest.
const LINES: [string, string][] = [
  ["env = HarborEnv.from_hub(", ""],
  ['    "FineEnvs/smoldataenv-multi-harness-harbor",', "tasks and sandboxes"],
  ["    harness=random.choice(HARNESSES),", "picked per rollout"],
  [")", ""],
  ["", ""],
  ["worker = HarnessRolloutWorker(", ""],
  ["    harness_session_factory=env.session_factory,", ""],
  ["    harness_adapter=None,", "the agent owns its loop"],
  ["    rollout_reward_fn=reward,", "correctness and tool calls"],
  [")", ""],
  ["", ""],
  ["AsyncGRPOTrainer(model=..., rollout_worker=worker).train()", ""],
];

export function CodeSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="How it works" title="In code" titleSize={42}>
      <div style={{ position: "absolute", top: 172, left: 96, right: 96 }}>
        <div
          style={{
            padding: "30px 28px",
            borderRadius: 14,
            background: T.bgRaised,
            border: `1px solid ${T.border}`,
          }}
        >
          {LINES.map(([code, note], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.045 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 250px",
                gap: 18,
                fontFamily: MONO,
                fontSize: 18,
                lineHeight: code === "" ? 1.0 : 1.9,
                minHeight: code === "" ? 12 : undefined,
              }}
            >
              <span
                style={{
                  color: note ? T.white : T.textMuted,
                  whiteSpace: "pre",
                }}
              >
                {code}
              </span>
              <span style={{ color: T.emerald, fontSize: 14, whiteSpace: "nowrap" }}>
                {note && `# ${note}`}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          style={{ fontSize: 24, color: T.text, marginTop: 34, textAlign: "center" }}
        >
          Swapping the harness is{" "}
          <span style={{ color: T.emerald, fontWeight: 700 }}>one argument</span>.
        </motion.div>
      </div>
    </SlideShell>
  );
}
