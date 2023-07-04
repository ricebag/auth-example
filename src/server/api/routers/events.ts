import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  getEventsByGroupId: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      return await ctx.prisma.event.findMany({
        where: {
          groupId: input
        },
        include: {
          Group: {
            include: {
              peopleGroups: {
                include: {
                  user: {}
                }
              }
            }
          }
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),

  getEventsById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      return await ctx.prisma.event.findFirst({
        where: {
          id: input,
        },
        include: {
          Group: {
            include: {
              peopleGroups: {
                include: {
                  user: {}
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }),

  createEvent: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string(),
      start: z.date(),
      end: z.date(),
      groupId: z.string(),
      allDay: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { id, title, start, end, allDay, groupId } = input

        if (!id || !title || !start || !end || !groupId) throw new Error('Please provide all of the required data to create an event')

        await ctx.prisma.event.create({
          data: {
            id,
            title,
            start,
            end,
            allDay,
            groupId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  deleteEvent: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.event.delete({
          where: {
            id: input.id
          }
        })
      } catch (error) {
        console.log(error);
      }
    })
});