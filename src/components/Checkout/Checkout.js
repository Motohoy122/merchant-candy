import styles from './Checkout.module.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Checkout = (props) => {
    return (
        <div className={styles.container}>
            <p>invoices selected</p>
            <div className={styles.total}>
                <h5>Total</h5>
                <h5>$0.00</h5>
            </div>
            <Box className={styles.button} textAlign='center'>
                <Button 
                    variant='contained'
                >Pay now</Button>
            </Box>
            
        </div>
    )
}

export default Checkout;