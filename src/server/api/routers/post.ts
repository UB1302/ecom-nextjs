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

  getProductCategories: publicProcedure.query(({ ctx }) => {
    return ctx.db.product_categories.findMany();
  }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        emailId: z.string().email(),
        password: z.string().min(8),
        authToken: z.string().uuid(),
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
          verificationCode: input.verificationCode
        },
        orderBy: {
          createdAt: 'desc' // or 'desc' for descending order
        }
      });
    }),
  
    login: publicProcedure
    .input(
      z.object({
        emailId: z.string().email(),
        password: z.string().min(8)
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.user.findFirst({
        where: {
          emailId: input.emailId,
          password: input.password
        }
      });
    }),
});
