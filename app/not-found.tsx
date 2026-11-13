import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageHero kicker="Page not found" title="Nothing on camera here" lede="This page doesn’t exist or has moved. Head back to the homepage or book a demo.">
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Go to homepage</ButtonLink>
        <ButtonLink href="/contact" variant="outline-light">Book a demo</ButtonLink>
      </div>
    </PageHero>
  );
}
