import React, { useEffect, useState } from 'react';
import CustomerTable from './components/CustomerTable';
import Transaction from './components/Transaction';
import './index.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('./data/customers.json');
        const data = await res.json();
        console.log('Fetched Data:', data);

        if (data.customers && data.transactions) {
          setCustomers(data.customers);
          setTransactions(data.transactions);
        } else {
          console.error('Unexpected data format', data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='app'>
      <h1>Transations Application</h1>
      <CustomerTable
        customers={customers}
        transactions={transactions}
        onSelectedCustomer={setSelectedCustomer}
      />
      {selectedCustomer && (
        <Transaction
          customer={selectedCustomer}
          transactions={transactions.filter(
            (t) => t.customer_id === selectedCustomer.id
          )}
        />
      )}
    </div>
  );
}

export default App;
