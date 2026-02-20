import process from 'node:process'

export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
export const DATABASE_URL = process.env.SUPABASE_DATABASE_URL
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || '*'
