import React from 'react'
import {Table} from 'react-bootstrap'
import { useSelector } from 'react-redux';

const UserBookList = () => {
    const userName = useSelector((state) => state.bookReducer.loggedInUser.username);
    console.log(userName)
    const userBooks = useSelector((state) => state.bookReducer.userBookList);
    console.log(userBooks)
    const CurrentUser=userBooks[[`${userName }`]]
    console.log(CurrentUser)
  return (
    <><h1>
        MyBooks
        <div>
        {CurrentUser.map((book,index)=>
        
        {  console.log(book)
            return(
            <ul key={index}>
                <li>{book}</li>
            </ul>
        )})}
        </div>
    </h1>
    </>
  )
}

export default UserBookList