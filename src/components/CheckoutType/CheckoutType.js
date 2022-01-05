import {useState} from 'react';
import CheckoutPayment from '../CheckoutPayment/CheckoutPayment';
import styles from './CheckoutType.module.css';
import Button from '@mui/material/Button';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';

const CheckoutType = (props) => {
    const [eCheck, setECheck] = useState(false);
    const handleECheck = () => {
        setECheck(!eCheck);
    }

    const handleCheckout = () => {
        props.onCancelCheckout();
    }

    return (
        <div>
        { 
        !eCheck ?
        <div className={styles.container}>
            <h2>Pay invoice with</h2>
            <div className={styles.buttons}>
                <Button variant="outlined" startIcon={<AccountBalanceIcon />}>
                    ACH
                </Button>
                <Button variant="outlined" className={styles.rightButton} startIcon={<PaymentIcon />}>
                    <img src={PaymentIcon} alt=''/>
                    Card
                </Button>
            </div>
            <div className={styles.buttons}>
                <Button 
                    variant="outlined"
                    onClick={handleECheck}
                >
                    <img src='' alt=''/>
                    eCheck
                </Button>
                <Button variant="outlined" className={styles.rightButton}>
                    Check
                </Button>
            </div>
            <div>
                <Button variant="outlined" onClick={handleCheckout}>Cancel</Button>
  
            </div>
        </div>
        :
        <>
            <CheckoutPayment onCancelCheckoutPayment={handleCheckout}/>
        </>
        }
        </div>
    )
}

export default CheckoutType;