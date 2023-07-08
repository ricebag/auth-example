import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { guestbookRouter } from "./routers/guestbook";
import { userRouter } from "./routers/users";
import { eventRouter } from "./routers/events";
import { groupRouter } from "./routers/groups";
import { messageRouter } from './routers/messages';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  guestbook: guestbookRouter,
  example: exampleRouter,
  users: userRouter,
  events: eventRouter,
  groups: groupRouter,
  messages: messageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
