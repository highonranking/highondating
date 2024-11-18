import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailID, setEmailID] =  useState("miaa@gmail.com");
    const [password, setPassword] = useState("Miaakhalifa@123");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() => {
        try{
            const res  = await axios.post(`${BASE_URL}/login`, {
                emailId:emailID,
                password
            }, {withCredentials:true});
            dispatch(addUser(res.data));
            return navigate("/");
        }
        catch(err){
            setError(err.response.data);
            console.log(err);
        }
       
    }
    useEffect(()=>{
        setTimeout(()=>{
            setError("");
        }, 2000)
    },[error])

  return (
    <div className='h-screen'>
    {error&&(
        <div role="alert" className="w-1/3 flex items-center justify-center mx-auto alert alert-error">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24">
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{error}</span>
    </div>
    )}

    <div className='flex mt-24 items-center justify-center'>
        
        <div className="card w-auto h-fit lg:card-side bg-base-100 shadow-xl">
        <figure>
            <img
            className='w-auto h-96'
            src="https://i.insider.com/61e1b39d7c6a200018421dc5?width=2000&format=jpeg&auto=webp"
            alt="Album" />
        </figure>
        <div className="card-body">
            <h1 className='text-3xl text-bold mx-auto flex mb-6'>Login</h1>
      
        <label className="input input-bordered flex items-center gap-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input type="text" value={emailID} className="grow" placeholder="Email" onChange={(e)=>setEmailID(e.target.value)}/>
        </label>
        <label className="input input-bordered flex items-center gap-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd" />
        </svg>
        <input type="password" value={password} placeholder='**********' onChange={(e)=>setPassword(e.target.value)} className="grow"/>
        </label>
        <button onClick={handleLogin} className="btn btn-xs sm:btn-sm md:btn-md bg-primary lg:btn-lg">Login</button>
        </div>
    </div>
    
</div>
</div>
  )
}

export default Login