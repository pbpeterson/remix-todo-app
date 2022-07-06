import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Link } from 'react-router-dom'
import taskStyle from '~/styles/task.css'
import { db } from '~/utils/db.server'

type TaskParams = {
  content: string
  createdAt: string
  id: string
}

export const links: LinksFunction = () => {
  return [
    {
      href: taskStyle,
      rel: 'stylesheet',
    },
  ]
}

export const action: ActionFunction = ({ request }) => {
  // console.log(request)
  return null
}

export const loader: LoaderFunction = async (request) => {
  const taskId = request.params.task
  const task = await db.task.findFirst({
    where: {
      id: taskId,
    },
  })
  return task
}

const Task = () => {
  const task: TaskParams = useLoaderData()
  return (
    <div>
      <div className="bubbles" />
      <div></div>
      <main>
        <h2>
          Your current task is: <strong>{task.content}</strong>
        </h2>
        <form method="post">
          <button type="submit" value={'finishTask'}>
            Finish task
          </button>
          <Link to={`/edit/${task.id}`}>
            <button type="submit">Edit task</button>
          </Link>
        </form>
      </main>
    </div>
  )
}

export default Task
