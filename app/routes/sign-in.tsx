import type { ActionFunction, LinksFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useActionData } from '@remix-run/react'
import signInStyles from '~/styles/sign-in.css'
import { createUserSession, Login } from '~/utils/session.server'
import { validateName, validatePassword } from '~/validators'

export const links: LinksFunction = () => {
  return [
    {
      href: signInStyles,
      rel: 'stylesheet',
    },
  ]
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const password = form.get('password') as string
  const username = form.get('username') as string

  const fieldErrors = {
    username: validateName(username as string),
    password: validatePassword(password as string),
  }

  const hasError = Object.values(fieldErrors).some(Boolean)

  if (hasError) {
    return json(fieldErrors, {
      status: 404,
    })
  }

  const user = await Login({
    password,
    username,
  })

  if (!user) return `Username/Password combination is incorrect`

  return createUserSession(user.id, '/tasks')
}

export default function SignIn() {
  const errors = useActionData()

  return (
    <>
      <div className="bubbles" />
      <main>
        <h1>Welcome back!</h1>
        <div className="subtitle">Let's help us to meet your tasks</div>
        <img
          src="assets/loginIcon.svg"
          alt="Foto de um smartphone com um homem do lado"
        />
        <form method="POST" autoComplete="off">
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
          />
          {!!errors && (
            <div className="errors">
              {Object.values(errors).map((error, index) => (
                <p className="errorMessage" key={index}>
                  ⚠️ {error}
                </p>
              ))}
            </div>
          )}
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/sign-up">
            <strong>Sign up</strong>
          </Link>
        </p>
      </main>
    </>
  )
}
