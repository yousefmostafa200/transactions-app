import React, { useState } from 'react';

function CustomerTable({ customers, transactions, onSelectedCustomer }) {
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('name');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) => {
    if (filterType === 'name') {
      return customer.name.toLowerCase().includes(filter.toLowerCase());
    } else {
      const customerTransactions = transactions.filter(
        (trans) => trans.customer_id === customer.id
      );
      const totalAmount = customerTransactions.reduce(
        (acc, trans) => acc + trans.amount,
        0
      );
      return totalAmount.toString().includes(filter);
    }
  });

  return (
    <div className='customer-table'>
      <div className='filter-controls'>
        <input
          type='text'
          placeholder={`Filter by customer ${filterType}`}
          value={filter}
          onChange={handleFilterChange}
        />
        <select value={filterType} onChange={handleFilterTypeChange}>
          <option value='name'>Name</option>
          <option value='amount'>Transaction Amount</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Transaction Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => {
            const customerTransactions = transactions.filter(
              (trans) => trans.customer_id === customer.id
            );

            let totalAmount = 0;
            for (const trans of customerTransactions) {
              totalAmount += trans.amount;
            }

            console.log(
              `Customer: ${customer.name}, Total Amount: ${totalAmount}`
            );

            return (
              <tr
                key={customer.id}
                onClick={() => onSelectedCustomer(customer)}
              >
                <td>{customer.name}</td>
                <td>{totalAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
