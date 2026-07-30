import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Only http(s) URLs may be stored - rendered as hrefs, so other schemes
// (javascript:, data:, ...) would be an XSS vector.
function assertHttpUrl(url: string) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Invalid URL");
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("Only http(s) URLs are allowed");
  }
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const vouches = await ctx.db.query("vouches").collect();
    return vouches.sort((a, b) => a.name.localeCompare(b.name));
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    assertHttpUrl(args.url);

    return await ctx.db.insert("vouches", {
      name: args.name,
      url: args.url,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("vouches"),
    name: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    assertHttpUrl(args.url);
    await ctx.db.patch(args.id, {
      name: args.name,
      url: args.url,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("vouches") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    await ctx.db.delete(args.id);
  },
});
