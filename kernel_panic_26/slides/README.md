---
title: Multi-harness RL slides
emoji: 🎛️
colorFrom: purple
colorTo: green
sdk: static
app_file: index.html
pinned: false
license: apache-2.0
---

# Training a coding agent through a harness you did not write

Talk slides on **multi-harness RL**: training one small model inside four unmodified
coding agents (OpenCode, Claude Code, Codex, Mini-SWE-Agent) with GRPO, and what
changes when you do.

Live: <https://huggingface.co/spaces/FineEnvs/multi-harness-rl-slides>

By Sergio Paniego Blanco, Hugging Face. First given at **Kernel Panic**, the AI Open
Models Conference #01, Madrid, 6 October 2026. The deck carries no date-relative
claims, so it can be given again as is.

Built on the article [The ultimate guide to multi-harness RL](https://huggingface.co/spaces/FineEnvs/multi-harness-rl),
whose figures are embedded here directly. Deck infrastructure adapted from the
[FineEnvs RL Environments 101 slides](https://github.com/adithya-s-k/FineEnvs) by Adithya S Kolavi.

## Controls

| Key | Action |
|---|---|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `t` | Toggle dark / light |
| `f` | Fullscreen |

The last slide carries a QR for the deck itself. If the Space ever moves, re-encode
it and paste the new path into `src/components/SlidesQR.tsx`:

```bash
node -e "require('qrcode').toString('<new url>',{type:'svg',margin:1}).then(console.log)"
```

## Export

The settings panel has **PDF** and **PPTX** buttons. Both files are built ahead of
time and ship with the deck:

```bash
npm run build && npm run export
```

That walks every slide in a real browser and writes `public/*.pdf` and
`public/*.pptx`. It is not done in the browser on demand because the figures are
sandboxed iframes, which no client-side rasteriser can capture, so an in-page
export would come out with a hole where every chart is. The PPTX is one
full-bleed image per slide, which is what Google Slides, Keynote and PowerPoint
all import unchanged.

## Develop

```bash
npm install
npm run dev
```
