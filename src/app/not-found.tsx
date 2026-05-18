"use client";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { t } from "@/content/translations";

export default function NotFound() {
  const { lang } = useLang();
  const tx = t[lang].notFound;
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="eyebrow">404</p>
      <h1 className="h1 mt-4">{tx.tagline}</h1>
      <p className="text-ink-muted mt-4 max-w-md">
        {tx.description}
      </p>
      <Link href="/" className="btn-primary mt-8">
        {tx.backHome}
      </Link>
    </div>
  );
}
