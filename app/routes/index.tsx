import type { LinksFunction } from '@remix-run/node'
import { Link } from 'react-router-dom'
import indexStyles from '~/styles/index.css'

export const links: LinksFunction = () => {
  return [
    {
      href: indexStyles,
      rel: 'stylesheet',
    },
  ]
}

export default function Index() {
  return (
    <>
      <div className="bubbles" />
      <main>
        <img src="assets/logo.svg" alt="Logo da aplicação" />
        <h1 className="mainDescription">
          Get things done with Todo application.
        </h1>
        <p className="secondaryDescription">
          You can use this application to deal with your daily tasks.
        </p>
        <Link to={'/sign-in'}>
          <button>Get Started</button>
        </Link>
      </main>
    </>
  )
}
