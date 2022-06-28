import { Button, Container, Nav, Navbar } from "react-bootstrap";
import {
  Routes,
  Route,
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";

import Login from "./Login"
import SignUp from "./SignUp";
import Books from "./Books";
import UserBookList from "./UserBookList";
import Calculate from "./Calculate";
import { useSelector } from "react-redux";
import ContactForm from "./ContactForm";
import showResults from "./showResults";

export default function RouterConfig() {

    const select=useSelector((state)=>state.bookReducer)
    

   function useAuth() {
    if (select.loggedInUser.username) {
      return true

  }else{
    return false
  }}
  function PrivateOutlet() {
    const location=useLocation()
    const auth = useAuth();
    return auth ? <Outlet/> : (<Navigate to="/" replace state={{from:location}} />);
  }
  

  return (
    <BrowserRouter>
      <Container>

        <Routes>
          <Route element={<PrivateOutlet/>}>
          <Route path="/books" element={<Books />} />
          <Route path="/mybooks" element={<UserBookList />} />
          </Route>
         <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<SignUp />} />
          <Route path="/eval" element={<Calculate/>}/>
          <Route path="/ContactForm" element={ <ContactForm onSubmit={showResults}/>} />

        </Routes>
      </Container>
    </BrowserRouter>
  );
}