import {useState} from 'react';
import CheckoutTotal from '../CheckoutTotal/CheckoutTotal';
import CheckoutType from '../CheckoutType/CheckoutType';
import styles from './Checkout.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Checkout = (props) => {
    const [checkout, setCheckout] = useState(false);
    // const [invoiceCount, setInvoiceCount] = useState(0);
    const totalCheckout = (props.dueTotals.dueLaterTotal + props.dueTotals.dueNowTotal).toFixed(2);
    // let keys = Object.keys(props.selectedInvoices);
    // // Returns the keys of all selected invoices
    // let activeInvoices = keys.filter(key => {
    //     console.log('key', props.selectedInvoices[key])
    //     if(props.selectedInvoices[key] === true) {
    //         return key;
    //     }
    //     else {
    //         return;
    //     }
    // })
    // let invoiceCount = activeInvoices.length;

    const handleCheckout = () => {
        const value = !checkout;
        if(props.selectedCount > 0) {
            setCheckout(value);
            props.onSaveCheckout(value);
        }
        else {
            alert("Please select an invoice to checkout.")
        }
    }

    const handleConfirmation = () => {
        props.confirmedCheckout();
        // props.selectedCount = 0;
    }

    console.log('Invoice Count ', props.selectedCount)
    return (
            <div>
            { !checkout ?
                <div className={styles.container}>
                    <p>{props.selectedCount} invoices selected</p>
                    <CheckoutTotal checkoutAmount={totalCheckout} />

                    <Box className={styles.button} textAlign='center'>
                        <Button 
                            variant='contained'
                            onClick={handleCheckout}
                        >Pay now</Button>
                    </Box> 
                </div>
                :
                <>
                    <CheckoutType 
                        checkoutAmount={totalCheckout} 
                        onCancelCheckout={handleCheckout}
                        confirmedCheckout={handleConfirmation}
                    />
                </>
                
            }
            </div>
            
        
    )
}

export default Checkout;