import React from 'react'
import FooterBase from './FooterBase'

function Base({ title=" new  Techonology",description="we are start a great new techology  ", changeButton="true" ,children }) {
  return (
    <div>
        {title}/{description}
        <p>have new techonology create a new daba  restorent  </p> 
        <button type="submit">{ changeButton && <p>click me </p>} </button>
        <FooterBase/>
    </div>
  )
}

export default Base