import styles from './Header.module.css';
import logo from '../../images/everyday-logo.png';

const Header = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt='Everyday Designs Logo'/>
            </div>
            <div className={styles.userInfo}>
                <p>{props.user.name}</p>
                <p>{props.user.email}</p>
                <p>{props.user.phone}</p>
            </div>
        </div>
    )
}

export default Header;