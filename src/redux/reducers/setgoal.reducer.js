const setGoal = (state = 0, action) => {
    switch (action.type) {
      case 'SET_GOAL':
        console.log('Steve:', action.payload.daily_goal);
        return action.payload;
      default:
        return state;
    }
  };

  export default setGoal;