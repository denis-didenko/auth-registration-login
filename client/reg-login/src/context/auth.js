import { createContext, useState } from 'react';
import API from '../api';

const AuthContext = createContext({
    auth: {},
});

export const AuthContextProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});

    const auth = {
        isLoading,
        isLoggedIn,
        user,

        login: async (email, password) => {
            try {
                const response = await API.post('/login', { email, password });

                if (response?.data?.user) {
                    localStorage.setItem('token', response.data.accessToken);
                    setIsLoggedIn(true);
                    setUser(response.data.user);
                }

                return response;
            } catch (error) {
                console.error(error);
            }
        },

        register: async formData => {
            try {
                const response = await API.post('/register', formData);

                if (response.data.user) {
                    localStorage.setItem('token', response.data.accessToken);
                    setIsLoggedIn(true);
                    setUser(response.data.user);
                }

                return response;
            } catch (error) {
                console.error(error);
            }
        },

        logout: () => {
            try {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                setUser({});
            } catch (error) {
                console.log(error);
            }
        },

        googleSign: async formData => {
            try {
                const response = await API.post('/googlesign', formData);

                if (response.data.user) {
                    localStorage.setItem('token', response.data.accessToken);
                    setIsLoggedIn(true);
                    setUser(response.data.user);
                }

                return response;
            } catch (error) {
                console.log(error);
            }
        },

        checkAuth: async () => {
            setIsLoading(true);

            try {
                const response = await API.get('/refresh');

                if (response?.data?.user) {
                    localStorage.setItem('token', response.data.accessToken);
                    setIsLoggedIn(true);
                    setUser(response.data.user);
                }

                return response;
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        },
    };

    const store = { auth };

    return <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
