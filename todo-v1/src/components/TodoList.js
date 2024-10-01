import TodoItem from './TodoItem'

const TodoList = (props) => {
  const {todos, onDelete} = props

  const renderedContent = todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
  ))

  return <div>{renderedContent}</div>
}

export default TodoList
