import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'
import { auth, provider } from './LoginGoogle/config'
import { signInWithPopup } from 'firebase/auth'
import MainContent from './MainContent'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate();
    const { theme, toggle, dark } = useContext(ThemeContext)
    const [value, setValue] = useState('')

    const handleLogin = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email)
            localStorage.setItem('email', data.user.email)
        })
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    })

    return (
        <div style={{
            paddingTop: '100px',
            height: '62vh',
            display: 'flex',
            justifyContent: 'center',
        }}>
            {value ?
                <>
                    {navigate('/')}
                    {window.location.reload()}
                </>

                :
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ color: theme.color, marginBottom: '20px' }}>Login</h1>
                    <button
                        onClick={handleLogin}
                        style={{
                            backgroundColor: '#ffff',
                            color: 'black',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '12px 24px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            transition: 'background-color 0.3s, transform 0.3s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F7F8'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffff'}
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                            alt="Google Logo"
                            style={{ width: '20px', marginRight: '10px' }}
                        />
                        Login with Google
                    </button>
                </div>
            }
        </div>
    )
}
