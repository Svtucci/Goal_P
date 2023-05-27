import React, { useEffect, useState } from 'react';
import axios from 'axios';



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
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div>
      <h2>Water Consumption History</h2>
      {historyData.map((entry) => (
        <div key={entry.id}>
        <span>
          On {formatDate(entry.data_date)}, you drank {entry.amount} ml
        </span>
          <button onClick={() => handleDelete(entry.id)}>Delete Your Entry</button>
        </div>
      ))}
    </div>
  );
}

export default History;


