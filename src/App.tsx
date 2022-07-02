import React from 'react';
import { useState } from 'react';
import './App.css';
import { DateStripe } from './components/Dates-Stripe';

function App() {
  const [date, setDate] = useState(new Date())

  const selectDate = (args: Date) => {
    setDate(args)
  }

  return (
    <div className="App">
      <DateStripe selected={date} onSelect={selectDate} />
    </div>
  );
}

export default App;
