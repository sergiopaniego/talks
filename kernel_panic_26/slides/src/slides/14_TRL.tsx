import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Link } from "../components/Link";

const TRAINERS = ["SFT", "DPO", "GRPO", "RLOO", "KTO", "Reward", "Distillation"];

export function TRLSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="The pieces" title={<><span style={{ color: T.lavender }}>TRL</span> is the trainer</>}>
      <div style={{ position: "absolute", top: 236, left: 96, right: 96 }}>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          style={{ fontSize: 22, color: T.text, lineHeight: 1.55, marginBottom: 28 }}
        >
          Hugging Face’s post-training library. One trainer class per method, same shape for all of them.
        </motion.div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 30 }}>
          {TRAINERS.map((t, i) => (
            <motion.div key={t}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              style={{
                fontFamily: MONO, fontSize: 17, padding: "9px 16px", borderRadius: 999,
                border: `1px solid ${t === "GRPO" ? T.lavender : T.border}`,
                color: t === "GRPO" ? T.lavender : T.textMuted,
                fontWeight: t === "GRPO" ? 700 : 400,
              }}
            >
              {t}Trainer
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
          style={{ padding: "20px 24px", borderRadius: 12, border: `1px solid ${T.borderStrong}` }}
        >
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: T.white, marginBottom: 10 }}>
            async GRPO
          </div>
          <div style={{ fontSize: 18, color: T.textMuted, lineHeight: 1.55 }}>
            Generation and training run apart. One GPU trains while a second serves the policy with
            vLLM and keeps producing rollouts, so training never waits for the slowest agent.
            The price is that rollouts come from weights two optimizer steps old, never more than four.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          style={{ marginTop: 20, display: "flex", gap: 22, alignItems: "baseline" }}
        >
          <Link href="https://huggingface.co/docs/trl/async_grpo_trainer" size={14}>hf.co/docs/trl</Link>
          <Link href="https://github.com/huggingface/trl/tree/main/examples/async_grpo_harbor" size={14}>examples/async_grpo_harbor</Link>
        </motion.div>
      </div>
    </SlideShell>
  );
}
