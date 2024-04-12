import React from "react";
//import '../CSS/JournalHistory.css'

function JournalHistory(props) {
  const grid = Array.from({ length: numRows }).map((_, rowIndex) => (
    <div className="CalendarRow" key={rowIndex}>
      {Array.from({ length: numCols }).map((_, colIndex) => {
        const cellNumber = rowIndex * numCols + colIndex + 1; // Calculate cell number
        return (
          <div
            className="CalendarCell"
            key={cellNumber}
            CellNo={cellNumber.toString()}
          >
            {cellNumber}
          </div>
        );
      })}
    </div>
  ));

  return (
    <div className="JournalHistoryContainer">
      <div className="CalendarOverview">
        <div className="CalendarContainer">
          <div className="Calendar">
            <h4>Month</h4>
            <div className="CalendarGrid">{grid}</div>
          </div>
        </div>
      </div>
      <div>JournalHistory</div>
    </div>
  );
}

export default JournalHistory;
