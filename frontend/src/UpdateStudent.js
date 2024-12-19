import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function UpdateStudent() {
    const [name,setName]=useState([]);
    const[email,setEmail]=useState([]);
    const navigate=useNavigate();
    const {id}=useParams();
    function handlesubmit(event){
        console.log(name,email);
        event.preventDefault();
        axios.put('http://localhost:3030/update/'+id,{name,email})
        
        .then(res=>{
            //console.log('hello');
            console.log(res);
            navigate('/');
        })
        .catch(err=>console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handlesubmit}>
                <h2>Update student</h2>
                <div className="mb-2">
                    <label htmlFor="">New Name</label>
                    <input type="text" placeholder='Enter New Name' className='form-control' 
                    onChange={e=>setName(e.target.value)} required/>

                </div>
                <div className="mb-2">
                    <label htmlFor="">New Email</label>
                    <input type="email" placeholder='Enter New Email' className='form-control' 
                    onChange={e=>setEmail(e.target.value)} required/>
                </div>
                <button className="btn btn-success">Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateStudent