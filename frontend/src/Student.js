import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
function Student() {
    const[student,setStudent]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3030/')
        .then(res => {
            console.log('API response:', res.data);
            // Check if the response data is an array
            if (Array.isArray(res.data)) {
                setStudent(res.data);
            } else {
                console.error('Unexpected data format:', res.data);
                setStudent([]); // Set to empty array if data format is unexpected
            }
        })
        .catch(err=>console.log(err));
    },[]) 
    const handleDelete= async (id) => {
        console.log("called")
        try{
            await axios.delete(`http://localhost:3030/student/${id}`);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center align-items-center'>
        <div className="w-50 bg-white rounded p-3">
            <Link to="/create" className='btn btn-success'>ADD +</Link>
            <table className="table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data,i)=>(
                            <tr key ={i}>
                                <td>{data.Name}</td>
                                <td>{data.Email}</td>
                                <td>
                                    <Link to={`update/${data.ID}`} className='btn btn-success'>Update</Link>
                                    <button className='btn btn-danger ms-2' onClick={() => {console.log('Delete button clicked, ID:', data.ID);handleDelete(data.ID);}}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Student