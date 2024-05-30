import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import './OAuth.css'
import { app } from '../../firebase'
import { signInSuccess } from '../../Redux/user/userSlice'
const OAuth = () => {
const dispatch = useDispatch();
const navigate = useNavigate()

const handleGoogleClick = async () =>{
    try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)

        const result = await signInWithPopup(auth, provider)
       

        const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
          });
          const data = await res.json();
          dispatch(signInSuccess(data))
          navigate("/")
    } catch (error) {
        console.log("cannot signin with google", error);
    }
}

  return (
    <button type='button' onClick={handleGoogleClick} className='OAuth-btn'>Continue with Google</button>
  )
}

export default OAuth