This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Next.js Project with Prisma ORM

To explore the database tables and models using Prisma as the ORM, follow these steps:

1. **Install Dependencies:**
   Make sure you have all the required dependencies installed. You can do this by running:

   ```bash
   npm install
   ```

2. **Run Prisma Studio:**
   Open your command line and execute the following command:

```bash
 npx prisma studio
```

3. **Access Prisma Studio Interface:**
   After running the command, a new window will open in your default web browser, displaying the Prisma Studio interface.

4. **View and Edit:**
   Navigate to [http://localhost:5555](http://localhost:5555) in your browser if it doesn't open automatically. Here, you can view and edit the database tables and models using the Prisma Studio interface.
