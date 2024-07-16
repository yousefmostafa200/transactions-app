import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const Transaction = ({ customer, transactions }) => {
  const data = transactions.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  return (
    <div className='transaction-graph'>
      <h3>Transactions for {customer.name}</h3>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='amount' stroke='#8884d8' />
      </LineChart>
    </div>
  );
};

export default Transaction;
