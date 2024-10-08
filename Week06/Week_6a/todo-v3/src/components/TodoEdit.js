import {useState} from 'react'
import useTodoContext from '../hooks/use-todo-context'

const TodoEdit = (props) => {
  const {todo, onSubmit} = props
  const [title, setTitle] = useState(todo.title)
  const {editTodoById} = useTodoContext()

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    editTodoById(todo.id, title)
    onSubmit()
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" onChange={handleChange} value={title} />
      <button>Update</button>
    </form>
  )
}

export default TodoEdit
