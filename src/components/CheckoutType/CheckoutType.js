import {useState} from 'react';
import CheckoutPayment from '../CheckoutPayment/CheckoutPayment';
import CheckoutTotal from '../CheckoutTotal/CheckoutTotal';
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

    const handleConfirmation = () => {
        props.confirmedCheckout()
    }

    return (
        <div >
        { 
        !eCheck ?
        <div className={styles.container}>
            <CheckoutTotal checkoutAmount={props.checkoutAmount} />
            <h2>Pay invoice with</h2>
            <div className={styles.buttons}>
                <Button variant="outlined" startIcon={<AccountBalanceIcon />}>
                    ACH
                </Button>
                <Button variant="outlined" sx={{ml: '10px'}} startIcon={<PaymentIcon />}>
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
                <Button variant="outlined" sx={{ml: '10px'}} >
                    Check
                </Button>
            </div>
            <div className={styles.cancel}>
                <Button variant="outlined" onClick={handleCheckout}>Cancel</Button>
  
            </div>
        </div>
        :
        <>
            <CheckoutPayment 
                checkoutAmount={props.checkoutAmount} 
                onCancelCheckoutPayment={handleCheckout}
                confirmedCheckout={handleConfirmation}
            />
        </>
        }
        </div>
    )
}

export default CheckoutType;