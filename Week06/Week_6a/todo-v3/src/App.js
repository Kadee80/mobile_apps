import {useEffect} from 'react'
import useTodoContext from './hooks/use-todo-context'

import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'

const App = () => {
  // believe it or not,fetchTodos is the the only item we need from context in App
  const {fetchTodos} = useTodoContext()
  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <div>
      <TodoCreate />
      <TodoList />
    </div>
  )
}

export default App
