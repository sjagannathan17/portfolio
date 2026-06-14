import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100">
      <nav className="mx-auto max-w-[720px] flex h-14 items-center px-6">
        <Link
          href="/"
          className="text-[15px] font-semibold text-neutral-900 hover:text-blue-600 transition-colors"
        >
          Srinidhi Jagannathan
        </Link>
      </nav>
    </header>
  );
}
