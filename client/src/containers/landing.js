import React from 'react'
import Authentication from '../components/authentication'
import {Container, Row, Col} from 'react-bootstrap'
import './landing.css'

const Landing = props => {
    return (
    <div className="landing">
        <Container>
            <Row className="justify-content-around">
                <Col xs={12} sm={12} md={6} lg={4}>
                    <div id="description">
                        <h2>Welcome to Debate-App</h2>
                        <p>
                            In this website you'll be able to register without
                            being asked for any personal information so that
                            you can participate in debates freely and safely and
                            voice your opinions.
                        </p>
                    </div>

                </Col>
                <Col xs={12} sm={12} md={6} lg={4}><Authentication {...props}/></Col>
            </Row>
        </Container>
        
    </div>

    );
}

export default Landing;