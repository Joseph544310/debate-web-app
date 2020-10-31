import React, { useEffect, useState } from 'react'
import {Card} from 'react-bootstrap'
import Axios from 'axios'

const DebateSummary = props => {

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
                    console.log(side);
                    return (
                        <Card key={side._id}>
                            <Card.Body>
                                <Card.Title>{side.name}</Card.Title>
                            </Card.Body>      
                        </Card>
                    );
                })}
            </Card.Body>
        </Card>
    );
}

export default DebateSummary;