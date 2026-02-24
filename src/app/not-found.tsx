import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-24">
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Page not found</h1>
      <p className="text-neutral-500 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="text-[14px] text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 transition-colors">
        &larr; Back to home
      </Link>
    </div>
  );
}
