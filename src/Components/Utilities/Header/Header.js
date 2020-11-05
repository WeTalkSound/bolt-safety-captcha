import React from 'react'
import logo from './header-logo.png'

export default function Header({children}) {
  return (
    <div style={{background:'#fff', padding: '15px'}} className="fixed-top text-center justify-content-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6">
            <a href="/">
              <img src={ logo } alt="Bolt Protect" style={{ maxHeight: "40px" }} className="headerlogo d-flex img-fluid" />
            </a>
          </div>
          <div className="col-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}