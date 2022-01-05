import {useState} from 'react';
import CheckoutReview from '../CheckoutReview/CheckoutReview';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import styles from './CheckoutPayment.module.css';

const CheckoutPayment = (props) => {
    const [reviewSelected, setReviewSelected] = useState(false);
    const handleReview = () => {
        setReviewSelected(true);
    }

    const handleCheckout = () => {
        props.onCancelCheckoutPayment();
    }

    return (
        <div>
            {!reviewSelected ?
            <div className={styles.container}>
                <h2>Pay invoice eCheck</h2>
                <p>Securely send an electronic check payment. Payments may take 2-3 business days to process</p>
                <FormControl fullWidth sx={{ mb: "10px", mt:"10px" }}>
                    <InputLabel htmlFor="routing-number">Routing number</InputLabel>
                    <OutlinedInput id="routing-number"  label='Routing number*'  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: "10px" }}>
                    <InputLabel htmlFor="account-number">Account number</InputLabel>
                    <OutlinedInput id="account-number" label='Account number*' />
                
                </FormControl>
                <FormControl fullWidth sx={{ mb: "10px" }}>
                    <InputLabel htmlFor="confirm-account-number">Confirm account number</InputLabel>
                    <OutlinedInput id="confirm-account-number"  label='Confirm account number*'/>
                </FormControl>
                <FormControl fullWidth sx={{ mb: "10px" }}>
                    <InputLabel id="account-type">Account Type</InputLabel>
                    <Select
                    labelId="account-type"
                    id="account-type"
                    value=''
                    label="Account Type"
                    onChange=''
                    >
                    <MenuItem value=''>Checkings</MenuItem>
                    <MenuItem value=''>Savings</MenuItem>
                    </Select>
                </FormControl>  
                <div>
                    <Button variant="outlined" onClick={handleCheckout}>Cancel</Button>
                    <Button variant='contained' onClick={handleReview} >Review</Button>
                </div>
            </div> :
            <>
                <CheckoutReview onCancelCheckoutReview={handleCheckout}/>
            </>
            }
            
        </div>
    )
}

export default CheckoutPayment;