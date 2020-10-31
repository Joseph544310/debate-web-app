import React, {useState} from 'react'
import Axios from 'axios';

const CreateDebateForm = props => {

  const [title, setTitle] = useState('');
  const [sidesCount, setSidesCount] = useState(2);
  const [sidesNames, setSidesNames] = useState(['', '']);

  const createDebate = event => {
    event.preventDefault();
    Axios({
      method: "POST",
      data: {
        title: title
      },
      withCredentials: true,
      url: 'http://localhost/debates'
    }).then( async (res) => {
      const id = res.data.id;
      const sidesUrl = `http://localhost/debates/${id}/sides`;

    }).catch(err => console.log(err))
  }

  const changeCountHandler = event => {
    setSidesCount(event.target.value);
    setSidesNames(new Array(event.target.value).fill(''));
  }

  return (
    <form onSubmit={createDebate}>
      <label htmlFor="title">Title</label>
      <input type='text' id='title' onChange={e => setTitle(e.target.value)} value={title} required/>
      <label htmlFor="sidesCount">Number of sides</label>
      <input type='number' min={2} max={10} onChange={changeCountHandler} value={sidesCount}/>
      {sidesNames.map( (sideName, index) => {
        return (
        <span key={index}>
          <label htmlFor={`side${index}`}>{`Side ${index + 1}`}</label>
          <input type='text' id={`side${index}`} onChange={e => {setSidesNames([])}} value={sideName} required/>
        </span>
        );
      })}
      <input className="btn btn-success" type='submit' value='Create'/>
    </form>
    );
} 

export default CreateDebateForm