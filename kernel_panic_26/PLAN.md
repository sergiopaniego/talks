# Kernel Panic 2026 · Multi-harness RL

Evento: **AI Open Models Conference #01 "Kernel Panic"** · Madrid · **6 octubre 2026** · Casa del
Lector (Matadero). Lema del evento: `SUDO RM -RF /BORING_TALKS`.

Decidido el 2026-10-01: **charla en inglés, 30-40 min, deck nuevo en estilo FineEnvs (React), y tres
paradas en vivo** (el blog con sus embeds, el dashboard de Trackio, y los modelos/datasets del Hub).

## De qué va, y en qué se diferencia de Lisboa

Lisboa fue *"entrenar un coding agent a través de un harness que no escribiste"*, con **un** harness
(opencode) y un resultado que no aguantó el escrutinio (la curva de train estaba confundida con qué
tarea tocaba en cada paso, ver `../lisbon_ai_26/PLAN.md`).

Esta es la continuación con el trabajo ya publicado: **multi-harness**. El objeto no es un harness,
son cuatro, y el resultado sí aguanta porque está medido en 250 tareas held-out bajo los cuatro.

Material base: el artículo **"The ultimate guide to multi-harness RL"**, publicado el 24/09/2026,
8 autores (HF + Liquid AI), Sergio el tercero.
<https://huggingface.co/spaces/FineEnvs/multi-harness-rl>

## Lo que cambió en el stack desde Lisboa (verificado 2026-10-01)

| | Lisboa (23/09) | Ahora |
|---|---|---|
| TRL **#6947** AsyncGRPO | abierta | **mergeada el 01/10** |
| OpenEnv | 0.6.x | **v0.7.0, publicada el 01/10** |
| RFC 006 (el que revisó Sergio) | abierto | **mergeado** (#941) |
| `TrainingTrace` tipado | no existía | **mergeado** (#1280, 30/09) |
| `opencode_env` | era EL camino | **deprecado** (#1276, de Sergio), fuera en 0.8.0 |
| Ejemplo en TRL | `examples/async_grpo_opencode` | **`examples/async_grpo_harbor`** |
| TRL **#6948** (quitar Harbor experimental) | abierta | sigue abierta |

**Disciplina de tiempos verbales, y es la inversa de Lisboa:** allí había que decir "OpenEnv sí, TRL
todavía no". Ahora las dos están. Lo único abierto es #6948.

**Y un aviso de coherencia:** la charla de Lisboa se apoyaba entera en `opencode_env`, que ahora está
deprecado por una PR del propio Sergio. Si alguien del público vio aquella, conviene decirlo de
pasada: el camino es `harbor_env` con `harness="opencode"`.

## Los números (todos del artículo, ya revisados por 8 autores)

**El problema, para el gancho:**

- Mismos pesos, distinto harness: LFM2.5-2.6B hace **62%** en Mini-SWE-Agent y **33%** en Claude Code.
- Joel Niklaus midió GLM-5.2 en **23%** bajo un harness y **52%** bajo otro (SWE-bench Pro).
- El ranking no se traslada: Codex fue el 2º de diez harnesses para GLM-5.2 y el **9º** para Gemma 4 26B-A4B.
- Claude Opus 4.5: **45.9%** en SEAL contra **55.4%** dentro de Claude Code, mismos pesos.
- Kimi K2 publica Terminal-Bench dos veces: 25.0 con Terminus, 30.0 con su propio framework.

**El coste de entrenar en uno solo:**

- Orchard: OpenSWE-32B pierde 7.5 puntos al pasar de OpenHands a Mini-SWE-Agent, y **58.8** bajo
  Kimi-CLI (hasta 3.6%), con cero en Terminal-Bench 2.0. Scale-SWE deja de emitir tool calls válidas
  fuera de su harness.
- KwaiKAT nombra tres modos de sobreajuste: **formato**, **estructura de contexto** y **flujo de control**.
- OpenForgeRL: el modelo entrenado en 3 harnesses gana **incluso en el terreno del de 1** (48.5 vs 46.0).

**Nuestro resultado:**

- Multi-harness RL: **42% → 54%** en 250 tareas held-out, media de los cuatro harnesses.
- **31% menos llamadas** a herramientas que el modelo base, en las tareas que ambos resuelven.
- Solo-OpenCode: 34 → **58%** en OpenCode, y poco fuera. El multi-harness gana en Claude Code
  (49 vs 42) y Codex (54 vs 43).
- RL contra SFT: RL **54.6%**, OpenCode SFT 47.5%, multi-harness SFT **43.1%**.
- El fallo honesto de SFT: se hunde en Mini-SWE-Agent (62.1 → **45.2%**) y eso se come el resto.

## Run of show (35 min + 5 Q&A)

| Min | Beat | Soporte |
|---|---|---|
| 0:00-1:30 | Mismos pesos, 29 puntos de diferencia | slide + figura del blog |
| 1:30-4:00 | Qué es un harness y qué se lleva: el loop, las tools, el contexto, cuándo parar | slide |
| 4:00-7:00 | Los benchmarks ya vienen con harness pegado | **blog en vivo**: scaffold-reversal |
| 7:00-11:00 | Qué pasa cuando el modelo sale de su harness | **blog en vivo**: harness-lockin, overfit-modes |
| 11:00-14:00 | Lo que ya hacen los labs | **blog en vivo**: timeline, paper-receipts |
| 14:00-17:00 | Lo que faltaba, y las tres piezas | slide: OpenEnv · Harbor · TRL |
| 17:00-22:00 | El proxy de captura y los cuatro dialectos | **blog en vivo**: capture-proxy, dialects-funnel |
| 22:00-24:00 | Qué se graba de verdad, y los tres niveles de captura | slide + `top_p=1.0` |
| 24:00-26:00 | El código | slide |
| 26:00-31:00 | Resultados | **Trackio en vivo** + figuras |
| 31:00-33:00 | SFT contra RL, y lo que no sabemos | slide |
| 33:00-35:00 | Córrelo tú | **Hub en vivo**: la colección |

## Qué se reusa y qué hay que construir

**Se reusa tal cual (y esto es lo que hace el plan viable en 5 días):**

- **Las 32 figuras del blog son HTML autónomo.** Cero dependencias externas, cero `fetch`, datos
  inline. Se incrustan en el deck sin rehacer ni una gráfica. Verificado el 01/10.
- **La infraestructura del deck de FineEnvs** (`tutorials/slides` en la rama `add-rl-env-talk-slides`):
  React + Vite + framer-motion, `App.tsx`, `ThemeContext`, `theme.ts`, componentes `primitives` y
  `figures`, navegación por teclado, tema claro/oscuro, 70 slides de ejemplo.
- **La paleta "forge"**: fondo `#07090f`, lavanda `#b06bff` (síntesis), esmeralda `#10f0a4`
  (verificado), monoespaciada en todo. Encaja con el ambiente terminal del evento.
- Los **13 logos de harness** y los **8 recortes de papers** del blog.

**Hay que construir:**

1. El esqueleto del deck nuevo partiendo de `tutorials/slides`.
2. Unas 25 slides, la mayoría envolviendo una figura que ya existe.
3. Las notas del ponente (en español, como siempre).
4. Decidir dónde vive el deck (ver abajo).

## Decisiones abiertas

- ~~**Dónde vive el deck.**~~ **RESUELTO (2026-10-02):** el deck vive en
  <https://huggingface.co/spaces/FineEnvs/multi-harness-rl-slides>, movido desde la cuenta de
  Sergio con `move_repo` (el Hub deja redirección desde la URL vieja). Nombre elegido para seguir
  la convención de la org (`rl-environments-101-slides`) y emparejar con el artículo
  (`multi-harness-rl`). **Sigue siendo privado**, un toggle lo publica.
  Lo que queda abierto: el **código fuente** del deck sigue solo en local
  (`~/Documents/Projects/talks/kernel_panic_26/slides`). La infra viene de `adithya-s-k/FineEnvs`,
  que es un repo de GitHub personal de Adithya, así que subirlo ahí hay que pedírselo a él.
- **Cuánto se apoya en el blog en vivo.** Tres paradas es lo acordado, pero si el wifi de Matadero
  falla, hacen falta capturas de respaldo de las figuras que más pesan en el argumento.
- **El título.** El de Lisboa ya no vale (hablaba de *un* harness). Propuestas en la sección siguiente.

## Títulos candidatos

1. *The same model is not the same agent* (el gancho es el hallazgo, no el método)
2. *Training one model across four coding agents*
3. *Multi-harness RL: training inside the tools people actually use*

## Riesgos

- **El tutorial `05-multi-harness-rl` no está en `main` de FineEnvs**, solo en una rama, y el artículo
  enlaza a un SHA concreto. Si alguien lo busca en main no lo encuentra. Verificar antes del martes.
- **Harbor necesita Python 3.12.** En 3.10/3.11 `openenv[harbor]` no instala las dependencias. Si se
  enseña una instalación en vivo, es un sitio donde se rompe.
- El `05-multi-harness-rl` del artículo usa Daytona, mientras que las runs reportadas usaron E2B. El
  propio artículo lo avisa: el tutorial no es una repetición exacta de aquellas runs.

## TODO · arreglar las reglas de fila de la tabla en el BLOG  ·  **PARCHE YA ESCRITO, SIN SUBIR**

Encontrado el 2026-10-02 montando la slide 02, y **esta en el articulo publicado**, no solo en
la adaptacion del deck. Verificado en vivo sobre <https://fineenvs-multi-harness-rl.hf.space/>:
`align-items` sale `center` y los bordes inferiores de las celdas de una misma fila estan
**12.8px** separados entre si.

**Que pasa.** `.hm-grid` centra sus celdas, asi que cada una mide solo lo que mide su contenido:
el nombre del harness es mas alto que un punto de 12px. Como **cada celda dibuja su propio
`border-bottom`** (`.hm-row > div { border-bottom: ... }`), cada borde cae a una altura distinta
dentro de la fila. El resultado es una linea partida en segmentos escalonados, que se nota mas
cuanto mas ancha es la tabla.

**El arreglo**, en `app/src/content/embeds/harness-ecosystem-matrix.html`, dentro de su `<style>`:

```css
/* las celdas se estiran a la altura de la fila, asi sus border-bottom se alinean */
.harness-ecosystem-matrix .hm-grid { align-items: stretch; }
/* y el contenido se recentra dentro de cada celda, para que nada se mueva */
.harness-ecosystem-matrix .hm-row > div { display: flex; align-items: center; justify-content: center; }
/* el nombre lleva <b> + <span> + <small> apilados: tiene que seguir siendo block */
.harness-ecosystem-matrix .hm-row > .hm-name { display: block; }
```

Es decir: cambiar `align-items:center` por `stretch` en `.hm-grid` y añadir las dos reglas de
abajo. Nada mas. La `.hm-name` **debe** quedarse en `block` o sus tres elementos se ponen en fila.

**Como comprobarlo** (la misma medicion que lo encontro, en la consola del articulo):

```js
const m = document.querySelector('.harness-ecosystem-matrix');
[...m.querySelectorAll('.hm-row')].slice(0,5).map(r => {
  const b = [...r.children].map(c => c.getBoundingClientRect().bottom);
  return +(Math.max(...b) - Math.min(...b)).toFixed(1);   // debe ser 0, hoy da 12.8
});
```

El deck ya lo corrige por encima (en `slides/src/slides/03_Landscape.tsx`), sin tocar el HTML
vendorizado, para poder volver a bajar el fragmento del blog cuando esto se arregle en origen.

Hacerlo **despues** de la charla: el fragmento esta copiado en el deck, y cambiarlo en el blog
ahora obligaria a resincronizar.

### Estado (2026-10-02)

El parche **ya esta aplicado en un clon local** del Space del articulo, en
`<scratchpad>/blog`, rama `main`, **sin commit y sin push**. Diff: 6 lineas en
`app/src/content/embeds/harness-ecosystem-matrix.html`. Verificado renderizando
el fragmento parcheado en headless: el spread de las 8 primeras filas pasa de
**12.8px a 0**.

**Y una correccion importante:** los otros dos problemas que aparecieron montando
el deck (`d3-harness-lockin` con el subtitulo cortado, `d3-scaffold-reversal` con
etiquetas encima de las lineas) **NO son bugs del articulo**. Medidos en vivo
sobre el articulo publicado a 1440px, cero textos fuera de su caja en
`harness-lockin`, `scaffold-reversal`, `overfit-modes` y `format-mismatch`. Los
causaba el `zoom` con el que el deck estira esas figuras para llenar una slide.
En el blog solo hay que tocar la tabla.

## TODO · subir el deck a `sergiopaniego/talks` (GitHub)

Pedido el 2026-10-02. Sergio sube **siempre** las slides de sus charlas a su repo
`github.com/sergiopaniego/talks`, una carpeta por charla. El working copy ya esta
clonado en `~/Documents/Projects/talks` con ese remote, y esta carpeta
(`kernel_panic_26/`) ya vive dentro.

**De momento NO se sube.** Queda apuntado para cuando el deck este cerrado.

Lo que iria: `PLAN.md`, `multi-harness-rl-slides.pdf`, `multi-harness-rl-slides.pptx`
y `slides/` (el fuente). Hoy `slides/node_modules`, `slides/dist` y los dos binarios
estan sin ignorar, asi que antes de commitear hace falta un `.gitignore` en
`kernel_panic_26/slides/` (`node_modules/`, `dist/`) y decidir si los 17MB de PDF+PPTX
entran en el repo o solo viven en el Space.

**Y el push lo pide el explicitamente**, repo publico.
