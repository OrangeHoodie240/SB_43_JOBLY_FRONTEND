import React from 'react';
import JoblyApi from '../api';
import JobCard from '../JobCard/JobCard'
import './JobList.css';
import { getApplied, setApplied } from '../helpers';

const JobList = ({ requireLoggedIn }) => {
    requireLoggedIn();
    const [searchArg, setSearchArg] = React.useState('');
    const [jobCards, setJobCards] = React.useState([]);
    const [appliedIds, setAppliedIds] = React.useState(getApplied());

    async function getJobs(title = null) {
        const jobs = await JoblyApi.getJobs(title);
        const cards = [];
        for (let job of jobs) {
            const alreadyApplied = (appliedIds.includes(job.id));
            cards.push(<JobCard id={job.id} companyName={job.companyName} alreadyApplied={alreadyApplied} setApplied={(id)=>setApplied(id, setAppliedIds)} companyHandle={''} title={job.title} salary={job.salary} equity={job.equity}></JobCard>)
        }
        setJobCards(cards);
    }

    React.useEffect(() => {
        getJobs();
    }, [appliedIds]);

    function onChange({ target }) {
        setSearchArg(target.value);
    }

    function onSubmit(evt) {
        evt.preventDefault();
        getJobs(searchArg);
    }

    return (<div className={'job-list'}>
        <form className='job-list-form' onSubmit={onSubmit}>
            <input onChange={onChange} type='text' value={searchArg} className={'form-control'} name='search' />
            <button className={'btn btn-primary'}>Search</button>
        </form>
        <div id='job-list-list'>{(jobCards.length) ? jobCards : "No Results"}</div>
    </div>);
};



export default JobList;