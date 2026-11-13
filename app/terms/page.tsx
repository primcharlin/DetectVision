import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/sections/LegalPlaceholder";

export const metadata: Metadata = { title: "Terms of use", robots: { index: false } };
export default function Page() {
  return <LegalPlaceholder title="Terms of use" />;
}
