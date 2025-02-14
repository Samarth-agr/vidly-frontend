import React from 'react'
import {NavLink} from 'react-router-dom'
const NavBar = ({user}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4 p-2">
    <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Movie</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/customer">Customer</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
        </li>
        {!user &&
        <>
          <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        </>
        }
        {user &&
        <>
          <li className="nav-item">
          <NavLink className="nav-link" to="/profile">{user.name}</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">Logout</NavLink>
        </li>
        </>
        }
      </ul>
    </div>
  </div>
</nav>
  )
}

export default NavBar
