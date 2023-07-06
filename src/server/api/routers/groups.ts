import { z } from "zod";
import { Role } from "@prisma/client";
import * as uuid from 'uuid';

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const groupRouter = createTRPCRouter({
  getGroupsByUserId: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.group.findMany({
        where: {
          peopleGroups: {
            some: {
              user: {
                id: ctx.session.user.id
              }
            }
          }
        },
        include: {
          peopleGroups: {
            include: {
              user: {}
            }
          }
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    } catch (error) {
      console.log("error", error);
      return []
    }
  }),
  getGroupById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      return await ctx.prisma.group.findFirst({
        where: {
          id: input,
        },
        include: {
          peopleGroups: {
            include: {
              user: {}
            }
          }
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }),

  createGroup: protectedProcedure
    .input(z.object({
      title: z.string(),
      guests: z.array(z.object({ id: z.string() })),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { title, guests } = input
        const id: string = uuid.v4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

        if (!title) throw new Error('Please provide all of the required data to create an event')
        const groupGuests = [
          { user: { connect: { id: ctx.session.user.id } }, role: Role.ADMIN, id: uuid.v4() },
          ...guests?.map((user: { id: string; }) => ({ user: { connect: { id: user.id } }, role: Role.USER, id: uuid.v4() }))
        ]

        await ctx.prisma.group.create({
          data: {
            id,
            title,
            description: '',
            // TODO: make this dynamic
            image: '/avatar.svg',

            peopleGroups: {
              create: groupGuests
            }
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  // removeUserFromGroup: protectedProcedure
  //   .input(z.object({
  //     id: z.string(),
  //   }))
  //   .mutation(async ({ ctx, input }) => {
  //     try {
  //       // TODO: clean up the events table in 1 request? is it possible?
  //       await ctx.prisma.peopleEvents.deleteMany({
  //         where: {
  //           eventId: input.id
  //         },
  //       });

  //       await ctx.prisma.event.delete({
  //         where: {
  //           id: input.id
  //         }
  //       })
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })
});