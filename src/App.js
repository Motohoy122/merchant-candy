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

  const invoices = [
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
  ]
  const [dueAmounts, setDueAmounts] = useState({
    dueNowTotal: 0,
    dueLaterTotal: 0,
  });

  const addCostHandler = obj => {
    if(obj.type === 'overdue'){
      const total = dueAmounts.dueNowTotal + obj.cost;
      setDueAmounts({
        ...dueAmounts, dueNowTotal: total
      });
      console.log('Total ', total);
      
    } 
    else if(obj.type === 'later') {
      const total = dueAmounts.dueLaterTotal + obj.cost;
      setDueAmounts({
        ...dueAmounts, dueLaterTotal: total
      });
    }
    
    
  };

  return (
    <div className={styles.app}>
      <Header user={userInfo}/>
      <Overview company={userInfo.company} dueTotals={dueAmounts}/>
      <div className={styles.container}>
        <InvoiceList className={styles.InvoiceList} invoices={invoices} onSaveCost={addCostHandler}/>
        <Checkout />
      </div>
      
    </div>
  );
}

export default App;
