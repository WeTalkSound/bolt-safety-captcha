import React from 'react'
import logo from './header-logo.png'

export default function Header() {
  return (
    <div style={{background:'#fff', padding: '15px'}} className="fixed-top text-center justify-content-center">
      <a href="/">
        <img src={ logo } alt="Bolt Protect" style={{ maxHeight: "40px" }} className="headerlogo d-flex img-fluid" />
      </a>
    </div>
  )
}