import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <h2>Home</h2>
            <ul>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/'>SignUp</Link></li>
                {/* <li><Link to='/books'>Books</Link></li>  */}
                {/* <li><Link to='/mybooks'>MyBooks</Link></li>    */}
            </ul>
        </>
    )
}

export default NavBar