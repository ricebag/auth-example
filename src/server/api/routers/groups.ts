import { z } from "zod";
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
      id: z.string(),
      title: z.string(),
      guests: z.array(z.object({ id: z.string() })),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { id, title, guests } = input

        if (!id || !title) throw new Error('Please provide all of the required data to create an event')
        const groupGuests = [
          { user: { connect: { id: ctx.session.user.id, role: 'ADMIN' } } },
          ...guests?.map((user: { id: string; }) => ({ user: { connect: { id: user.id, role: 'USER' } } }))
        ]

        await ctx.prisma.group.create({
          data: {
            id,
            title,
            description: '',
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