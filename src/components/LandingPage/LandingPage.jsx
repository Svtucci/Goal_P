import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

//THIS IS THE /HOME COMPONENT



// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            This is Goal_P. A passion project made by Stephen Vertucci. The GOAL of this app 
            is to make tracking your water intake simple and efficient. No need to add age, height, 
            calories, or workout metrics. This is simply for water. You create your account, set your 
            daily goal of water you want to drink in ounces and begin to add data. 
          </p>
            As you add information you can track your progress on the Track page. There you can add or subtract
            whatever amount you would like in ounces. 
          <p>
            
          </p>

          <p>
           
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
