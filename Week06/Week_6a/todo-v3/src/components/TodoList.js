import {useContext} from 'react'
import TodoContext from '../context/Todos'

import TodoItem from './TodoItem'

const TodoList = (props) => {
  const {todos, onDelete, onEdit} = props
  const message = useContext(TodoContext)
  const renderedTodos = todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
  ))
  return (
    <div>
      <h1>{message}</h1>
      {renderedTodos}
    </div>
  )
}

export default TodoList
