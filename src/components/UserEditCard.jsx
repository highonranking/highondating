import React from 'react'

const UserEditCard = (data) => {
  return (
    <div className="card glass w-96">
      
  <figure>
    <img
      src={data?.user?.photoUrl}
      alt="profile pic" />
  </figure>

  <div className='flex flex-row gap-12 my-2 justify-center'>
  <div className="badge badge-info gap-2">
  {data?.user?.age}
</div>
<div className="badge badge-success gap-2">
  {data?.user?.gender}
</div>
  </div>


  
  <div className="card-body">
    <h2 className="card-title">{data?.user?.firstName +" " + data?.user?.lastName}</h2>
    <p className='card-normal'>{data?.user?.about}</p>
    
  </div>



  
</div>
  )
}

export default UserEditCard;