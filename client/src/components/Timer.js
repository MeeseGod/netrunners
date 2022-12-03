// Timer.js

import React from 'react';
import { useState, useEffect } from 'react';

export default function Timer(props){
  const [seconds, setSeconds] = useState(props.time);

  useEffect(() => {
    seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
  }, [seconds]);


  return (
    <div className="timer">
      {seconds}
    </div>
  );
};