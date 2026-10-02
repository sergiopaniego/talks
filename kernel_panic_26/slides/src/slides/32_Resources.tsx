import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Link } from "../components/Link";
import { SlidesQR, SLIDES_URL } from "../components/SlidesQR";

// The deck gets shared after the talk, so this slide is the index: every
// resource named anywhere in it, grouped by what you would want to do next.
// Labels rather than URLs, because a 4-column grid cannot hold a Hub
// collection URL and the links are clickable anyway.
const GROUPS: [string, [string, string][]][] = [
  [
    "Read",
    [
      ["The article", "https://huggingface.co/spaces/FineEnvs/multi-harness-rl"],
      ["Why Harbor exists", "https://x.com/adithya_s_k/article/2054961319179420035"],
      ["RL environments guide", "https://huggingface.co/spaces/AdithyaSK/rl-environments-guide"],
      ["RL environments 101", "https://huggingface.co/spaces/AdithyaSK/rl-environments-101-slides"],
      [
        "FineEnvs Academy",
        "https://huggingface.co/collections/FineEnvs/fineenvs-academy-6a942aed464a2eaa85047596",
      ],
      ["The LFM2.5-2.6B release", "https://www.liquid.ai/blog/lfm2-5-2-6b"],
    ],
  ],
  [
    "Run",
    [
      [
        "Everything in one collection",
        "https://huggingface.co/collections/FineEnvs/smoldataenvs-multi-harness-rl-6abdfaaa8d74dacd481d5212",
      ],
      ["TRL Harbor example", "https://github.com/huggingface/trl/tree/main/examples/async_grpo_harbor"],
      ["The tutorials", "https://github.com/adithya-s-k/FineEnvs"],
      [
        "The environment, live",
        "https://huggingface.co/spaces/FineEnvs/smoldataenv-multi-harness-harbor",
      ],
      ["Harbor task visualiser", "https://huggingface.co/spaces/HuggingFaceH4/harbor-visualiser"],
      [
        "Every training curve",
        "https://huggingface.co/spaces/FineEnvs/data-agent-training-comparison-trackio",
      ],
    ],
  ],
  [
    "Models and data",
    [
      ["Multi-harness RL model", "https://huggingface.co/FineEnvs/LFM2.5-2.6B-multiharness-RL"],
      ["OpenCode-only RL model", "https://huggingface.co/FineEnvs/LFM2.5-2.6B-opencode-RL"],
      ["The SFT models", "https://huggingface.co/FineEnvs/LFM2.5-2.6B-multiharness-SFT"],
      ["The base model", "https://huggingface.co/LiquidAI/LFM2.5-2.6B"],
      ["SmolDataEnvs", "https://huggingface.co/datasets/FineEnvs/SmolDataEnvs"],
      [
        "MiMo-V2.6 RL environments",
        "https://huggingface.co/collections/FineEnvs/mimo-v26-rl-in-harbor-6ab836dba014bd7580f8a3fe",
      ],
    ],
  ],
  [
    "Docs and code",
    [
      ["TRL docs", "https://huggingface.co/docs/trl"],
      ["Async GRPO trainer", "https://huggingface.co/docs/trl/async_grpo_trainer"],
      ["OpenEnv docs", "https://huggingface.co/docs/openenv"],
      ["Harbor", "https://harborframework.com/"],
      ["TRL on GitHub", "https://github.com/huggingface/trl"],
      ["OpenEnv on GitHub", "https://github.com/huggingface/OpenEnv"],
    ],
  ],
];

export function ResourcesSlide() {
  const { T } = useTheme();
  return (
    <SlideShell kicker="Over to you" title="Everything, in one place" titleSize={42}>
      <div style={{ position: "absolute", top: 180, left: 96, right: 96 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 26 }}>
          {GROUPS.map(([head, items], g) => (
            <div key={head}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.14 + g * 0.1 }}
                style={{
                  fontFamily: MONO,
                  fontSize: 14,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  color: T.emerald,
                  paddingBottom: 10,
                  marginBottom: 12,
                  borderBottom: `1px solid ${T.border}`,
                }}
              >
                {head}
              </motion.div>
              {items.map(([label, href], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + g * 0.1 + i * 0.05, type: "spring", damping: 22 }}
                  style={{ marginBottom: 17, lineHeight: 1.35 }}
                >
                  <Link href={href} size={15} color={T.text}>
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* The footer band was empty, and it is where the QR belongs: inset
            from the right edge so it clears the slide number in the corner. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.78 }}
          style={{
            marginTop: 26,
            paddingTop: 22,
            borderTop: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "flex-start",
            gap: 44,
          }}
        >
          <div style={{ flex: 1, fontSize: 20, color: T.textMuted, lineHeight: 1.5 }}>
            The deck is at{" "}
            <Link href={SLIDES_URL} size={19} color={T.text}>
              hf.co/spaces/FineEnvs/multi-harness-rl-slides
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 13, marginTop: 18 }}>
              <span style={{ fontSize: 18, color: T.textMuted }}>Sergio Paniego</span>
              <Link href="https://x.com/sergiopaniego" size={21} color={T.emerald}>
                <span style={{ fontWeight: 700 }}>@sergiopaniego</span>
              </Link>
              <span style={{ fontSize: 16, color: T.textDim }}>Hugging Face</span>
            </div>
          </div>
          <div style={{ marginRight: 52 }}>
            <SlidesQR size={104} label="THESE SLIDES" />
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
