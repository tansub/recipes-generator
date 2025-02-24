import React from 'react'

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
        <div className='container mx-auto py-9'>
            {children}
        </div>
    </React.Fragment>
  )
}
