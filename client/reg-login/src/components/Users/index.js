import React, { useState, useEffect } from 'react';
import API from '../../api';
import UserItem from '../UserItem';

export const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        API.get('/users').then(response => {
            setUsers(response.data);
        });
    }, []);

    return (
        <div className='users'>
            {users.map(user => {
                return <UserItem key={user._id} user={user} />;
            })}
        </div>
    );
};

export default Users;
