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
          Date: {formatDate(entry.data_date)}, Amount: {entry.amount}
        </div>
      ))}
    </div>
  );
}

export default History;


// NEW CODE 

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchHistoryData } from './historyActions.js';

// function History() {
//   const historyData = useSelector((state) => state.history.historyData);
//   const loading = useSelector((state) => state.history.loading);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchHistoryData());
//   }, [dispatch]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Water Consumption History</h2>
//       {historyData.map((entry) => (
//         <div key={entry.id}>
//           Date: {entry.data_date}, Amount: {entry.amount}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default History;

