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
<div className={`badge ${data?.user?.gender==='male'?"badge-success" : "badge-error"} badge-success gap-2`}>

  {data?.user?.gender}
</div>
  </div>


  
  <div className="card-body">
    <h2 className="card-title">{data?.user?.firstName +" " + data?.user?.lastName}</h2>
    <p className='card-normal'>{data?.user?.about}</p>
    <div className="mt-2">
      {data?.user?.skills?.length > 0 ? (
        data?.user?.skills.map((skill) => (
          <span
            key={skill}
            className="badge badge-primary badge-sm mr-2"
          >
            {skill}
          </span>
        ))
      ) : (
        <p className="text-gray-500">No skills selected</p>
      )}
    </div>

    
  </div>



  
</div>
  )
}

export default UserEditCard;