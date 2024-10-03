import TodoItem from './TodoItem'
const TodoList = (props) => {
  const {todos, onDelete, onEdit} = props

  // the list component is only responsible for mapping and passing props
  // we can use the todo.id for the key!
  const renderedTodos = todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
  ))
  return <div>{renderedTodos}</div>
}

export default TodoList
