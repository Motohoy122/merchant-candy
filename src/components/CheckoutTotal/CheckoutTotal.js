import styles from './CheckoutTotal.module.css';

const CheckoutTotal = (props) => {
    return (
        <div className={styles.total}>
            <h5>Total</h5>
            <h5>${props.checkoutAmount}</h5>
            
        </div>
    )
}

export default CheckoutTotal;