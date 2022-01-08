import {useState, useEffect} from 'react';
import styles from './InvoiceList.module.css';
import Invoice from '../Invoice/Invoice';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const InvoiceList = (props) => {
    let obj = {};
    const checkedObj = props.invoices.map(invoice => {
        obj[invoice.id] = false;
    })
    
    const [checked, setChecked] = useState(checkedObj);
    const [checkedAll, setCheckedAll] = useState(false);
    let sum = 0;
    const handleChange = (event) => {
        setCheckedAll(!checkedAll);
        // console.log(selected);
    }

    const handleSelectAll = (event) => {
        let invoiceObj;
        setCheckedAll(!checkedAll);
        if(event.target.checked) {
            invoiceObj = props.invoices.reduce((o, invoice) => ({ ...o, [invoice.id]: true }), {});
        }
        else {
            invoiceObj = props.invoices.reduce((o, invoice) => ({ ...o, [invoice.id]: false }), {});
        }
        // console.log('Select All ', invoiceObj);
        // setCheckedAll(!checkedAll);
        setChecked(invoiceObj);
    }

    const handleCheck = id => event => {
        const invoiceArr = props.invoices.find(invoice => invoice.id === id);
        
        setChecked({...checked, [id]: event.target.checked});
  
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
        props.onCheckedBoxes({...checked, [id]: event.target.checked});
    }

    console.log("Checked ", checked);
    
    useEffect(() => {
        if(props.confirmedCheckout === true) {
            setChecked({})
            
            props.onCheckedBoxes({...checked})
            props.onChangeConfirmCheckout(false)
        }
    });

    return (
        <div className={styles.container}>
            <FormControl 
                component="fieldset"
                sx={{width:'100%',}}
            >
            <FormGroup >
                <div className={styles.header}>
                    <h3>Due Now</h3>
                    {/* {!props.checkout ? 
                    <FormControlLabel 
                        control={<Checkbox  
                            sx={{
                                color: '#fc335b',
                                '&.Mui-checked': {
                                    color: '#fc335b',
                                },
                            }}
                            onChange={handleSelectAll}
                        />}
                        label='Select All'
                    />
                    :
                    <>
                    </>
                    } */}
                </div>
                {props.invoices.map(invoice => {
                    return(
                    <div>
                    {
                    checked[invoice.id] === true || !props.checkout ?
                    
                    <div className={styles.invoice}>
                        {console.log('Checked Invoice Id', invoice.id in checked)}
                        <FormControlLabel 
                            control={
                                !props.checkout ? 
                                <Checkbox sx={{
                                        color: '#fc335b',
                                        '&.Mui-checked': {
                                            color: '#fc335b',
                                        },
                                    }}
                                    
                                    checked={
                                        checked[invoice.id]
                                    }
                                    onChange={handleCheck(invoice.id)}
                                    value={invoice.id}
                                    
                                />
                                :
                                <>
                                </>
                                
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
                    :
                    <>
                    </>
                    }
                    </div>
                    )
                })}
            </FormGroup>
            </FormControl>
        </div>
    )
}

export default InvoiceList;