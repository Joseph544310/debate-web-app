import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import Axios from 'axios'

const DebateDetails = props => {

    const [debate, setDebate] = useState(false)
    const [sides, setSides] = useState([]);
    const {id} = useParams();

    useEffect( () => {
        //Get debate
        Axios({
            method: "GET",
            withCredentials: true,
            url: `http://localhost:5000/debates/${id}`
          }).then(res => {
            setDebate(res.data.debate);
          }).catch(err => console.log(err))
        // Get sides
        Axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/debates/${id}/sides`
        }).then( res => {
            setSides(res.data.sides)
        }).catch(err => console.log(err));
    }, [id])

    return (
        <Card>
            <Card.Header>{debate?debate.title:null}</Card.Header>
            <Card.Body>
                {sides.map(side => {
                    return (
                        <Card key={side._id}>
                            <Card.Title>{side.name}</Card.Title>
                            <Button variant='primary'>Support</Button>
                        </Card>
                    );
                })}
            </Card.Body>
            <p>Comments section goes here</p>
        </Card>
    );
}

export default DebateDetails;