import React, {useState, useEffect} from 'react'
import './Post.css'
import PostView from './PostView';
import firebase from 'firebase';
import { useGlobalContext } from './context';
const Post = ({ postId, username, imageUrl, caption }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')
    const {user, db} = useGlobalContext()
    useEffect(() => {
        let unsubscribe
        if(postId){
           unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot)=>{
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }

        return () => {
            unsubscribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId])

    
    
    const postComment = (e) =>{
        e.preventDefault();
        db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .add(
            {
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }
        )
        setComment('');
    } 
    return (
        <div className="post">
            <PostView 
            imageUrl={imageUrl} 
            caption={caption} 
            username={username}
            />
            <div className="post_comment">
                {
                    comments.map((comment)=>(
                        <p>
                            <strong>{comment.username}</strong>{comment.text}
                        </p>
                    ))
                }
            </div>
            {
                user && (
                    <form className="post_commentBox">
                        <input
                            className="post_input"
                            type="text"
                            placeholder="add a comment..."
                            value={comment}
                            onChange={(e)=>setComment(e.target.value)}
                        />
                        <button
                            className="post_button"
                            disabled={!comment}
                            type="submit"
                            onClick={postComment}
                        >
                            Post
                        </button>
                    </form>
                )
            }
        </div>

    )
}

export default Post
