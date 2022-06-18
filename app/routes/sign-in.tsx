import type { LinksFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import signInStyles from '~/styles/sign-in.css'

export const links: LinksFunction = () => {
  return [
    {
      href: signInStyles,
      rel: 'stylesheet',
    },
  ]
}

export default function SignIn() {
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
        <form action="POST" autoComplete="off">
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
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
