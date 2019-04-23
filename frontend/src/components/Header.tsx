import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/logo.svg'
import './Header.css'

const Header: React.SFC<{}> = () => (
  <div className="container">
    <Link to="/">
      <img src={logo} />
    </Link>
    <div className="login-button">LOG IN</div>
  </div>
)

export default Header
