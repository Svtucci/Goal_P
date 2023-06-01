// Reducer for total amount
const totalAmount = (state = 0, action) => {
    switch (action.type) {
      case 'SET_TOTAL_AMOUNT':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default totalAmount;
  