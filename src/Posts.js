import React from 'react'
import { useGlobalContext } from './context'
import ImageUpload from './ImageUpload';
import Post from './Post';
const Posts = () => {
    const {user, posts} = useGlobalContext()
    return (
        <>
            
                <div className="app_posts">
                    {
                        !user && (
                            <h2>Welcome! you should register and signed to add post or comment</h2>
                        )
                    }
                    
                    {
                        user?.displayName && (
                        <ImageUpload
                            username={ user.displayName }
                        />
                        ) 
                    }
                    {
                        posts.map(({ id, post })=>(
                            <Post 
                                key={id} 
                                postId={id} 
                                user={user} 
                                imageUrl={post.imageUrl} 
                                caption={post.caption} 
                                username={post.username}
                            />
                        ))
                    }
                </div>   
                
            
        </>
    )
}

export default Posts
