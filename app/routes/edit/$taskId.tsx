import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import editTaskStyle from '~/styles/editTask.css'
import { db } from '~/utils/db.server'

type TaskParams = {
  content: string
  createdAt: string
  id: string
}

export const links: LinksFunction = () => {
  return [
    {
      href: editTaskStyle,
      rel: 'stylesheet',
    },
  ]
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()
  const inputTask = formData.get('taskEdition')
  const taskId = params.taskId

  await db.task.update({
    data: {
      content: inputTask as string,
    },
    where: {
      id: taskId,
    },
  })
  return redirect(`/task/${taskId}`)
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
          <strong>Edit your task!</strong>
        </h2>
        <form method="post">
          <input defaultValue={task.content} type="text" name="taskEdition" />
          <button type="submit" value={'finishTask'}>
            Finish task
          </button>
        </form>
      </main>
    </div>
  )
}

export default Task
