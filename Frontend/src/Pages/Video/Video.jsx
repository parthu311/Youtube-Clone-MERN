import React, { useState } from 'react'
import './Video.css'
import PlayVideo from '../../Compontent/PlayVideo/PlayVideo'
import Recommended from '../../Compontent/Recommended/Recommended'
import { useParams } from 'react-router-dom'

const Video = () => {
  const {videoId, categoryId} = useParams();
  

  return (
    <>
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId}/>
    </div>
    </>
  )
}

export default Video