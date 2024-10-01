import React from 'react'

const TodoItem = (props) => {
  const {todo, onDelete} = props

  const handleClick = () => {
    onDelete(todo.id)
  }
  return (
    <div>
      <h3>{todo.title}</h3>
      <button onClick={handleClick}>Delete</button>
    </div>
  )
}

export default TodoItem
