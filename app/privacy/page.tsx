import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/sections/LegalPlaceholder";

export const metadata: Metadata = { title: "Privacy policy", robots: { index: false } };
export default function Page() {
  return <LegalPlaceholder title="Privacy policy" />;
}
