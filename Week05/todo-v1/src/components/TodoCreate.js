import {useState} from 'react'

const TodoCreate = (props) => {
  // 2) pass in onCreate prop
  const {onCreate} = props
  // 3) create state for input
  const [title, setTitle] = useState('')
  // 4) add event handler for onChange
  const handleChange = (event) => {
    setTitle(event.target.value)
  }
  // 7) add onSubmit handler and pass in onCreate prop
  // don't forget we need to interrupt default form submission behavior!
  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate(title)
    // 9) we want to clear out the form after its submitted
    // use our state setter
    setTitle('')
  }

  // 1) needs a label, input, and submit button!
  // we need to bind our input element which means this
  // component also needs state!
  return (
    // 8) pass handleSubmit to form
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      {/* 5) wire it up to state and handler */}
      <input type="text" onChange={handleChange} value={title} />
      {/* 6) clicking button or hitting enter key will trigger form submit */}
      <button>Add Todo</button>
    </form>
  )
}

export default TodoCreate
