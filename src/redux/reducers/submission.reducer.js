const submissionData = (state = null, action) => {
    switch (action.type) {
        case 'SET_SUBMISSION_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default submissionData; 