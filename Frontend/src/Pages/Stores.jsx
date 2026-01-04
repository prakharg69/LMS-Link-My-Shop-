import React, { useState } from 'react'
import CreateStoreForm from '../Components/CreateStoreForm';

function Stores() {
  const [show,setShow] = useState(false);
  
  const CreateStoreHandle = ()=>{
      setShow(prev=> !prev);
  }
  return (

    <div className='h-full w-full flex flex-col relative'>
        <div className=' h-15 w-full p-2 border-b flex justify-between items-center px-4'> 
                <div><h1 className='text-2xl font-bold'>STORE</h1></div>
                <button className='bg-blue-100 p-2 rounded-[5px] ' onClick={CreateStoreHandle}>Create Store</button>
        </div>
        
        <div>


          
        </div>
        {show && <CreateStoreForm onClose={CreateStoreHandle} />}
    </div>
  )
}

export default Stores