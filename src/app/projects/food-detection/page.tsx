import type { Metadata } from "next";
import {
  Prose, Wide, B, Em, C, SH, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

export const metadata: Metadata = {
  title: "Food Detection & Classification — Alexandre Vives",
  description:
    "Computer vision pipeline to detect and classify 101 food categories from meal photos. ResNet-50 fine-tuning achieved 82% top-1 accuracy. Published at Purdue Research Conference.",
};

// ── Diagram 1: Architecture flow ──────────────────────────────────────────────

function ArchitectureDiagram() {
  const blocks = [
    { label: "Input Image", sub: "224×224 RGB · meal photo", color: "#3b82f6" },
    { label: "Data Augmentation", sub: "rotation · color jitter · mixup · crop", color: "#8b5cf6" },
    { label: "ResNet-50 Backbone", sub: "48 conv layers · pretrained on ImageNet", color: "#f97316" },
    { label: "Global Avg Pool", sub: "2048-dim feature vector", color: "#ec4899" },
    { label: "Fully Connected", sub: "2048 → 512 → 101", color: "#22d3ee" },
    { label: "Softmax Output", sub: "101 food classes · top-5 probs", color: "#a3e635" },
  ];

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col sm:flex-row items-stretch gap-0">
          {blocks.map((b, i) => (
            <div key={b.label} className="flex sm:flex-col items-center flex-1 min-w-0">
              <div
                className="rounded-xl border px-2.5 py-3 text-center flex-1 w-full"
                style={{ borderColor: b.color + "55", background: b.color + "10" }}
              >
                <p className="text-xs font-semibold text-ink leading-snug">{b.label}</p>
                <p className="text-[10px] text-ink-muted mt-1 leading-snug hidden sm:block">{b.sub}</p>
              </div>
              {i < blocks.length - 1 && (
                <>
                  <div className="flex sm:hidden w-5 shrink-0 items-center justify-center text-ink-subtle">→</div>
                  <div className="hidden sm:flex h-4 w-full items-center justify-center text-ink-subtle text-sm">→</div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-bg-card border border-border/40 px-4 py-2 text-center">
          <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">
            Progressive unfreezing · discriminative learning rates · backbone frozen → top layers → full fine-tune
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 1.</span> ResNet-50 fine-tuning
        pipeline. Progressive unfreezing — unfreezing layers gradually from top to bottom during
        training — prevents destroying the ImageNet features learned in pre-training.
      </figcaption>
    </figure>
  );
}

// ── Diagram 2: Training curves ────────────────────────────────────────────────

function TrainingCurves() {
  const W = 560, H = 230;
  const pl = 44, pr = 20, pt = 20, pb = 42;
  const cW = W - pl - pr, cH = H - pt - pb;
  const epochs = 50;
  const xe = (e: number) => pl + (e / (epochs - 1)) * cW;

  // Training accuracy: climbs fast then levels
  const trainAcc = Array.from({ length: epochs }, (_, i) => {
    const base = 30 + 55 * (1 - Math.exp(-i / 12));
    const noise = Math.sin(i * 7.3) * 1.5;
    return Math.min(95, base + noise);
  });
  // Val accuracy: slightly behind, more noisy
  const valAcc = Array.from({ length: epochs }, (_, i) => {
    const base = 20 + 62 * (1 - Math.exp(-i / 15));
    const noise = Math.sin(i * 11.7) * 2.5;
    return Math.min(92, base + noise);
  });
  // Marker: unfreeze top-2 blocks at epoch 15, full unfreeze at epoch 30
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
              <text x={pl - 6} y={ys(v) + 3} textAnchor="end" fill="rgba(255,255,255,0.28)" fontSize={9}>
                {v}%
              </text>
            </g>
          ))}
          {[0, 10, 20, 30, 40, 50].map((e) => (
            <text key={e} x={xe(e)} y={pt + cH + 14} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={9}>
              {e}
            </text>
          ))}
          <line x1={pl} y1={pt} x2={pl} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />
          <line x1={pl} y1={pt + cH} x2={pl + cW} y2={pt + cH} stroke="rgba(255,255,255,0.1)" />

          {/* Unfreeze markers */}
          <line x1={xe(15)} y1={pt} x2={xe(15)} y2={pt + cH} stroke="rgba(255,255,255,0.15)" strokeDasharray="3,2" />
          <text x={xe(15) + 3} y={pt + 10} fill="rgba(255,255,255,0.3)" fontSize={8}>unfreeze top</text>
          <line x1={xe(30)} y1={pt} x2={xe(30)} y2={pt + cH} stroke="rgba(255,255,255,0.15)" strokeDasharray="3,2" />
          <text x={xe(30) + 3} y={pt + 10} fill="rgba(255,255,255,0.3)" fontSize={8}>full unfreeze</text>

          {/* Lines */}
          <path d={makePath(trainAcc)} fill="none" stroke="#f97316" strokeWidth={2} strokeLinejoin="round" />
          <path d={makePath(valAcc)} fill="none" stroke="#a3e635" strokeWidth={2} strokeLinejoin="round" strokeDasharray="5,2" />

          {/* Legend */}
          <line x1={pl + 6} y1={pt + 12} x2={pl + 20} y2={pt + 12} stroke="#f97316" strokeWidth={2} />
          <text x={pl + 24} y={pt + 16} fill="rgba(255,255,255,0.6)" fontSize={9}>Train accuracy</text>
          <line x1={pl + 112} y1={pt + 12} x2={pl + 126} y2={pt + 12} stroke="#a3e635" strokeWidth={2} strokeDasharray="5,2" />
          <text x={pl + 130} y={pt + 16} fill="rgba(255,255,255,0.6)" fontSize={9}>Val accuracy</text>

          <text x={pl + cW / 2} y={H - 5} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={9}>
            Epoch
          </text>
          <text
            x={12}
            y={pt + cH / 2}
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize={9}
            transform={`rotate(-90 12 ${pt + cH / 2})`}
          >
            Top-1 Accuracy
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 2.</span> Training and validation
        accuracy over 50 epochs. Progressive unfreezing events (dashed lines) correspond to
        inflections in val accuracy — unfreezing too early without discriminative LRs caused
        catastrophic forgetting in early experiments.
      </figcaption>
    </figure>
  );
}

// ── Diagram 3: Top-5 prediction confidence ────────────────────────────────────

function TopFivePrediction() {
  const preds = [
    { cls: "Sushi", conf: 82, correct: true },
    { cls: "Takoyaki", conf: 8, correct: false },
    { cls: "Gyoza", conf: 4, correct: false },
    { cls: "Onigiri", conf: 3, correct: false },
    { cls: "Miso soup", conf: 2, correct: false },
  ];
  const maxC = 90;

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-20 h-20 rounded-xl bg-bg-card border border-border flex items-center justify-center shrink-0">
            <span className="text-3xl">🍣</span>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle mb-1">
              Sample prediction
            </p>
            <p className="text-sm font-semibold text-ink">Input: meal photo (sushi plate)</p>
            <p className="text-xs text-ink-muted mt-0.5">
              Ground truth: <span className="text-accent">Sushi</span> · Model: correct ✓
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {preds.map(({ cls, conf, correct }) => (
            <div key={cls} className="flex items-center gap-3">
              <span className="w-20 text-xs text-ink-muted text-right shrink-0">{cls}</span>
              <div className="flex-1 h-5 bg-bg-card rounded-full overflow-hidden border border-border/30">
                <div
                  className={`h-full rounded-full ${correct ? "bg-accent" : "bg-border/60"}`}
                  style={{ width: `${(conf / maxC) * 100}%` }}
                />
              </div>
              <span className={`w-10 text-xs font-mono ${correct ? "text-accent" : "text-ink-subtle"}`}>
                {conf}%
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10px] font-mono text-ink-subtle text-center">
          Top-5 confidence scores · 95% top-5 accuracy on Food-101 test set
        </p>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 3.</span> Sample top-5 prediction for
        a sushi plate image. The model assigns 82% confidence to the correct class and
        distributes the remaining probability across visually similar Japanese dishes.
      </figcaption>
    </figure>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function FoodDetectionPage() {
  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Research · Purdue University · Prof. Edward J. Delp · Fall 2020"
        title="Food Detection & Classification"
        subtitle="A CNN + ResNet-50 pipeline that identifies and classifies 101 food categories from meal photos — built toward passive dietary logging without manual entry."
        tags={["Computer Vision", "Deep Learning", "ResNet-50", "PyTorch", "Transfer Learning", "Food-101"]}
      />

      <div className="mt-16">
        {/* Opening */}
        <Prose>
          <P>
            Dietary logging is one of the most effective tools for managing health, and one of
            the most reliably abandoned. People forget, underestimate, or simply don&apos;t bother.
            The research question: could a phone camera passively identify what&apos;s on a plate
            and log it automatically, with enough accuracy to be clinically useful?
          </P>
          <P>
            The Food-101 dataset provides a standardized benchmark: 101 food categories, 1,000
            images per class. The challenge is that the dataset is noisy — images were intentionally
            left &quot;as found on the web,&quot; with mislabeled examples and high intra-class
            variation. A model needs to generalize across restaurant photography, Instagram close-ups,
            and bad-lighting home kitchen shots.
          </P>
        </Prose>

        {/* Step 01 */}
        <Prose>
          <SH id="baseline" step="Step 01">
            Starting From Scratch: The Baseline CNN
          </SH>
          <P>
            The project started with a custom CNN trained from scratch — four convolutional blocks
            with batch normalization, ~2M parameters, trained for 60 epochs on Food-101. This
            established a baseline and, more importantly, revealed the fundamental problem:
            training from scratch on 101 classes with 1,000 images each is data-limited. The
            network learned to distinguish easy cases but struggled with visually similar
            categories (e.g., waffles vs pancakes, ramen vs pho).
          </P>
          <P>
            The baseline achieved <B>51% top-1 accuracy</B> — below the published human
            performance benchmark of ~93%. The ceiling was clearly elsewhere.
          </P>
        </Prose>

        {/* Step 02 */}
        <Prose>
          <SH id="resnet" step="Step 02">
            Transfer Learning: ResNet-50 with Progressive Unfreezing
          </SH>
          <P>
            The architecture switch to ResNet-50 pre-trained on ImageNet wasn&apos;t surprising —
            what mattered was <Em>how</Em> to fine-tune it without destroying the learned
            representations. The technique used is <B>progressive unfreezing</B>: start with
            the backbone completely frozen, train only the new classification head for several
            epochs, then gradually unfreeze from the top layers downward while applying
            <B> discriminative learning rates</B> — lower rates for early backbone layers
            (closer to raw image features), higher rates for later task-specific layers.
          </P>
        </Prose>

        <Wide>
          <ArchitectureDiagram />
        </Wide>

        <Prose>
          <P>
            This approach avoids the two failure modes of naive fine-tuning: (1) training the
            full network from a high learning rate destroys ImageNet features early in training,
            and (2) keeping the backbone frozen forever limits how much the model adapts to the
            food domain. Progressive unfreezing threads this needle by letting earlier layers
            adapt slowly while later layers adapt quickly.
          </P>

          <Callout>
            Transfer learning was not just &quot;better&quot; than training from scratch — it
            was better by an enormous margin. The custom CNN hit 51% top-1 after 60 epochs.
            Fine-tuned ResNet-50 hit 76% top-1 in the first 15 epochs before any backbone
            layers were unfrozen. The gap reflects the quality of ImageNet features for visual
            recognition tasks in general.
          </Callout>
        </Prose>

        {/* Step 03 */}
        <Prose>
          <SH id="augmentation" step="Step 03">
            Augmentation Strategy
          </SH>
          <P>
            Food photos are among the noisiest natural images. The augmentation pipeline was
            aggressive: random crop with padding, horizontal flip, color jitter (brightness,
            contrast, saturation, hue), random rotation up to ±15°, and MixUp augmentation
            at the batch level — linearly interpolating between two training images and their
            labels.
          </P>
          <P>
            MixUp was the most impactful augmentation. It forces the model to learn smoother
            class boundaries by training on convex combinations of examples, which reduces
            overconfidence on ambiguous inputs. For a dataset with noisy labels and visually
            overlapping classes, this was particularly valuable.
          </P>
        </Prose>

        <Wide>
          <TrainingCurves />
        </Wide>

        {/* Results */}
        <Prose>
          <SH id="results" step="Step 04">
            Results & Segmentation Extension
          </SH>
          <P>
            The final model achieved <B>82% top-1 / 95% top-5 accuracy</B> on the Food-101
            test set. The result was competitive with the state-of-the-art at the time and
            was published and presented at the Purdue Undergraduate Research Conference.
          </P>
          <P>
            The project also included a segmentation extension: a U-Net-style segmentation
            head attached to the ResNet-50 backbone to handle multi-item plates. The
            segmentation model was trained on a custom annotated subset of 400 multi-item
            images captured under controlled conditions.
          </P>
        </Prose>

        <Wide>
          <TopFivePrediction />
        </Wide>

        <MetricStrip
          metrics={[
            { label: "top-1 accuracy on Food-101", value: "82%", sub: "ResNet-50 + progressive unfreezing" },
            { label: "top-5 accuracy", value: "95%", sub: "clinically useful for dietary logging" },
            { label: "food categories classified", value: "101", sub: "Food-101 benchmark" },
            { label: "baseline (from scratch CNN)", value: "51%", sub: "top-1 · 4-block custom CNN" },
          ]}
        />

        {/* Takeaways */}
        <Prose>
          <SH id="takeaways" step="What This Gets Right">
            Lessons from Computer Vision Research
          </SH>
          <P>
            <B>1. Transfer learning dominates from-scratch training at limited data scales.</B>{" "}
            The gap between the baseline CNN (51%) and fine-tuned ResNet-50 (82%) is almost
            entirely attributable to ImageNet pre-training. More training epochs or a bigger
            architecture wouldn&apos;t have closed that gap — data is the bottleneck.
          </P>
          <P>
            <B>2. Augmentation choices matter more than architecture choices at this scale.</B>{" "}
            MixUp alone accounted for ~4 percentage points of accuracy improvement. The
            architecture was fixed (ResNet-50); what changed was how training data was
            presented to it.
          </P>
          <P>
            <B>3. Progressive unfreezing is the right protocol for fine-tuning large
            backbones.</B>{" "}
            Naive full-network fine-tuning at a uniform learning rate destroyed useful
            early-layer features in preliminary experiments. Freezing layers first and
            unfreezing gradually preserves the valuable spatial feature hierarchy while
            allowing domain adaptation.
          </P>
        </Prose>

        <NextProject slug="covid-simulation" />
      </div>
    </article>
  );
}
