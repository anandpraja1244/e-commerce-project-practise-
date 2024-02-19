import React from 'react'
import Base from '../Component/users/Base'

function About( {changeButton}) {
  return (
 
       <Base  changeButton="true"> 
             <h4 className='text-dark '> 444444444444444safasf adasd afasf sdg</h4>
             <button> {changeButton && <p>subscribe</p> } </button>
        </Base>
    
      
       
  )
}

export default About