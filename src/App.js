import './App.css';
import React from 'react';
import Routes from './Routes/Routes';
import NavBar from './NavBar/NavBar';
import {useHistory} from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = React.useState((localStorage.getItem('token')) ? true : false);  
  const history = useHistory();


  function logInOut(token, username){
    if(loggedIn){
      localStorage.removeItem('token');
      localStorage.removeItem('username');

    }
    else{
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

    }
    setLoggedIn(!loggedIn); 
  }

  function requireLoggedIn(){
    if(!loggedIn){
      history.push('/home');
    }
  }

  return (<div>
              <NavBar loggedIn={loggedIn}></NavBar>
              <Routes logInOut={logInOut} requireLoggedIn={requireLoggedIn}></Routes>
          </div>);
}

export default App;
