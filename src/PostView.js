import React from 'react'
import Avatar  from '@mui/material/Avatar'
const PostView = ({username, imageUrl, caption}) => {
    return (
        <>
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt="elonge"
                    src="avatar"
                />
                <h3>{username}</h3>
            </div>
            
            <img
                className="post_image"
                src={imageUrl}
                alt="react"
            />
            <h4 className="post_text"><strong>{username}</strong>{caption}</h4>
        </>
    )
}

export default PostView
