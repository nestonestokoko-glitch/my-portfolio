import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    isPublic: v.boolean(),
    likesCount: v.number(),
  }).index("by_public", ["isPublic"]),
});
