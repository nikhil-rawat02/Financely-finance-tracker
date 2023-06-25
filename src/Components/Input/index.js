import React from 'react'
import './style.css'
function index({ lable, state, setState, placeholder, type }) {
  return (
    <div className='input_wrapper'>
      <p className='input_wrapper_lable'>{lable}</p>
      <input className='custom_input'
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={(e) => { setState(e.target.value) }}
      />
    </div>
  )
}

export default index
