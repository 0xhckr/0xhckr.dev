import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  resumes: defineTable({
    content: v.string(),
    createdAt: v.number(),
    isFrontFacing: v.boolean(),
  }),
});
