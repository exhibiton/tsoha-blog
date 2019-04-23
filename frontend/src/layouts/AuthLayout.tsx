import React from 'react'
import Header from 'src/components/Header'

export const PageLayout: React.SFC<{}> = ({ children }) => (
  <div>
    <Header />
    <div className="children">{children}</div>
  </div>
)
export default PageLayout
