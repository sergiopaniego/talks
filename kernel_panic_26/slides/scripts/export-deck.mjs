/**
 * Export the deck to a PDF and a PPTX, one page per slide, 1280x720 landscape.
 *
 * Both come out of a single walk of the deck, because the expensive part is
 * waiting: the deck is a single-page app with entry animations, and the figures
 * are iframes that have to lay out before anything is captured.
 *
 * The PPTX is one full-bleed image per slide rather than editable shapes. That
 * is deliberate: the figures are sandboxed iframes, so there is nothing to
 * convert into native shapes, and an image per slide is what survives an import
 * into Google Slides, Keynote or PowerPoint intact.
 *
 *   npm run build && npm run export
 *
 * Outputs land in public/ so they ship with the Space and the settings panel
 * can link straight at them.
 *
 * Env: PORT (default 7899), SCALE (default 2, the PPTX image density), SLIDES
 *      (default: read from the built bundle).
 */
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, stat, mkdir, writeFile } from "node:fs/promises";
import { join, extname, dirname, resolve } from "node:path";
import { PDFDocument } from "pdf-lib";
import PptxGenJS from "pptxgenjs";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const DIST = join(ROOT, "dist");
const OUTDIR = join(ROOT, "public");
const NAME = "multi-harness-rl-slides";
const PORT = Number(process.env.PORT || 7899);
const SCALE = Number(process.env.SCALE || 2);

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml",
  ".jpg": "image/jpeg", ".webp": "image/webp", ".pdf": "application/pdf",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};

// A static server for dist/, so the export runs against exactly what ships.
function serve() {
  return new Promise((ok) => {
    const s = createServer(async (req, res) => {
      const path = decodeURIComponent((req.url || "/").split("?")[0]);
      let file = join(DIST, path === "/" ? "index.html" : path);
      try {
        if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      } catch {
        file = join(DIST, "index.html"); // SPA fallback
      }
      try {
        const body = await readFile(file);
        res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
        res.end(body);
      } catch {
        res.writeHead(404).end("not found");
      }
    });
    s.listen(PORT, () => ok(s));
  });
}

const server = await serve();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: SCALE });

await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });
// start at the first slide regardless of what the last session left behind
await page.evaluate(() => localStorage.setItem("rlenv-slides-index", "0"));
await page.reload({ waitUntil: "networkidle" });

const total = await page.evaluate(() => {
  const m = document.body.innerText.match(/SLIDES\s*·\s*(\d+)/);
  return m ? Number(m[1]) : null;
});
const count = Number(process.env.SLIDES || total || 35);
console.log(`exporting ${count} slides`);

const pdfPages = [];
const shots = [];
for (let i = 0; i < count; i++) {
  // let the entry animation finish and every figure iframe lay out
  await page.waitForTimeout(1400);
  await page.evaluate(async () => {
    await Promise.all([...document.querySelectorAll("iframe")].map((f) =>
      f.contentDocument && f.contentDocument.readyState === "complete"
        ? Promise.resolve()
        : new Promise((r) => f.addEventListener("load", r, { once: true }))));
  });
  pdfPages.push(await page.pdf({
    width: "1280px", height: "720px", printBackground: true,
    pageRanges: "1", margin: { top: 0, right: 0, bottom: 0, left: 0 },
  }));
  // JPEG rather than PNG: a 35-slide deck of 2560x1440 PNGs is an order of
  // magnitude larger than the whole Space, and these are photographs of a
  // rendered page, not line art that needs lossless.
  // no `scale` option, so the shot comes out at the device scale (2560x1440),
  // which is what keeps the type crisp on a projector.
  shots.push(await page.screenshot({ type: "jpeg", quality: 90, clip: { x: 0, y: 0, width: 1280, height: 720 } }));
  process.stdout.write(`  ${i + 1}/${count}\r`);
  if (i < count - 1) await page.keyboard.press("ArrowRight");
}
await browser.close();
server.close();

await mkdir(OUTDIR, { recursive: true });

// stitch the single-page PDFs into one deck
const out = await PDFDocument.create();
for (const buf of pdfPages) {
  const src = await PDFDocument.load(buf);
  const [p] = await out.copyPages(src, [0]);
  out.addPage(p);
}
const pdfPath = join(OUTDIR, `${NAME}.pdf`);
await writeFile(pdfPath, await out.save());

// one full-bleed image per PPTX slide, 16:9 at the standard 13.333 x 7.5 in
const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_16x9";
pptx.title = "Training a coding agent through a harness you did not write";
pptx.author = "Sergio Paniego Blanco";
for (const shot of shots) {
  const s = pptx.addSlide();
  s.background = { color: "07090F" };
  s.addImage({ data: `image/jpeg;base64,${shot.toString("base64")}`, x: 0, y: 0, w: 13.333, h: 7.5 });
}
const pptxPath = join(OUTDIR, `${NAME}.pptx`);
await pptx.writeFile({ fileName: pptxPath });

for (const p of [pdfPath, pptxPath]) {
  const { size } = await stat(p);
  console.log(`\nwrote ${p} (${(size / 1e6).toFixed(1)} MB)`);
}
