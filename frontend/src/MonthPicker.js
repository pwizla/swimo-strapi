import React, { useRef, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";

export default function App() {
  const calendarRef = useRef(null);
  const [value, setValue] = useState(new Date());
  const [display, setDisplay] = useState(false);

  useEffect(() => {}, []);

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <>
      <div
        className="App"
        onClick={() => {
          if (display) setDisplay(false);
        }}
      >
        <div>
          <button onClick={() => setDisplay(!display)}>Select a month</button>
        </div>
      </div>
      {display && (
        <div style={{ position: "absolute", top: "10px" }}>
          <Calendar
            view="year"
            onActiveStartDateChange={() => setDisplay(true)}
            activeStartDate={new Date()}
            inputRef={calendarRef}
            onChange={onChange}
            value={value}
          />
        </div>
      )}
    </>
  );
}

// import React, { useState } from 'react';
// import Calendar from 'react-calendar';

// function MyApp() {
//   const [value, setValue] = useState(new Date());

//   function onChange(nextValue) {
//     setValue(nextValue);
//   }

//   return (
//     <Calendar
//       onChange={onChange}
//       value={value}
//     />
//   );
// }