import {useState} from 'react';
import styles from './Invoice.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Invoice = (props) => {
    const [checked, setChecked] = useState(false);
    const [checkedAll, setCheckedAll] = useState(true);
    const daysDifference = Date.now() - props.dueDate;
    const daysOverdue = Math.floor(daysDifference/(1000 * 3600 * 24));

    const handleCheck = (event) => {
        
        setChecked(!checked);
        
    }
    
    

    // setCheckedAll(props.value);
    // console.log(checkedAll);

    return (
        <div className={styles.invoice}>
            <FormControlLabel 
                control={
                    <Checkbox sx={{
                            color: '#fc335b',
                            '&.Mui-checked': {
                                color: '#fc335b',
                            },
                        }}
                        checked={
                            checked
                        }
                        onChange={handleCheck}
                    />

                } 
                
                label={
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