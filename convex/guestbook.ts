import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ADMIN_EMAIL, authComponent } from "./auth";

export const MAX_MESSAGE_LENGTH = 500;

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("guestbook")
      .withIndex("by_createdAt")
      .order("desc")
      .take(100);
  },
});

export const sign = mutation({
  args: { message: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }
    const message = args.message.trim();
    if (!message) {
      throw new Error("Message cannot be empty");
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      throw new Error(
        `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`,
      );
    }
    return await ctx.db.insert("guestbook", {
      userId: user._id,
      name: user.name,
      image: user.image ?? undefined,
      message,
      // Owner is decided by email, so it holds for both the passkey session
      // and the owner's own GitHub sign-in.
      isOwner: user.email === ADMIN_EMAIL,
      createdAt: Date.now(),
    });
  },
});

// The owner can remove any entry (moderation); guests can remove their own.
export const remove = mutation({
  args: { id: v.id("guestbook") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }
    const entry = await ctx.db.get(args.id);
    if (!entry) {
      return;
    }
    const isOwner = user.email === ADMIN_EMAIL;
    if (!isOwner && entry.userId !== user._id) {
      throw new Error("Not authorized");
    }
    await ctx.db.delete(args.id);
  },
});
