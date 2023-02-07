import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  getEventsByUserId: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.event.findMany({
        where: {
          peopleEvents: {
            some: {
              user: {
                id: ctx.session.user.id
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

  createEvent: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string(),
      start: z.date(),
      end: z.date(),
      allDay: z.boolean()
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, title, start, end, allDay } = input
        if (!id || !title || !start || !end || !allDay) throw new Error('Please provide all of the required data to create an event')

        console.log('\n\n', { id, title, start, end, allDay }, '\n\n')

        await ctx.prisma.event.create({
          data: {
            id,
            title,
            start,
            end,
            allDay,

            peopleEvents: {
              create: {
                user: {
                  connect: {
                    id: ctx.session.user.id
                  }
                }
              }
            }
          },
        });

        // await ctx.prisma.peopleEvents.create({
        //   data: {
        //     userId: ctx.session.user.id,
        //     eventId: id,
        //   }
        // })
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
        // TODO: clean up the events table in 1 request? is it possible?
        await ctx.prisma.peopleEvents.deleteMany({
          where: {
            eventId: input.id
          },
        });

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