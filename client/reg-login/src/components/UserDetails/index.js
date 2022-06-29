import { useContext } from 'react';
import AuthContext from '../../context/auth';
import styles from './user-details.module.css';

const UserDetails = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className={styles.block}>
            <h1>User Details</h1>
            <div className={styles.name}>
                <strong>Name:</strong> {auth.user.firstName + ' ' + auth.user.lastName}
            </div>
            <div className={styles.email}>
                <strong>Email:</strong> {auth.user.email}
            </div>
        </div>
    );
};

export default UserDetails;
