import React, { usestate, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {
  
  logout,
  buyBook1,
  returnBook1
} from './Redux/Actions'
import { Link } from 'react-router-dom'

const Books = () => {

  useEffect(() => {
    // localStorage.clear()
  }, [])

  const books = useSelector((state) => state.bookReducer);


  const userId1 = books.loggedInUser.username

  const dispatch = useDispatch();

  const abc = (id) => {
    let newArr = books.books.filter((elem) => elem.id === id)
    function bookFind(book) {
      return book === newArr[0].name

    }

    const newBook = books.userBookList[[`${userId1}`]].find(bookFind)
    // console.log(newBook)

    if (newBook) {
      alert('Already Issued')
    }
    else if (newArr[0].quantity < 1) {
      alert('Not Available')
    }
    else if (books.userBookList[[`${userId1}`]].length > 1) {
      alert('Cannot Issue more than 2')
    }
    else {
      dispatch(buyBook1({ userId: "user2", data: newArr }))
    }
  }
  const efg = (id) => {
    let newArrr2 = books.books.filter((elem) => elem.id === id)
    function bookFind(book) {
      return book === newArrr2[0].name
    }
    const bookIndex = books.userBookList[[`${userId1}`]].findIndex(bookFind)

    let d1 = new Date()
    const time1 = d1.getHours() + ':' + d1.getMinutes() + ':' + d1.getSeconds()



    var result = books.UserRecord.find(obj => {
      return obj.username === books.loggedInUser.username && obj.books === newArrr2[0].name && obj.DepositedAt === ''
    })
    
    console.log(result)
    const IssuedTime = result.IssuedAt
    
    const IssuedTimeParts = IssuedTime.split(':');
    const CIT = (+IssuedTimeParts[0] * (60000 * 60)) + (+IssuedTimeParts[1] * 60000) + (+IssuedTimeParts[2] * 1000)
    
    const DepositedTime = time1
    const DepositedTimeParts = DepositedTime.split(':');
    const CDT = (+DepositedTimeParts[0] * (60000 * 60)) + (+DepositedTimeParts[1] * 60000) + (+DepositedTimeParts[2] * 1000)
    
    const TimeGap = CDT - CIT
    
    const FineTime = TimeGap / 3600000

    const ParsedFineTime = parseInt(FineTime)
    

    let Fine = 0
   
    if (ParsedFineTime > 1) {
      console.log('dfg')
      Fine = Fine + 5 * ParsedFineTime
      console.log(Fine)
      dispatch(returnBook1({ userId: 'user2', data: newArrr2, fine: Fine }))


    }

    else if (ParsedFineTime > 5 ) {
      Fine = Fine + 5 * ParsedFineTime + (ParsedFineTime - 5) * 10
      dispatch(returnBook1({ userId: 'user2', data: newArrr2, fine: Fine }))
   }
   else if (ParsedFineTime > 10) {
    Fine = Fine + 5 * ParsedFineTime + (ParsedFineTime - 5) * 10+(ParsedFineTime-10)*20
    dispatch(returnBook1({ userId: 'user2', data: newArrr2, fine: Fine }))
   }
   else if(ParsedFineTime > 24){
     alert('Pass Cancelled')
   }
  if (bookIndex !== -1) {
     dispatch(returnBook1({ userId: 'user2', data: newArrr2, fine: Fine }))
   }
  else {
      alert(' not Bought')
    }
  }

  return (
    <>
      <Table striped bordered hover variant="dark" >
        <thead>

          <tr>
            <th>S.NO</th>
            <th>Book Name</th>
            <th >Quantity</th>
            <th></th>
          </tr>

        </thead>
        <tbody>

          {books.books.map((item, index) => {
            return (<tr key={index}><td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => abc(item.id)}>Buy</button>
                <button onClick={() => efg(item.id)} >Return</button>

              </td></tr>)
          })}
        </tbody>
      </Table>
      <nav><Link to='/mybooks'>MyBooks</Link></nav>
      <button onClick={() => {
        dispatch(logout({}))
      }}>logout</button>
    </>

  )
}

export default Books;