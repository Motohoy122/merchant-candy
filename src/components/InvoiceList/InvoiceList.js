import {useState} from 'react';
import styles from './InvoiceList.module.css';
import Invoice from '../Invoice/Invoice';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const InvoiceList = (props) => {
    
    const [checked, setChecked] = useState({});
    const [checkedAll, setCheckedAll] = useState(false);
    let sum = 0;
    const handleChange = (event) => {
        setCheckedAll(!checkedAll);
        // console.log(selected);
    }

    const handleTotal = (event) => {
        console.log(event)
    }

    const handleCheck = id => event => {
        const invoiceArr = props.invoices.find(invoice => invoice.id === id);
        // console.log('ID ', id)
        // console.log(props.invoices.find(invoice => invoice.id === id).amount)
        setChecked({...checked, [id]: event.target.checked});
        console.log('Checked', event.target.checked)
        if(event.target.checked) {
            sum = sum + invoiceArr.amount
            console.log("Sum ", sum);
            if(Math.floor((Date.now() - invoiceArr.dueDate)/(1000 * 3600 * 24)) >= 0){
                props.onSaveCost({
                    cost: sum,
                    type: 'overdue'
                 });
            } else {
                props.onSaveCost({
                    cost: sum,
                    type: 'later'
                 });
            }
            
            
        }
        else if(!event.target.checked) {
            sum = sum - props.invoices.find(invoice => invoice.id === id).amount
            if(Math.floor((Date.now() - invoiceArr.dueDate)/(1000 * 3600 * 24)) >= 0){
                props.onSaveCost({
                cost: sum,
                type: 'overdue'
                });
            }
            else {
                props.onSaveCost({
                    cost: sum,
                    type: 'later'
                 });
            }
        }

    }

    // console.log("Checked ", checked);
    
    return (
        <div className={styles.container}>
            <FormControl 
                component="fieldset"
                sx={{width:'100%',}}
            >
            <FormGroup onChange={handleTotal}>
                <div className={styles.header}>
                    <h3>Due Now</h3>
                    <FormControlLabel 
                        onChange={handleChange}
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
                                        checked.id
                                    }
                                    onChange={handleCheck(invoice.id)}
                                    value={invoice.id}
                                    value={invoice.id}
                                />
                            } 
                            
                            label={
                            <div className={styles.invoiceDesc}>
                                <h4>Invoice #{invoice.id}</h4>
                                { Math.abs(Math.floor((Date.now() - invoice.dueDate)/(1000 * 3600 * 24))) >= 0 ?
                                    <p>{Math.abs(Math.floor((Date.now() - invoice.dueDate)/(1000 * 3600 * 24)))} days Overdue</p> :
                                    <>
                                    <p>Due in {Math.abs(Math.floor((Date.now() - invoice.dueDate)/(1000 * 3600 * 24)))} days</p>
                                    </>
                                }
                            </div>
                        } />        
                        <div>
                            <p>${invoice.amount}</p>
                        </div>
                    </div>
                    )
                })}
            </FormGroup>
            </FormControl>
        </div>
    )
}

export default InvoiceList;