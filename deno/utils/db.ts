import { PrismaClient } from "@/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import process from "node:process";

const adapter = new PrismaPg({
  connectionString: process.env.SUPABASE_DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export const db = prisma;
