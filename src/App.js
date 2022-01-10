import {useState} from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Overview from './components/Overview/Overview';
import InvoiceList from './components/InvoiceList/InvoiceList';
import Checkout from './components/Checkout/Checkout';

function App() {
  const userInfo = {
    name: 'Tiffany Lee',
    email: 'tiffany@gmail.com',
    phone: '+1(646)321-3377', 
    company: 'Batney Co.'
  }

  const [invoices, setInvoices] = useState([
    {
      id: 1057,
      dueDate: new Date(2021, 11, 14),
      amount: 9219.45,

    },
    {
      id: 1051,
      dueDate: new Date(2021, 11, 15),
      amount: 42.87,

    },
    {
      id: 1050,
      dueDate: new Date(2021, 11, 15),
      amount: 17.15,

    },
    {
      id: 1047,
      dueDate: new Date(2021, 11, 15),
      amount: 75.06,

    },
    {
      id: 1046,
      dueDate: new Date(2021, 11, 15),
      amount: 226.29,

    },
  ]);
  const [dueAmounts, setDueAmounts] = useState({
    dueNowTotal: 0,
    dueLaterTotal: 0,
  });

  const [selectedInvoices, setSelectedInvoices] = useState({});
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const [completedCheckout, setCompletedCheckout] = useState(false);

  const addCostHandler = obj => {
    if(obj.type === 'overdue'){
      const total = dueAmounts.dueNowTotal + obj.cost;
      setDueAmounts({
        ...dueAmounts, dueNowTotal: total
      });
      
      
    } 
    else if(obj.type === 'later') {
      const total = dueAmounts.dueLaterTotal + obj.cost;
      setDueAmounts({
        ...dueAmounts, dueLaterTotal: total
      });
    }
  };

  const checkboxHandler = obj => {
    setSelectedInvoices(obj);

    const keys = Object.keys(obj);
    // Returns the keys of all selected invoices
    const activeInvoices = keys.filter(key => {
        console.log('key', obj[key])
        if(obj[key] === true) {
            return key;
        }
        else {
            return;
        }
    })
    setInvoiceCount(activeInvoices.length);
  }

  const handleCheckout = value => {
    setCheckout(value);
    setCompletedCheckout(false)
    if(value === false) {
      checkboxHandler({})
      
    }
  }

  // console.log('Selected Invoices from App.js ', selectedInvoices);

  const handleConfirmation = () => {
    // setSelectedInvoices({})
    setCompletedCheckout(true)
    setInvoices(invoices.filter( invoice => {
      // console.log('Invoice ', selectedInvoices[invoice.id]  !== true);
      if (selectedInvoices[invoice.id] !== true) {
        return invoice
      } else {
        return
      }
      
      })
    )
    // setInvoiceCount(0);
    // setDueAmounts({
    //   ...dueAmounts, dueNowTotal: 0, dueLaterTotal: 0,
    // });
  }

  const changeConfirmationHandler = () => {
    setCompletedCheckout(false);
    checkboxHandler({})
    setDueAmounts({
      dueNowTotal: 0,
      dueLaterTotal: 0,
    })
    // setCheckout(false)
  }
  
  // console.log('Invoices ', invoices);
  // console.log('Selected Invoices ', total);
 
  return (
    <div className={styles.app}>
      <Header user={userInfo}/>
      <Overview company={userInfo.company} dueTotals={dueAmounts}/>
      {/* <button onClick={handleConfirmation}>Test</button> */}
      <div className={styles.container}>
        <InvoiceList 
          className={styles.InvoiceList} 
          invoices={invoices} onSaveCost={addCostHandler} 
          onCheckedBoxes={checkboxHandler} 
          checkout={checkout}
          confirmedCheckout={completedCheckout}
          onChangeConfirmCheckout={changeConfirmationHandler}
        />
        <Checkout 
          dueTotals={dueAmounts} 
          selectedCount={invoiceCount}
          onSaveCheckout={handleCheckout}
          confirmedCheckout={handleConfirmation}
        />
        
      </div>
    </div>
  );
}

export default App;
