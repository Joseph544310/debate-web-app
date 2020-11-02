import { Container } from 'react-bootstrap';
import CreateDebateForm from '../components/createDebateForm';
import UserNav from '../components/userNav'

const CreateDebate = (props) => {

  return (
    <div>
      <Container>
        <UserNav {...props}/>
        <CreateDebateForm {...props}/>
      </Container>

    </div>
  );
}

export default CreateDebate;