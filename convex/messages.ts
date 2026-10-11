import { v } from "convex/values";
import { mutation, query } from "./_generated/server.js";
import { components } from "./_generated/api.js";

/**
 * App wrapper to submit a new message to the isolated component.
 */
export const submitMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
    isPublic: v.optional(v.boolean()),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    const id = await ctx.runMutation(components.messages.lib.send, {
      name: args.name,
      email: args.email,
      message: args.message,
      isPublic: args.isPublic ?? true,
    });
    return id;
  },
});

/**
 * App wrapper to list public messages from the component.
 */
export const getPublicMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.runQuery(components.messages.lib.listPublic, {});
  },
});

/**
 * App wrapper to fetch overall engagement stats from the component.
 */
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.runQuery(components.messages.lib.getStats, {});
  },
});
