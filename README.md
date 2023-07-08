# Authentication example

Production build -> weezz.co.uk

### Creating prisma updates
- Make changes to the primsa/schema.prisma file
- Must run the following command to update the db
```
npx prisma migrate dev
```
or
```
npx prisma db push
```
- Restart TS server (Ctrl + Shift + P) or restart vscode

#### Create a migration
Create a new migration folder
```
mkdir -p prisma/migrations/{migration_number}_{migration_name}
i.e.
mkdir -p prisma/migrations/1_adding_messages
```

Create a diff between db url and the latest schema file
```
npx prisma migrate diff \
--from-url {db_url} \
--to-schema-datamodel prisma/schema.prisma \
--script > prisma/migrations/{migration_name}/migration.sql
```





# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
