import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>Drinking water is one if not THE most important thing you can do to stay healthy, however it seems that in our busy lives it always takes a backseat. I think a good way to fix this is a way to track how much water you drink everyday, and even set a goal to achieve! That is why I created Goal_P (Gulp). Goal_P is a no nonsense hydration tracker. You set your goal for the next 30 days, add your water consumption throughout the day, log it, and look at your progress. That’s it. 
Other trackers may show too much information and overwhelm the user, this is a simple app where you submit your cups and move on with your busy life. </p>
      </div>
    </div>
  );
}

export default AboutPage;
