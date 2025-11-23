import React from 'react'

const StoryViewer = ({viewStory,setViewStory}) => {
  return (
    <div className='fixed inset-0 h-screen bg-black bg-opacity-90 z-110 
    felx items-center justify-center' style={{backgroundColor: viewStory.media_type ===
     'text' ? viewStory.background : '#000000'}}>
      
      {/* Progress Bar  */}

      <div>
        
      </div>


    </div>
  )
}

export default StoryViewer
