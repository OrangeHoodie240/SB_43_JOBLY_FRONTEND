import React from 'react';
import { NavLink } from 'react-router-dom';



const NavBar = ({loggedIn})=>{
    return (<nav className='navbar navbar-dark bg-dark'>
                <NavLink className='nav-link' to='/'>Home</NavLink>
                {loggedIn ? <NavLink className='nav-link' to='/companies'>Companies</NavLink> : null}
                {loggedIn ? <NavLink className='nav-link' to='/jobs'>Jobs</NavLink> : null}
                {!loggedIn ? [<NavLink className='nav-link' to='/login'>Login</NavLink>,<NavLink className='nav-link' to='/signup'>Sign Up</NavLink>] : <NavLink className='nav-link' to='/logout'>Sign Out</NavLink>}                
                {loggedIn ? <NavLink className='nav-link' to='/profile'>Profile</NavLink> : null}

            </nav>);
};


export default NavBar; 