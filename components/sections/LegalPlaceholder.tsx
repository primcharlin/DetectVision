import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export function LegalPlaceholder({ title }: { title: string }) {
  return (
    <>
      <PageHero kicker="Legal" title={title} lede="This page needs your company’s legal text before launch." />
      <section className="bg-daylight py-24">
        <Container>
          <p className="max-w-2xl leading-relaxed text-slate">[Paste the {title.toLowerCase()} provided by your legal advisor here.]</p>
        </Container>
      </section>
    </>
  );
}
