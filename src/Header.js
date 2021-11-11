import React from 'react'
import { useGlobalContext } from './context'
import HeaderLogo from './HeaderLogo'
import  Button  from '@mui/material/Button';
import { auth } from './firebase'
const Header = () => {
    const {user, setOpenSignIn, setOpen} = useGlobalContext()
    return (
        <div className="app_header">
            <HeaderLogo/>
            {
            user ? (
                <Button onClick={() => auth.signOut()}>
                Lougout
                </Button>
            ) : (
                <div className="app_loginContainer">
                    <Button onClick={() => setOpenSignIn(true)}>
                    Sign In
                    </Button>
                    <Button onClick={() => setOpen(true)}>
                    Sign Up
                    </Button>
                </div>
            )
            }

        </div> 
    )
}

export default Header
