import { useRef } from 'react'
import './login.css'

export default function Login() {
    const email = useRef()
    const password = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email.current.value)
        console.log(password.current.value)
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
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">Create a New Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
