import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Axios from 'axios'

export const ProtectedRoute = ({component: Component, ...rest}) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);
    useEffect( () => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "/api/auth/user"
          }).then(res => {
              setUser(res.data);
              setLoading(false);
            //   console.log(user);
          }).catch(err => console.log(err));
    }, [])
    
    return (
        <Route
        {...rest}
        render = { props => {
            if (loading) {
                <p>Loading...</p>
            }
            else {
                if (user) {
                    return <Component {...props}/>
                }
                else {
                    return <Redirect to={ {
                        pathname: '/',
                        state: {
                            from: props.location
                        }
                    }}/>
                }
            }

        }}
        />
    )
}