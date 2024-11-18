import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
    const feed = useSelector(store => store.feed);
    console.log(feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if(feed) return;
        try{
            const res = await axios.get(BASE_URL+"/feed", {withCredentials:true});
            dispatch(addFeed(res.data))
        }
        catch(err){
            console.log(err);
        }

    };

    useEffect(()=>{
        getFeed();
    },[]);

    if(!feed){
        return (
             <div className='flex items-center justify-center mt-24'>
                <div className="flex w-96 flex-col gap-4">
                    <div className="skeleton rounded-full h-48 w-48"></div>
                    <div className="skeleton h-12 w-28"></div>
                    <div className="skeleton h-12 w-full"></div>
                    <div className="skeleton h-12 w-full"></div>
                </div>
             </div>
        )
    }
  return (
    <div className='flex justify-center items-center gap-8 h-screen'>
        
    {feed?.data.map((user, index)=>
        <UserCard key={index} data={user}/>
    )}
    </div>
   
  )
}

export default Feed;



