import React from 'react'
import './Button.css'
import { Link } from "react-router-dom"

export default function Button({ type=undefined, linkTo=undefined, onClick=undefined, href=undefined, ...props }) {
  type = type ?? 'primary'
  let RenderedButton = null
  switch (true) {
    case linkTo !== undefined:
      RenderedButton = (
        <Link className={`btn btn-${type}`} to={linkTo} {...props}>
          {props.children}
        </Link>
      )
      break;
    case href !== undefined:
      RenderedButton = (
        <a className={`btn btn-${type}`} target="_blank" rel="noopener noreferrer" href={href} {...props}>
          {props.children}
        </a>
      )
      break;
  
    default:
      RenderedButton = (
        <button className={`btn btn-${type}`} onClick={onClick} {...props}>
          {props.children}
        </button>
      )
      break;
  }
  return (
    <>
      {RenderedButton}
    </>
  )
}