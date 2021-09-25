import JoblyApi from "./api";

function getApplied(){
    let applied = localStorage.getItem('appliedJobs'); 
    if(applied){
        applied = JSON.parse(applied);
    }
    else{
        applied = [];
    }
    return applied; 
}

async function setApplied(id, setter){
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); 
    const result = await JoblyApi.apply(token, username, id); 
    if(result){
        let applied = getApplied(); 
        applied.push(id); 
        localStorage.setItem('appliedJobs', JSON.stringify(applied)); 
        setter(applied);
    }
    
}



export {getApplied, setApplied};









