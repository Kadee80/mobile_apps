import {useState} from 'react'
// import todocreate after handler
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
const App = () => {
  // all children components need access to this list or part of it.
  // app is the closest common parent to them all!
  const [todos, setTodos] = useState([])

  // event handler to pass to TodoCreate
  // need to take the title from TodoCreate
  const createTodo = (title) => {
    console.log('new todo with ', title)
    // AFTER createtodo is finished, update state here!
    // thisb is our first time updating an array, slightly more complex!
    /*NEVER EVER
    todos.push({id: 1, title: title})
     setTodos(todos) */
    // when array or object needs updating in state,
    // we need to be very careful to do it the react way
    // create a new array,
    // copy all existing elements in that array
    // add in new item at the end!
    const updatedTodos = [
      ...todos,
      // key and value match for title, so we can condense it like this
      //{id: 123, title: title}
      // NEW: Unique IDS
      // math.random, with math.round
      {id: Math.round(Math.random() * 9999999), title},
    ]
    setTodos(updatedTodos)
  }

  const deleteTodoById = (id) => {
    // go tthrough array, find the one with the matching ID and delete it!
    // array.filter does not mutate the array, it returns an updated one that only contains the
    // elements that passed our truthy test!
    // const updatedTodos = todos.filter(() => {})

    const updatedTodos = todos.filter((todo) => {
      // return truthy keeps, falsey removes!
      return todo.id !== id
    })

    setTodos(updatedTodos)
  }

  // LAST EDIT need the ID of the todo being edited AND the new title from the form!
  const editTodoById = (id, newTitle) => {
    const updatedTodos = todos.map((todo) => {
      // we only care about updating the one that matches the ID
      if (todo.id === id) {
        // we copy the old values, then overwrite the title
        return {...todo, title: newTitle}
      }
      // otherwise return the unaltered todo
      return todo
    })
    // set our state, NOW WE NEED TO PASS IT ALL THE WAY DOWN
    setTodos(updatedTodos)
  }
  return (
    <div>
      <TodoCreate onCreate={createTodo} />
      {/* Now that we have state, pass it to the list to map! */}
      {/* DELETE function added, pass it down */}
      <TodoList todos={todos} onDelete={deleteTodoById} onEdit={editTodoById} />
    </div>
  )
}

export default App
