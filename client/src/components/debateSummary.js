import React, { useEffect, useState } from 'react'
import {Card} from 'react-bootstrap'
import Axios from 'axios'

const DebateSummary = props => {

    const [sides, setSides] = useState([]);
    useEffect( () => {
        console.log(`http://localhost:5000/debates/${props.debate._id}/sides`)
        Axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/debates/${props.debate._id}/sides`
        }).then( res => {
            console.log(res)
            setSides(res.data.sides)
        }).catch(err => console.log(err));
    }, [])

    return (
        <Card>
            <Card.Header>{props.debate.title}</Card.Header>
            <Card.Body>
                {sides.map(side => {
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