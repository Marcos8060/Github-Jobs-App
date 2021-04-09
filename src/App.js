import React,{useState} from 'react';
import UseFetchJobs from './UseFetchJobs';
import {Container} from 'react-bootstrap';
import Job from './Job';
import SearchJob from './SearchJob';

export default function App(){
   const {jobs,loading,error,hasNextPage} = UseFetchJobs()
   const [params,setParams] = useState({})
  
    function handleParamChange(e){
      const param = e.target.name;
      const value = e.target.value;
      setParams(prevParams =>{
        return {...prevParams, [param] : value}
      })
    }
   
   return (
     <Container className='my-4'>
       <h1 className='mt-3 mb-4'>Github Jobs</h1>
       <SearchJob params={params} onParamChange={handleParamChange}/>
       {loading && <h1>Loading...</h1>}
       {error && <h1>Error...</h1>}
       {jobs.map((job)=>{
         return <Job key={job.id} job={job}/>
       })}
     </Container>
   )
}
