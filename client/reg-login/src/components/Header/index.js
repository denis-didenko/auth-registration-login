import { useContext } from 'react';
import AuthContext from '../../context/auth';
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
                    <button className='forms-switch-btn' onClick={toggleLoginForm}>
                        {isVisibleLoginForm ? 'Register' : 'Login'}
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
