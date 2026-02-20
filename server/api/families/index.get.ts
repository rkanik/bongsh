import { prisma } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const families = await prisma.family.findMany();
  return families;
});
