import Axios from 'axios';
import { Button } from 'react-bootstrap';

const Home = (props) => {
  
  const logout= () => {
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
      <div>
        <Button variant="danger" onClick={() => logout()}>Logout</Button>
			</div>
      
    </div>
  );
}

export default Home;