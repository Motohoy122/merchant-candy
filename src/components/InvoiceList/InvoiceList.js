import styles from './InvoiceList.module.css';
import Invoice from '../Invoice/Invoice';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const InvoiceList = (props) => {
    return (
        <div>
            <FormGroup>
                <div className={styles.header}>
                    <h3>Due Now</h3>
                    <FormControlLabel 
                        control={<Checkbox 
                            sx={{
                                color: '#fc335b',
                                '&.Mui-checked': {
                                    color: '#fc335b',
                                },
                            }}
                        />}
                        label='Select All'
                    />
                </div>
                {props.invoices.map(invoice => {
                    return(

                        <Invoice 
                            id={invoice.id}
                            dueDate={invoice.dueDate}
                            amount={invoice.amount}
                        />
                    )
                })}
            </FormGroup>
        </div>
    )
}

export default InvoiceList;