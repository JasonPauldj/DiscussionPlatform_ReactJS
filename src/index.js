import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FeedPage from './Pages/FeedPage';
import QuestionPage from './Pages/QuestionPage';
import ErrorPage from './Pages/ErrorPage';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AnswerPage from './Pages/AnswerPage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import { profileUpdateAction } from './Components/MyProfile';
import { Provider } from 'react-redux';
import {store} from './app/store';
import SignUpPage from './Pages/SignUpPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/feed",
        element: <FeedPage />
      },
      {
        path: "/question/:questionId",
        element: <QuestionPage />
      },
      {
        path: "/answer/:answerId",
        element: <AnswerPage />
      },
      {
        path: "/signup",
        element: <SignUpPage />
      },
      {
        path : "/login",
        element : <LoginPage />
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        action: profileUpdateAction
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //  <BrowserRouter>
  //    <App />
  // </BrowserRouter>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
