import {useState} from 'react';
import Checkout from '../Checkout/Checkout';
import styles from './CheckoutConfirmed.module.css';
import Link from '@mui/material/Link';


const CheckoutConfirmed = (props) => {
    const [completeCheckout, setCompleteCheckout] = useState(false);
    
    const handleCompleteCheckout = () => {
        props.onCancelCheckoutConfirmed();
    }

    return (
        <div>
            {
            ! completeCheckout ?
            <div>
                <p>
                    Thank you for submitting a payment of $10,212.00 from the checking account ending in 1111.
                </p>
                <Link onClick={handleCompleteCheckout}>Back to main menu</Link>
            </div>
            :
            <>
            </>
            }
        </div>
    )
}

export default CheckoutConfirmed;