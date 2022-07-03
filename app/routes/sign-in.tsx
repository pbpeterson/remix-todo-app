import type { ActionFunction, LinksFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useActionData } from '@remix-run/react'
import signInStyles from '~/styles/sign-in.css'
import { validateEmail, validatePassword } from '~/validators'

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
  const password = form.get('password')
  const email = form.get('email')

  const fieldErrors = {
    email: validateEmail(email as string),
    password: validatePassword(password as string),
  }

  const hasError = Object.values(fieldErrors).some(Boolean)

  if (hasError) {
    return json(fieldErrors, {
      status: 404,
    })
  }
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
          <input type="text" placeholder="Enter your email" name="email" />
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
