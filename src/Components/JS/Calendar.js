import React from "react";
import "../CSS/Calendar.css";
// import Caret from "../../Media/Images/caret.svg";
import Caret from "../../Media/Images/caret.svg";
import { useState, useEffect } from "react";

function Calendar(props) {
  // State for the current month and year, and array representing values of each cell in a calendar
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [cellValues, setCellValues] = useState(Array.from({ length: 42 })); // 7x6 Calendar Grid

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (event) => {
    setMonth(monthNames.indexOf(event.target.value));
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  function getDaysInMonth(month, year) {
    const date = new Date(year, month, 1);
    const results = [];
    while (date.getMonth() === month) {
      results.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return results;
  }

  function fillCalendar(month, year) {
    const days = getDaysInMonth(month, year);
    const firstDay = days[0].getDay(); // Determine what day of the week a given month starts on (offset)
    const calendarCells = Array(42).fill(null); // Create a temporary array to hold all possible dates
    days.forEach((day, index) => {
      calendarCells[firstDay + index] = day.getDate(); // Start adding dates after initial offset
    });
    return calendarCells;
  }

  function calculateNewMonth(action, currentMonth, currentYear) {
    let newMonth;
    let newYear = currentYear;

    if (action === "next") {
      if (currentMonth === 11) {
        // December to January
        newMonth = 0;
        newYear = currentYear + 1;
      } else {
        newMonth = currentMonth + 1;
      }
    } else if (action === "prev") {
      if (currentMonth === 0) {
        // January to December
        newMonth = 11;
        newYear = currentYear - 1;
      } else {
        newMonth = currentMonth - 1;
      }
    } else {
      throw new Error("Invalid action: Use 'next' or 'prev'.");
    }

    return { newMonth, newYear };
  }

  //   When either month or year are changed, update the calendar grid
  useEffect(() => {
    setCellValues(fillCalendar(month, year));
    props.returnCalendarDate({ month, year });
  }, [month, year]);

  return (
    <div className="Calendar">
      <div className="CalendarControls">
        <button
          id="MinusMonth"
          onClick={() => {
            const { newMonth, newYear } = calculateNewMonth(
              "prev",
              month,
              year
            );
            setMonth(newMonth);
            setYear(newYear);
          }}
        >
          <img src={Caret} />
        </button>
        <select
          id="MonthSelect"
          value={monthNames[month]}
          onChange={handleMonthChange}
        >
          {monthNames.map((name, index) => {
            return (
              <option key={index} value={name}>
                {name}
              </option>
            );
          })}
        </select>
        <input
          id="YearSelect"
          type="number"
          value={year}
          onChange={handleYearChange}
        />
        <button
          id="PlusMonth"
          onClick={() => {
            const { newMonth, newYear } = calculateNewMonth(
              "next",
              month,
              year
            );
            setMonth(newMonth);
            setYear(newYear);
          }}
        >
          <img src={Caret} />
        </button>
      </div>
      <div className="CalendarGrid">
        {/* Generate a 7x6 Grid to represent a full calendar grid, each row and cell uniquely indexed */}
        {Array.from({ length: 6 }).map(
          (
            _,
            rowIndex // 6 rows for maximum weeks in a month
          ) => (
            <div
              className="CalendarRow"
              key={`R${rowIndex}`}
              //   If the last row in the calendar grid is empty, apply CSS "display: none" to the last row
              style={
                rowIndex === 5 &&
                cellValues.slice(-7).every((cell) => {
                  return cell === null;
                })
                  ? { display: "none" }
                  : {}
              }
            >
              {Array.from({ length: 7 }).map((_, cellIndex) => {
                // length 7 for days of the week
                const key = rowIndex * 7 + cellIndex;
                return (
                  <div className="CalendarCell" key={key}>
                    <span className="Date">{cellValues[key]}</span>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Calendar;
