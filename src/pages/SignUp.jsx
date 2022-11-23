import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

import { db } from '../firebase.config';
import { getFirestore } from "firebase/firestore";

import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value, // this will handle the on chnage both for email and password 
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })


      //navigate('/')

      console.log('First console');

      // Below code is for inserting user data into FB firestore db.
      const formDataCopy = { ...formData }
      delete formDataCopy.password // this will not include the password in the onjet which we will send to fiestore db
      console.log('T1');
      //formDataCopy.timestamp = serverTimestamp()
      console.log('T2');
      console.log('T2 --->> ',  user.uid);
      console.log('T2 --->> ',  formDataCopy);
      await setDoc(doc(getFirestore(), 'users', user.uid), formDataCopy)
      console.log('Second console');
      navigate('/')
    } catch (error) {
     // toast.error('Something went wrong with registration')
     console.log('Something went wrong with registration')
    }
  }


  return (
    <>
       <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
        <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            value={name}
            onChange={onChange}
          />

          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* <OAuth /> */}

        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp