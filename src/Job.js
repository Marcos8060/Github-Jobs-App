import React,{useState} from 'react';
import { Card,Badge,Button,Collapse} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export default function Job({job}){
    const [open,setOpen] = useState(false)
   return (
       <Card className='mb-3'>
           <Card.Body>
               <div className='d-flex justify-content-between'>
                 <div>
                     <Card.Title>
                         {job.title} - <span className='text-muted'>{job.company}</span>
                     </Card.Title>
                     <Card.Subtitle className='mb-3'>
                         {new Date(job.created_at).toLocaleDateString()}
                     </Card.Subtitle>
                     <Badge variant='secondary' className='mr-2'>{job.type}</Badge>
                     <Badge variant='secondary'>{job.location}</Badge>
                     <div style={{wordBreak: 'break-all'}}>
                         <ReactMarkdown source={job.how_to_apply}/>
                     </div>
                 </div>
                 <img height='50' src={job.company_logo} alt={job.company}/>
               </div>
               <Card.Text>
                   <Button onClick={()=>setOpen(prevOpen => !prevOpen)}>
                     {open ? 'Hide details': 'View details'}
                   </Button>
               </Card.Text>
               <Collapse in={open}>
                <ReactMarkdown source={job.description}/>
               </Collapse>
           </Card.Body>
       </Card>
   )
}