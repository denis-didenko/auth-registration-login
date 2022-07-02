import styles from '../Users/users.module.css';

const UserItem = ({ user }) => {
    return (
        <div className={styles.item}>
            <div className={styles.name}>
                <strong>Name:</strong> {user.firstName + ' ' + user.lastName}
            </div>
            <div className={styles.email}>
                <strong>Email:</strong> {user.email}
            </div>
        </div>
    );
};

export default UserItem;
