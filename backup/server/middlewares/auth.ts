import { Context, Next } from '@oak/oak'
import { jwtVerify } from '@panva/jose'
import { JWT_SECRET } from '../const.ts'

export const auth = async (ctx: Context, next: Next) => {
  const token = ctx.request.headers.get('Authorization')?.split(' ')[1]

  if (!token) {
    ctx.response.status = 401
    ctx.response.body = { message: 'Unauthorized' }
    return
  }
  try {
    const decoded = await jwtVerify(token, JWT_SECRET)
    if (!decoded.payload.id) {
      ctx.response.status = 401
      ctx.response.body = { message: 'Unauthorized' }
      return
    }
    ctx.state.user = decoded.payload
    return next()
  } catch {
    // console.error(error)
  }
  ctx.response.status = 401
  ctx.response.body = { message: 'Unauthorized' }
  return
}
