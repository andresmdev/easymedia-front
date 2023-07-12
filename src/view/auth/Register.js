/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, FormGroup, Input, Label, Button, Spinner } from 'reactstrap';
import { registerUserData } from './../../api/request';

export default function Register() {
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const registerData = async () => {
    setLoading(true);

    if(String(name).trim() === "") {
      setError(true);
      setErrorMessage('Name is required');
    }
    else if(String(email).trim() === "") {
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
    else if(String(password2).trim() === "") {
      setError(true);
      setErrorMessage('Password is required');
    }
    else if(String(password).trim().length < 8) {
      setError(true);
      setErrorMessage('Password must be at least 8 characters');
    }
    else if (password !== password2) {
      setError(true);
      setErrorMessage('Password not match');
    }
    else {
      setError(false);
      setErrorMessage("");

      const data = {
        "name": name,
        "email": email,
        "password": password,
      }

      const result = await registerUserData(data);

      if(result.success === true) {
        setError(false);
        setErrorMessage("");
        setName("");
        setEmail("");
        setPassword("");
        setPassword2("");
      }
      else {
        setError(true);
        setErrorMessage(result.message);
      }
    }

    setLoading(false);
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
                width: '64px',
                height: '64px',
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
              Full Name
            </Label>
            <Input
              value={name}
              className='inputStyle'
              type="text"
              onChange={(val) => setName(val.target.value)}
            />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label className="labelStyle" for="email">
              Email
            </Label>
            <Input
              value={email}
              className='inputStyle'
              type="email"
              onChange={(val) => setEmail(val.target.value)}
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
              onChange={(val) => setPassword(val.target.value)}
            />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label className="labelStyle" for="password">
              Confirm Password
            </Label>
            <Input
              value={password2}
              className='inputStyle'
              type="password"
              onChange={(val) => setPassword2(val.target.value)}
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
                onClick={() => registerData()}>
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
          <span style={{color: "#b7b7b7"}}>Already have an accout</span>
          <Link to="/">
            <span style={{
              color: "#57bbdb"
            }}> Login </span>
          </Link>
        </div>


      </Container>
    </>
  );
}
