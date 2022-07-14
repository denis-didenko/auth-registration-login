import { useState, useContext, useLayoutEffect } from 'react';
import AuthContext from '../../context/auth';
import Loading from '../Loading';
import Header from '../Header';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import Users from '../Users';
import './app.css';

const App = () => {
    const [isVisibleLoginForm, setIsVisibleLoginForm] = useState(false);
    const { auth } = useContext(AuthContext);

    const toggleLoginForm = () => {
        setIsVisibleLoginForm(!isVisibleLoginForm);
    };

    useLayoutEffect(() => {
        if (localStorage.getItem('token')) {
            auth.checkAuth();
        }
    }, [auth]);

    if (auth.isLoading) {
        return <Loading />;
    }

    return (
        <div className='wrapper'>
            <Header isVisibleLoginForm={isVisibleLoginForm} toggleLoginForm={toggleLoginForm} />
            <main>
                {auth.isLoggedIn ? (
                    <Users />
                ) : (
                    <div className='form-container'>{isVisibleLoginForm ? <LoginForm /> : <RegisterForm />}</div>
                )}
            </main>
        </div>
    );
};

export default App;
