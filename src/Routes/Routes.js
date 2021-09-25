import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import Register from '../Register/Register';
import CompanyList from '../CompanyList/CompanyList';
import CompanyDetail from '../CompanyDetail/CompanyDetail';
import JobList from '../JobList/JobList';
import Logout from '../Logout';
import Profile from '../Profile/Profile';
import Home from '../Home/Home';



const Routes = function ({ logInOut, requireLoggedIn }) {


    return (<Switch>
        <Route exact path="/" >
            <Home></Home>
        </Route>
        <Route exact path="/companies" >
            <CompanyList requireLoggedIn={requireLoggedIn}></CompanyList>
        </Route>
        <Route exact path="/companies/:company" >
            <CompanyDetail requireLoggedIn={requireLoggedIn}></CompanyDetail>
        </Route>
        <Route exact path="/jobs" >
            <JobList requireLoggedIn={requireLoggedIn}></JobList>
        </Route>
        <Route exact path="/login" >
            <LogIn logInOut={logInOut}></LogIn>
        </Route>
        <Route exact path="/signup" >
            <Register logInOut={logInOut}></Register>
        </Route>
        <Route exact path='/logout'>
            <Logout logInOut={logInOut} ></Logout>
        </Route>
        <Route exact path='/profile'>
            <Profile></Profile>
        </Route>

    </Switch>);
};


export default Routes;