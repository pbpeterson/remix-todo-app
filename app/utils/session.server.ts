import { db } from './db.server'
import bcrypt from 'bcryptjs'
import { createCookieSessionStorage, redirect } from '@remix-run/node'

type LoginParams = {
  username: string
  password: string
}

type SignUpParams = {
  username: string
  password: string
  email: string
}

export async function Login({ password, username }: LoginParams) {
  const user = await db.user.findUnique({
    where: { username },
  })

  if (!user) return null
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)
  if (!isCorrectPassword) return null

  return { id: user.id, username }
}

export async function CreateNewUser({
  email,
  password,
  username,
}: SignUpParams) {
  const hasUser = await db.user.findFirst({
    where: {
      username,
    },
  })

  if (hasUser) return 'Este usuário já existe'

  const passwordEncrypted = await bcrypt.hash(password, 2)

  await db.user.create({
    data: {
      email: email,
      username: username,
      passwordHash: passwordEncrypted,
    },
  })

  return null
}

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'PBTodo_Remix_Session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession()
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') return null
  return userId
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }
  return userId
}
