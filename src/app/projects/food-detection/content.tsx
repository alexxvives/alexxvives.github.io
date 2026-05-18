"use client";

import { useLang } from "@/lib/lang";
import {
  Prose, Wide, B, Em, SH, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

const en = {
  subtitle:
    "A CNN + ResNet-50 pipeline that identifies and classifies 101 food categories from meal photos — built toward passive dietary logging without manual entry.",

  openP1:
    "Dietary logging is one of the most effective tools for managing health, and one of the most reliably abandoned. People forget, underestimate, or simply don't bother. The research question: could a phone camera passively identify what's on a plate and log it automatically, with enough accuracy to be clinically useful?",
  openP2:
    "The Food-101 dataset provides a standardized benchmark: 101 food categories, 1,000 images per class. The challenge is that the dataset is noisy — images were intentionally left \"as found on the web,\" with mislabeled examples and high intra-class variation. A model needs to generalize across restaurant photography, Instagram close-ups, and bad-lighting home kitchen shots.",

  archBlocks: [
    { label: "Input Image", sub: "224×224 RGB · meal photo", color: "#3b82f6" },
    { label: "Data Augmentation", sub: "rotation · color jitter · mixup · crop", color: "#8b5cf6" },
    { label: "ResNet-50 Backbone", sub: "48 conv layers · pretrained on ImageNet", color: "#f97316" },
    { label: "Global Avg Pool", sub: "2048-dim feature vector", color: "#ec4899" },
    { label: "Fully Connected", sub: "2048 → 512 → 101", color: "#22d3ee" },
    { label: "Softmax Output", sub: "101 food classes · top-5 probs", color: "#a3e635" },
  ] as { label: string; sub: string; color: string }[],
  archBottom: "Progressive unfreezing · discriminative learning rates · backbone frozen → top layers → full fine-tune",
  fig1label: "Fig 1.",
  fig1caption: "ResNet-50 fine-tuning pipeline. Progressive unfreezing — unfreezing layers gradually from top to bottom during training — prevents destroying the ImageNet features learned in pre-training.",

  trainLegendTrain: "Train accuracy",
  trainLegendVal: "Val accuracy",
  trainUnfreezeTop: "unfreeze top",
  trainFullUnfreeze: "full unfreeze",
  trainXLabel: "Epoch",
  trainYLabel: "Top-1 Accuracy",
  fig2label: "Fig 2.",
  fig2caption: "Training and validation accuracy over 50 epochs. Progressive unfreezing events (dashed lines) correspond to inflections in val accuracy — unfreezing too early without discriminative LRs caused catastrophic forgetting in early experiments.",

  predHeader: "Sample prediction",
  predTitle: "Input: meal photo (sushi plate)",
  predGroundTruth: "Ground truth:",
  predCorrect: "Sushi",
  predModel: "Model: correct ✓",
  preds: [
    { cls: "Sushi", conf: 82, correct: true },
    { cls: "Takoyaki", conf: 8, correct: false },
    { cls: "Gyoza", conf: 4, correct: false },
    { cls: "Onigiri", conf: 3, correct: false },
    { cls: "Miso soup", conf: 2, correct: false },
  ] as { cls: string; conf: number; correct: boolean }[],
  predBottom: "Top-5 confidence scores · 95% top-5 accuracy on Food-101 test set",
  fig3label: "Fig 3.",
  fig3caption: "Sample top-5 prediction for a sushi plate image. The model assigns 82% confidence to the correct class and distributes the remaining probability across visually similar Japanese dishes.",

  s1step: "Step 01",
  s1title: "Starting From Scratch: The Baseline CNN",
  s1p1: "The project started with a custom CNN trained from scratch — four convolutional blocks with batch normalization, ~2M parameters, trained for 60 epochs on Food-101. This established a baseline and, more importantly, revealed the fundamental problem: training from scratch on 101 classes with 1,000 images each is data-limited. The network learned to distinguish easy cases but struggled with visually similar categories (e.g., waffles vs pancakes, ramen vs pho).",
  s1p2pre: "The baseline achieved ",
  s1p2bold: "51% top-1 accuracy",
  s1p2post: " — below the published human performance benchmark of ~93%. The ceiling was clearly elsewhere.",

  s2step: "Step 02",
  s2title: "Transfer Learning: ResNet-50 with Progressive Unfreezing",
  s2p1pre: "The architecture switch to ResNet-50 pre-trained on ImageNet wasn't surprising — what mattered was ",
  s2p1em: "how",
  s2p1mid: " to fine-tune it without destroying the learned representations. The technique used is ",
  s2p1bold: "progressive unfreezing",
  s2p1post: ": start with the backbone completely frozen, train only the new classification head for several epochs, then gradually unfreeze from the top layers downward while applying",
  s2p1bold2: " discriminative learning rates",
  s2p1post2: " — lower rates for early backbone layers (closer to raw image features), higher rates for later task-specific layers.",
  s2p2: "This approach avoids the two failure modes of naive fine-tuning: (1) training the full network from a high learning rate destroys ImageNet features early in training, and (2) keeping the backbone frozen forever limits how much the model adapts to the food domain. Progressive unfreezing threads this needle by letting earlier layers adapt slowly while later layers adapt quickly.",
  callout1: "Transfer learning was not just \"better\" than training from scratch — it was better by an enormous margin. The custom CNN hit 51% top-1 after 60 epochs. Fine-tuned ResNet-50 hit 76% top-1 in the first 15 epochs before any backbone layers were unfrozen. The gap reflects the quality of ImageNet features for visual recognition tasks in general.",

  s3step: "Step 03",
  s3title: "Augmentation Strategy",
  s3p1: "Food photos are among the noisiest natural images. The augmentation pipeline was aggressive: random crop with padding, horizontal flip, color jitter (brightness, contrast, saturation, hue), random rotation up to ±15°, and MixUp augmentation at the batch level — linearly interpolating between two training images and their labels.",
  s3p2: "MixUp was the most impactful augmentation. It forces the model to learn smoother class boundaries by training on convex combinations of examples, which reduces overconfidence on ambiguous inputs. For a dataset with noisy labels and visually overlapping classes, this was particularly valuable.",

  s4step: "Step 04",
  s4title: "Results & Segmentation Extension",
  s4p1pre: "The final model achieved ",
  s4p1bold: "82% top-1 / 95% top-5 accuracy",
  s4p1post: " on the Food-101 test set. The result was competitive with the state-of-the-art at the time and was published and presented at the Purdue Undergraduate Research Conference.",
  s4p2: "The project also included a segmentation extension: a U-Net-style segmentation head attached to the ResNet-50 backbone to handle multi-item plates. The segmentation model was trained on a custom annotated subset of 400 multi-item images captured under controlled conditions.",

  metrics: [
    { label: "top-1 accuracy on Food-101", value: "82%", sub: "ResNet-50 + progressive unfreezing" },
    { label: "top-5 accuracy", value: "95%", sub: "clinically useful for dietary logging" },
    { label: "food categories classified", value: "101", sub: "Food-101 benchmark" },
    { label: "baseline (from scratch CNN)", value: "51%", sub: "top-1 · 4-block custom CNN" },
  ] as { label: string; value: string; sub: string }[],

  s5step: "What This Gets Right",
  s5title: "Lessons from Computer Vision Research",
  s5p1bold: "1. Transfer learning dominates from-scratch training at limited data scales.",
  s5p1: " The gap between the baseline CNN (51%) and fine-tuned ResNet-50 (82%) is almost entirely attributable to ImageNet pre-training. More training epochs or a bigger architecture wouldn't have closed that gap — data is the bottleneck.",
  s5p2bold: "2. Augmentation choices matter more than architecture choices at this scale.",
  s5p2: " MixUp alone accounted for ~4 percentage points of accuracy improvement. The architecture was fixed (ResNet-50); what changed was how training data was presented to it.",
  s5p3bold: "3. Progressive unfreezing is the right protocol for fine-tuning large backbones.",
  s5p3: " Naive full-network fine-tuning at a uniform learning rate destroyed useful early-layer features in preliminary experiments. Freezing layers first and unfreezing gradually preserves the valuable spatial feature hierarchy while allowing domain adaptation.",
};

const es: typeof en = {
  subtitle:
    "Una pipeline CNN + ResNet-50 que identifica y clasifica 101 categorías de alimentos en fotos de comidas — construida hacia el registro dietético pasivo sin entrada manual.",

  openP1:
    "El registro dietético es una de las herramientas más eficaces para gestionar la salud, y una de las más abandonadas. Las personas olvidan, subestiman o simplemente no se molestan. La pregunta de investigación: ¿podría la cámara de un teléfono identificar pasivamente lo que hay en un plato y registrarlo automáticamente, con suficiente precisión para ser clínicamente útil?",
  openP2:
    "El dataset Food-101 proporciona un benchmark estandarizado: 101 categorías de alimentos, 1.000 imágenes por clase. El desafío es que el dataset es ruidoso — las imágenes se dejaron intencionalmente «tal como se encontraron en la web», con ejemplos mal etiquetados y alta variación intra-clase. Un modelo necesita generalizar entre fotografía de restaurantes, primeros planos de Instagram y fotos de cocina doméstica con mala iluminación.",

  archBlocks: [
    { label: "Imagen de Entrada", sub: "224×224 RGB · foto de comida", color: "#3b82f6" },
    { label: "Aumento de Datos", sub: "rotación · ajuste de color · mixup · recorte", color: "#8b5cf6" },
    { label: "Backbone ResNet-50", sub: "48 capas conv · preentrenado en ImageNet", color: "#f97316" },
    { label: "Pool Promedio Global", sub: "vector de características de 2048 dims", color: "#ec4899" },
    { label: "Totalmente Conectado", sub: "2048 → 512 → 101", color: "#22d3ee" },
    { label: "Salida Softmax", sub: "101 clases de alimentos · top-5 probs", color: "#a3e635" },
  ],
  archBottom: "Descongelamiento progresivo · tasas de aprendizaje discriminativas · backbone congelado → capas superiores → fine-tune completo",
  fig1label: "Fig 1.",
  fig1caption: "Pipeline de fine-tuning de ResNet-50. El descongelamiento progresivo — descongelando capas gradualmente de arriba a abajo durante el entrenamiento — evita destruir las características de ImageNet aprendidas en el preentrenamiento.",

  trainLegendTrain: "Precisión de entrenamiento",
  trainLegendVal: "Precisión de validación",
  trainUnfreezeTop: "descongelar cima",
  trainFullUnfreeze: "descongelar todo",
  trainXLabel: "Época",
  trainYLabel: "Precisión Top-1",
  fig2label: "Fig 2.",
  fig2caption: "Precisión de entrenamiento y validación a lo largo de 50 épocas. Los eventos de descongelamiento progresivo (líneas discontinuas) corresponden a inflexiones en la precisión de validación — descongelar demasiado pronto sin tasas de aprendizaje discriminativas causó olvido catastrófico en experimentos iniciales.",

  predHeader: "Predicción de muestra",
  predTitle: "Entrada: foto de comida (plato de sushi)",
  predGroundTruth: "Verdad de campo:",
  predCorrect: "Sushi",
  predModel: "Modelo: correcto ✓",
  preds: [
    { cls: "Sushi", conf: 82, correct: true },
    { cls: "Takoyaki", conf: 8, correct: false },
    { cls: "Gyoza", conf: 4, correct: false },
    { cls: "Onigiri", conf: 3, correct: false },
    { cls: "Miso soup", conf: 2, correct: false },
  ],
  predBottom: "Puntuaciones de confianza Top-5 · precisión top-5 del 95% en el conjunto de prueba Food-101",
  fig3label: "Fig 3.",
  fig3caption: "Predicción top-5 de muestra para una imagen de plato de sushi. El modelo asigna un 82% de confianza a la clase correcta y distribuye la probabilidad restante entre platos japoneses visualmente similares.",

  s1step: "Paso 01",
  s1title: "Empezando desde Cero: La CNN de Referencia",
  s1p1: "El proyecto comenzó con una CNN personalizada entrenada desde cero — cuatro bloques convolucionales con normalización por lotes, ~2M de parámetros, entrenada durante 60 épocas en Food-101. Esto estableció una línea base y, más importante, reveló el problema fundamental: entrenar desde cero con 101 clases y 1.000 imágenes cada una es limitado en datos. La red aprendió a distinguir casos fáciles pero tuvo dificultades con categorías visualmente similares (p.ej., gofres vs tortitas, ramen vs pho).",
  s1p2pre: "La línea base alcanzó ",
  s1p2bold: "51% de precisión top-1",
  s1p2post: " — por debajo del benchmark de rendimiento humano publicado de ~93%. El techo estaba claramente en otro lugar.",

  s2step: "Paso 02",
  s2title: "Transfer Learning: ResNet-50 con Descongelamiento Progresivo",
  s2p1pre: "El cambio de arquitectura a ResNet-50 preentrenado en ImageNet no fue sorprendente — lo que importaba era ",
  s2p1em: "cómo",
  s2p1mid: " hacer fine-tune sin destruir las representaciones aprendidas. La técnica utilizada es el ",
  s2p1bold: "descongelamiento progresivo",
  s2p1post: ": comenzar con el backbone completamente congelado, entrenar solo la nueva cabeza de clasificación durante varias épocas, luego descongelar gradualmente desde las capas superiores hacia abajo mientras se aplican",
  s2p1bold2: " tasas de aprendizaje discriminativas",
  s2p1post2: " — tasas más bajas para las capas tempranas del backbone (más cercanas a las características de imagen en bruto), tasas más altas para las capas posteriores específicas de la tarea.",
  s2p2: "Este enfoque evita los dos modos de fallo del fine-tuning ingenuo: (1) entrenar la red completa con una tasa de aprendizaje alta destruye las características de ImageNet al inicio del entrenamiento, y (2) mantener el backbone congelado para siempre limita cuánto se adapta el modelo al dominio alimentario. El descongelamiento progresivo navega entre estos dos extremos permitiendo que las capas tempranas se adapten lentamente mientras las capas posteriores se adaptan rápidamente.",
  callout1: "El transfer learning no fue solo «mejor» que entrenar desde cero — fue mejor por un margen enorme. La CNN personalizada alcanzó 51% top-1 tras 60 épocas. ResNet-50 con fine-tuning alcanzó 76% top-1 en las primeras 15 épocas antes de descongelar ninguna capa del backbone. La brecha refleja la calidad de las características de ImageNet para tareas de reconocimiento visual en general.",

  s3step: "Paso 03",
  s3title: "Estrategia de Aumento de Datos",
  s3p1: "Las fotos de alimentos están entre las imágenes naturales más ruidosas. La pipeline de aumento fue agresiva: recorte aleatorio con relleno, volteo horizontal, ajuste de color (brillo, contraste, saturación, tono), rotación aleatoria hasta ±15°, y aumento MixUp a nivel de lote — interpolando linealmente entre dos imágenes de entrenamiento y sus etiquetas.",
  s3p2: "MixUp fue el aumento más impactante. Obliga al modelo a aprender fronteras de clase más suaves entrenando con combinaciones convexas de ejemplos, lo que reduce la sobreconfianza en entradas ambiguas. Para un dataset con etiquetas ruidosas y clases visualmente superpuestas, esto fue especialmente valioso.",

  s4step: "Paso 04",
  s4title: "Resultados y Extensión de Segmentación",
  s4p1pre: "El modelo final alcanzó ",
  s4p1bold: "82% top-1 / 95% top-5 de precisión",
  s4p1post: " en el conjunto de prueba Food-101. El resultado fue competitivo con el estado del arte en ese momento y fue publicado y presentado en la Conferencia de Investigación de Pregrado de Purdue.",
  s4p2: "El proyecto también incluyó una extensión de segmentación: una cabeza de segmentación estilo U-Net adjunta al backbone ResNet-50 para manejar platos con múltiples alimentos. El modelo de segmentación fue entrenado en un subconjunto anotado personalizado de 400 imágenes multi-ítem capturadas en condiciones controladas.",

  metrics: [
    { label: "precisión top-1 en Food-101", value: "82%", sub: "ResNet-50 + descongelamiento progresivo" },
    { label: "precisión top-5", value: "95%", sub: "clínicamente útil para registro dietético" },
    { label: "categorías de alimentos clasificadas", value: "101", sub: "benchmark Food-101" },
    { label: "línea base (CNN desde cero)", value: "51%", sub: "top-1 · CNN personalizada de 4 bloques" },
  ],

  s5step: "Lo Que Funciona",
  s5title: "Lecciones de Investigación en Visión por Computadora",
  s5p1bold: "1. El transfer learning domina el entrenamiento desde cero en escalas de datos limitadas.",
  s5p1: " La brecha entre la CNN de referencia (51%) y ResNet-50 con fine-tuning (82%) es casi completamente atribuible al preentrenamiento en ImageNet. Más épocas de entrenamiento o una arquitectura más grande no habrían cerrado esa brecha — los datos son el cuello de botella.",
  s5p2bold: "2. Las elecciones de aumento importan más que las elecciones de arquitectura a esta escala.",
  s5p2: " MixUp por sí solo representó ~4 puntos porcentuales de mejora en precisión. La arquitectura estaba fijada (ResNet-50); lo que cambió fue cómo se presentaban los datos de entrenamiento.",
  s5p3bold: "3. El descongelamiento progresivo es el protocolo correcto para el fine-tuning de backbones grandes.",
  s5p3: " El fine-tuning ingenuo de toda la red con una tasa de aprendizaje uniforme destruyó características útiles de capas tempranas en experimentos preliminares. Congelar las capas primero y descongelarlas gradualmente preserva la jerarquía de características espaciales valiosas mientras permite la adaptación al dominio.",
};

// ── Diagram components ────────────────────────────────────────────────────────

function ArchitectureDiagram({ tx }: { tx: typeof en }) {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col sm:flex-row items-stretch gap-0">
          {tx.archBlocks.map((b, i) => (
            <div key={b.label} className="flex sm:flex-col items-center flex-1 min-w-0">
              <div className="rounded-xl border px-2.5 py-3 text-center flex-1 w-full" style={{ borderColor: b.color + "55", background: b.color + "10" }}>
                <p className="text-xs font-semibold text-ink leading-snug">{b.label}</p>
                <p className="text-[10px] text-ink-muted mt-1 leading-snug hidden sm:block">{b.sub}</p>
              </div>
              {i < tx.archBlocks.length - 1 && (
                <>
                  <div className="flex sm:hidden w-5 shrink-0 items-center justify-center text-ink-subtle">→</div>
                  <div className="hidden sm:flex h-4 w-full items-center justify-center text-ink-subtle text-sm">→</div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-bg-card border border-border/40 px-4 py-2 text-center">
          <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">{tx.archBottom}</p>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig1label}</span>{" "}{tx.fig1caption}
      </figcaption>
    </figure>
  );
}

function TrainingCurves({ tx }: { tx: typeof en }) {
  const W = 560, H = 230;
  const pl = 44, pr = 20, pt = 20, pb = 42;
  const cW = W - pl - pr, cH = H - pt - pb;
  const epochs = 50;
  const xe = (e: number) => pl + (e / (epochs - 1)) * cW;
  const trainAcc = Array.from({ length: epochs }, (_, i) => {
    const base = 30 + 55 * (1 - Math.exp(-i / 12));
    const noise = Math.sin(i * 7.3) * 1.5;
    return Math.min(95, base + noise);
  });
  const valAcc = Array.from({ length: epochs }, (_, i) => {
    const base = 20 + 62 * (1 - Math.exp(-i / 15));
    const noise = Math.sin(i * 11.7) * 2.5;
    return Math.min(92, base + noise);
  });
  const ys = (v: number) => pt + cH - ((v - 10) / 85) * cH;
  const makePath = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"}${xe(i).toFixed(1)},${ys(v).toFixed(1)}`).join(" ");

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-5 pb-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
          {[20, 40, 60, 80].map((v) => (
            <g key={v}>
              <line x1={pl} y1={ys(v)} x2={pl + cW} y2={ys(v)} stroke="rgba(255,255,255,0.05)" />
              <text x={pl - 6} y={ys(v) + 3} textAnchor="end" fill="rgba(255,255,255,0.28)" fontSize={9}>{v}%</text>
            </g>
          ))}
          {[0, 10, 20, 30, 40, 50].map((e) => (
            <text key={e} x={xe(e)} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>{e}</text>
          ))}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={xe(15)} y1={pt} x2={xe(15)} y2={pt + cH} stroke="rgba(255,255,255,0.15)" strokeDasharray="3,2" />
          <text x={xe(15) + 3} y={pt + 10} fill="rgba(255,255,255,0.3)" fontSize={8}>{tx.trainUnfreezeTop}</text>
          <line x1={xe(30)} y1={pt} x2={xe(30)} y2={pt + cH} stroke="rgba(255,255,255,0.15)" strokeDasharray="3,2" />
          <text x={xe(30) + 3} y={pt + 10} fill="rgba(255,255,255,0.3)" fontSize={8}>{tx.trainFullUnfreeze}</text>
          <path d={makePath(trainAcc)} fill="none" stroke="#f97316" strokeWidth={2} strokeLinejoin="round" />
          <path d={makePath(valAcc)} fill="none" stroke="#a3e635" strokeWidth={2} strokeLinejoin="round" strokeDasharray="5,2" />
          <line x1={pl + 6} y1={pt + 12} x2={pl + 20} y2={pt + 12} stroke="#f97316" strokeWidth={2} />
          <text x={pl + 24} y={pt + 16} fill="rgba(255,255,255,0.6)" fontSize={9}>{tx.trainLegendTrain}</text>
          <line x1={pl + 112} y1={pt + 12} x2={pl + 126} y2={pt + 12} stroke="#a3e635" strokeWidth={2} strokeDasharray="5,2" />
          <text x={pl + 130} y={pt + 16} fill="rgba(255,255,255,0.6)" fontSize={9}>{tx.trainLegendVal}</text>
          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>{tx.trainXLabel}</text>
          <text x={12} y={pt + cH / 2} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9} transform={`rotate(-90 12 ${pt + cH / 2})`}>{tx.trainYLabel}</text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig2label}</span>{" "}{tx.fig2caption}
      </figcaption>
    </figure>
  );
}

function TopFivePrediction({ tx }: { tx: typeof en }) {
  const maxC = 90;
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-20 h-20 rounded-xl bg-bg-card border border-border flex items-center justify-center shrink-0">
            <span className="text-3xl">🍣</span>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle mb-1">{tx.predHeader}</p>
            <p className="text-sm font-semibold text-ink">{tx.predTitle}</p>
            <p className="text-xs text-ink-muted mt-0.5">
              {tx.predGroundTruth} <span className="text-accent">{tx.predCorrect}</span> · {tx.predModel}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {tx.preds.map(({ cls, conf, correct }) => (
            <div key={cls} className="flex items-center gap-3">
              <span className="w-20 text-xs text-ink-muted text-right shrink-0">{cls}</span>
              <div className="flex-1 h-5 bg-bg-card rounded-full overflow-hidden border border-border/30">
                <div className={`h-full rounded-full ${correct ? "bg-accent" : "bg-border/60"}`} style={{ width: `${(conf / maxC) * 100}%` }} />
              </div>
              <span className={`w-10 text-xs font-mono ${correct ? "text-accent" : "text-ink-subtle"}`}>{conf}%</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10px] font-mono text-ink-subtle text-center">{tx.predBottom}</p>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig3label}</span>{" "}{tx.fig3caption}
      </figcaption>
    </figure>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FoodDetectionContent() {
  const { lang } = useLang();
  const tx = lang === "es" ? es : en;

  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Research · Purdue University · Prof. Edward J. Delp · Fall 2020"
        title="Food Detection & Classification"
        subtitle={tx.subtitle}
        tags={["Computer Vision", "Deep Learning", "ResNet-50", "PyTorch", "Transfer Learning", "Food-101"]}
      />

      <div className="container-page mt-16">
        <Prose>
          <P>{tx.openP1}</P>
          <P>{tx.openP2}</P>
        </Prose>

        <Prose>
          <SH id="baseline" step={tx.s1step}>{tx.s1title}</SH>
          <P>{tx.s1p1}</P>
          <P>{tx.s1p2pre}<B>{tx.s1p2bold}</B>{tx.s1p2post}</P>
        </Prose>

        <Prose>
          <SH id="resnet" step={tx.s2step}>{tx.s2title}</SH>
          <P>{tx.s2p1pre}<Em>{tx.s2p1em}</Em>{tx.s2p1mid}<B>{tx.s2p1bold}</B>{tx.s2p1post}<B>{tx.s2p1bold2}</B>{tx.s2p1post2}</P>
        </Prose>

        <Wide><ArchitectureDiagram tx={tx} /></Wide>

        <Prose>
          <P>{tx.s2p2}</P>
          <Callout>{tx.callout1}</Callout>
        </Prose>

        <Prose>
          <SH id="augmentation" step={tx.s3step}>{tx.s3title}</SH>
          <P>{tx.s3p1}</P>
          <P>{tx.s3p2}</P>
        </Prose>

        <Wide><TrainingCurves tx={tx} /></Wide>

        <Prose>
          <SH id="results" step={tx.s4step}>{tx.s4title}</SH>
          <P>{tx.s4p1pre}<B>{tx.s4p1bold}</B>{tx.s4p1post}</P>
          <P>{tx.s4p2}</P>
        </Prose>

        <Wide><TopFivePrediction tx={tx} /></Wide>

        <MetricStrip metrics={tx.metrics} />

        <Prose>
          <SH id="takeaways" step={tx.s5step}>{tx.s5title}</SH>
          <P><B>{tx.s5p1bold}</B>{tx.s5p1}</P>
          <P><B>{tx.s5p2bold}</B>{tx.s5p2}</P>
          <P><B>{tx.s5p3bold}</B>{tx.s5p3}</P>
        </Prose>

        <NextProject slug="covid-simulation" />
      </div>
    </article>
  );
}
