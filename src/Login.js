import React, { useState } from 'react'
import { useLocation, useNavigate,Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const users = useSelector((state) => state.bookReducer.users)
  const loggedInUser=useSelector((state) => state.bookReducer.loggedInUser)
  const history = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const login = () => {
    if(location.state?.from){
      history(location.state.from)
    }

    // const users=useSelector(state=>state.users)
    const payload = users.find(user => user.username === username && user.password === password)
    // const payload2=loggedInUser.find(user=>user.username===username)
    // if(payload2){
    //   alert('Already logged In')
    // }
     if (payload) {
      dispatch({
        type: 'login',
        payload
      })
      setUsername('');
      setPassword('');
      history('/books')
    }
    
    else (
      alert('Wrong Credentials')
    )
  }

  return (<>
    <form>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="button" value="Login" onClick={login} />
    </form>
    <p>Not Registered yet?
    <nav><Link to='/' >Register</Link></nav></p>
    </>
  )
}

export default Login