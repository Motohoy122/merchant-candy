import {useState} from 'react';
import Checkout from '../Checkout/Checkout';
import styles from './CheckoutConfirmed.module.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from '@mui/material/Link';


const CheckoutConfirmed = (props) => {
    const [completeCheckout, setCompleteCheckout] = useState(false);
    
    const handleCompleteCheckout = () => {
        
        props.onCancelCheckoutConfirmed();
        props.confirmedCheckout();
    }

    return (
        <div className={styles.container}>
            {
            ! completeCheckout ?
            <div className={styles.confirmed}>
                <CheckCircleOutlineIcon 
                    sx={{color: '#32de84'}}
                    fontSize='large'
                />
                <p>
                    Thank you for submitting a payment of ${props.checkoutAmount} from the checking account ending in {props.accountNum}.
                </p>
                <Link onClick={handleCompleteCheckout} sx={{color: '#B8B8B8', textDecoration: 'none'}} >Back to main menu</Link>
            </div>
            :
            <>
            </>
            }
        </div>
    )
}

export default CheckoutConfirmed;