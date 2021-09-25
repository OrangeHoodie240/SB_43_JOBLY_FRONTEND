import React from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import JobCard from '../JobCard/JobCard';
import { getApplied, setApplied } from '../helpers';
import './CompanyDetail.css';


//description, handle, logoUrl, name, numEmployees
const CompanyDetail = ({ requireLoggedIn }) => {
    const [appliedIds, setAppliedIds] = React.useState(getApplied());


    requireLoggedIn();
    const { company } = useParams();
    const [companyDetails, setCompanyDetails] = React.useState({ name: '', description: '', jobs: [] });
    React.useEffect(() => {
        async function getCompany() {
            setCompanyDetails(await JoblyApi.getCompany(company));
        }
        getCompany();
    }, []);

    const cards = [];
    const jobsLength = companyDetails.jobs.length;
    for (let i = 0; i < jobsLength; i++) {
        const job = companyDetails.jobs[i];
        const alreadyApplied = (appliedIds.includes(job.id));
        cards.push(<JobCard id={job.id} alreadyApplied={alreadyApplied} setApplied={(id) => setApplied(id, setAppliedIds)} companyHandle={''} title={job.title} salary={job.salary} equity={job.equity}></JobCard>)
    }

    return (
        <div className={'company-detail'}>
            <div className='company-detail-company-info'>
                <h2>{companyDetails.name}</h2>
                <p>{companyDetails.description}</p>
            </div>



            <div className='company-detail-job-list'>{cards}</div>
        </div>
    );
};



export default CompanyDetail;