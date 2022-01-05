import {useState} from 'react';
import CheckoutConfirmed from '../CheckoutConfirmed/CheckoutConfirmed';
import styles from './CheckoutReview.module.css';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const CheckoutReview = (props) => {
    const [reviewSelected, setReviewSelected] = useState(false);
    const handleReview = () => {
        setReviewSelected(true);
    }

    const handleCheckout = () => {
        props.onCancelCheckoutReview();
    }

    return (
        <div>
            {
            !reviewSelected ?
            <div>
                <h2>Confirm Payment</h2>
                <FormControl fullWidth sx={{ mb: "10px", mt:"10px" }}>
                    <InputLabel htmlFor="routing-number">Routing number</InputLabel>
                    <OutlinedInput id="routing-number"  label='Routing number*'  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: "10px" }}>
                    <InputLabel htmlFor="account-number">Account number</InputLabel>
                    <OutlinedInput id="account-number" label='Account number*' />
                
                </FormControl>
                <FormControlLabel control={<Checkbox />} label="I hereby authorize you to debit my account ending in 1111 for a one time payment in the amount of $10,000." />
                <div>
                    <Button variant="outlined" onClick={handleCheckout}>Cancel</Button>
                    <Button variant='contained' onClick={handleReview} >Review</Button>
                </div>
            </div>
            :
            <>
                <CheckoutConfirmed onCancelCheckoutConfirmed={handleCheckout}/>
            </>
            }
        </div>
    )
}

export default CheckoutReview;