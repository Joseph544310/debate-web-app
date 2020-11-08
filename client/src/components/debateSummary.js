import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Card} from 'react-bootstrap'
import Axios from 'axios'
import './debateSummary.css'

const DebateSummary = props => {

    const [sides, setSides] = useState([]);
    useEffect( () => {
        console.log(`/api/debates/${props.debate._id}/sides`)
        Axios({
            method: 'GET',
            withCredentials: true,
            url: `/api/debates/${props.debate._id}/sides`
        }).then( res => {
            console.log(res)
            setSides(res.data.sides)
        }).catch(err => console.log(err));
    }, [props.debate._id])

    return (
        <Card className="debateCard">
            <Card.Header>
                <Link to={`/debates/${props.debate._id}`}>{props.debate.title}</Link>
            </Card.Header>
            <Card.Body>
                {sides.map(side => {
                    return (
                        <Card key={side._id} className="sideCard">
                            <Card.Body>
                                <Card.Title>{side.name}</Card.Title>
                                <p>{side.votes.length}</p>
                            </Card.Body>      
                        </Card>
                    );
                })}
            </Card.Body>
        </Card>
    );
}

export default DebateSummary;