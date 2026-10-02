import type { ComponentType } from "react";

import { TitleSlide } from "./00_Title";
import { HookSlide } from "./01_Hook";
import { HarnessSlide } from "./02_Harness";
import { LandscapeSlide } from "./03_Landscape";
import { LockinSlide } from "./06_Lockin";
import { OverfitSlide } from "./07_Overfit";
import { LabsSlide } from "./08_Labs";
import { ClosedSlide } from "./09b_Closed";
import { MissingSlide } from "./10_Missing";
import { RLPrimerSlide } from "./11_RLPrimer";
import { EnvPrimerSlide } from "./12_EnvPrimer";
import { WhoDrivesSlide } from "./12b_WhoDrives";
import { OpenEnvSlide } from "./13_OpenEnv";
import { TRLSlide } from "./14_TRL";
import { HarborSlide } from "./15_Harbor";
import { RolloutSlide } from "./17_Rollout";
import { ProxySlide } from "./18_Proxy";
import { CodeSlide } from "./22_Code";
import { ResultsDividerSlide } from "./23_ResultsDivider";
import { TasksSlide } from "./23b_Tasks";
import { SetupSlide } from "./24_Setup";
import { RewardSlide } from "./25_Reward";
import { FinalSlide } from "./26_Final";
import { HeadlineSlide } from "./27_Headline";
import { SavingsSlide } from "./28_Savings";
import { HonestSlide } from "./30_Honest";
import { EnvsSlide } from "./31b_Envs";
import { RunItSlide } from "./31_RunIt";
import { ResourcesSlide } from "./32_Resources";

export type Slide = {
  id: string;
  title: string; // shown in the settings / navigator
  component: ComponentType;
  bare?: boolean; // centered slides with no SlideShell → skipped in numbering
};

export const slides: Slide[] = [
  { id: "title", title: "Title", component: TitleSlide, bare: true },
  { id: "hook", title: "Same weights, 62 vs 33", component: HookSlide, bare: true },

  // ── The problem ──
  { id: "harness", title: "Agent = model + harness", component: HarnessSlide },
  { id: "landscape", title: "The harness landscape", component: LandscapeSlide },
  { id: "lockin", title: "What one harness costs you", component: LockinSlide },
  { id: "overfit", title: "Three ways to overfit", component: OverfitSlide },
  { id: "labs", title: "How frontier labs train today", component: LabsSlide },
  { id: "closed", title: "Open weights, closed training", component: ClosedSlide },
  { id: "missing", title: "What is missing", component: MissingSlide, bare: true },

  // ── The pieces ──
  { id: "rl-primer", title: "Agentic RL in four steps", component: RLPrimerSlide },
  { id: "env-primer", title: "What an RL environment is", component: EnvPrimerSlide },
  { id: "who-drives", title: "Who drives the rollout", component: WhoDrivesSlide },
  { id: "openenv", title: "OpenEnv", component: OpenEnvSlide },
  { id: "trl", title: "TRL", component: TRLSlide },
  { id: "harbor", title: "Harbor", component: HarborSlide },

  // ── How the capture works ──
  { id: "rollout", title: "One rollout end to end", component: RolloutSlide },
  { id: "proxy", title: "The capture proxy", component: ProxySlide },
  { id: "code", title: "In code", component: CodeSlide },

  // ── The runs ──
  { id: "results-divider", title: "So we ran it", component: ResultsDividerSlide, bare: true },
  { id: "tasks", title: "The tasks: SmolDataEnvs", component: TasksSlide },
  { id: "setup", title: "The setup", component: SetupSlide },
  { id: "reward", title: "What we rewarded", component: RewardSlide },
  { id: "final", title: "Final, by harness", component: FinalSlide },
  { id: "headline", title: "42 → 54%", component: HeadlineSlide, bare: true },
  { id: "savings", title: "Tool calls and tokens", component: SavingsSlide },
  { id: "honest", title: "What this does not prove", component: HonestSlide },
  { id: "envs", title: "The other half: environments", component: EnvsSlide },
  { id: "runit", title: "Run it yourself", component: RunItSlide },
  { id: "resources", title: "Everything, in one place", component: ResourcesSlide },
];

// Section numbers shown in the kicker, auto-derived from position and skipping
// bare (centered) slides. Insert slides freely: the numbering fixes itself.
export const sectionOf: Record<string, number | null> = (() => {
  const map: Record<string, number | null> = {};
  let n = 0;
  for (const s of slides) {
    if (s.bare) map[s.id] = null;
    else map[s.id] = ++n;
  }
  return map;
})();
