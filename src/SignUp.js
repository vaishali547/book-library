import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import{Link,useNavigate} from'react-router-dom'

// import  { registerUser } from './state/actions'

const SignUp= () => {
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const users=useSelector((state)=>state.bookReducer.users)
    const history=useNavigate()
    const dispatch=useDispatch();

    const register=()=>{
    const payload=users.find(user=>user.email===email)
     if(payload){
       alert('User Already Registered')
     } 
      else {dispatch({
          type:'Register',
          payload:{

              id:(new Date()).getTime(),
              username,email,password
              
            }
          })
          setUsername('');
          setEmail('');
          setPassword('');
          history('/login')
    }}
  return (
    <>
    <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/><br/>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
        <input type="button" value="register" onClick={register}/>
        
    </form><p>Already a member?
    <nav><Link to='/login' >Login</Link></nav></p>
    <nav><Link to='/eval' >CalculateFn</Link></nav>
    <nav><Link to='/ContactForm' >ContactForm</Link></nav>
    </>
  )
}

export default SignUp