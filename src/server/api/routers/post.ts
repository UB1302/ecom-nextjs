import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        emailId: z.string().email(),
        password: z.string().min(8),
        authToken: z.string().uuid(),
        userId: z.string(),
        // verificationCode: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          emailId: input.emailId,
          password: input.password,
          authToken: input.authToken,
          userId: input.userId,
          // verificationCode: input.verificationCode,
        },
      });
    }),

  createVerificationCode: publicProcedure
    .input(
      z.object({
        emailId: z.string().email(),
        verificationCode: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user_verification_code.create({
        data: {
          emailId: input.emailId,
          verificationCode: input.verificationCode,
        },
      });
    }),

  getVerificationCode: publicProcedure
    .input(
      z.object({
        emailId: z.string().email(),
        verificationCode: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.user_verification_code.findFirst({
        where: {
          emailId: input.emailId,
          verificationCode: input.verificationCode,
        },
        orderBy: {
          createdAt: "desc", // or 'desc' for descending order
        },
      });
    }),

  login: publicProcedure
    .input(
      z.object({
        emailId: z.string().email(),
        password: z.string().min(8),
        // authToken: z.string().uuid(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: {
          emailId: input.emailId,
          password: input.password,
          // authToken: input.authToken
        },
      });
    }),

  createLoginAuthToken: publicProcedure
    .input(
      z.object({
        userId: z.string(),  
        authToken: z.string().uuid(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: { userId: input.userId },
        data: {
          authToken: input.authToken,
        },
      });
    }),
  createUserCategory: publicProcedure
    .input(z.object({ userId: z.string(), categoryId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user_categories.create({
        data: {
          userId: input.userId,
          categoryId: input.categoryId,
          active: true,
        },
      });
    }),
  updateUserCategory: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        active: z.boolean(),
        categoryId: z.string()
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user_categories.updateMany({
        where: { userId: input.userId, categoryId: input.categoryId},
        data: {
          active: input.active,
        },
      });
    }),
  getUserCategories: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.user_categories.findMany({
        where: { userId: input.userId, active: true },
      });
    }),

    getProductCategories: publicProcedure.query(({ ctx }) => {
      return ctx.db.product_categories.findMany({});
    }),
});
