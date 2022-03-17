import React from 'react';

function Time() {
  let today = new Date();
  let today2 = today.toISOString().substring(0, 10);
  console.log('today', today2);
  return <>{today2}</>;
}

export default Time;
