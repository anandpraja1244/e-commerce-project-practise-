import React, { useContext } from 'react'
import { UseContext } from '../../Context/users.context'

function Home() {
  const usecontext = useContext(UseContext)
  // console.log('usecontext.', usecontext?.islogein)
  return (
    
    <div> 
      Home---  {/* {JSON.stringify(usecontext )} */}
        {usecontext?.userData?.user?.email}
   <div>
   Login---   {  usecontext?.islogein && usecontext?.islogein}
   </div>
      </div>
  )
}

export default Home