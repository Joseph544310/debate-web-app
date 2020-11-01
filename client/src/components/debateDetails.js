import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Card, Button, ListGroup} from 'react-bootstrap'
import Axios from 'axios'
import './debateDetails.css'

const DebateDetails = props => {

    const [debate, setDebate] = useState(false)
    const [sides, setSides] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [votedSide, setVotedSide] = useState(false);
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
            setSides(res.data.sides);
            console.log(res.data)
            setVotedSide(res.data.votedSide);
        }).catch(err => console.log(err));

        // Get comments
        Axios({
            method: 'GET',
            withCredentials: true,
            url: `http://localhost:5000/debates/${id}/comments`
        }).then( res => {
            setComments(res.data.comments)
        }).catch(err => console.log(err));
    }, [id])

    const createComment = (event) => {
        event.preventDefault();
        Axios({
            method: 'POST',
            data: {
                content: commentContent
            },
            withCredentials: true,
            url: `http://localhost:5000/debates/${id}/comments`
        }).then( res => {
            setComments([...comments, res.data.comment]);
        }).catch( err => console.log(err));
    }

    const castVote = (side_id) => {
        Axios({
            method: 'POST',
            withCredentials: true,
            url: `http://localhost:5000/debates/${id}/sides/${side_id}/vote`
        }).then( res => {
            setVotedSide(side_id);
        }).catch(err => console.log(err));
    }

    return (
        <Card>
            <Card.Header>{debate?debate.title:null}</Card.Header>
            <Card.Body>
                {sides.map(side => {
                    return (
                        <Card key={side._id} className={side._id===votedSide?"voted":"notVoted"}>
                            <Card.Title>{side.name}</Card.Title>
                            <Button variant='primary' onClick = { () => castVote(side._id)}>Support</Button>
                        </Card>
                    );
                })}
                <ListGroup variant="flush">
                    {comments.map(comment => {
                        return (
                            <ListGroup.Item key={comment._id}>{comment.author.username}: {comment.content}</ListGroup.Item>
                        );
                    })}
                </ListGroup>
                <form onSubmit={createComment}>
                    <input type='text' onChange={e => setCommentContent(e.target.value)} value={commentContent}/>
                    <input className="btn btn-success" type='submit' value='Add Comment'/>
                </form>
            </Card.Body>
        </Card>
    );
}

export default DebateDetails;