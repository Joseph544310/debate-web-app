import { useState } from 'react';
import Axios from 'axios';
import './authentication.css';

function Authentication(props) {
	const [page, setPage] = useState('login')
	const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  const reset = () => {
    setLoginUsername('');
    setLoginPassword('');
    setRegisterUsername('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    setErrorMessage('');
  }

	const login = (event) => {
    event.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:5000/auth/login"
    }).then(res => {
      if (res.data.message === "Success"){
        props.history.push('/home')
      }
      else {
        setErrorMessage(res.data.message)
      }
    }).catch(err => console.log(err));
	}

  const register = (event) => {
    event.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:5000/auth/register"
    }).then(res => {
      if (res.data.message === 'Success') {
        Axios({
          method: "POST",
          data: {
            username: registerUsername,
            password: registerPassword
          },
          withCredentials: true,
          url: "http://localhost:5000/auth/login"
        }).then(res => {
          if (res.data.message === "Success"){
            props.history.push('/home')
          }
          else {
            setErrorMessage(res.data.message)
          }
        }).catch(err => console.log(err));
      }
      else {
        setErrorMessage(res.data.message);
      }
    }).catch(err => console.log(err));
	}
	
  return (
    <div className="Auth">
      {page === 'login'?
      <div className="form-style-5">
        <h3>Login</h3>
        <form onSubmit={login}>
          <label htmlFor="username">Username</label>
          <input type='text' id='username' onChange={e => setLoginUsername(e.target.value)} value={loginUsername} required/>
          <label htmlFor="password">Password</label>
          <input type='password' id='password' onChange= {e => setLoginPassword(e.target.value)} value={loginPassword} required/>
          <input className="btn btn-success" type='submit' value='Login'/>
          <p>{errorMessage}</p>
          <a href="#login"
          onClick={() => {
            reset();
            setPage('register')
            }}
          >New user? Click here to Sign Up</a>
        </form>
      </div>
      
      :
      <div className="form-style-5">
        <h3>Register</h3>
        <form onSubmit={register}>
          <label htmlFor="username">Username</label>
          <input type='text' id='username' onChange={e => setRegisterUsername(e.target.value)} value={registerUsername} required/>
          <label htmlFor="password">Password</label>
          <input type='password' id='password' onChange= {e => setRegisterPassword(e.target.value)} value={registerPassword} required/>
          <label htmlFor="password2">Confirm Password</label>
          <input type='password' id='password2' onChange= {e => setRegisterConfirmPassword(e.target.value)} value={registerConfirmPassword} required/>
          <input className="btn btn-success" type='submit' value='Register'/>
          <p>{errorMessage}</p>
          <a href="#register"
          onClick={() => {
            reset();
            setPage('login')
          }}
          >Already registered? Click here to Sign In</a>
        </form>
      </div>

			}
    </div>
  );
}

export default Authentication;