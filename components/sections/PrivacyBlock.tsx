import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { DrawIcon } from "@/components/motion/DrawIcon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const pillars = [
  {
    title: "Events, not identities",
    body: "Our cameras detect activity and events, not identities, so monitoring never relies on facial recognition.",
    icon: "M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5z",
  },
  {
    title: "Secure, compliant practices",
    body: "Camera access management controls who sees which feeds. Hardware is enterprise-grade and NDAA & TAA compliant.",
    icon: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  },
  {
    title: "Cloud or on-premise",
    body: "Run DetectVision in the cloud or on your own premises, whichever fits the setup you already have.",
    icon: "M4 7h10M18 7h2M4 17h4M12 17h8M14 4v6M8 14v6",
  },
];

export function PrivacyBlock() {
  return (
    <section className="bg-paper py-28 sm:py-36">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionIntro title="Your business stays yours" lede="One private, secure AI system for everything that keeps your business running." />
          <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
            <span className="flex h-16 items-center justify-center rounded-xl bg-white text-sm font-semibold ring-1 ring-rule">NDAA</span>
            <span className="flex h-16 items-center justify-center rounded-xl bg-white text-sm font-semibold ring-1 ring-rule">TAA</span>
            <span className="flex h-16 items-center justify-center rounded-xl bg-white text-center text-sm font-semibold ring-1 ring-rule">No facial recognition</span>
          </div>
        </div>
        <Stagger as="ul" stagger={0.15} className="divide-y divide-rule border-y border-rule">
          {pillars.map((p, i) => (
            <StaggerItem as="li" key={p.title} className="flex gap-6 py-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-ink ring-1 ring-rule">
                <DrawIcon d={p.icon} delay={0.3 + i * 0.15} />
              </span>
              <div>
                <h3 className="font-sans text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-slate">{p.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
