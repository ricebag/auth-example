import { FriendshipRequestStatus } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user.findMany({
        where: {
          id: { not: ctx.session.user.id },
          // friendshipRequestsSent:
        },
        include: {
          friendshipRequestsSent: {},
          friendshipRequestsReceived: {}
        },
        orderBy: {
          name: "desc",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),

  getFriends: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id
        },
        include: {
          friendshipRequestsSent: {
            where: {
              requestSentById: ctx.session.user.id,
              status: "PENDING"
            },
          },
          friendshipRequestsReceived: {
            where: {
              requestSentToId: ctx.session.user.id,
              status: "PENDING"
            },
          }
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }),

  addFriend: protectedProcedure
    .input(z.object({
      userId: z.string(),
      name: z.string(),
      email: z.string(),
      profilePicture: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { session: { user: { id, name, email, image } } } = ctx
        if (!name || !email || !image) throw new Error("Invalid user session")

        await ctx.prisma.friendship.create({
          data: {
            requestSentById: id,
            user1: name,
            user1Email: email,
            user1ProfilePicture: image,

            requestSentToId: input.userId,
            user2: input.name,
            user2Email: input.email,
            user2ProfilePicture: input.profilePicture,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  acceptFriendRequest: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.friendship.update({
          where: {
            id: input.id,
          },
          data: {
            status: FriendshipRequestStatus.ACCEPTED
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  postMessage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.guestbook.create({
          data: {
            name: input.name,
            message: input.message,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});