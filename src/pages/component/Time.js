import React from 'react';

function Time() {
  const fullDate = new Date();
  const year = fullDate.getFullYear();
  const month = (fullDate.getMonth() + 1).toString().padStart(2, '0');
  const date = fullDate.getDate().toString().padStart(2, '0');
  const formatTime = year + '-' + month + '-' + date;
  let today = new Date();
  let today2 = today.toISOString().substring(0, 10);
  return <>{today2}</>;
}

export default Time;
