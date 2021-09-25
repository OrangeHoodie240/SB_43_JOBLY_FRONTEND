import React from 'react';
import { useHistory } from 'react-router-dom';


const Logout = ({ logInOut }) => {
    const history = useHistory();
    logInOut();
    history.push('/');
    return null;
};


export default Logout;