// to be made with intake.saga 

const dailySubmission = (state = 0, action) => {
    switch (action.type) {
        case 'SET_DAILY_INTAKE':
            return action.payload;
        default:
            return state;
    }
};

export default dailySubmission;

  
  
  