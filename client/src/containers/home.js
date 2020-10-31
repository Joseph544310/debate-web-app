import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CreateDebateForm from '../components/createDebateForm'
import DebateSummary from '../components/debateSummary'

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
    <div className="Home">
		  <h1>Hello</h1>
      {debates.map( debate => <DebateSummary key={debate._id} debate={debate}/>)}
      <CreateDebateForm/>
      <div>
        <Button variant="danger" onClick={() => logout()}>Logout</Button>
			</div>
      
    </div>
  );
}

export default Home;