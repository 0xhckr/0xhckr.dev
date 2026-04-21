import type { Metadata } from "next";
import { generatePageMetadata } from "~/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Resume",
  description:
    "Resume of Mohammad Al-Ahdal - Software Developer experienced in TypeScript, React, Rust, and NixOS.",
  path: "/resume",
});

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
