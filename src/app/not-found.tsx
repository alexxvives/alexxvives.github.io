import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="eyebrow">404</p>
      <h1 className="h1 mt-4">Lost in latent space.</h1>
      <p className="text-ink-muted mt-4 max-w-md">
        That page doesn&apos;t exist (or doesn&apos;t exist yet).
      </p>
      <Link href="/" className="btn-primary mt-8">
        ← Back home
      </Link>
    </div>
  );
}
