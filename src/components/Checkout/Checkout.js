import {useState} from 'react';
import CheckoutType from '../CheckoutType/CheckoutType';
import styles from './Checkout.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Checkout = (props) => {
    const [checkout, setCheckout] = useState(false);
    let keys = Object.keys(props.selectedInvoices);
    // Returns the keys of all selected invoices
    let activeInvoices = keys.filter(key => {
        console.log('key', props.selectedInvoices[key])
        if(props.selectedInvoices[key] === true) {
            return key;
        }
        else {
            return;
        }
    })
    let invoiceCount = activeInvoices.length;

    const handleCheckout = () => {
        setCheckout(!checkout);
    }

    console.log('Invoice Count ', invoiceCount)
    return (
        <div className={styles.container}>
            { !checkout ?
                <p>{invoiceCount} invoices selected</p> :
                <>
                </>
            }
            <div className={styles.total}>
                <h5>Total</h5>
                <h5>${(props.dueTotals.dueLaterTotal + props.dueTotals.dueNowTotal).toFixed(2)}</h5>
            </div>
            { !checkout ?
                <Box className={styles.button} textAlign='center'>
                    <Button 
                        variant='contained'
                        onClick={handleCheckout}
                    >Pay now</Button>
                </Box> 
                :
                <>
                    <CheckoutType onCancelCheckout={handleCheckout}/>

                </>
            }
            
        </div>
    )
}

export default Checkout;