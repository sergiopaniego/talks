import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Link } from "../components/Link";

// Varying the harness is only half of what the labs do: they also train over
// large pools of RL environments at once. This slide is the open side of that
// half, and it is the one that makes the whole talk reusable, because nothing
// here is tied to data analysis.
//
// The MiMo row is the strongest single item: those are literally the
// environments a frontier model was trained on, re-published in a format this
// same stack runs.
const ENVS: [string, string, string][] = [
  [
    "MiMo-V2.6-RL",
    "7,780 of Xiaomi’s own RL environments as Harbor tasks: code, cyber, terminal, webdev, music, general",
    "https://huggingface.co/collections/FineEnvs/mimo-v26-rl-in-harbor-6ab836dba014bd7580f8a3fe",
  ],
  [
    "SmolDataEnvs",
    "5,000 data-analysis tasks, the ones behind every number in this talk",
    "https://huggingface.co/collections/FineEnvs/smoldataenvs-6ab4f2f6e09b7cb872ebc867",
  ],
  [
    "Repo2RLEnv",
    "verifiable coding and terminal environments generated from real repositories",
    "https://huggingface.co/collections/FineEnvs/repo2rlenv-verifiable-rl-environments-6aa82300d7494c050f50508d",
  ],
  [
    "Single-skill envs",
    "GeoGuesser, LaTeX-OCR, paint-with-code, Wordle, each one a Space you can open right now",
    "https://huggingface.co/FineEnvs",
  ],
];

export function EnvsSlide() {
  const { T } = useTheme();
  return (
    <SlideShell
      kicker="Beyond this one run"
      title="The harness is half of it. The environments are the other half"
      titleSize={36}
    >
      <div style={{ position: "absolute", top: 221, left: 96, right: 96 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.14 }}
          style={{ fontSize: 20, color: T.textMuted, lineHeight: 1.5, marginBottom: 22 }}
        >
          The same labs that vary the harness also train over large pools of environments at once.
          Nothing in this stack is tied to data analysis, so that half is open too.
        </motion.div>

        {ENVS.map(([name, what, href], i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.11, type: "spring", damping: 22 }}
            style={{
              display: "grid",
              gridTemplateColumns: "230px 1fr",
              gap: 22,
              alignItems: "baseline",
              padding: "14px 0",
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            <span>
              <Link href={href} size={18} color={T.white}>
                <span style={{ fontFamily: MONO, fontWeight: 700 }}>{name}</span>
              </Link>
            </span>
            <span style={{ fontSize: 17, color: T.textMuted, lineHeight: 1.45 }}>{what}</span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.86, type: "spring", damping: 22 }}
          style={{ marginTop: 26, fontSize: 21, color: T.text, lineHeight: 1.5 }}
        >
          You pick the harness and you pick the environments, and the trainer stays where it is.
        </motion.div>
      </div>
    </SlideShell>
  );
}
