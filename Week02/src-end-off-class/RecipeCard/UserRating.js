import {useState} from 'react'
// you might come across the use of useState() like this in the wild
// import React from 'react'
// React.useState()
// this is the library we installed, we are importing the favorite.svg as a react component
// RENamed to heart
import {ReactComponent as Heart} from '@material-design-icons/svg/filled/favorite.svg'

export default function UserRating() {
  const [count, setCount] = useState(0)

  const handlePlusClick = () => {
    if (count < 5) {
      setCount(count + 1)
    }
    return
  }

  const handleMinusClick = () => {
    if (count > 0) {
      setCount(count - 1)
    }
    return
  }

  return (
    <div>
      <button onClick={handleMinusClick}>[-]</button>
      <span>
        {/* {count} */}
        {[...Array(count)].map((heart, i) => {
          return (
            <span key="i">
              <Heart />
            </span>
          )
        })}
      </span>
      <button onClick={handlePlusClick}>[+]</button>
    </div>
  )
}
