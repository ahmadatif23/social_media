import axios from 'axios'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity(`Password don't match!`)
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }

            try {
                await axios.post('auth/register', user)
                navigate('/login')
            } catch (err) {
                console.log(err)
            }
        }
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
                        <input placeholder='Username' required ref={ username } className="loginInput" />
                        <input placeholder='Email' type='email' required ref={ email } className="loginInput" />
                        <input placeholder='Password' type='password' minLength='6' required ref={ password } className="loginInput" />
                        <input placeholder='Confirm Password' type='password' minLength='6' required ref={ confirmPassword } className="loginInput" />
                        <button type='submit' className="loginButton">Sign Up</button>
                        <button className="loginRegisterButton">Log Into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
