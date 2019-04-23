import React from 'react'
import Header from '../components/Header'

export const CoreLayout: React.SFC<{}> = ({ children }) => (
  <div>
    <Header />
    <div className="children">{children}</div>
  </div>
)
export default CoreLayout
