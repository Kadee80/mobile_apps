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
    // look at the array, find the matching id and remove it!
    // filter returns a copy of the array you are filtering through
    const updatedTodos = todos.filter((todo) => {
      // return thruthy keep, falsey chuck
      return todo.id !== id
    })
    setTodos(updatedTodos)
  }

  const editTodoById = (id, newTitle) => {
    const updatedTodos = todos.map((todo) => {
      // if the IDs match, this is the one to update
      if (todo.id === id) {
        // copy old values, then add new values
        return {...todo, title: newTitle}
      }
      // otherwise return the untouched todo
      return todo
    })
    // set our state here, and pass it all the way back down...
    setTodos(updatedTodos)
  }
  return (
    <div>
      {todos.length}
      <TodoCreate onCreate={createTodo} />
      <TodoList todos={todos} onDelete={deleteTodoById} onEdit={editTodoById} />
    </div>
  )
}

export default App
