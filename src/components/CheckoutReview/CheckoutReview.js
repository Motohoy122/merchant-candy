import {useState} from 'react';
import CheckoutConfirmed from '../CheckoutConfirmed/CheckoutConfirmed';
import CheckoutTotal from '../CheckoutTotal/CheckoutTotal';
import styles from './CheckoutReview.module.css';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

const CheckoutReview = (props) => {
    const [isRouting, setIsRouting] = useState(false);
    const [isAccount, setIsAccount] = useState(false);
    const [checked, setChecked] = useState(false);
    const [reviewSelected, setReviewSelected] = useState(false);

    const handleRouting = (event) => {      
        if(event.target.value === props.routingNum) {
            setIsRouting(true);
        } else {
            setIsRouting(false);
        }
        console.log(props.routingNum)
    }
    
    const handleAccount = (event) => {
        if(event.target.value === props.accountNum) {
            setIsAccount(true);
        } else {
            setIsAccount(false);
        }
    }

    const handleReview = () => {
        if(isRouting && isAccount && checked) {
            setReviewSelected(true);
        } else {
            setReviewSelected(false);
        }
    }

    const handleCheckbox = () => {
        setChecked(!checked);
    }

    const handleCheckout = () => {
        props.onCancelCheckoutReview();
    }

    const handleConfirmation = () => {
        props.confirmedCheckout()
        console.log('confirm checkout')
    }

    const accountNumber = props.accountNum.slice(props.accountNum.length - 4);

    return (
        <div >
            {
            !reviewSelected ?
            <div className={styles.container}>
                <CheckoutTotal checkoutAmount={props.checkoutAmount} />
                <h2>Confirm Payment</h2>
                <FormControl fullWidth sx={{ mb: "10px", mt:"10px" }}>
                    <InputLabel htmlFor="routing-number">Routing number</InputLabel>
                    <OutlinedInput 
                        onChange={handleRouting} 
                        id="routing-number"  
                        label='Routing number*'  
                        error={!isRouting}
                        helperText={!isRouting ? 'Does not match the previously entered routing number value' : ''}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ mb: "10px" }}>
                    <InputLabel htmlFor="account-number">Account number</InputLabel>
                    <OutlinedInput 
                        onChange={handleAccount} 
                        id="account-number" 
                        label='Account number*' 
                        error={!isAccount}
                        helperText={!isAccount ? 'Does not match the previously entered account number value' : ''}   
                    />
                
                </FormControl>
                <FormControlLabel 
                    control={<Checkbox />} 
                    label={"I hereby authorize you to debit my account ending in " + accountNumber + " for a one time payment in the amount of $" + props.checkoutAmount + "."} 
                    onChange={handleCheckbox}    
                />
                <div className={styles.button}>
                    <Button variant="outlined" onClick={handleCheckout}>Cancel</Button>
                    <div className={styles.review}>
                        <Button variant="contained" onClick={handleReview} >Review</Button>
                    </div>
                </div>
            </div>
            :
            <>
                <CheckoutConfirmed 
                    accountNum={accountNumber} 
                    checkoutAmount={props.checkoutAmount} 
                    confirmedCheckout={handleConfirmation}
                    onCancelCheckoutConfirmed={handleCheckout}
                />
            </>
            }
        </div>
    )
}

export default CheckoutReview;