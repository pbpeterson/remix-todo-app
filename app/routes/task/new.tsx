import type { ActionFunction, LinksFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import newTaskStyles from '~/styles/newTask.css'
import { db } from '~/utils/db.server'
import { getUserId } from '~/utils/session.server'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: newTaskStyles,
    },
  ]
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const taskInput = formData.get('newTask') as string

  const user = await getUserId(request)

  const newTask = await db.task.create({
    data: {
      content: taskInput,
      takesterId: user as string,
      done: false,
    },
  })

  return redirect(`/task/${newTask.id}`)
}

const NewTask = () => {
  return (
    <div>
      <div className="bubbles" />
      <main>
        <h2>Add a new task</h2>
        <form method="post">
          <input
            type="text"
            name="newTask"
            placeholder="Input your task here"
          />
          <button type="submit">Add task</button>
        </form>
      </main>
    </div>
  )
}

export default NewTask
