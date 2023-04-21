import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import FeedPage from './Pages/FeedPage';
import {fetchUserBasedOnJWT, fetchJWT, removeJWT, fetchCategories }from './Utils';
import SignUpPage from './Pages/SignUpPage';


function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [categories, setCategories] = useState(null);

  /**
   * User opens the app. Do we already have the userLoggedIn
   * 
   */
  useEffect(() => {
    console.log("INSIDE USE EFFECT OF APP");
    const jwt_token = fetchJWT();

    //if jwtExists in sessionStore then we have to try to fetch the user
    if (jwt_token && jwt_token !== '') {
      console.log("FOUND JWT TOKEN");
      console.log(jwt_token);
      fetchUserBasedOnJWT(jwt_token).then((user) => {
        setLoggedInUser(user);
        setIsUserLoggedIn(true)
      }).catch(() => {
        setIsUserLoggedIn(false);
        setLoggedInUser(null);
      });
    }
    else {
      console.log("DIDN'T FIND JWT TOKEN");
      setIsUserLoggedIn(false);
      setLoggedInUser(null);
    }
  }, []);

  //fetch the categories for the application
  useEffect(() => {
    fetchCategories().then((fetchedCategories) => {
      setCategories(fetchedCategories);
    }).catch((err)=>{
      console.log(err);
    })
  }, [isUserLoggedIn]);

  const handleAuthentication = (isSuccesfulLogin) => {
    if(isSuccesfulLogin){
    fetchUserBasedOnJWT(fetchJWT()).then((user) => {
      setLoggedInUser(user);
      setIsUserLoggedIn(true)
    }).catch(() => {
      setIsUserLoggedIn(false);
      setLoggedInUser(null);
    });
  }
  else
  {
    setIsUserLoggedIn(false);
      setLoggedInUser(null);
  }

  }

  const handleLogoutBtn = (event) =>{
    removeJWT();
    setIsUserLoggedIn(false);
    setLoggedInUser(true);
  }


  return (<>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Discussion Platform</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="my-nav">
            <Nav.Link href="#home">New Question</Nav.Link>
            {(isUserLoggedIn) ? <Button onClick={handleLogoutBtn}>LOGOUT</Button> : <div></div>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route exact path={"/"} element={
        <FeedPage isUserLoggedIn={isUserLoggedIn} />
      } />
      <Route exact path={"/login"} element={
        <LoginPage handleAuthentication={handleAuthentication} isUserLoggedIn={isUserLoggedIn} />
      } />
      <Route exact path={"/signup"} element={
        <SignUpPage handleAuthentication={handleAuthentication} isUserLoggedIn={isUserLoggedIn} categories={categories}/>
      } />
    </Routes>
  </>
  );
}

export default App;
