/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spinner } from "reactstrap";
import { AuthContext } from "./context/AuthContext";
import { getToken, setToken, deleteToken } from './utils/token';
import { checkSession } from './api/request';

import Auth from './view/auth/Auth';
import Register from './view/auth/Register';
import Post from './view/post/Post';
import ViewAllPost from './view/post/ViewAllPost';
import ViewMyPost from './view/post/ViewMyPost';

const initialLoginState = {
  isLoading: true,
  isSignout: false,
  token: null,
}

const loginReducer = (prevState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        token: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        token: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        token: null,
        isLoading: false,
      };
  }
}

export default function App() {
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = {
    signIn: async data => {
      try {
        setToken('token', data);
      }
      catch (e) {
        console.log(e)
      }

      dispatch({ type: 'LOGIN', token: data });
    },
    signOut: () => {
      deleteToken('token')
      dispatch({ type: 'LOGOUT', token: null });
    },
  }

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    let userToken = null;
    const res = await checkSession();

    if (res.success === true) {
      userToken = getToken('token');
    } 
    else {
      userToken = null;
    }

    setToken('token', userToken);
    dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  };

  if (loginState.isLoading) {
    return (
      <div style={{
        position: 'absolute',
        display: 'block',
        top: '50%',
        left: '50%',
      }}>
        <Spinner style={{
          color: "#c646aa"
        }} />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <BrowserRouter>
        {
          loginState.token === null ?
            (
              <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Auth />} />
              </Routes>
            ) :
            (
              <Routes>
                <Route path="/" element={<Post />} />
                <Route path="/all-posts" element={<ViewAllPost />} />
                <Route path="/my-posts" element={<ViewMyPost />} />
                <Route path="/create-post" element={<Post />} />
                <Route path="*" element={<Post />} />
              </Routes>
            )
        }
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
