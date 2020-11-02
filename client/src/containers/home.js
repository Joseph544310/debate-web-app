import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CreateDebateForm from '../components/createDebateForm'
import DebateSummary from '../components/debateSummary'
import UserNav from '../components/userNav'

const Home = (props) => {

  const [debates, setDebates] = useState([]);

  useEffect(()=> {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/debates"
    }).then(res => {
      setDebates(res.data.debates);
    }).catch(err => console.log(err))
  }, [])
  
  return (
    <div className="Home">
      <Container>
        <UserNav {...props}/>
        <h1>Hello</h1>
        {debates.map( debate => <DebateSummary key={debate._id} debate={debate}/>)}
        <CreateDebateForm/>
      </Container>

    </div>
  );
}

export default Home;