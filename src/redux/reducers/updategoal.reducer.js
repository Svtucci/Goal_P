// updateGoal.reducer.js

const updateGoalReducer = (state = 0, action) => {
    switch (action.type) {
      case 'SET_NEW_GOAL':
        return action.payload;
      default:
        return state;
    }
  };

 
  
  export default updateGoalReducer;
  