import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { industries, products } from "@/lib/content";
import { site } from "@/lib/site";

const columns = [
  { title: "Products", links: [...products.map((p) => ({ href: `/products#${p.id}`, label: p.name })), { href: "/pricing", label: "Pricing" }] },
  { title: "Industries", links: industries.map((i) => ({ href: `/industries#${i.slug}`, label: i.name })) },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/solutions", label: "Solutions" },
      { href: "/contact", label: "Book a demo" },
      { href: "/contact#faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper text-slate">
      <Container className="pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 text-ink">
              <Logo className="h-8 w-8" />
              <span className="font-display text-xl font-bold tracking-[-0.04em]">DetectVision</span>
            </Link>
            <p className="mt-5 leading-relaxed">{site.tagline}.</p>
            <div className="mt-6 space-y-1.5 text-[0.95rem]">
              <a href={`mailto:${site.email}`} className="block text-ink hover:underline">{site.email}</a>
              <a href={site.phoneHref} className="block text-ink hover:underline">{site.phone}</a>
            </div>
            <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {site.offices.map((o) => (
                <p key={o.city}><span className="font-semibold text-ink">{o.city}</span><br />{o.address}</p>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="font-sans text-[0.95rem] font-semibold text-ink">{col.title}</h2>
              <ul className="mt-4 space-y-3 text-[0.95rem]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-ink">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-rule pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DetectVision. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/terms" className="hover:text-ink">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
