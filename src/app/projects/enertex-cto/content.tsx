"use client";

import { useLang } from "@/lib/lang";
import {
  Prose, Wide, B, SH, P, Callout,
  MetricStrip, NextProject, ArticleHeader, BackLink,
} from "../_article";

const en = {
  subtitle:
    "Built the full tech stack for a wellness e-commerce selling EMF-filtering and circadian lighting products across Europe — from Shopify configuration to conversion analytics to fulfillment.",
  openP1:
    "Enertex started from a conversation about how little people know about electromagnetic frequency exposure and circadian light disruption, and how few mainstream products address either cleanly. The product thesis was simple: curate high-quality EMF-filtering and circadian-safe lighting products, explain them clearly, and sell them to European customers who care about sleep quality and long-term health.",
  openP2:
    "The co-founder brought the product sourcing and domain expertise. I built the rest: the Shopify store, the analytics instrumentation, the CRM flows, the paid channel structure, and the tech side of the fulfillment pipeline. The constraint was a two-person team with no dedicated engineering budget — which meant every technical decision had to optimize for leverage, not elegance.",
  stackLayers: [
    { label: "Product Catalog", items: ["EN/ES localization", "EMF filtering pillar", "Circadian lighting pillar"], color: "#3b82f6", icon: "📦" },
    { label: "Shopify Storefront", items: ["Multi-currency checkout", "Shop Pay / Klarna", "Affiliate link tracking"], color: "#a3e635", icon: "🛒" },
    { label: "Product Analytics", items: ["GA4 + Custom Events", "Funnel monitoring", "Cohort retention"], color: "#f97316", icon: "📊" },
    { label: "Fulfillment", items: ["3PL integration", "<24h dispatch", "Live tracking emails"], color: "#22d3ee", icon: "🚚" },
  ] as { label: string; items: string[]; color: string; icon: string }[],
  stackBottom: "Shopify Plus · Klaviyo CRM · Meta Ads · Google Shopping",
  fig1label: "Fig 1.",
  fig1caption: "Enertex tech stack across four functional layers. The whole stack runs on managed platforms — no infrastructure to operate, allowing a two-person team to focus on product and conversion.",
  funnelSteps: [
    { label: "Visit", pct: 100, abs: "~6,200/mo", color: "#3b82f6" },
    { label: "Product Page", pct: 42, abs: "~2,600/mo", color: "#8b5cf6" },
    { label: "Add to Cart", pct: 18, abs: "~1,120/mo", color: "#f97316" },
    { label: "Checkout", pct: 9, abs: "~560/mo", color: "#ec4899" },
    { label: "Order", pct: 6, abs: "~370/mo", color: "#a3e635" },
  ] as { label: string; pct: number; abs: string; color: string }[],
  fig2label: "Fig 2.",
  fig2caption: "Conversion funnel with drop-off rates per step. The biggest drop (42% → 18%) occurs at add-to-cart — driven by price anchoring and trust signals, which became the primary CRO focus.",
  routingLabel: "Routing decision",
  skipLabel: "Skip Bureau Pull",

  s1step: "Step 01",
  s1title: "Stack Architecture: Managed Services Only",
  s1p1: "The first tech decision was strategic: run the entire business on managed SaaS platforms rather than building anything custom. Shopify for the storefront and checkout, Klaviyo for CRM and email flows, Meta Ads for top-of-funnel, Google Shopping for purchase-intent traffic, GA4 for analytics.",
  s1p2: "Custom code exists in exactly one layer: Shopify theme customizations for product landing page elements that the default themes handle poorly — specifically, the technical product explanation sections that needed to educate before they could convert. Everything else is configuration, not code.",
  callout: "The managed-services-only constraint sounds limiting. In practice, it means no infrastructure on-call rotation, no dependency on a single developer to keep the store running, and no sprints spent on tooling that doesn't directly move revenue. The constraint is the feature.",

  s2step: "Step 02",
  s2title: "Conversion Rate Optimization",
  s2p1: "The first version of the store had a reasonable traffic acquisition strategy but a poor conversion rate. GA4 funnel analysis identified the add-to-cart step as the primary drop-off point: 42% of visitors reached the product page, but only 18% of those added to cart. That gap — price anchoring, trust signals, product clarity — became the primary engineering and copywriting focus.",
  s2p2: "The interventions were unglamorous: rewriting product descriptions to lead with customer outcomes rather than product specifications, adding third-party certifications above the fold, restructuring the pricing display to reduce sticker-shock, and A/B testing button copy. The add-to-cart rate improved by ~40% over two months of iteration.",

  s3step: "Step 03",
  s3title: "Analytics Instrumentation",
  s3p1: "E-commerce analytics out of the box are insufficient for diagnosing conversion problems. The default Shopify + GA4 setup tracks page views and orders but misses everything in between: which product photos got clicked, how far down the page users scrolled before bouncing, whether the cart abandonment was price-related or trust-related.",
  s3p2pre: "I instrumented",
  s3p2bold: "custom GA4 events",
  s3p2post: " for 12 interaction touchpoints per product page: photo gallery interactions, accordion section opens, certification badge clicks, scroll depth at 25/50/75/100%, and add-to-cart button visibility time before click. This event data feeds a weekly funnel review that informs the next CRO iteration.",

  metrics: [
    { label: "customers to date", value: "5000+", sub: "across EN/ES markets" },
    { label: "fulfillment SLA", value: "<24h", sub: "dispatch from order confirmation" },
    { label: "review rating", value: "5.0 ★", sub: "Trustpilot verified" },
    { label: "top SKUs", value: "3", sub: "EMF filtering · circadian lighting" },
  ] as { label: string; value: string; sub: string }[],

  s5step: "What This Gets Right",
  s5title: "Three Lessons from Building a Real Business",
  s5p1bold: "1. The biggest conversion lever was copy, not code.",
  s5p1: " Every hour spent rewriting product descriptions to lead with outcomes rather than specifications returned more than every hour spent on technical optimizations. Product pages are arguments — and arguments need to answer the customer's actual question, which is almost never \"what is the technical specification?\"",
  s5p2bold: "2. Managed platforms are a strategic choice, not a compromise.",
  s5p2: " Running Enertex on Shopify + Klaviyo + GA4 isn't an engineering limitation — it's a leverage decision. The time not spent on infrastructure is time spent on product, channels, and conversion — the things that directly determine whether the business works.",
  s5p3bold: "3. Analytics instrumentation is a first-week task, not a later task.",
  s5p3: " Waiting until you have a conversion problem to instrument custom events means you've already lost months of diagnostic data. Instrument thoroughly before launch, even if you won't look at all the data immediately.",
};

const es: typeof en = {
  subtitle:
    "Construí todo el stack tecnológico para un e-commerce de bienestar que vende productos de filtrado EMF e iluminación circadiana en Europa — desde la configuración de Shopify hasta el análisis de conversión y la logística.",
  openP1:
    "Enertex nació de una conversación sobre lo poco que la gente sabe sobre la exposición a frecuencias electromagnéticas y la disrupción de la luz circadiana, y lo pocos productos mainstream que abordan ninguno de los dos limpiamente. La tesis de producto era simple: curar productos de alta calidad para filtrar EMF e iluminación circadiana segura, explicarlos con claridad y venderlos a clientes europeos que se preocupan por la calidad del sueño y la salud a largo plazo.",
  openP2:
    "El cofundador aportó el sourcing de productos y la experiencia en el dominio. Yo construí el resto: la tienda Shopify, la instrumentación de analítica, los flujos de CRM, la estructura de canales de pago y el lado técnico del pipeline de logística. La restricción era un equipo de dos personas sin presupuesto de ingeniería dedicado — lo que significaba que cada decisión técnica debía optimizar para el apalancamiento, no para la elegancia.",
  stackLayers: [
    { label: "Catálogo de Productos", items: ["Localización EN/ES", "Pilar filtrado EMF", "Pilar iluminación circadiana"], color: "#3b82f6", icon: "📦" },
    { label: "Tienda Shopify", items: ["Checkout multi-divisa", "Shop Pay / Klarna", "Seguimiento de links de afiliados"], color: "#a3e635", icon: "🛒" },
    { label: "Analítica de Producto", items: ["GA4 + Eventos Personalizados", "Monitoreo de embudos", "Retención de cohortes"], color: "#f97316", icon: "📊" },
    { label: "Logística", items: ["Integración 3PL", "Envío en <24h", "Emails de seguimiento en tiempo real"], color: "#22d3ee", icon: "🚚" },
  ],
  stackBottom: "Shopify Plus · Klaviyo CRM · Meta Ads · Google Shopping",
  fig1label: "Fig 1.",
  fig1caption: "Stack tecnológico de Enertex en cuatro capas funcionales. Todo el stack funciona en plataformas gestionadas — sin infraestructura que operar, permitiendo que un equipo de dos personas se centre en producto y conversión.",
  funnelSteps: [
    { label: "Visita", pct: 100, abs: "~6.200/mes", color: "#3b82f6" },
    { label: "Página de Producto", pct: 42, abs: "~2.600/mes", color: "#8b5cf6" },
    { label: "Añadir al Carrito", pct: 18, abs: "~1.120/mes", color: "#f97316" },
    { label: "Finalizar Compra", pct: 9, abs: "~560/mes", color: "#ec4899" },
    { label: "Pedido", pct: 6, abs: "~370/mes", color: "#a3e635" },
  ],
  fig2label: "Fig 2.",
  fig2caption: "Embudo de conversión con tasas de abandono por paso. La mayor caída (42% → 18%) ocurre al añadir al carrito — impulsada por el anclaje de precios y las señales de confianza, que se convirtieron en el foco principal de CRO.",
  routingLabel: "Decisión de enrutamiento",
  skipLabel: "Omitir Consulta al Bureau",

  s1step: "Paso 01",
  s1title: "Arquitectura del Stack: Solo Servicios Gestionados",
  s1p1: "La primera decisión técnica fue estratégica: gestionar el negocio completo en plataformas SaaS gestionadas en lugar de construir nada personalizado. Shopify para la tienda y el checkout, Klaviyo para CRM y flujos de email, Meta Ads para la parte superior del embudo, Google Shopping para el tráfico de intención de compra, GA4 para analítica.",
  s1p2: "El código personalizado existe exactamente en una capa: personalizaciones del tema de Shopify para los elementos de la landing page de producto que los temas predeterminados manejan mal — específicamente, las secciones de explicación técnica del producto que necesitaban educar antes de convertir. Todo lo demás es configuración, no código.",
  callout: "La restricción de solo servicios gestionados suena limitante. En la práctica, significa que no hay rotación de guardia de infraestructura, no hay dependencia de un único desarrollador para mantener la tienda funcionando, y no hay sprints gastados en herramientas que no mueven directamente los ingresos. La restricción es la funcionalidad.",

  s2step: "Paso 02",
  s2title: "Optimización de la Tasa de Conversión",
  s2p1: "La primera versión de la tienda tenía una estrategia de adquisición de tráfico razonable pero una tasa de conversión baja. El análisis del embudo de GA4 identificó el paso de añadir al carrito como el principal punto de abandono: el 42% de los visitantes llegaba a la página del producto, pero solo el 18% de esos añadía al carrito. Esa brecha — anclaje de precios, señales de confianza, claridad del producto — se convirtió en el foco principal de ingeniería y redacción.",
  s2p2: "Las intervenciones no fueron glamurosas: reescribir descripciones de productos para empezar con los resultados del cliente en lugar de las especificaciones del producto, añadir certificaciones de terceros por encima del pliegue, reestructurar la visualización de precios para reducir el choque inicial, y hacer A/B testing del texto de los botones. La tasa de añadir al carrito mejoró un ~40% en dos meses de iteración.",

  s3step: "Paso 03",
  s3title: "Instrumentación de Analítica",
  s3p1: "La analítica de e-commerce estándar es insuficiente para diagnosticar problemas de conversión. La configuración por defecto de Shopify + GA4 rastrea vistas de página y pedidos pero pierde todo lo que hay entre medias: qué fotos de producto se hicieron clic, hasta qué punto de la página los usuarios se desplazaron antes de rebotar, si el abandono del carrito fue por precio o por confianza.",
  s3p2pre: "Instrumenté",
  s3p2bold: "eventos personalizados de GA4",
  s3p2post: " para 12 puntos de interacción por página de producto: interacciones con la galería de fotos, aperturas de secciones acordeón, clics en distintivos de certificación, profundidad de scroll al 25/50/75/100%, y tiempo de visibilidad del botón de añadir al carrito antes del clic. Estos datos de eventos alimentan una revisión semanal del embudo que informa la siguiente iteración de CRO.",

  metrics: [
    { label: "clientes hasta la fecha", value: "5000+", sub: "mercados EN/ES" },
    { label: "SLA de logística", value: "<24h", sub: "envío desde confirmación del pedido" },
    { label: "puntuación de reseñas", value: "5.0 ★", sub: "Trustpilot verificado" },
    { label: "SKUs principales", value: "3", sub: "filtrado EMF · iluminación circadiana" },
  ],

  s5step: "Lo Que Funciona",
  s5title: "Tres Lecciones de Construir un Negocio Real",
  s5p1bold: "1. El mayor palanca de conversión fue el copy, no el código.",
  s5p1: " Cada hora invertida en reescribir descripciones de productos para empezar con los resultados en lugar de las especificaciones retornó más que cada hora gastada en optimizaciones técnicas. Las páginas de producto son argumentos — y los argumentos necesitan responder la pregunta real del cliente, que casi nunca es «¿cuál es la especificación técnica?»",
  s5p2bold: "2. Las plataformas gestionadas son una elección estratégica, no un compromiso.",
  s5p2: " Gestionar Enertex en Shopify + Klaviyo + GA4 no es una limitación de ingeniería — es una decisión de apalancamiento. El tiempo no gastado en infraestructura es tiempo invertido en producto, canales y conversión — las cosas que determinan directamente si el negocio funciona.",
  s5p3bold: "3. La instrumentación de analítica es una tarea de la primera semana, no de después.",
  s5p3: " Esperar hasta que tengas un problema de conversión para instrumentar eventos personalizados significa que ya has perdido meses de datos de diagnóstico. Instrumenta a fondo antes del lanzamiento, aunque no vayas a mirar todos los datos inmediatamente.",
};

// ── Diagram components ────────────────────────────────────────────────────────

function TechStackDiagram({ tx }: { tx: typeof en }) {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="grid sm:grid-cols-4 gap-3">
          {tx.stackLayers.map(({ label, items, color, icon }) => (
            <div key={label} className="rounded-xl border p-4 flex flex-col" style={{ borderColor: color + "50", background: color + "0d" }}>
              <p className="text-xl mb-2">{icon}</p>
              <p className="text-sm font-semibold text-ink mb-2">{label}</p>
              <div className="space-y-1 mt-auto">
                {items.map((item) => (
                  <p key={item} className="text-[11px] text-ink-muted leading-snug">• {item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-bg-card border border-border/40 px-4 py-2 text-center">
          <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">{tx.stackBottom}</p>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig1label}</span>{" "}{tx.fig1caption}
      </figcaption>
    </figure>
  );
}

function ConversionFunnel({ tx }: { tx: typeof en }) {
  return (
    <figure className="select-none">
      <div className="rounded-xl bg-bg-elev/50 border border-border p-6">
        <div className="flex flex-col items-center gap-1.5 max-w-md mx-auto">
          {tx.funnelSteps.map(({ label, pct, abs, color }, i) => {
            const widthPct = 40 + (pct / 100) * 60;
            return (
              <div key={label} className="w-full flex flex-col items-center">
                <div className="rounded-xl border py-3 text-center transition-all" style={{ width: `${widthPct}%`, borderColor: color + "55", background: color + "15" }}>
                  <p className="text-sm font-semibold text-ink">{label}</p>
                  <p className="text-[11px] font-mono text-ink-muted mt-0.5">{abs}</p>
                </div>
                {i < tx.funnelSteps.length - 1 && (
                  <div className="flex items-center gap-2 my-0.5">
                    <p className="text-[10px] text-ink-subtle">↓</p>
                    <p className="font-mono text-[10px]" style={{ color: color + "cc" }}>
                      {tx.funnelSteps[i + 1].pct}%
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-ink-subtle text-center">
        <span className="text-ink-muted font-medium">{tx.fig2label}</span>{" "}{tx.fig2caption}
      </figcaption>
    </figure>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EnertexContent() {
  const { lang } = useLang();
  const tx = lang === "es" ? es : en;

  return (
    <article className="pt-32 pb-24">
      <BackLink />
      <ArticleHeader
        eyebrow="Personal · enertexgroup.com · 2024–Present"
        title="Enertex — Co-founder & CTO"
        subtitle={tx.subtitle}
        tags={["E-commerce", "Shopify", "CRO", "Co-founder", "Wellness Tech", "Analytics"]}
      />

      <div className="container-page mt-16">
        <Prose>
          <P>{tx.openP1}</P>
          <P>{tx.openP2}</P>
        </Prose>

        <Prose>
          <SH id="stack" step={tx.s1step}>{tx.s1title}</SH>
          <P>{tx.s1p1}</P>
          <P>{tx.s1p2}</P>
        </Prose>

        <Wide><TechStackDiagram tx={tx} /></Wide>

        <Prose>
          <Callout>{tx.callout}</Callout>
        </Prose>

        <Prose>
          <SH id="cro" step={tx.s2step}>{tx.s2title}</SH>
          <P>{tx.s2p1}</P>
          <P>{tx.s2p2}</P>
        </Prose>

        <Wide><ConversionFunnel tx={tx} /></Wide>

        <Prose>
          <SH id="analytics" step={tx.s3step}>{tx.s3title}</SH>
          <P>{tx.s3p1}</P>
          <P>{tx.s3p2pre} <B>{tx.s3p2bold}</B>{tx.s3p2post}</P>
        </Prose>

        <MetricStrip metrics={tx.metrics} />

        <Prose>
          <SH id="takeaways" step={tx.s5step}>{tx.s5title}</SH>
          <P><B>{tx.s5p1bold}</B>{tx.s5p1}</P>
          <P><B>{tx.s5p2bold}</B>{tx.s5p2}</P>
          <P><B>{tx.s5p3bold}</B>{tx.s5p3}</P>
        </Prose>

        <NextProject slug="ab-test-instagram-shop" />
      </div>
    </article>
  );
}
