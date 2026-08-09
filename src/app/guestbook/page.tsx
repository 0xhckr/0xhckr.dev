import type { Metadata } from "next";
import { PageHeader } from "~/components/page-header";
import { generatePageMetadata } from "~/lib/metadata";
import { Guestbook } from "./guestbook";

export const metadata: Metadata = generatePageMetadata({
  title: "Guestbook",
  description: "Leave a note in the guestbook with your GitHub account.",
  path: "/guestbook",
});

export default function GuestbookPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-5xl px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
        <PageHeader
          eyebrow="guestbook"
          title="Guestbook"
          description="You were here — say it for the record. Sign in with GitHub to leave a note."
        />
        <Guestbook />
      </div>
    </main>
  );
}
