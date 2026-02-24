import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-100 mt-24">
      <div className="mx-auto max-w-[720px] px-6 py-12 text-center">
        <p className="text-[14px] text-neutral-400">
          &copy; {new Date().getFullYear()} Srinidhi Jagannathan
        </p>
        <div className="mt-3 flex items-center justify-center gap-6 text-[13px] text-neutral-400">
          <Link href="/projects" className="hover:text-neutral-900 transition-colors">Work</Link>
          <Link href="/about" className="hover:text-neutral-900 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-neutral-900 transition-colors">Contact</Link>
          <a href="https://linkedin.com/in/srinidhi-jagannathan" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">LinkedIn</a>
          <a href="https://github.com/sjagannathan17" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
