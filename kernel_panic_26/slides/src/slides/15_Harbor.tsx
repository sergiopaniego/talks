import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Link } from "../components/Link";
import { Panel } from "../components/primitives";

export function HarborSlide() {
  const { T } = useTheme();
  const Stat = ({ n, label, delay }: { n: string; label: string; delay: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", damping: 22 }}
      style={{ textAlign: "center", flex: 1 }}
    >
      <div style={{ fontFamily: MONO, fontSize: 58, fontWeight: 800, color: T.emerald, letterSpacing: -2 }}>
        {n}
      </div>
      <div style={{ fontSize: 17, color: T.textMuted, marginTop: 8 }}>{label}</div>
    </motion.div>
  );

  return (
    <SlideShell kicker="The pieces" title={<><span style={{ color: T.emerald }}>Harbor</span> brings the tasks and the sandboxes</>} titleSize={40}>
      <div style={{ position: "absolute", top: 222, left: 96, right: 96 }}>
        <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
          <Stat n="40+" label="harness adapters" delay={0.2} />
          <Stat n="10" label="validated end to end in OpenEnv" delay={0.32} />
          <Stat n="1" label="fresh sandbox per rollout" delay={0.44} />
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62 }}
        >
          <Panel accent={T.lavender} style={{ padding: "26px 24px" }}>
            <div style={{ fontSize: 21, color: T.textMuted, lineHeight: 1.6 }}>
              A harness needs a task and a box to run it in. Wire them yourself and you write the
              glue for every harness against every sandbox backend, with the harness sewn into your
              training script. Harbor keeps <span style={{ color: T.white }}>the task</span>,{" "}
              <span style={{ color: T.white }}>the harness</span> and{" "}
              <span style={{ color: T.white }}>the sandbox</span> independent of each other, so each
              one becomes something you pick per rollout.
            </div>
          </Panel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          style={{ fontFamily: MONO, fontSize: 19, color: T.text, marginTop: 34,
            padding: "18px 20px", borderRadius: 10, background: T.bgRaised }}
        >
          <span style={{ color: T.textDim }}>env = </span>
          <span style={{ color: T.emerald }}>HarborEnv</span>
          <span style={{ color: T.textDim }}>(task=..., </span>
          <span style={{ color: T.lavender }}>harness=</span>
          <span style={{ color: T.white }}>"claude-code"</span>
          <span style={{ color: T.textDim }}>)</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
          style={{ marginTop: 18 }}
        >
          <Link href="https://harborframework.com/" size={14}>harborframework.com</Link>
        </motion.div>
      </div>
    </SlideShell>
  );
}
