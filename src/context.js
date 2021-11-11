import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from './firebase';

const AppContext = createContext();

const AppProvider =({children})=>{
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [openSignIn, setOpenSignIn] = useState(false)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // user is logged in        
        setUser(authUser);
      }else{
          // user is logged out
        setUser(null)
      }
    })
    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  },[user, username])
  
  useEffect(()=>{
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      //every time we have new post, this code is runed...
      setPosts(snapshot.docs.map(doc => ({ 
        id: doc.id, 
        post: doc.data()
      })))
    })
  },[])
  const signUp = (e) => {
    e.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.updateProfile(
        {
          displayName: username
        }
      )
      .then((authUser) =>{
        setUser(authUser);
      })
    })
    .catch((error)=>alert(error.message))
    setOpen(false)
  }
  const signIn =(e)=>{
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))

    setOpenSignIn(false);
  }
  
    return(
        <AppContext.Provider 
        value={{
            posts,
            user, 
            setOpenSignIn, 
            setOpen,
            open,
            openSignIn, 
            username, 
            setUsername, 
            email, 
            setEmail, 
            password, 
            setPassword, 
            signIn, 
            signUp,
            db,
            auth
        }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppContext, AppProvider }