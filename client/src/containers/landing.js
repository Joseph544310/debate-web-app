import React from 'react'
import Authentication from '../components/authentication'
import {Container, Row, Col} from 'react-bootstrap'

const Landing = props => {
    return (
    <div>
        <h1>Landing Page</h1>
        <Container>
            <Row className="justify-content-around">
                <Col xs={12} sm={12} md={6} lg={4}>LOGO WILL GO HERE</Col>
                <Col xs={12} sm={12} md={6} lg={4}><Authentication {...props}/></Col>
            </Row>
        </Container>
        
    </div>

    );
}

export default Landing;