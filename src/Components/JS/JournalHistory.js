import React from "react";
import "../CSS/JournalHistory.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "./Calendar";

function JournalHistory(props) {
  const endpoint = "http://localhost:3001/UserEntry";
  const [userEntries, setUserEntries] = useState([]);
  const [calendarDate, returnCalendarDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    getJournalEntries();
  }, []);

  useEffect(() => {
    console.log(userEntries);
  }, [userEntries]);

  useEffect(() => {
    console.log(`From JH: ${calendarDate.month} ${calendarDate.year}`);
  }, [calendarDate]);

  async function getJournalEntries() {
    await axios
      .get(`${endpoint}`)
      .then((res) => {
        setUserEntries(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="JH_Container">
      <div className="CalendarContainer SectionContainer">
        <Calendar returnCalendarDate={returnCalendarDate} />
      </div>
      <div className="HistoryListContainer SectionContainer">
        <div>Journal History</div>
      </div>
    </div>
  );
}

export default JournalHistory;
