import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { MONO } from "../theme";
import { SlideShell } from "../components/SlideShell";
import { Embed } from "../components/Embed";

// The hinge the deck was missing. Everything after this slide, the proxy, the
// four dialects, the capture levels, only makes sense once the room knows the
// trainer is not the one calling the model any more. The article gives this its
// own section and the Agent Lightning quote below is how it names the two modes.
// The figure has its own White box / Black box toggle, and it opens on white,
// which is the right order to tell it in: this is how RL normally runs, then one
// click shows what a harness does to it. The title carries both halves, so the
// exported PDF still makes the point without the click.
const CSS = `body { zoom: 1.02; }`;

export function WhoDrivesSlide() {
  const { T } = useTheme();
  return (
    <SlideShell
      kicker="The background"
      title="Normally the trainer drives. Here the harness does"
      titleSize={38}
    >
      <div style={{ position: "absolute", top: 152, left: 60, right: 60 }}>
        <Embed name="d3-who-drives" css={CSS} height={322} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: 18,
            borderLeft: `3px solid ${T.lavender}`,
            paddingLeft: 22,
            fontSize: 20,
            color: T.text,
            lineHeight: 1.55,
            fontStyle: "italic",
          }}
        >
          “In traditional agentic RL, the training engine owns the environment interaction loop. In{" "}
          <span style={{ color: T.lavender }}>harnessed agentic RL</span>, the harness owns this loop,
          while the training engine observes only a sequence of LLM request-response pairs.”
          <div
            style={{
              fontFamily: MONO,
              fontSize: 14,
              color: T.textDim,
              marginTop: 10,
              fontStyle: "normal",
            }}
          >
            Agent Lightning, Microsoft 2026
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
