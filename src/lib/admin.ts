// A session is always one of two things: the owner (passkey sign-in) or a
// GitHub guest (guestbook sign-in). Ownership is decided by email since it
// stays stable across both sign-in methods.
export const ADMIN_EMAIL = "hackr@hackr.sh";

export const isOwnerEmail = (email?: string | null): boolean =>
  email === ADMIN_EMAIL;
