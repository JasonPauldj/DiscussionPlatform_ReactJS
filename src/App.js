import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import FeedPage from './Pages/FeedPage';
import { fetchUserBasedOnJWT, fetchJWT, removeJWT, fetchCategories, fetchFeed } from './Utils';
import SignUpPage from './Pages/SignUpPage';
import QuestionPage from './Pages/QuestionPage';
import AnswerPage from './Pages/AnswerPage';
import ProfilePage from './Pages/ProfilePage';
import CategoryModal from './Components/CategoryModal';
import './Background.scss';


function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [categories, setCategories] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);

  //feed page
  // const [feed, setFeed] = useState(null);

  //questionModal
  // const [showQuestionModal, setShowQuestionModal] = useState(false);

  const [showNewCategoryModal, setShowCategoryModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /**
   * User opens the app. Do we already have the userLoggedIn
   * 
   */
  useEffect(() => {
    const jwt_token = fetchJWT();

    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(categories)
      }
      catch (err) {
        console.log("Err ", err);
      }
    }

    getCategories().then(() => {
      //if jwtExists in sessionStore then we have to try to fetch the user
      if (jwt_token) {
        fetchUserBasedOnJWT(jwt_token).then((user) => {
          setLoggedInUser(user);
          setIsUserLoggedIn(true);
          if (user.role === 'ADMIN') {
            console.log("SETTING USER TO ADMIN");
            setIsUserAdmin(true);
          }
          else {
            console.log("NOT SETTING USER TO ADMIN");
          }
        }).catch(() => {
          setIsUserLoggedIn(false);
          setLoggedInUser(null);
          setIsUserAdmin(false);
          setRedirectUrl(null);
          removeJWT();
        });
      }
      else {
        console.log("DIDN'T FIND JWT TOKEN");
        setIsUserLoggedIn(false);
        setLoggedInUser(null);
        setRedirectUrl(null);
        setIsUserAdmin(false);
      }
    })

  }, []);

  //fetch the categories for the application
  // useEffect(() => {
  //   fetchCategories().then((fetchedCategories) => {
  //     setCategories(fetchedCategories);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }, []);

  //if User is logged in - fetch relevant feed
  // useEffect(() => {
  //   if (loggedInUser) {
  //     fetchFeed().then((feedItems) => {
  //       setFeed(feedItems);
  //     }).catch((err) => {
  //       console.log("There is an err in Fetching Feed " + err);
  //       setFeed(null)
  //     })
  //   }
  // else {
  //   navigate("/login");
  // }

  // }, [loggedInUser])

  const handleAuthentication = (isSuccesfulLogin) => {
    if (isSuccesfulLogin) {
      fetchUserBasedOnJWT(fetchJWT()).then((user) => {
        setLoggedInUser(user);
        setIsUserLoggedIn(true)
      }).catch(() => {
        setIsUserLoggedIn(false);
        setLoggedInUser(null);
        setRedirectUrl(null);
        setIsUserAdmin(false);
      });
    }
    else {
      setIsUserLoggedIn(false);
      setLoggedInUser(null);
      setRedirectUrl(null);
      setIsUserAdmin(false);
    }

  }

  const handleLogoutBtn = (event) => {
    removeJWT();
    setIsUserLoggedIn(false);
    setLoggedInUser(null);
    setRedirectUrl(null);
    setIsUserAdmin(false);
    navigate("/login");
  }


  const handleMyProfileClick = (event) => {
    navigate("/profile");
  }

  const handleProfileUpdate = (user) => {
    setLoggedInUser(user);
  }

  const handleNewCategoryClick = () => {
    setShowCategoryModal(true);
  }

  return (
    <div className='dark-bg vh-100 overflow-auto'>
      {showNewCategoryModal && (<CategoryModal show={showNewCategoryModal} onHide={() => setShowCategoryModal(false)} />)}
        <Navbar className='light-bg' expand="lg">
          <Container>
            <Link className='text-decoration-none fw-bolder dark-txt-color fs-2 me-2' to={'/'}>Forum</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"> 
              <Nav className="my-nav">
                {/* {(isUserLoggedIn) && <Button variant='light' onClick={handleNewQuestionClick}> New Question</Button>} */}
                {(isUserLoggedIn) && <Button className='dark-txt-color light-bg btn-hover-light' onClick={handleMyProfileClick}> My Profile</Button>}
                {(isUserLoggedIn && isUserAdmin) && <Button className='dark-txt-color light-bg btn-hover-light' onClick={handleNewCategoryClick}> Add New Category</Button>}
                {isUserLoggedIn && <Button className='dark-txt-color light-bg btn-hover-light ' onClick={handleLogoutBtn}>LOGOUT</Button>}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      <Routes>
        <Route exact path={"/"} element={
          <FeedPage isUserLoggedIn={isUserLoggedIn} user={loggedInUser} setRedirectUrl={setRedirectUrl} categories={categories}
          />
        } />
        <Route exact path={"/login"} element={
          <LoginPage handleAuthentication={handleAuthentication} isUserLoggedIn={isUserLoggedIn} redirectUrl={redirectUrl} />
        } />
        <Route exact path={"/signup"} element={
          <SignUpPage handleAuthentication={handleAuthentication} isUserLoggedIn={isUserLoggedIn} categories={categories} />
        } />
        <Route exact path={"/question/:questionId"} element={
          <QuestionPage user={loggedInUser} setRedirectUrl={setRedirectUrl} />
        } />
        <Route exact path={"/answer/:answerId"} element={
          <AnswerPage user={loggedInUser} setRedirectUrl={setRedirectUrl} />
        } />
        <Route exact path={"/profile"} element={
          <ProfilePage user={loggedInUser} categories={categories} handleProfileUpdate={handleProfileUpdate} isUserLoggedIn={isUserLoggedIn} setRedirectUrl={setRedirectUrl} />
        } />
      </Routes>
    </div>
  );
}

export default App;
