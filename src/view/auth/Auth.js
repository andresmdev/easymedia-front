/* eslint-disable no-useless-escape */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, FormGroup, Input, Label, Button, Spinner } from 'reactstrap';
import { loginUserData } from './../../api/request';
import { AuthContext } from "../../context/AuthContext";

export default function Auth() {
  const { signIn } = useContext(AuthContext);
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    setLoading(true);
  
    if(String(email).trim() === "") {
      setError(true);
      setErrorMessage('Email is required');
    }
    else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError(true);
      setErrorMessage('Email is invalid');
    }
    else if(String(password).trim() === "") {
      setError(true);
      setErrorMessage('Password is required');
    }
    else {
      setError(false);
      setErrorMessage("");

      const data = {
        "email": email,
        "password": password,
      }

      const result = await loginUserData(data);

      if(result.success === true) {
        setError(false);
        setErrorMessage("");

        signIn(result.data);
      }
      else {
        setError(true);
        setErrorMessage(result.message);
      }
    }

    setLoading(false);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      loginUser();
    }
  }

  return (
    <>
      <Container>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '25px',
        }}>
          <div style={{
            padding: "25px",
            border: "1px rgb(255, 255, 255)",
            borderRadius: "50%",
            borderStyle: "dashed",
            borderWidth: "medium"
          }}>
            <img 
              alt=""
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
              }}
              src={require('./../../assets/images/typing.jpg')} />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            marginTop: '15px',
            fontWeight: 'bold',
            color: "#fff"
          }}>Easy Media</h1>

          <span style={{
            marginTop: '15px',
            color: "#57bbdb"
          }}> Now, share us easy </span>

          <br />
          
          <span style={{
            color: "#fff",
            fontSize: "18px",
          }}> Sign In </span>
        </div>

        <div style={{
          marginTop: '25px',
        }}>
          <FormGroup>
            <Label className="labelStyle" for="email">
              Email
            </Label>
            <Input
              value={email}
              className='inputStyle'
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label className="labelStyle" for="password">
              Password
            </Label>
            <Input
              value={password}
              className='inputStyle'
              type="password"
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          {
            loading ? <div className='text-center'>
              <Spinner style={{ color : "#57bbdb" }} />
            </div> : 
            <>
              <Button
                style={{
                  marginTop: '25px',
                  width: '100%',
                  borderRadius: '25px',
                  border: 'none',
                }}
                className='gradient'
                onClick={() => loginUser()}>
                SIGN UP
              </Button>
            </>
          }

          <div>
            {
              error && <div style={{
                textAlign: 'center',
                marginTop: '5px',
                fontSize: '14px',
              }}>
                <span style={{
                  color: "#ff0000"
                }}> {errorMessage} </span>
              </div>
            }
          </div>
        </div>

        <div style={{
          marginTop: '5px',
          textAlign: 'right',
          marginBottom: '25px',
        }}>
          <span style={{color: "#b7b7b7"}}>Don't you have an account? </span>
          <Link to="/register">
            <span style={{
              color: "#57bbdb"
            }}> Sign Up </span>
          </Link>
        </div>


      </Container>
    </>
  );
}
