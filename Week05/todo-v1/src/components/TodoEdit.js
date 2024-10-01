import {useState} from 'react'
const TodoEdit = (props) => {
  //  FIRST PASS USE OnEDIT
  // const {todo, onEdit} = props

  // LAST use onSubmit instead after updating TodoItem
  const {todo, onSubmit} = props

  // make form, bind input, THEN when its working update default state
  // todoedit needs our todo as a prop
  const [title, setTitle] = useState(todo.title)

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  // DO FIRST, Then remove in favor of onSubmit fromm parent
  /*
  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log('new title is: ', title)
    // OK we need to define the real state updater all the way back up at APP
    // NOTE title here is from the form input


    onEdit(todo.id, title)


    // still missing a feature, hide the TodoEdit on save, now we need to do 2 things here
  }
*/

  // FINAL Edit the TODO and Close the Form we have an OnEdit and OnSubmit,
  // this might get confusing to another dev on the project, whats the differce? they are both called on Submit
  // GO TO TodoITEM HANDLESUBMIT definition and pass it here as onSubmit
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(todo.id, title)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" onChange={handleChange} value={title} />
      <button>Update</button>
    </form>
  )
}

export default TodoEdit
