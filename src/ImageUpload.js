import  Button  from '@mui/material/Button'
import firebase from 'firebase';
import React, { useState } from 'react'
import { db, storage } from './firebase'
import './ImageUpload.css'
function ImageUpload({ username }) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState("");
    const [progress, setProgress] = useState(0)
    const handleChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }

    }
    const handleUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot)=>{
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error)=>{
                //error function ...
                console.log(error);
                alert(error.message)
            },
            ()=>{
                // complete function...
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    })
                    setProgress(0);
                    setCaption("");
                    setImage("")
                })
            }
        )
    }
    return (
        <div className='imageUpload'>
            <progress value={progress} max="100"/>
            <input className="text_caption" type="text" placeholder="enter a description..." value={caption} onChange={event => setCaption(event.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
        
    )
}

export default ImageUpload
