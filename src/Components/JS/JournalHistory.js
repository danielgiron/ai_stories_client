import React from "react";
import "../CSS/JournalHistory.css";
import { useState, useEffect } from "react";

function JournalHistory(props) {
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
    const firstDay = days[0].getDay(); // Determine what day of the week a given month starts on...
    const calendarCells = Array(42).fill(null); // Create a temporary array to hold all possible dates
    days.forEach((day, index) => {
      calendarCells[firstDay + index] = day.getDate(); // Start adding dates after initial offset
    });
    return calendarCells;
  }

  //   When either month or year are changed, update the calendar grid
  useEffect(() => {
    setCellValues(fillCalendar(month, year));
  }, [month, year]);

  return (
    <div className="JH_Container">
      <div className="CalendarContainer SectionContainer">
        <div className="Calendar">
          <div className="CalendarControls">
            <select value={monthNames[month]} onChange={handleMonthChange}>
              {monthNames.map((name, index) => {
                return (
                  <option key={index} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
            <input type="number" value={year} onChange={handleYearChange} />
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
                    // 7 days of the week
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
      </div>
      <div className="HistoryListContainer SectionContainer">
        <div>Journal History</div>
      </div>
    </div>
  );
}

export default JournalHistory;
