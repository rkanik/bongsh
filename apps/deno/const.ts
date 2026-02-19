import process from "node:process";

export const DATABASE_URL = process.env.SUPABASE_DATABASE_URL;
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "*";
