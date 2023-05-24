import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    try {
      const response = await axios.get('/api/track');
      setHistoryData(response.data);
    } catch (error) {
      console.log('Error fetching history data', error);
    }
  };

  return (
    <div>
      <h2>Water Consumption History</h2>
      {/* Render the historyData in the DOM */}
      {historyData.map((entry) => (
        <div key={entry.id}>
          Date: {entry.data_date}, Amount: {entry.amount}
        </div>
      ))}
    </div>
  );
}

export default History;

