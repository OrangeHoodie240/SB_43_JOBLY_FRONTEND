import React from 'react';
import JoblyApi from '../api';
import './LogIn.css';
import {useHistory} from 'react-router-dom';


const LogIn = ({logInOut}) => {
    const [logInState, setLogInState] = React.useState({username: "", password: ''});
    const errorMsg = React.useRef(null);
    const history = useHistory();

    React.useEffect(()=>{
        errorMsg.current = document.querySelector('.log-in-error');
    },[]);


    async function onSubmit(evt){
        evt.preventDefault(); 
        const user ={};
        const childrenLength = evt.target.children.length; 
        for(let i = 0; i < childrenLength; i++){
            const child = evt.target.children[i];
            if(child.tagName === 'INPUT'){
                user[child.name] = child.value; 
            }
        }

        const results = await JoblyApi.login(user);
        if(!results){
            errorMsg.current.innerText = 'Error! Invalid credentials'; 
        }
        else{
            errorMsg.current.innerText = ''; 
            logInOut(results.token, user.username);
            history.push('/companies');
            setLogInState({username: '', password: ''});
        }
    }



    function onChange({target}){
        const newSate = {}; 
        const children = target.children; 
        for(let i = 0; i < children.length; i++){
            const child = children[i]; 
            if(child.tagName === 'INPUT'){
                newSate[child.name] = child.value;
            }
        }
        setLogInState(newSate);
    }
    return (
        <div className='card log-in'>
            <div className='card-body'>
                <h2>Log In</h2>
                <form className='log-in-form' onChange={onChange} onSubmit={onSubmit}>
                    <input required name='username' value={logInState.username} className='form-control' type='text' placeholder='Username' id='log-in-username' />
                    <input required name='password' value={logInState.password} className='form-control' type='password' placeholder='Password' id='log-in-password' />
                    <button className='btn btn-primary' id='log-in-submit'>Submit</button>
                </form>
                <p className={'log-in-error'}></p>
            </div>
        </div>
    );
};


export default LogIn;
