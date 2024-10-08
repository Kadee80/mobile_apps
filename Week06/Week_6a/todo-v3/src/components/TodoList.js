import useTodoContext from '../hooks/use-todo-context'

import TodoItem from './TodoItem'

const TodoList = () => {
  const {todos} = useTodoContext()
  const renderedTodos = todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} />
  ))
  return <div>{renderedTodos}</div>
}

export default TodoList
