import React from 'react'
import './style.css'
function Button({text, onclick, blue}) {
  return (
    <div className={blue? "btn btn_blue": "btn"} onclick={onclick}>{text}</div>
  )
}

export default Button
