import type { ActionFunction, LinksFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useActionData } from '@remix-run/react'
import signUpStyles from '~/styles/sign-up.css'
import { CreateNewUser } from '~/utils/session.server'
import { validateEmail, validateName, validatePasswords } from '~/validators'

export const links: LinksFunction = () => {
  return [
    {
      href: signUpStyles,
      rel: 'stylesheet',
    },
  ]
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

  if (hasErrors) return hasErrors

  const errorOnCreateUser = await CreateNewUser({
    email: email as string,
    username: name as string,
    password: password as string,
  })

  if (errorOnCreateUser)
    return {
      error: errorOnCreateUser,
    }

  return redirect('/sign-in', {
    status: 200,
  })
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
          <input
            name="name"
            type="text"
            placeholder="Enter your username"
            defaultValue={''}
          />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            defaultValue={''}
          />
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
