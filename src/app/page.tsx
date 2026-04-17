import type { Metadata } from "next";
import { StoryScroll } from "~/components/story-scroll";
import { generatePageMetadata } from "~/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Mohammad Al-Ahdal | Software Developer",
  description:
    "Software developer, homelab enthusiast, and a lover of Nix. Making things by smashing my hands on my keyboard.",
});

export default function Home() {
  return <StoryScroll />;
}
