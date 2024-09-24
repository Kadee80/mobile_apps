import {useState} from 'react'

const SearchBar = (props) => {
  const {onSubmit} = props
  const [term, setTerm] = useState('')

  const handleChange = (event) => {
    setTerm(event.target.value)
  }

  const handleFormSubmit = (event) => {
    // disable the form input collection (built into html)
    event.preventDefault()
    onSubmit(term)
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" onChange={handleChange} value={term} />
      </form>
    </div>
  )
}

export default SearchBar
