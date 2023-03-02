import { useContext, useRef } from 'react'
import { CircularProgress } from '@mui/material'
import './login.css'

import { AuthContext } from '../../context/AuthContext'
import { loginCall } from '../../apiCalls'

export default function Login() {
    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">socialLah</h3>
                    <span className="loginDesc">
                        Connect with friends and the world arounf you with socialLah.
                    </span>
                </div>

                <div className="loginRight">
                    <form className="loginBox" onSubmit={ handleSubmit }>
                        <input required ref={ email } placeholder='Email' type='email' className="loginInput" />
                        <input required ref={ password } minLength="6" placeholder='Password' type='password' className="loginInput" />

                        <button className="loginButton" disabled={ isFetching } >{ isFetching ? <CircularProgress size='25px' /> : 'Log In' }</button>

                        <span className="loginForgot">Forgot Password?</span>

                        <button className="loginRegisterButton" disabled={ isFetching } >Create a New Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
