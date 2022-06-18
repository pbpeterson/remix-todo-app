import type { ActionFunction, LinksFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useActionData } from '@remix-run/react'
import signUpStyles from '~/styles/sign-up.css'

export const links: LinksFunction = () => {
  return [
    {
      href: signUpStyles,
      rel: 'stylesheet',
    },
  ]
}

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

const validateEmail = (email: string) => {
  const isValidEmail = emailRegex.test(email as string)
  if (isValidEmail) {
    return 'This email does not exist'
  }
}

const validateName = (name: string) => {
  if (name.length < 1) {
    return 'Your name needs 1 character at minimum'
  }
}

const validatePasswords = (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return 'Your password and password confirmation does not match'
  }

  if (password.length === 0 || confirmPassword.length === 0) {
    return 'Your password/password confirmation needs 1 character at minimum'
  }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const name = form.get('name')
  const email = form.get('email')
  const password = form.get('password')
  const passwordConfirmation = form.get('passwordConfirmation')

  const fieldErrors = {
    name: validateName(name as string),
    email: validateEmail(email as string),
    passwords: validatePasswords(
      password as string,
      passwordConfirmation as string
    ),
  }

  const hasErrors = Object.values(fieldErrors).some(Boolean)
  if (hasErrors) {
    return json(fieldErrors, {
      status: 404,
    })
  }

  return null
}

export default function SignUp() {
  const error = useActionData()

  return (
    <>
      <div className="bubbles" />
      <main>
        <h1>Welcome onboard</h1>
        <h2>Let's help you meet your tasks</h2>
        <form method="post">
          <input name="name" type="text" placeholder="Enter your full name" />
          <input type="text" placeholder="Enter your email" />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
          />
          {!!error && (
            <div className="errors">
              {Object.values(error).map((errorMessage, index) => (
                <p className="errorMessage" key={index}>
                  ⚠️ {errorMessage}
                </p>
              ))}
            </div>
          )}
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{' '}
          <Link to="/sign-in">
            <strong>Sign in</strong>
          </Link>
        </p>
      </main>
    </>
  )
}
