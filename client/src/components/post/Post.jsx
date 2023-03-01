import './post.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import * as timeago from 'timeago.js'

import { MoreVert } from '@mui/icons-material'
import { Users } from '../../dummyData'


export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        const fetchUsers = async () => {
          const res = await axios(`/users?userId=${ post.userId }`)
          setUser(res.data)
        }
    
        fetchUsers()
    }, [post.userId])

    const handleClick = () => {
        setLike(isLiked? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={ `profile/${ user.username }` }>
                            <img src={ PF + (user.profilePicture ? user.profilePicture : 'person/noAvatar.png') } alt="" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">
                            { user.username }
                        </span>
                        <span className="postDate">{ timeago.format(post.createdAt) }</span>
                    </div>

                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>

                <div className="postCenter">
                    <span className="postText">{ post?.desc }</span>
                    <img src={ PF + post.img } alt="" className="postImg" />
                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={ `${ PF }like.png` } alt="" onClick={ handleClick } className='likeIcon' />
                        <img src={ `${ PF }heart.png` } alt="" onClick={ handleClick } className='likeIcon' />
                        <span className="postLikeCounter">{ like } people like it</span>
                    </div>

                    <div className="postBottomRight">
                        <span className="postCommentText">{ post.comment } comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
