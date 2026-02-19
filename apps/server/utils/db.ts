import { PrismaClient } from "@/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "@/const.ts";

const adapter = new PrismaPg({ connectionString: DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const db = prisma;
