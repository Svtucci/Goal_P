import React, { useState } from 'react';
import {useSelector} from 'react-redux';

function Track() {
const user = useSelector((store) => store.user);
const [currentIntake, setCurrentIntake] = useState(0);


const formSubmit = (e) => {
    e.preventDefault();
}

const addIntake = () => {
    setCurrentIntake(currentIntake + 1);
}

const minusIntake = () => {
    setCurrentIntake(currentIntake -1); 
}
    return(
        <>
        <div>
        <p>TRACKING</p>
        <h1>Daily goal for the next 30 days: {user.daily_goal}ml</h1>
        </div>

        <div>
            <form onSubmit={formSubmit}>
                <div>
                    <label htmlFor="intake">Current Intake</label>
                    <input
                        type="number"
                        id="intake"
                        value="{currentIntake}"
                        onChange={(e) => setCurrentIntake(number(e.target.value))}
                    />
                </div>
                <div>
                    <button type="button" onClick={addIntake}>
                        +
                    </button>
                    <button type="button" onClick={minusIntake}>
                        -
                    </button>
                </div>
                <button type="submit">
                    Submit
                </button> 
            </form>
        </div>
        </>
    )
};

export default Track; 