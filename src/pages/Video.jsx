import React from 'react'
import Header from '../components/Header'
import VideoMore from '../components/VideoMore'

const Video = () => {
  return (
    <div>
        <Header/>   
        {/* video page */}
<div className='grid grid-cols-4 gap-2 mt-2 w-full h-screen'>
<div className=' col-span-4 sm:col-span-3  '>
    <VideoMore/>
</div>
    <div className=' col-span-4 sm:col-span-1 bg-slate-500'>

    </div>

</div>
    </div>
  )
}

export default Video