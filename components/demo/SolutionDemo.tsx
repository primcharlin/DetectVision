"use client";

import { AnalyzeDemo } from "./AnalyzeDemo";
import { RobotMock, VisionMock, VoiceMock } from "./ModuleMocks";

const demos = {
  "never-miss-a-call": VoiceMock,
  "catch-problems-early": VisionMock,
  "faster-service": RobotMock,
  "know-your-numbers": () => <AnalyzeDemo autoplay={false} />,
} as const;

export function SolutionDemo({ slug }: { slug: string }) {
  const Demo = demos[slug as keyof typeof demos];
  return Demo ? <Demo /> : null;
}
