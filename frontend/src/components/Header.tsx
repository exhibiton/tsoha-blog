import React from 'react'
import logo from '../assets/logo.svg'
import './Header.css'

const Header: React.SFC<{}> = () => (
  <div className="container">
    <img src={logo} />
    <div className="login-button">LOG IN</div>
  </div>
)

export default Header
