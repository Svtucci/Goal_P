import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './history.css';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import Plot from 'react-plotly.js';

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    try {
      const response = await axios.get('/api/history');
      setHistoryData(response.data);
    } catch (error) {
      console.log('Error fetching history data', error);
    }
  };

  const handleDelete = async (entryId) => {
    try {
      await axios.delete(`/api/history/${entryId}`);
      fetchHistoryData();
    } catch (error) {
      console.log('Error deleting entry', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const CustomButton = styled(Button)`
    color: white;
    background-color: red;
    border: 1px solid white;

    &:hover {
      background-color: white;
      color: red;
    }
  `;

  const chartData = {
    x: historyData.map((entry) => formatDate(entry.data_date)),
    y: historyData.map((entry) => entry.amount),
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'blue' },
  };

  const chartLayout = {
    title: 'Water Consumption Chart',
    xaxis: {
      title: 'Date',
      autorange: 'reversed',
      autorangeReversed: true,
      tickangle: 45,
    },
    yaxis: { title: 'Amount (oz)' },
    height: 400,
  };

  return (
    <>
      <h2 className="heading">Water Consumption History</h2>
      <div className='data-table'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount (oz)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((entry) => (
              <tr key={entry.id}>
                <td>{formatDate(entry.data_date)}</td>
                <td className="amount">{entry.amount}</td>
                <td>
                  <CustomButton onClick={() => handleDelete(entry.id)}>
                    Delete
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Chart:</h2>
        <Plot data={[chartData]} layout={chartLayout} />
      </div>
    </>
  );
}

export default History;






