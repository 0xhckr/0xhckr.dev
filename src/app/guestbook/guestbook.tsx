"use client";

import { GithubLogo, Trash } from "@phosphor-icons/react";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Reveal } from "~/components/reveal";
import { Button } from "~/components/ui/button";
import { isOwnerEmail } from "~/lib/admin";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";
import { api } from "../../../convex/_generated/api";

// Mirrors MAX_MESSAGE_LENGTH in convex/guestbook.ts (server enforces it too).
const MAX_LENGTH = 500;

function Avatar({ name, image }: { name: string; image?: string }) {
  if (image) {
    return (
      // biome-ignore lint/performance/noImgElement: external avatar URLs can't use next/image
      <img
        src={image}
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0 rounded-full"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex size-8 shrink-0 select-none items-center justify-center rounded-full border hairline font-mono text-xs text-muted-foreground"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

function RoleBadge({
  isOwner,
  className,
}: {
  isOwner: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[0.625rem] tracking-[0.2em] uppercase select-none",
        isOwner ? "text-accent" : "text-muted-foreground",
        className,
      )}
    >
      {isOwner ? "owner — this is me" : "guest"}
    </span>
  );
}

export function Guestbook() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const entries = useQuery(api.guestbook.list);
  const sign = useMutation(api.guestbook.sign);
  const remove = useMutation(api.guestbook.remove);

  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isOwner = isOwnerEmail(session?.user?.email);

  const handleGitHubSignIn = async () => {
    setError(null);
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/guestbook",
    });
    if (error) setError(error.message ?? "sign in failed");
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  const handleSign = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    setError(null);
    setSubmitting(true);
    try {
      await sign({ message: trimmed });
      setMessage("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "failed to sign the guestbook");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 sm:mt-20">
      {/* Auth strip */}
      {isPending ? (
        <p className="font-mono text-xs text-muted-foreground">loading...</p>
      ) : session ? (
        <section
          aria-label="Your session"
          className={cn(
            "flex flex-col gap-5 border p-6",
            isOwner ? "border-accent/40" : "hairline",
          )}
        >
          <div className="flex items-center gap-4">
            <Avatar
              name={session.user.name}
              image={session.user.image ?? undefined}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="truncate font-sans text-sm font-medium text-foreground">
                  {session.user.name}
                </p>
                <RoleBadge isOwner={isOwner} />
              </div>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                {isOwner
                  ? "signed in with your passkey — this is me, the site owner"
                  : "signed in via github — thanks for stopping by"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="font-mono text-xs normal-case"
            >
              sign out
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="guestbook-message" className="label">
              <span className="label-index">{"// "}</span>leave a note
            </label>
            <textarea
              id="guestbook-message"
              value={message}
              maxLength={MAX_LENGTH}
              rows={3}
              placeholder="say hi, be nice."
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none border hairline bg-transparent px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground/40"
            />
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs text-muted-foreground/60">
                {message.length}/{MAX_LENGTH}
              </p>
              <Button
                onClick={handleSign}
                disabled={!message.trim() || submitting}
                variant="outline"
                size="sm"
                className="font-mono text-xs normal-case"
              >
                {submitting ? "signing..." : "sign guestbook"}
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section
          aria-label="Sign in to sign the guestbook"
          className="flex flex-col items-start gap-4 border hairline p-6"
        >
          <p className="font-mono text-xs text-muted-foreground">
            want to leave a note? github login keeps the bots out.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGitHubSignIn}
            className="font-mono text-xs normal-case"
          >
            <GithubLogo size={16} />
            login with github
          </Button>
        </section>
      )}
      {error && (
        <p role="alert" className="mt-4 font-mono text-xs text-red-400">
          {error}
        </p>
      )}

      {/* Entries */}
      <div className="mt-12">
        {entries === undefined && (
          <p className="font-mono text-xs text-muted-foreground">loading...</p>
        )}

        {entries && entries.length === 0 && (
          <p className="font-mono text-xs text-muted-foreground">
            no notes yet — be the first.
          </p>
        )}

        {entries && entries.length > 0 && (
          <Reveal>
            <ul>
              {entries.map((entry) => {
                const canDelete =
                  !!session && (isOwner || entry.userId === session.user.id);
                return (
                  <li
                    key={entry._id}
                    className="reveal-item group border-t hairline py-5 last:border-b"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar name={entry.name} image={entry.image} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <p className="font-sans text-sm font-medium text-foreground">
                            {entry.name}
                          </p>
                          <RoleBadge isOwner={entry.isOwner} />
                          <time
                            dateTime={new Date(entry.createdAt).toISOString()}
                            className="font-mono text-[0.6875rem] text-muted-foreground/60"
                          >
                            {new Date(entry.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </time>
                        </div>
                        <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                          {entry.message}
                        </p>
                      </div>
                      {canDelete && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => remove({ id: entry._id })}
                          aria-label={`Remove note from ${entry.name}`}
                          className="opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                        >
                          <Trash className="size-4 text-destructive-foreground" />
                        </Button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        )}
      </div>
    </div>
  );
}
