import './feed.css'

import { useEffect, useState } from 'react'
import axios from 'axios'

import Share from '../share/Share'
import Post from '../post/Post'

export default function Feed({ username }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username ?
      await axios(`/posts/profile/${ username }`) :
      await axios('/posts/timeline/63fc1e3e86d46e35fec67334')
      setPosts(res.data)
    }

    fetchPosts()
  }, [username])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share />

        {posts?.map(p => (
            <Post key={ p._id } post={ p } />
        ))}
      </div>
    </div>
  )
}
