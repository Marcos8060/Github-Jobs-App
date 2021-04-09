import axios from 'axios';
import React,{useReducer,useEffect} from 'react';

const ACTIONS={
    MAKE_REQUEST: 'make request',
    GET_DATA: 'get data',
    ERROR : 'error',
    HAS_NEXT_PAGE: 'has next page'
}
const reducer=(state,action)=>{
   switch(action.type){
       case ACTIONS.MAKE_REQUEST:
    return {loading: true, jobs:[]}
       case ACTIONS.GET_DATA:
    return {...state,loading: false, jobs:action.payload.jobs,error:false}
       case ACTIONS.ERROR:
    return {...state,loading:false, error: action.payload.error,jobs:[]}
       case ACTIONS.HAS_NEXT_PAGE:
    return {...state,hasNextPage: action.payload.hasNextPage}
       default:
    return state
   }
} 
const defaultState={
    jobs:[],
    loading: true,
}
const url= 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';
export default function UseFetchJobs(params,page){
    const [state,dispatch] = useReducer(reducer,defaultState)
    useEffect(()=>{
        const cancelToken1 = axios.CancelToken.source()
     dispatch({type: ACTIONS.MAKE_REQUEST})
     axios.get(url,{
         cancelToken: cancelToken1.token,
         params: {markdown:true,page:page,...params}
     }).then(res=>{
         dispatch({type: ACTIONS.GET_DATA,payload:{jobs :res.data}})
     }).catch(e=>{
         if(axios.isCancel(e)) return
         dispatch({type: ACTIONS.ERROR,payload:{error: e}})
     })
// second request for next page
     const cancelToken2 = axios.CancelToken.source()
     axios.get(url,{
        cancelToken: cancelToken2.token,
        params: {markdown:true,page:page + 1,...params}
    }).then(res=>{
        dispatch({type: ACTIONS.HAS_NEXT_PAGE,payload:{hasNextPage :res.data.length !== 0}})
    }).catch(e=>{
        if(axios.isCancel(e)) return
        dispatch({type: ACTIONS.ERROR,payload:{error: e}})
    })
     return()=>{
         cancelToken1.cancel()
         cancelToken2.cancel()
     }
    },[params,page])
    return state
}