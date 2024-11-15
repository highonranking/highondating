import React from 'react'

const Feed = () => {
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

export default Feed