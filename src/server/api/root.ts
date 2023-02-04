import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { guestbookRouter } from "./routers/guestbook";
import { userRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  guestbook: guestbookRouter,
  example: exampleRouter,
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
