import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import taskStyles from '~/styles/tasks.css'
import { db } from '~/utils/db.server'
import { getUserId } from '~/utils/session.server'
import type { TaskParams } from './task/$task'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: taskStyles,
    },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserId(request)

  const tasks = await db.task.findMany({
    where: {
      takesterId: user as string,
    },
  })

  return tasks
}

const TaskPage = () => {
  const tasks: TaskParams[] = useLoaderData()

  return (
    <div>
      <div className="bubbles" />
      <main>
        <h2>Here are your tasks</h2>
        <ul className="taskList">
          {tasks.map((task) => (
            <Link key={task.id} to={`/task/${task.id}`}>
              <li>{task.content}</li>
            </Link>
          ))}
        </ul>
      </main>

      <div className="newTask">
        <Link to="/task/new">
          <button>Add a new task</button>
        </Link>
      </div>
    </div>
  )
}

export default TaskPage
