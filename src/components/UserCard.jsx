import React from 'react'

const UserCard = (data) => {
  return (
    <div className="card min-h-[600px] glass w-96">
  <figure>
    <img
      src={data?.data?.photoUrl}
      alt="profile pic" />
  </figure>
  <div className='flex flex-row gap-12 my-2 justify-center'>
  <div className="badge badge-info gap-2">
  {data?.data?.age}
</div>
<div className="badge badge-success gap-2">
  {data?.data?.gender}
</div>
  </div>
  <div className="card-body">
    <h2 className="card-title">{data?.data?.firstName +" " + data?.data?.lastName}</h2>
    <p>{(data?.data?.about).substring(0,40)}...</p>
    <div className="card-actions justify-center flex gap-24 mt-12">
      <button className="btn btn-secondary">❌</button>
      <button className="btn btn-primary">✔️</button>
    </div>
  </div>
</div>
  )
}

export default UserCard