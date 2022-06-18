import type { LinksFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import signUpStyles from '~/styles/sign-up.css'

export const links: LinksFunction = () => {
  return [
    {
      href: signUpStyles,
      rel: 'stylesheet',
    },
  ]
}

export default function SignUp() {
  return (
    <>
      <div className="bubbles" />
      <main>
        <h1>Welcome onboard</h1>
        <h2>Let's help you meet your tasks</h2>
        <form action="POST">
          <input type="text" placeholder="Enter your full name" />
          <input type="text" placeholder="Enter your email" />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
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
