import { Container } from 'react-bootstrap';
import DebateDetails from '../components/debateDetails';
import UserNav from '../components/userNav'

const Debate = (props) => {

  return (
    <div className="Debate">
      <Container>
        <UserNav {...props}/>
        <DebateDetails {...props}/>
      </Container>

    </div>
  );
}

export default Debate;