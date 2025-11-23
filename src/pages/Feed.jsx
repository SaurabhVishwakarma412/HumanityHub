import React, { useState, useEffect } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'

const Feed = () => {

  const [feed, setFeed] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFeed = async () => {
    setFeed(dummyPostsData)
    setLoading(false)
  }

  useEffect(() => {
    fetchFeed()
  }, [])

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      
      {/* Left Section (Stories + Posts) */}
      <div>
        <StoriesBar />

        <div className='p-4 space-y-6'>
          <h1>List of Posts</h1>

          {/* Render each post - optional */}
          {feed.map(post => (
            <div key={post.id} className='border rounded-lg p-4 shadow-sm'>
              {post.caption}
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div>
        <div className='font-semibold'>Sponsored</div>
        <h1 className='mt-4'>Recent Messages</h1>
      </div>
    </div>
  ) : (<Loading />)
}

export default Feed
