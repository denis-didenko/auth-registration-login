import { useContext } from 'react';
import AuthContext from '../../context/auth';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import './header.css';

const Header = ({ toggleLoginForm, isVisibleLoginForm }) => {
    const { auth } = useContext(AuthContext);

    return (
        <header>
            <h1>Logo</h1>
            <div className='header-block'>
                {auth.isLoggedIn ? (
                    <>
                        <span className='user-email'>{auth.user.email}</span>
                        <button className='logout-btn' onClick={auth.logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <div className='login-btns'>
                        <button className='forms-switch-btn' onClick={toggleLoginForm}>
                            {isVisibleLoginForm ? 'Register' : 'Login'}
                        </button>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const decoded = jwt_decode(credentialResponse.credential);
                                auth.googleSign(decoded);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
