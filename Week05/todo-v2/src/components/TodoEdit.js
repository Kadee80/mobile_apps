import {useState} from 'react'
const TodoEdit = (props) => {
  //  FIRST PASS USE OnEDIT
  // const {todo, onEdit} = props

  // LAST use onSubmit instead after updating TodoItem
  const {todo, onSubmit} = props

  const [title, setTitle] = useState(todo.title)

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(todo.id, title)
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
