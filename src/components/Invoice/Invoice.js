
import styles from './Invoice.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Invoice = (props) => {
    const daysDifference = Date.now() - props.dueDate;
    const daysOverdue = Math.floor(daysDifference/(1000 * 3600 * 24));
    console.log(Math.floor(daysOverdue))
    return (
        <div className={styles.container}>
            <FormControlLabel 
                control={<Checkbox sx={{
                    color: '#fc335b',
                    '&.Mui-checked': {
                        color: '#fc335b',
                    },
                }}
            />} label={
                <div className={styles.invoiceDesc}>
                    <h4>Invoice #{props.id}</h4>
                    { daysOverdue >= 0 ?
                        <p>{daysOverdue} days Overdue</p> :
                        <>
                        <p>Due in {Math.abs(daysOverdue)} days</p>
                        </>
                    }
                </div>
            } />
            
                    
                    <div>
                        <p>${props.amount}</p>
                    </div>
                
        </div>
    )
}

export default Invoice;