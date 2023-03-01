import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './profile.css'

export default function Profile() {
  const [user, setUser] = useState({})
  const username = useParams().username

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios(`/users?username=${ username }`)
      setUser(res.data)
    }

    fetchUsers()
}, [username])

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src={ PF + (user.coverPicture ? user.coverPicture : 'person/noCover.png') } alt="" className='profileCoverImg' />
                    <img src={ PF + (user.profilePicture ? user.profilePicture : 'person/noAvatar.png') } alt="" className='profileUserImg' />
                </div>

                <div className="profileInfo">
                    <h4 className="profileInfoName">{ user.username }</h4>
                    <span className="profileInfoDesc">{ user.desc }</span>
                </div>
            </div>

            <div className="profileRightBottom">
                <Feed username={ username } />
                <Rightbar user={ user } />
            </div>
        </div>
      </div>
    </>
  )
}
