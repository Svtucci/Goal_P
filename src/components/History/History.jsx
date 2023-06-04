import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './history.css';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';

function History() {
  const [historyData, setHistoryData] = useState([]);
  const goal = useSelector((store) => store.user.daily_goal);
  const [historyTableData, setHistoryTableData] = useState({});

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
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
    }).format(date);
    return formattedDate;
  };

  const calculateDailyTotal = (date) => {
    const entries = historyData.filter((entry) => {
      const entryDate = new Date(entry.data_date);
      return entryDate.toDateString() === date.toDateString();
    });
    return entries.reduce((total, entry) => total + entry.amount, 0);
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

  useEffect(() => {
    const groupedData = historyData.reduce((tableData, entry) => {
      const entryDate = new Date(entry.data_date);
      const dateKey = entryDate.toDateString();
      if (!tableData[dateKey]) {
        tableData[dateKey] = {
          date: entryDate,
          totalAmount: 0,
          entries: [],
        };
      }
      tableData[dateKey].totalAmount += entry.amount;
      tableData[dateKey].entries.push(entry);
      return tableData;
    }, {});
    setHistoryTableData(groupedData);
  }, [historyData]);

  const chartData = {
    x: Object.values(historyTableData)
      .map((entryGroup) => formatDate(entryGroup.date))
      .reverse(), // Reverse the order of dates
    y: Object.values(historyTableData)
      .map((entryGroup) => entryGroup.totalAmount)
      .reverse(), // Reverse the order of amounts
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'white' },
  };
  
  

  const chartLayout = {
    title: {
      text: '',
      font: {
        color: 'White',
        size: 18,
      },
    },
    xaxis: {
      title: {
        text: '',
        font: {
          color: 'black',
          size: 20,
        },
      },
      linecolor: 'rgba(0,0,0,0)',
      tickangle: -45,
      tickfont: {
        color: 'black',
        size: 20,
      },
      showgrid: false,
    },
    yaxis: {
      title: {
        text: 'Total Amount (oz)',
        font: {
          color: 'black',
          size: 20,
        },
      },
      range: [0, 100],
      tickfont: {
        color: 'black',
        size: 19,
      },
      showgrid: false,
    },
    height: 400,
    plot_bgcolor: '#3e7c97',
    paper_bgcolor: '#3e7c97',
    shapes: [
      {
        type: 'line',
        xref: 'paper',
        x0: 0,
        x1: 1,
        y0: goal,
        y1: goal,
        line: {
          color: 'red',
          width: 2,
          dash: 'dash',
        },
      },
    ],
  };
  
  
  
  
  

  return (
    <>
      <h2 className="heading">Water Consumption History</h2>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount (oz)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(historyTableData).map((entryGroup) => (
              <tr key={entryGroup.date.toISOString()}>
                <td>{formatDate(entryGroup.date)}</td>
                <td className="amount">{entryGroup.totalAmount}</td>
                <td>
                  {entryGroup.entries.map((entry) => (
                    <div key={entry.id} className="entry-row">
                      <div className="entry-amount">{entry.amount} oz</div>
                      <span
                        className="delete-button"
                        onClick={() => handleDelete(entry.id)}
                      >
                        <ClearIcon />
                      </span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <div className="chart-container">
        <Plot data={[chartData]} layout={chartLayout} />
      </div>
    </>
  );
}

export const calculateDailyTotal = (historyData, date) => {
  const entries = historyData.filter((entry) => {
    const entryDate = new Date(entry.data_date);
    return entryDate.toDateString() === date.toDateString();
  });
  return entries.reduce((total, entry) => total + entry.amount, 0);
};

export default History;









