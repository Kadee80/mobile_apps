import {useState} from 'react'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'

const App = () => {
  const [todos, setTodos] = useState([])

  const createTodo = (title) => {
    // console.log('creating todo: ', title)
    // NO NON NO NEVER
    // todos.push({id: 1, title: 'blah'})
    // we need to make a new copy of our todo array,
    // and then add our new todo object at the end
    const updatedTodos = [
      ...todos,
      // when the key and value are identical, you can just sat the key once
      {id: Math.round(Math.random() * 999999), title},
    ]
    setTodos(updatedTodos)
  }

  const deleteTodoById = (id) => {
    //TODO
  }
  return (
    <div>
      {todos.length}
      <TodoCreate onCreate={createTodo} />
      <TodoList todos={todos} onDelete={deleteTodoById} />
    </div>
  )
}

export default App
