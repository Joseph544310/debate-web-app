import React from 'react'
import Authentication from '../components/authentication'

const Landing = props => {
    return (
    <div>
        <h1>Landing Page</h1>
        <Authentication {...props}/>
    </div>

    );
}

export default Landing;