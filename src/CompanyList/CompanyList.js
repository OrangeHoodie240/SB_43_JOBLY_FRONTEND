import React from 'react';
import JoblyApi from '../api';
import CompanyCard from '../CompanyCard/CompanyCard';
import './CompanyList.css';


const CompanyList = ({requireLoggedIn}) => {
    requireLoggedIn();
    const [searchArg, setSearchArg] = React.useState('');
    const [companyCards, setCompanyCards] = React.useState([]);

    
    async function getCompanies(name=null){
        const companies = await JoblyApi.getCompanies(name);
        const cards = [];
        for(let company of companies){
            cards.push(<CompanyCard description={company.description} handle={company.handle} name={company.name} logoUrl={company.logoUrl} numEmployees={company.numEmployees} ></CompanyCard>);
        }
        setCompanyCards(cards);
    }

    React.useEffect(()=>{
        getCompanies(); 
    }, []);

    function onChange({ target }) {
        setSearchArg(target.value);
    }

    function onSubmit(evt){
        evt.preventDefault();
        getCompanies(searchArg);    
    }

    return (<div className={'company-list'}>
        <form className='company-list-form' onSubmit={onSubmit}>
            <input onChange={onChange} type='text' value={searchArg} className={'form-control'} name='search' />
            <button className={'btn btn-primary'}>Search</button>
        </form>
        <div id='company-list-list'>{(companyCards.length) ? companyCards : "No Results"}</div>
    </div>);
};



export default CompanyList;