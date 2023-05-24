// made with chart.saga

const chartReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_HISTORY':
        return action.payload;
      default:
        return state;
    }
  };

export default chartReducer;



// NEW CODE 

// const initialState = {
//     historyData: [],
//     loading: false,
//     error: null,
//   };
  
//   const historyReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'FETCH_HISTORY_REQUEST':
//         return {
//           ...state,
//           loading: true,
//           error: null,
//         };
//       case 'FETCH_HISTORY_SUCCESS':
//         return {
//           ...state,
//           historyData: action.payload,
//           loading: false,
//           error: null,
//         };
//       case 'FETCH_HISTORY_FAILURE':
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default historyReducer;
  