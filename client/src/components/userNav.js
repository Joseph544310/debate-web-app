import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Navbar, Nav, NavLink } from 'react-bootstrap';
import './userNav.css'

const UserNav = (props) => {

  const [user, setUser] = useState('');

  useEffect(()=> {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/auth/user"
    }).then(res => {
      setUser(res.data.user.username);
    }).catch(err => console.log(err))
  }, [])
  
  const logout = () => {
    Axios({
      method: "DELETE",
      withCredentials: true,
      url: "http://localhost:5000/auth/logout"
    }).then(res => {
      props.history.push('/');
    }).catch(err => console.log(err));
  }

  return (
    <div>
        <Navbar collapseOnSelect bg='light' expand="lg">
          <Navbar.Brand href="#">Debate-App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavLink>{user}</NavLink>
            </Nav>
            <Nav className="ml-auto">
              <Button variant="danger" onClick={() => logout()}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

export default UserNav;