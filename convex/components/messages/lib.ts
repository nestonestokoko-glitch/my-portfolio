import { v } from "convex/values";
import { mutation, query } from "./_generated/server.js";

/**
 * Send and persist a new message in the isolated component table.
 */
export const send = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
    isPublic: v.boolean(),
  },
  returns: v.id("messages"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      name: args.name,
      email: args.email,
      message: args.message,
      isPublic: args.isPublic,
      likesCount: 0,
    });
  },
});

/**
 * Retrieve public guestbook messages ordered by creation time.
 */
export const listPublic = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("messages"),
      _creationTime: v.number(),
      name: v.string(),
      email: v.string(),
      message: v.string(),
      isPublic: v.boolean(),
      likesCount: v.number(),
    })
  ),
  handler: async (ctx) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_public", (q) => q.eq("isPublic", true))
      .order("desc")
      .take(50);
  },
});

/**
 * Retrieve total counts and engagement statistics across messages.
 */
export const getStats = query({
  args: {},
  returns: v.object({
    totalMessages: v.number(),
    publicMessages: v.number(),
  }),
  handler: async (ctx) => {
    const all = await ctx.db.query("messages").collect();
    const publicOnes = all.filter((m) => m.isPublic);
    return {
      totalMessages: all.length,
      publicMessages: publicOnes.length,
    };
  },
});

/**
 * Increment the like count on an existing public message.
 */
export const incrementLikes = mutation({
  args: {
    messageId: v.id("messages"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.messageId);
    if (existing) {
      await ctx.db.patch(args.messageId, {
        likesCount: existing.likesCount + 1,
      });
    }
    return null;
  },
});
