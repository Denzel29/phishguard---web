import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-ink"
        >
          <span className="brand-gradient flex h-7 w-7 items-center justify-center rounded-lg text-sm font-extrabold text-white">
            P
          </span>
          PhishGuard
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-muted sm:flex">
          <Link href="/dashboard" className="hover:text-ink">
            Dashboard
          </Link>
          <Link href="/sandbox" className="hover:text-ink">
            Sandbox
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-semibold text-ink transition hover:bg-surface-muted"
          >
            Log in
          </Link>
          <Link
            href="/register-organization"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Register organization
          </Link>
        </div>
      </div>
    </header>
  );
}
