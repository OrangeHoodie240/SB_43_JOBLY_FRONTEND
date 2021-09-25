import React from 'react';
import JoblyApi from '../api';
import './Profile.css'

const Profile = () => {
    const [profileState, setProfileState] = React.useState({ firstName: '', lastName: '', email: '', password: '' });
    const errorMsg = React.useRef();
    const successMsg = React.useRef(); 

    React.useEffect(() => {
        errorMsg.current = document.querySelector('.profile-error');
        successMsg.current = document.querySelector('.profile-success');
        async function loadData(){
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            const results = await JoblyApi.getUser(token, username);
            
            const state = {};
            state.firstName = results.user.firstName; 
            state.lastName = results.user.lastName; 
            state.email = results.user.email;

            setProfileState({...state, password: ''});
        }
        loadData();
    }, []);

    function onChange() {
        const newState = {};
        newState.firstName = document.querySelector('#profile-first-name').value; 
        newState.lastName = document.querySelector('#profile-last-name').value; 
        newState.lastName = document.querySelector('#profile-last-name').value; 
        newState.password = document.querySelector('#profile-password').value; 
        newState.email = document.querySelector('#profile-email').value; 

        setProfileState(newState);
    }


    async function onSubmit(evt){
        evt.preventDefault(); 
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const body = {
            firstName: profileState.firstName, 
            lastName: profileState.lastName, 
            email: profileState.email, 
        };

        const password = profileState.password;
        const authenticated = await JoblyApi.login({username, password}); 
        if(authenticated){
            const results = await JoblyApi.patchUser(token, username, body);
            if(results){
                successMsg.current.innerText = 'Success!'
                errorMsg.current.innerText = '';
            }
            else{
                successMsg.current.innerText = '';
                errorMsg.current.innerText = 'Error. Make sure all fields are filled in correctly'
            }
        }
        else{
                successMsg.current.innerText = '';
                errorMsg.current.innerText = 'Invalid Credentials';
        }
    }

    return (
        <div className='profile card'>
            <div className='card-header'>
                <h2>Profile</h2>
            </div>
            <form onChange={onChange} onSubmit={onSubmit} className='profile-form'>
                <div className='profile-input-container'>
                    <label for='profile-first-name'>
                        First Name:
                        <input required value={profileState.firstName} className='form-control' id='profile-first-name' type='text' name='firstName'></input>
                    </label>
                    <label for='profile-last-name'>
                        Last Name:
                        <input required value={profileState.lastName} className='form-control' id='profile-last-name' type='text' name='lastName'></input>
                    </label>
                    <label for='profile-email'>
                        Email:
                        <input required value={profileState.email} className='form-control' id='profile-email' type='text' name='email'></input>
                    </label>
                    <label for='profile-password'>
                        Confirm Changes with Password:
                        <input required value={profileState.password} className='form-control' id='profile-password' type='password' name='password'></input>
                    </label>
                </div>
                <button className='btn btn-primary'>Submit Changes</button>
            </form>
            <p className='profile-error'></p>
            <p className='profile-success'></p>
        </div>
    );
};


export default Profile;