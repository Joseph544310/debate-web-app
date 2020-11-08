import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Card, Button, ListGroup} from 'react-bootstrap'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './debateDetails.css'

const DebateDetails = props => {

    const [debate, setDebate] = useState(false)
    const [sides, setSides] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [votedSide, setVotedSide] = useState(false);
    const [user, setUser] = useState(false);
    const {id} = useParams();

    useEffect( () => {
        //Get user
        Axios({
            method: "GET",
            withCredentials: true,
            url: `http://localhost:5000/auth/user`
          }).then(res => {
            setUser(res.data.user);
          }).catch(err => console.log(err))

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
            setCommentContent('')
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

    const deleteComment = (comment_id, index) => {
        Axios({
            method: 'DELETE',
            withCredentials: true,
            url: `http://localhost:5000/debates/${id}/comments/${comment_id}`
        }).then( res => {
            setComments([...comments.slice(0, index), ...comments.slice(index+1)]);
        }).catch(err => console.log(err))
    }

    return (
        <Card className="debateCard">
            <Card.Header>{debate?debate.title:null}</Card.Header>
            <Card.Body>
                {sides.map(side => {
                    return (
                        <Card key={side._id} className={side._id===votedSide?"voted":"notVoted"}>
                            <Card.Title>{side.name}</Card.Title>
                            <Button variant='primary' onClick = { () => castVote(side._id)}>Vote</Button>
                        </Card>
                    );
                })}

                <ListGroup variant="flush" className='comments'>
                    <h4>Comments</h4>
                    {comments.map((comment,index) => {
                        return (
                            <ListGroup.Item key={comment._id}>
                                {comment.author.username}: {comment.content}
                                {user?user._id===comment.author.id?
                                <span className='del-icon'>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteComment(comment._id, index)}/>
                                </span>:null:null}
                                
                            </ListGroup.Item>
                        );
                    })}
                    <form onSubmit={createComment}>
                        <input type='text' onChange={e => setCommentContent(e.target.value)} value={commentContent} required/>
                        <input className="btn btn-primary" type='submit' value='Add Comment'/>
                    </form>
                </ListGroup>

            </Card.Body>
        </Card>
    );
}

export default DebateDetails;