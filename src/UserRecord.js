import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const UserRecord = () => {
    const UserRecord=useSelector((state)=>state.bookReducer)
  return (
    <>
    <Table striped bordered hover variant="dark" >
      <thead>

        <tr>
          <th>Username</th>
          <th>BookName</th>
          <th >Issued At</th>
          <th>Deposited At</th>
          <th>Fine </th>
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

export default UserRecord