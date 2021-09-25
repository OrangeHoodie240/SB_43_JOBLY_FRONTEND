import React from 'react';
import JoblyApi from '../api';
import './Register.css';
import {useHistory} from 'react-router-dom';

const Register = ({logInOut}) => {
    const [registerState, setRegisterState] = React.useState({username: "", password: '', firstName: '', lastName: '', email: ''});
    const errorMsg = React.useRef(null);
    const history = useHistory(); 

    React.useEffect(()=>{
        errorMsg.current = document.querySelector('.register-error'); 
    },[]);

    function onChange({target}){
        const newSate = {}; 
        const children = target.children; 
        for(let i = 0; i < children.length; i++){
            const child = children[i]; 
            if(child.tagName === 'INPUT'){
                newSate[child.name] = child.value;
            }
        }
        setRegisterState(newSate);
    }
    

    async function onSubmit(evt){
        evt.preventDefault(); 
        const controls = []; 
        const user ={};
        const childrenLength = evt.target.children.length; 
        for(let i = 0; i < childrenLength; i++){
            const child = evt.target.children[i];
            if(child.tagName === 'INPUT'){
                controls.push(child); 
                user[child.name] = child.value; 
            }
        }


        const results = await JoblyApi.register(user);
        if(!results){
            errorMsg.current.innerText = 'Error! User with account information exists'; 
        }
        else{
            errorMsg.current.innerText = ''; 
            controls.forEach(ctrl=>ctrl.value='');
            logInOut(results.token, user.username);
            history.push('/companies');
        }
    }

    return (
        <div className='card register'>
            <div className='card-body'>
                <h2>Register</h2>
                <form className='register-form' onChange={onChange} onSubmit={onSubmit}>
                    <input required value={registerState.username} name='username' className='form-control' type='text' placeholder='Username' id='register-username' />
                    <input required value={registerState.password} name='password' className='form-control' type='password' placeholder='Password' id='register-password' />
                    <input required value={registerState.firstName} name='firstName' className='form-control' type='text' placeholder='First Name' id='register-first-name' />
                    <input required value={registerState.lastName} name='lastName' className='form-control' type='text' placeholder='Last Name' id='register-last-name' />
                    <input required value={registerState.email} name='email' className='form-control' type='email' placeholder='Email' id='register-email' />

                    <button class='btn btn-primary' id='register-submit'>Submit</button>
                </form>
            </div>
            <p className='register-error'></p>
        </div>
    );
};


export default Register;
