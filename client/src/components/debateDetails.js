import React, { useEffect, useState } from 'react'
import {Card, Button} from 'react-bootstrap'
import Axios from 'axios'

const DebateDetails = props => {

    const [sides, setSides] = useState([]);
    useEffect( () => {
        Axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/debates/${props.debate._id}/sides`
        }).then( res => {
            setSides(res.data)
        }).catch(err => console.log(err));
    }, [props.debate._id])

    return (
        <Card>
            <Card.Header>{props.debate.title}</Card.Header>
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