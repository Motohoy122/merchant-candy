import {useState} from 'react';
import CheckoutReview from '../CheckoutReview/CheckoutReview';
import CheckoutTotal from '../CheckoutTotal/CheckoutTotal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import styles from './CheckoutPayment.module.css';

const CheckoutPayment = (props) => {
    const [isRouting, setIsRouting] = useState(false);
    const [routingNumber, setRoutingNumber] = useState();
    const [isAccount, setIsAccount] = useState(false);
    const [accountNumber, setAccountNumber] = useState();
    const [isConfirmAccount, setIsConfirmAccount] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [reviewSelected, setReviewSelected] = useState(false);
    
    const handleRouting = (event) => {      
        if(/^\d{9}$/.test(event.target.value)) {
            setIsRouting(true);
        } else {
            setIsRouting(false);
        }
        setRoutingNumber(event.target.value)
        console.log('Routing ', /^\d{9}$/.test(event.target.value))
    }
    
    const handleAccount = (event) => {
        if(/^\d{8,12}$/.test(event.target.value)) {
            setIsAccount(true);
        } else {
            setIsAccount(false);
        }

        setAccountNumber(event.target.value);
        
    }

    const handleConfirmAccount = (event) => {
        if(/^\d{8,12}$/.test(event.target.value) && event.target.value === accountNumber) {
            setIsConfirmAccount(true);
        } else {
            setIsConfirmAccount(false);
        }
        
    }

    const handleSelect = (event) => {
        setIsSelected(event.target.value)
        // console.log('Select ', event.target.value)
    }

    const handleReview = () => {
        if(isRouting && isAccount && isConfirmAccount && isSelected){
            setReviewSelected(true);
        } else {
            setReviewSelected(false);
        }
    }

    const handleCheckout = () => {
        props.onCancelCheckoutPayment();
    }

    const handleConfirmation = () => {
        props.confirmedCheckout()
    }

    return (
        <div>
            {!reviewSelected ?
            <div className={styles.container}>
                <CheckoutTotal checkoutAmount={props.checkoutAmount} />
                <h2>Pay invoice eCheck</h2>
                <p>Securely send an electronic check payment. Payments may take 2-3 business days to process</p>
                <FormControl fullWidth sx={{ mb: "10px", mt:"10px" }}>
                    <InputLabel htmlFor="routing-number">Routing number</InputLabel>
                    <OutlinedInput 
                        onChange={handleRouting} 
                        id="routing-number" 
                        label='Routing number*'  
                        error={!isRouting}
                        helperText={!isRouting ? 'Invalid routing number' : ''}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ mb: "10px" }}>
                    <InputLabel htmlFor="account-number">Account number</InputLabel>
                    <OutlinedInput 
                        onChange={handleAccount} 
                        id="account-number" 
                        label='Account number*' 
                        error={!isAccount}
                        helperText={!isAccount ? 'Invalid account number' : ''}    
                    />
                
                </FormControl>
                <FormControl fullWidth sx={{ mb: "10px" }}>
                    <InputLabel htmlFor="confirm-account-number">Confirm account number</InputLabel>
                    <OutlinedInput 
                        onChange={handleConfirmAccount} 
                        id="confirm-account-number"  
                        label='Confirm account number*'
                        error={!isConfirmAccount}
                        helperText={!isConfirmAccount ? 'Does not match account number' : ''}    
                    />
                </FormControl>
                <FormControl fullWidth sx={{ mb: "10px" }}>
                    <InputLabel id="account-type">Account Type</InputLabel>
                    <Select
                        labelId="account-type"
                        id="account-type"
                        value={isSelected}
                        label="Account Type"
                        onChange={handleSelect}
                        error={!isSelected}
                        helperText={!isSelected ? 'Please select an option' : ''}   
                    >
                    <MenuItem value='checking'>Checkings</MenuItem>
                    <MenuItem value='savings'>Savings</MenuItem>
                    </Select>
                </FormControl>  
                <div className={styles.button}>
                    <div>
                        <Button variant="outlined" className={styles.cancel} onClick={handleCheckout}>Cancel</Button>
                    </div>
                    <div className={styles.review}>
                        <Button variant="outlined" onClick={handleReview} >Review</Button>
                    </div>
                </div>
            </div> :
            <>
                <CheckoutReview 
                    routingNum={routingNumber} 
                    accountNum={accountNumber} 
                    checkoutAmount={props.checkoutAmount} 
                    onCancelCheckoutReview={handleCheckout} 
                    confirmedCheckout={handleConfirmation}
                />
            </>
            }
            
        </div>
    )
}

export default CheckoutPayment;