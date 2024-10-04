import React from 'react'
import Header from '../components/Header'
import VideoMore from '../components/VideoMore'

const Video = () => {
  return (
    <div>
        <Header/>   
        {/* video page */}
<div className='grid grid-cols-4  w-full h-screen'>
    
    <div className='col-span-1 bg-slate-500'>

    </div>
    <div className='col-span-3  '>
    <VideoMore/>
</div>
</div>
    </div>
  )
}

export default Video