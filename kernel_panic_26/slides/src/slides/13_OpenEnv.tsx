import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Link } from "../components/Link";
import { Panel } from "../components/primitives";

const FACTS: [string, string][] = [
  ["What it is", "a standard interface for RL environments: Gymnasium-style reset, step and state, over a client and server transport, with typed actions and observations"],
  ["How it ships", "packaged as Docker, publishable to the Hub, so an environment is a repo you can pull"],
  ["Who steers it", "started as a Meta PyTorch and Hugging Face collaboration, now a committee of twelve organisations, BSD-3"],
];

export function OpenEnvSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="The pieces" title={<><span style={{ color: T.emerald }}>OpenEnv</span> is the seam</>}>
      <div style={{ position: "absolute", top: 225, left: 96, right: 96 }}>
        {FACTS.map(([head, body], i) => (
          <motion.div key={head}
            initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18 + i * 0.13, type: "spring", damping: 22 }}
            style={{ marginBottom: 14 }}
          >
            <Panel style={{ padding: "20px 22px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: 20, alignItems: "baseline" }}>
                <span style={{ fontFamily: MONO, fontSize: 16, color: T.emerald, fontWeight: 700 }}>{head}</span>
                <span style={{ fontSize: 17, color: T.textMuted, lineHeight: 1.5 }}>{body}</span>
              </div>
            </Panel>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }}
          style={{ marginTop: 22, fontSize: 21, color: T.text, lineHeight: 1.55 }}
        >
          It does not train anything and it does not define rewards. It is what the harness,
          the environment and the trainer all plug into, and it is where the{" "}
          <span style={{ color: T.lavender, fontWeight: 700 }}>capture proxy</span> lives.
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
          style={{ marginTop: 20, display: "flex", gap: 22, alignItems: "baseline" }}
        >
          <Link href="https://huggingface.co/docs/openenv" size={14}>hf.co/docs/openenv</Link>
          <Link href="https://github.com/huggingface/OpenEnv/releases/tag/v0.7.0" size={14}>v0.7.0 or later</Link>
        </motion.div>
      </div>
    </SlideShell>
  );
}
