import React from 'react'
import { useState } from 'react'

const Signup = () => {
    const [ name , setName ] = useState('');
    const [ email , setEmail ] = useState('');
    const [ password , setPassword ] = useState('');


    function handleSubmit(e){
        e.preventDefault();
        console.log(name,email,password);
        
    }



  return (
    <>
      <form onSubmit={handleSubmit} className='flex justify-center items-center border-2 h-[100%]'>
        <input type="text" value={name} placeholder='Enter Your FirstName' onChange={(e) => setName(e.target.value)} />
        <input type="email" value={email} placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder='Enter Your password' onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default Signup