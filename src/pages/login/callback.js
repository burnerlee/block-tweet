import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
const Callback = props => {
    const [navigateTo, setNavigateTo] = useState()

    useEffect(() => {
        // Try to exchange authorization code for access and id tokens.
        props.uauth
            .loginCallback()
            // Successfully logged and cached user in `window.localStorage`
            .then(response => {
                console.log('loginCallback ->', response)
                props.setAuth(response.authorization)
                setNavigateTo('/')
            })
            // Failed to exchange authorization code for token.
            .catch(error => {
                console.error('callback error:', error)
                setNavigateTo('/login?error=' + error.message)
            })
    }, [])

    if (navigateTo) {
        return <Navigate to={navigateTo} />
    }

    return <>Loading...</>
}

export default Callback;