import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
function CreateStudent() {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const navigate= useNavigate();
    function handleSubmit(event){
        console.log(name,email);
        event.preventDefault();
        axios.post('http://localhost:3030/create',{name,email})
        .then(res=>{
            console.log("in create");
            console.log(res);
            navigate('/');
        })
        .catch(err=>console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleSubmit}>
                <h2>Add student</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' className='form-control' 
                    onChange={e=>setName(e.target.value)} required/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Enter Email' className='form-control' 
                    onChange={e=>setEmail(e.target.value)} required/>
                </div>
                <button className="btn btn-success">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateStudent