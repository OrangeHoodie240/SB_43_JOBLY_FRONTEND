import React from 'react';
import './JobCard.css';

const JobCard = ({ id, title, salary, equity, companyName, alreadyApplied, setApplied }) => {
    let button = null;
    if (!alreadyApplied) {
        function onClick() {
            setApplied(id);
        }

        button = <button className='btn btn-primary' onClick={onClick}>Apply</button>;
    }

    return (
        <div className={'job-card card'}>
            <div className='card-header'>
                <h2>{title}</h2>
                <h4>{companyName}</h4>
            </div>
            <ul>
                <li>Salary: {salary}</li>
                <li>Equity: {equity}</li>
            </ul>
            {button}
        </div>
    );
};


export default JobCard;