"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Work", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-neutral-100">
      <nav className="mx-auto max-w-[720px] flex h-14 items-center justify-between px-6">
        <Link href="/" className="text-[15px] font-semibold text-neutral-900 hover:text-blue-600 transition-colors">
          Srinidhi Jagannathan
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[14px] transition-colors hover:text-neutral-900",
                pathname === link.href ? "text-neutral-900" : "text-neutral-500"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-[14px] text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-neutral-100 bg-white px-6 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block text-[15px] transition-colors",
                pathname === link.href ? "text-neutral-900" : "text-neutral-500"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
