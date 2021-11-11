import React from 'react'
import HeaderLogo from './HeaderLogo'
import  Modal  from '@mui/material/Modal';
import  Button  from '@mui/material/Button';
import  Input  from '@mui/material/Input';
import { useGlobalContext } from './context';
const buttonHandle ={
    background: "white", 
    marginTop: "5px"
  }
const ModalSignUpAndSignIn = () => {
    const {open, setOpen, openSignIn, setOpenSignIn, username, setUsername, email, setEmail, password, setPassword, signIn, signUp} = useGlobalContext();
    return (
        <Modal
            open={open ? open : openSignIn}
            onClose={open ? ()=>setOpen(false) : ()=>setOpenSignIn(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modal_style">
            <form className="app_signUp">
                <center>
                    <HeaderLogo/>
                </center>
                {
                    open && (
                    <Input
                        className="input_change"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    )
                }
                
                <Input
                    className="input_change"
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <Input
                    className="input_change"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                {
                    (open && (
                    <Button type="submit" onClick={signUp} style={buttonHandle}>signup</Button>
                    )) || (
                    <Button type="submit" onClick={signIn} style={buttonHandle}>Sign In</Button>
                    )
                }
            </form>
            </div>
        </Modal>
    )
}

export default ModalSignUpAndSignIn
