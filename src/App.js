import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet } from "react-router-dom";
import { fetchUserBasedOnJWT, fetchJWT, removeJWT } from './Utils';
import CategoryModal from './Components/CategoryModal';
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, fetchCategory } from './features/categories/categorySlice';
import { login, logout } from './features/user/userSlice';
import './Background.scss';

function App() {
  console.log("RENDERING APP COMPONENT");

  const user = useSelector((state) => state.user.user);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(user ? true : false);
  const [isUserAdmin, setIsUserAdmin] = useState(user && user.role === 'ADMIN' ? true : false);
  const [loggedInUser, setLoggedInUser] = useState(user);

  const [showNewCategoryModal, setShowCategoryModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const navigateToLoginOrSignUp = () => {
    if (location.pathname === "/signup") {
      navigate(location.pathname);
    }
    else {
      navigate("/login");
    }
  }

  useEffect(() => {
    const jwt_token = fetchJWT();

    if (jwt_token) {
      let getLoggedInUserAndCategories = async () => {
        let loggedInUser = await fetchUserBasedOnJWT(jwt_token);
        dispatch(login(loggedInUser));
      }

      getLoggedInUserAndCategories().catch(() => {
        removeJWT();
        navigateToLoginOrSignUp();
      });
    }
    else {
      navigateToLoginOrSignUp();
    }
  }, [])

  useEffect(() => {
    if (user) {
      setLoggedInUser(user);
      setIsUserLoggedIn(user ? true : false);
      setIsUserAdmin(user && user.role === 'ADMIN' ? true : false);

      dispatch(fetchCategory());
    }

  }, [user]);

  const handleLogoutBtn = (event) => {
    removeJWT();
    setIsUserLoggedIn(false);
    setLoggedInUser(null);
    setIsUserAdmin(false);
    dispatch(logout())
    navigate("/login");
  }


  const handleMyProfileClick = () => {
    navigate("/profile");
  }

  const handleNewCategoryClick = () => {
    setShowCategoryModal(true);
  }

  const handleSuccessfulCategoryAdd = (nC) => {
    // setCategories(prevCategories => [...prevCategories, nC])
    dispatch(addCategory(nC));
  }

  return (
    <div className='dark-bg vh-100 overflow-auto'>
      {showNewCategoryModal && (<CategoryModal show={showNewCategoryModal} onHide={() => setShowCategoryModal(false)} handleSuccessfulCategoryAdd={handleSuccessfulCategoryAdd} />)}
      <Navbar className='light-bg' expand="lg">
        <Container>
          <Link className='text-decoration-none fw-bolder dark-txt-color fs-2 me-2' to={'/feed'}>Forum</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="my-nav">
              <div className='d-flex justify-content-start'>
                {(isUserLoggedIn) && <Button className='dark-txt-color light-bg btn-hover-light me-1' onClick={handleMyProfileClick}> My Profile</Button>}
                {(isUserLoggedIn && isUserAdmin) && <Button className='dark-txt-color light-bg btn-hover-light' onClick={handleNewCategoryClick}> New Category</Button>}
              </div>
              <div className='flex-grow-1 text-center dark-txt-color fs-4'>Welcome to Forum {(isUserLoggedIn) && `~ ${loggedInUser.firstName} ${loggedInUser.lastName}`}</div>
              <div className='d-flex justify-content-end'>
                {isUserLoggedIn && <Button className='dark-txt-color light-bg btn-hover-light ' onClick={handleLogoutBtn}>LOGOUT</Button>}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Outlet />
      </div>
      {/* <Routes> */}
      {/* <Route exact path={"/"} element={
          <FeedPage isUserLoggedIn={isUserLoggedIn} user={loggedInUser} setRedirectUrl={setRedirectUrl} categories={categories}
          />
        } /> */}
      {/* <Route exact path={"/login"} element={
          <LoginPage handleAuthentication={handleAuthentication} isUserLoggedIn={isUserLoggedIn} redirectUrl={redirectUrl} />
        } /> */}
      {/* <Route exact path={"/signup"} element={
          <SignUpPage handleAuthentication={handleAuthentication} isUserLoggedIn={isUserLoggedIn} categories={categories} />
        } /> */}
      {/* <Route exact path={"/question/:questionId"} element={
          <QuestionPage user={loggedInUser} setRedirectUrl={setRedirectUrl} />
        } /> */}
      {/* <Route exact path={"/answer/:answerId"} element={
          <AnswerPage user={loggedInUser} setRedirectUrl={setRedirectUrl} />
        } /> */}
      {/* <Route exact path={"/profile"} element={
          <ProfilePage user={loggedInUser} categories={categories} handleProfileUpdate={handleProfileUpdate} isUserLoggedIn={isUserLoggedIn} setRedirectUrl={setRedirectUrl} />
        } /> */}
      {/* </Routes> */}
    </div>
  );
}

export default App;
