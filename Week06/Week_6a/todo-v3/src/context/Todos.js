import axios from 'axios'
import {createContext, useState, useCallback} from 'react'
const TodoContext = createContext()

function Provider({children}) {
  const [todos, setTodos] = useState([])

  // MUCH more common, wrap the funciton in useCallback inline
  // useCallback memoizes fetchTodos one copy in memory and we always
  // reference the same slot in computer's memory so it SHOULD never update
  // unless there is something in the dependency array
  const fetchTodos = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/todos')
    setTodos(response.data)
  }, [])

  // not usually done in production but probably more clear
  // const stableFetchTodos = useCallback(fetchTodos, [])

  const createTodo = async (title) => {
    const response = await axios.post('http://localhost:3001/todos', {title})
    const updatedTodos = [...todos, response.data]
    setTodos(updatedTodos)
  }

  const editTodoById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/todos/${id}`, {
      title: newTitle,
    })

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {...todo, ...response.data}
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const deleteTodoById = async (id) => {
    await axios.delete(`http://localhost:3001/todos/${id}`)

    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(updatedTodos)
  }

  const contextValues = {
    todos,
    fetchTodos,
    createTodo,
    editTodoById,
    deleteTodoById,
  }

  return (
    <TodoContext.Provider value={contextValues}>
      {children}
    </TodoContext.Provider>
  )
}

export {Provider}
export default TodoContext

// import both in the same file
// import TodoContext, {Provider} from './*'
