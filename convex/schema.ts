import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  resumes: defineTable({
    content: v.string(),
    createdAt: v.number(),
    isFrontFacing: v.boolean(),
    jobPosting: v.optional(v.id("jobPostings")),
  }).index("by_isFrontFacing", ["isFrontFacing"]),
  coverLetters: defineTable({
    content: v.string(),
    createdAt: v.number(),
    jobPosting: v.optional(v.id("jobPostings")),
  }),
  jobPostings: defineTable({
    title: v.string(),
    description: v.string(),
    company: v.string(),
    location: v.optional(v.string()),
    createdAt: v.number(),
    postingPostedAt: v.optional(v.number()),
  }),
  vouches: defineTable({
    name: v.string(),
    url: v.string(),
    createdAt: v.number(),
  }),
  guestbook: defineTable({
    // Better Auth user id (from the betterAuth component, not an app table).
    userId: v.string(),
    // Denormalized at sign time - component tables can't be joined from the app.
    name: v.string(),
    image: v.optional(v.string()),
    message: v.string(),
    // True when the signer is the site owner, regardless of login method.
    isOwner: v.boolean(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
