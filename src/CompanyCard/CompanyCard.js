import React from 'react';
import { useHistory } from 'react-router-dom';
import './CompanyCard.css';

const CompanyCard = ({ description, handle, logoUrl, name, numEmployees }) => {
    const history = useHistory();
    function onClick() {
        history.push('/companies/' + handle);
    }

    return (
        <div onClick={onClick} className={'company-card card'}>
            <div className='card-header'>
                <h2>{name}</h2>
            </div>
            <p>{description}</p>
        </div>
    );
};


export default CompanyCard;