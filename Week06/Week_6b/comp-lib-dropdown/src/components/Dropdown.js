import {useState} from 'react'
import cx from 'classnames'
import {GoChevronDown} from 'react-icons/go'
const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const {options, value, onChange} = props

  const handleClick = () => {
    // technically, we should always be using functional updates for state
    // setIsOpen((currentIsOpen) => !currentIsOpen)
    // but this also works and you'll see this in examples a lot as well
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    // close the dropdown
    setIsOpen(false)
    onChange(option)
  }

  const renderedOptions = options.map((option) => {
    return (
      <div
        onClick={() => handleOptionClick(option)}
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        key={option.value}
      >
        {option.label}
      </div>
    )
  })

  // this is a little longer but super clear
  // let content = 'Select...'
  // if (value) {
  //   content = value.label
  // }
  // ternary condition ? thing to return if true :  thing to return if false
  const content = value ? value.label : 'Select...'

  return (
    <div className="w-48 relative">
      <Panel
        onClick={handleClick}
        className="flex justify-between items-center cursor-pointer"
      >
        {content}
        <GoChevronDown className="text-xl" />
      </Panel>
      {isOpen && (
        <Panel className="absolute top-full ">{renderedOptions}</Panel>
      )}
    </div>
  )
}

const Panel = ({children, className, ...otherProps}) => {
  return (
    <div
      {...otherProps}
      className={cx(className, 'border rounded p-3 shadow bg-white w-full')}
    >
      {children}
    </div>
  )
}

export {Panel}
export default Dropdown
