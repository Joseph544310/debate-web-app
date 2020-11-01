import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Card, Button, ListGroup} from 'react-bootstrap'
import Axios from 'axios'

const DebateDetails = props => {

    const [debate, setDebate] = useState(false)
    const [sides, setSides] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('')
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