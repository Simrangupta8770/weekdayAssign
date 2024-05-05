
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Avatar from '@mui/material/Avatar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';import "./jobs.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from "../jobs";
import Filters from "./Filter";
import { removeListener } from "@reduxjs/toolkit";
const DemoPaper = styled(Paper)(({ theme }) => ({
  
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
  }));
const Jobs = () => {
    const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const [filJobs,setFilJobs]=useState([]);
  const status = useSelector((state) => state.jobs.status);
  const error = useSelector((state) => state.jobs.error);
const {roles,techStack,location,minExperience,companyName,minBasePay}=useSelector((state)=>state.filters);
console.log(roles);
    const [isLoading, setIsLoading] = useState(false);
    const [index, setIndex] = useState(0);
    const fetchData = useCallback(async () => {
        // console.log(index);
        if (isLoading) return;
    
        setIsLoading(true);
        dispatch(fetchJobs({index}));
    
        setIndex((prevIndex) => prevIndex + 1);
    
        setIsLoading(false);
      }, [index, isLoading]);  
      useEffect(() => {
        console.log(index);
        const getData = async () => {
          setIsLoading(true);
          dispatch(fetchJobs({index}));
          setIsLoading(false);
        };
    
        getData();
      }, []);
      useEffect(() => {
        const handleScroll = () => {
          const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;
          if (scrollTop + clientHeight >= scrollHeight - 20) {
            fetchData();
            
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [fetchData]);

useEffect(()=>{
    console.log(jobs);
    setFilJobs(jobs);
},[jobs]);
useEffect(()=>{
    console.log(roles);
    
    //filtering on the basis of location
    const filteredRes = jobs?.filter((job) => {
        // If "remote" location is selected, include only jobs with "remote" location
        console.log(location.some((val) => val.value === "remote"));
        if(!location || location.length==0) return true;
        if (location && location.some((val) => val.value === "remote")) {
            return job.location === "remote";
        }
        // Otherwise, include all jobs
        return job?.location != "remote";
    });
    console.log(filteredRes);


    //filtering on the basis of role
    const rolesfil=filteredRes?.filter((job)=>{
        console.log(roles);
        if (roles && roles.find((val) => val.value?.toLowerCase() == job?.jobRole?.toLowerCase())) {
            return true;
        }
        if(!roles || roles.length==0){
            return true;
        }
        // Otherwise, include all jobs
        return false;
    })
    console.log(rolesfil);
    const expfil=rolesfil?.filter((job)=>{
        console.log(minExperience);
        if(!minExperience){
            return true;
        }
        if(job?.minExp){
            return minExperience?.value >=job.minExp
        }
        return false;
    })
   console.log(expfil);
    const salfil=expfil?.filter((job)=>{
        console.log(minBasePay);
        if(!minBasePay){
            return true;
        }
        return job?.minJdSalary >= minBasePay?.value
    })
    console.log(salfil);


   
    setFilJobs(salfil);

    const timerId = setTimeout(() => {
        const filteredRes = salfil?.filter((job) => {
           
            return job.companyName.toLowerCase().includes(companyName?.toLowerCase());
        });
        console.log(filteredRes);
        
        setFilJobs(filteredRes);
    }, 300); 

    return () => clearTimeout(timerId);
},[jobs,companyName,techStack,location,roles,minExperience,minBasePay])
  return (
    <div style={{padding:"20px" ,margin:"20px"}}>
        <Filters />
        <Grid container spacing={2}  style={{padding:"10px"}}>
{
    filJobs?.map((item)=>(
        <>
 <Grid item xs={12} sm={6} md={4} lg={3} key={item.jdUid}>
    <DemoPaper style={{height:"450px"}}>
 <Stack spacing={{ xs: 1, sm: 2 }} useFlexGap style={{position:"relative"}}>
  <div style={{textAlign:"left"}}>   <Chip  icon={<HourglassTopIcon />} label="posted 9 days ago"  size="small" variant="outlined" /></div>
  <div style={{display:"flex",alignItems:"start"}}>
  <Avatar alt="Remy Sharp" src={item?.logoUrl} />
  <div style={{paddingLeft:"15px", textAlign:"left"}}>
    <div style={{fontWeight:"bold",color:"grey"}}>{item?.companyName}</div>
    <div style={{textTransform:"capitalize",fontWeight:"lighter",color:"grey"}}>{item?.jobRole}</div>
    <div style={{fontWeight:"bold",fontSize:"0.8rem" ,textTransform:"capitalize"}}>{item?.location}</div></div>
  </div>
  
  {(item?.minJdSalary  ||item?.maxJdSalary )&&<div style={{display:"flex",alignItems:"center",fontWeight:"lighter",color:"grey"}}><AttachMoneyIcon style={{width:"18px",height:"18px"}}/>
  <span>Estimated Salary : {(item.minJdSalary)} {( item?.minJdSalary && item?.maxJdSalary && ' - ')} { item?.maxJdSalary}</span></div>}
  <div  style={{fontWeight:"bold",textAlign:"left"}}>About Role</div>
  <div className="background-text">
  <div style={{fontSize:"1rem",fontWeight:"lighter",color:"grey",textAlign:"left"}}>
    {item?.jobDetailsFromCompany}
  </div>

 <p onClick={()=>{}} style={{cursor:"pointer"}}>View Job...</p></div>
</Stack>
<Stack spacing={{ xs: 1, sm: 2 }} useFlexGap style={{position:"relative"}}>
  
   {item?.minExp && <div style={{textAlign:"left"}}>
    <div style={{fontWeight:"bold",color:"grey"}}>Minimum Experience </div>
   <div>{item?.minExp} Years</div></div>}
    </Stack>
</DemoPaper>
     
        </Grid>
        </>
    ))
    
}
</Grid>


    </div>
  )
}

export default Jobs