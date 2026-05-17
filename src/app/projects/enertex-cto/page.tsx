import type { Metadata } from "next";
import {
  Prose, Wide, B, Em, C, SH, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

export const metadata: Metadata = {
  title: "Enertex CTO — E-commerce & Analytics — Alexandre Vives",
  description:
    "Co-founded and lead tech for Enertex, a wellness e-commerce selling EMF-filtering products across Europe — Shopify storefront, conversion optimization, and product analytics.",
};

// ── Diagram 1: Tech stack diagram ─────────────────────────────────────────────

function TechStackDiagram() {
  const layers = [
    {
      label: "Product Catalog",
      items: ["EN/ES localization", "EMF filtering pillar", "Circadian lighting pillar"],
      color: "#3b82f6",
      icon: "📦",
    },
    {
      label: "Shopify Storefront",
      items: ["Multi-currency checkout", "Shop Pay / Klarna", "Affiliate link tracking"],
      color: "#a3e635",
      icon: "🛒",
    },
    {
      label: "Product Analytics",
      items: ["GA4 + Custom Events", "Funnel monitoring", "Cohort retention"],
      color: "#f97316",
      icon: "📊",
    },
    {
      label: "Fulfillment",
      items: ["3PL integration", "<24h dispatch", "Live tracking emails"],
      color: "#22d3ee",
      icon: "🚚",
    },
  ];

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="grid sm:grid-cols-4 gap-3">
          {layers.map(({ label, items, color, icon }) => (
            <div
              key={label}
              className="rounded-xl border p-4 flex flex-col"
              style={{ borderColor: color + "50", background: color + "0d" }}
            >
              <p className="text-xl mb-2">{icon}</p>
              <p className="text-sm font-semibold text-ink mb-2">{label}</p>
              <div className="space-y-1 mt-auto">
                {items.map((item) => (
                  <p key={item} className="text-[11px] text-ink-muted leading-snug">
                    • {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-bg-card border border-border/40 px-4 py-2 text-center">
          <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">
            Shopify Plus · Klaviyo CRM · Meta Ads · Google Shopping
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 1.</span> Enertex tech stack across
        four functional layers. The whole stack runs on managed platforms — no infrastructure
        to operate, allowing a two-person team to focus on product and conversion.
      </figcaption>
    </figure>
  );
}

// ── Diagram 2: Conversion funnel ──────────────────────────────────────────────

function ConversionFunnel() {
  const steps = [
    { label: "Visit", pct: 100, abs: "~6,200/mo", color: "#3b82f6" },
    { label: "Product Page", pct: 42, abs: "~2,600/mo", color: "#8b5cf6" },
    { label: "Add to Cart", pct: 18, abs: "~1,120/mo", color: "#f97316" },
    { label: "Checkout", pct: 9, abs: "~560/mo", color: "#ec4899" },
    { label: "Order", pct: 6, abs: "~370/mo", color: "#a3e635" },
  ];

  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col items-center gap-1.5 max-w-md mx-auto">
          {steps.map(({ label, pct, abs, color }, i) => {
            const widthPct = 40 + (pct / 100) * 60; // 40% minimum, 100% max
            return (
              <div key={label} className="w-full flex flex-col items-center">
                <div
                  className="rounded-xl border py-3 text-center transition-all"
                  style={{
                    width: `${widthPct}%`,
                    borderColor: color + "55",
                    background: color + "15",
                  }}
                >
                  <p className="text-sm font-semibold text-ink">{label}</p>
                  <p className="text-[11px] font-mono text-ink-muted mt-0.5">{abs}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex items-center gap-2 my-0.5">
                    <p className="text-[10px] text-ink-subtle">↓</p>
                    <p className="font-mono text-[10px]" style={{ color: color + "cc" }}>
                      {steps[i + 1].pct}%
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">Fig 2.</span> Conversion funnel with
        drop-off rates per step. The biggest drop (42% → 18%) occurs at add-to-cart — driven by
        price anchoring and trust signals, which became the primary CRO focus.
      </figcaption>
    </figure>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function EnertexCTOPage() {
  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Personal · enertexgroup.com · 2024–Present"
        title="Enertex — Co-founder & CTO"
        subtitle="Built the full tech stack for a wellness e-commerce selling EMF-filtering and circadian lighting products across Europe — from Shopify configuration to conversion analytics to fulfillment."
        tags={["E-commerce", "Shopify", "CRO", "Co-founder", "Wellness Tech", "Analytics"]}
      />

      <div className="mt-16">
        {/* Opening */}
        <Prose>
          <P>
            Enertex started from a conversation about how little people know about electromagnetic
            frequency exposure and circadian light disruption, and how few mainstream products
            address either cleanly. The product thesis was simple: curate high-quality EMF-filtering
            and circadian-safe lighting products, explain them clearly, and sell them to European
            customers who care about sleep quality and long-term health.
          </P>
          <P>
            The co-founder brought the product sourcing and domain expertise. I built the rest:
            the Shopify store, the analytics instrumentation, the CRM flows, the paid channel
            structure, and the tech side of the fulfillment pipeline. The constraint was a
            two-person team with no dedicated engineering budget — which meant every technical
            decision had to optimize for leverage, not elegance.
          </P>
        </Prose>

        {/* Step 01 */}
        <Prose>
          <SH id="stack" step="Step 01">
            Stack Architecture: Managed Services Only
          </SH>
          <P>
            The first tech decision was strategic: run the entire business on managed SaaS
            platforms rather than building anything custom. Shopify for the storefront and
            checkout, Klaviyo for CRM and email flows, Meta Ads for top-of-funnel, Google
            Shopping for purchase-intent traffic, GA4 for analytics.
          </P>
          <P>
            Custom code exists in exactly one layer: Shopify theme customizations for product
            landing page elements that the default themes handle poorly — specifically, the
            technical product explanation sections that needed to educate before they could
            convert. Everything else is configuration, not code.
          </P>
        </Prose>

        <Wide>
          <TechStackDiagram />
        </Wide>

        <Prose>
          <Callout>
            The managed-services-only constraint sounds limiting. In practice, it means no
            infrastructure on-call rotation, no dependency on a single developer to keep the
            store running, and no sprints spent on tooling that doesn&apos;t directly move
            revenue. The constraint is the feature.
          </Callout>
        </Prose>

        {/* Step 02 */}
        <Prose>
          <SH id="cro" step="Step 02">
            Conversion Rate Optimization
          </SH>
          <P>
            The first version of the store had a reasonable traffic acquisition strategy but a
            poor conversion rate. GA4 funnel analysis identified the add-to-cart step as the
            primary drop-off point: 42% of visitors reached the product page, but only 18% of
            those added to cart. That gap — price anchoring, trust signals, product clarity —
            became the primary engineering and copywriting focus.
          </P>
          <P>
            The interventions were unglamorous: rewriting product descriptions to lead with
            customer outcomes rather than product specifications, adding third-party
            certifications above the fold, restructuring the pricing display to reduce
            sticker-shock, and A/B testing button copy. The add-to-cart rate improved by
            ~40% over two months of iteration.
          </P>
        </Prose>

        <Wide>
          <ConversionFunnel />
        </Wide>

        {/* Step 03 */}
        <Prose>
          <SH id="analytics" step="Step 03">
            Analytics Instrumentation
          </SH>
          <P>
            E-commerce analytics out of the box are insufficient for diagnosing conversion
            problems. The default Shopify + GA4 setup tracks page views and orders but misses
            everything in between: which product photos got clicked, how far down the page users
            scrolled before bouncing, whether the cart abandonment was price-related or
            trust-related.
          </P>
          <P>
            I instrumented <B>custom GA4 events</B> for 12 interaction touchpoints per product
            page: photo gallery interactions, accordion section opens, certification badge clicks,
            scroll depth at 25/50/75/100%, and add-to-cart button visibility time before click.
            This event data feeds a weekly funnel review that informs the next CRO iteration.
          </P>
        </Prose>

        <MetricStrip
          metrics={[
            { label: "customers to date", value: "5000+", sub: "across EN/ES markets" },
            { label: "fulfillment SLA", value: "<24h", sub: "dispatch from order confirmation" },
            { label: "review rating", value: "5.0 ★", sub: "Trustpilot verified" },
            { label: "top SKUs", value: "3", sub: "EMF filtering · circadian lighting" },
          ]}
        />

        {/* Takeaways */}
        <Prose>
          <SH id="takeaways" step="What This Gets Right">
            Three Lessons from Building a Real Business
          </SH>
          <P>
            <B>1. The biggest conversion lever was copy, not code.</B> Every hour spent
            rewriting product descriptions to lead with outcomes rather than specifications
            returned more than every hour spent on technical optimizations. Product pages
            are arguments — and arguments need to answer the customer&apos;s actual question,
            which is almost never &quot;what is the technical specification?&quot;
          </P>
          <P>
            <B>2. Managed platforms are a strategic choice, not a compromise.</B> Running
            Enertex on Shopify + Klaviyo + GA4 isn&apos;t an engineering limitation — it&apos;s a
            leverage decision. The time not spent on infrastructure is time spent on product,
            channels, and conversion — the things that directly determine whether the business
            works.
          </P>
          <P>
            <B>3. Analytics instrumentation is a first-week task, not a later task.</B> Waiting
            until you have a conversion problem to instrument custom events means you&apos;ve
            already lost months of diagnostic data. Instrument thoroughly before launch, even
            if you won&apos;t look at all the data immediately.
          </P>
        </Prose>

        <NextProject slug="ab-test-instagram-shop" />
      </div>
    </article>
  );
}
