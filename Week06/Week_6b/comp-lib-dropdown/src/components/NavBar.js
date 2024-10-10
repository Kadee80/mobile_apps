import cx from 'classnames'
import {NavLink} from 'react-router-dom'

// IMPORTANT: Links to prop needs the '/path'
const NavBar = () => {
  let isActive
  const classes = cx('text-blue-500', {'font-bold decoration-solid': isActive})
  return (
    <nav className="sticky top-0 overflow-y-scroll flex flex-col item-start">
      <NavLink to="/" className={classes}>
        Buttons
      </NavLink>
      <NavLink to="/accordion" className={classes}>
        Accordion
      </NavLink>
      <NavLink to="/modal" className={classes}>
        Modal
      </NavLink>
      <NavLink to="/dropdown" className={classes}>
        Dropdown
      </NavLink>
    </nav>
  )
}

export default NavBar
