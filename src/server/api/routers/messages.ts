import { z } from "zod";
import * as uuid from 'uuid';

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const messageRouter = createTRPCRouter({
  getMessagesByGroupId: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      return await ctx.prisma.message.findMany({
        where: {
          Group: {
            id: input
          }
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } catch (error) {
      console.log("error", error);
      return []
    }
  }),

  createMessage: protectedProcedure
    .input(z.object({
      message: z.string(),
      groupId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { message, groupId } = input
        const id: string = uuid.v4()

        if (!message) throw new Error('Please provide all of the required data to create an event')

        await ctx.prisma.message.create({
          data: {
            id,
            message,
            groupId,
            author: ctx.session.user.id
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});