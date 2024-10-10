import {useState} from 'react'
import Dropdown from '../components/Dropdown'

// use this later to filter
const DATA_TO_FILTER = [
  {id: 1, name: 'Katie', team: 'red'},
  {id: 2, name: 'Tony', team: 'green'},
  {id: 3, name: 'Amy', team: 'blue'},
  {id: 4, name: 'Andy', team: 'red'},
  {id: 5, name: 'Billy', team: 'green'},
  {id: 6, name: 'Pete', team: 'blue'},
]

// select option dropdown data
const OPTIONS = [
  {label: 'Red', value: 'red'},
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
]

const DropdownPage = () => {
  const [value, setValue] = useState(null)

  // Hardcoded Array.filter example-  Array.filter returns a NEW array with only the items that tested true
  let filteredData = DATA_TO_FILTER
  if (value?.value) {
    filteredData = DATA_TO_FILTER.filter(
      (student) => student.team === value.value
    )
  }

  //console.log(filteredData)

  const handleChange = (option) => {
    setValue(option)
  }

  const colorMap = {
    red: 'bg-red-500',
    green: 'bg-green-400',
    blue: 'bg-blue-500',
  }

  // `bg-${value?.value}-500`

  // value.value.toLowerCase()
  // more midterm hints
  const thingToCheck = 'I like chickens'
  const exampleChecker = thingToCheck.toLowerCase().includes('chickens')
  console.log(exampleChecker)

  return (
    <div>
      <h1 className="text-xl">{value?.label}</h1>
      <Dropdown options={OPTIONS} value={value} onChange={handleChange} />
      <h2 className={colorMap[value?.value]}>
        Students from {value?.label} team
      </h2>
      {filteredData.map((student) => {
        return <p key={student.id}>{student.name}</p>
      })}
    </div>
  )
}

export default DropdownPage
