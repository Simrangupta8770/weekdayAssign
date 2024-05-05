import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './jobs.css'
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import { setCompanyName, setLocationP, setMinBasePay, setMinExperience, setRole, setTechStack } from '../filters';
import TextField from '@mui/material/TextField';
const allRoles = {
  Engineering: ["Frontend", "Backend", "FullStack", "IOS", "Flutter", "React Native", "Android", "Tech Lead", "Dev-Ops", "Data Engineer", "Data Science", "Nlp"],
  Design: ["Designer", "Design Manager"]
};


const exp=[  { value: 1, label: 1 },
{ value: 2, label: 2 },
{ value: 3, label: 3 },
{ value: 4, label: 4 },
{ value: 5, label: 5 },
{ value: 6, label: 6 },
{ value: 7, label: 7},
{ value: 8, label: 8},
{ value: 9, label: 9},
{ value: 10, label: 10}];
const loc=[{value:"onsite",label:"Onsite"},{
    value:"remote",label:"Remote"
}]
const mnPay=[
    {value:0,label:"0L"},
    {value:10,label:"10L"},
    {value:20,label:"20L"},
    {value:30,label:"30L"},
    {value:40,label:"40L"},
    {value:50,label:"50L"},
    {value:60,label:"60L"},
    {value:70,label:"70L"},

]
const tech = [
    "Python",
    "Django",
    "Java",
    "Golang",
    "Ruby/Rails",
    "Kotlin",
    "C#",
    "GraphQL",
    "Flask",
    "TypeScript",
    "AWS",
    "JavaScript",
    "Rust",
    "NodeJS",
    "React"
  ];
  
  const techOptions = tech.map(item => ({
    value: item.toLowerCase(),
    label: item
  }));
  
  export default function Filters() {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [ex,setEx]=useState();
 
  const [location,setLocation]=useState([]);
  const [minPay,setMinPay]=useState();
  const [techst,setTechst]=useState();
  const [name,setName]=useState('');
  const handleChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions);
  };
  const dispatch=useDispatch();
  const groupedOptions = Object.keys(allRoles).map((category) => ({
    label: category,
    options: allRoles[category].map((role) => ({
      value: role,
      label: role
    }))
  }));
  useEffect(()=>{
    dispatch(setRole(selectedRoles));
  },[selectedRoles])
  useEffect(()=>{
    dispatch(setLocationP(location));
  },[location])
  useEffect(()=>{
    dispatch(setCompanyName(name));
  },[name])
  useEffect(()=>{
    dispatch(setTechStack(techst));
  },[techst])
  useEffect(()=>{
    dispatch(setMinBasePay(minPay));
  },[minPay])
  useEffect(()=>{
    dispatch(setMinExperience(ex));
  },[ex])
  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction={"row"} flexWrap={"wrap"} style={{position:"relative",alignItems:"end",marginTop:"20px",marginBottom:"20px"}}> 
         <TextField id="outlined-basic"  style={{marginTop:"10px",marginLeft:"10px"}} size="small" label="Company Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/>

      <div style={{marginTop:"10px",marginLeft:"10px"}}>
        <div>
          Roles
        </div>
        <Select
          isMulti
          value={selectedRoles}
          onChange={handleChange}
          options={groupedOptions}
          placeholder="Select Roles..."
          isClearable
          isSearchable
        />
      </div>
     
      <div style={{marginTop:"10px",marginLeft:"10px"}}>
       
        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Experience"
          onChange={(val)=>setEx(val)}
          isSearchable={true}
          value={ex}
          options={exp}
        />
      </div>
      <div style={{marginTop:"10px",marginLeft:"10px"}}>
       
       <Select
         className="basic-single"
         classNamePrefix="select"
         placeholder="Location"
         onChange={(val)=>setLocation(val)}
         isSearchable={true}
         value={location}
         options={loc}
         isMulti
       />
     </div>
     <div style={{marginTop:"10px",marginLeft:"10px"}}>
       <div>Min Base Pay</div>
       <Select
         className="basic-single"
         classNamePrefix="select"
         placeholder="Minimum Base Pay Salary"
         onChange={(val)=>setMinPay(val)}
         isSearchable={true}
         value={minPay}
         options={mnPay}
       />
     </div>

    
    
    {/* {selectedRoles?.length > 0 &&  
     <div>

     <Select
          isMulti
          value={techst}
          onChange={handleChange}
          options={techOptions}
          placeholder="Tech Stack"
          isClearable
          isSearchable
        />
     </div>} */}
    </Stack>
  );
}
