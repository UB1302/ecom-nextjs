import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({

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
        categoryId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user_categories.updateMany({
        where: { userId: input.userId, categoryId: input.categoryId },
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

  getProductCategories: publicProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      const { page = 1, pageSize = 10 } = input;
      const skip = (page - 1) * pageSize;
      const take = pageSize;
      return ctx.db.product_categories.findMany({
        skip,
        take,
        orderBy: {
          createdAt: "asc", // Adjust orderBy as needed
        },
      });
    }),
});
