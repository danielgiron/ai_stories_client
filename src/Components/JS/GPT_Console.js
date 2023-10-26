import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import "../CSS/GPT_Console.css";
import axios from "axios";

function GPT_Console(props) {
  const endpoint = "http://localhost:3001";
  //  Where you left off:
  // Now storing Entry in localStorage using res.data.id as Key and storing { id, created, total_tokens, and [messages] }
  // DONE With Entry in localStorage, generate Entry buttons in the Results section of the Home page.
  // DONE On opening with EntryID prop, load Entry from localStorage and load onto [messages]
  // DONE? Work on a fix for automatically loading [messages] with the starting prompt below
  // DONE Work on removing ". Tell me four more sentences of story" from each user input message.
  // DONE Still need to make the Side "Back" button a react-router-dom Link object
  // DONE Might need to identify where exactly user message inout is being stored into [messages]
  // // -> Line 42. On OpenAI API successful response, go to [messages - 1(2?)] and trim the phrase off.
  // Fix issue with new Entry (unique ID) showing up in Results container
  // Fix issue with each completion coming back with own unique ID.
  // // -> Assign UUID?
  // BUG: STARTING A NEW STORY (WITH NO URL 'ID' PARAM) KEEPS SAVING EACH API RESPONSE IN NEW THREAD.
  //      CONTINUING EXISTING THREAD WITH 'ID" URL PARAM DOES TRIGGER SAME ISSUE. LOOK AT LINES 26-29

  let { ID_Param } = useParams();
  let EntryID = ID_Param;
  if (!EntryID) {
    // If no EntryID provided on launch (through URL parameters), assign new EntryID
    EntryID = uuidv4();
  }

  const navigate = useNavigate();
  const SavedEntries = JSON.parse(localStorage.getItem("SavedEntries"));
  const [userInput, setUserInput] = useState("");
  const [inputActive, setInputActive] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `As a storyteller, your job is build a (first-person) story. 
      You are to provide four sentences worth of story each round, each round should present the player with complex scenario they must navigate. The player then gets to choose how to respond
        to the story, don't explicitly state what their options are. 
        There should be setbacks/plot-twists to engage players, a looming threat or danger. 
        Don't use trademarked characters or names. 
        The game concludes after 15-20 turns or upon reaching a resolution. 
        If player response is nonsensical, re-direct them.`,
    },
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
  }

  async function getStory() {
    setInputActive(false); // Disable input to prevent re-submission while loading

    if (messages.length - 1 !== 0) {
      messages.push({
        role: "user",
        content: userInput,
      });
    }

    await axios
      .post(`${endpoint}/story`, { messages })
      .then((res) => {
        if (res.error === "context_length_exceeded") {
          // toast with error message and deactivate input
          alert(
            "The maximum number of tokens in this Entry has been exceeded."
          );
        } else {
          const OpenAI_Message = res.data.choices[0].message;

          // Save EntryID in SavedEntries if not already in SavedEntries
          if (!SavedEntries.includes(EntryID)) {
            SavedEntries.push(EntryID);
            localStorage.setItem("SavedEntries", JSON.stringify(SavedEntries));
          }

          // Save/Update Entry to localStorage
          localStorage.setItem(
            EntryID,
            JSON.stringify({
              id: EntryID,
              created: res.data.created,
              total_tokens: res.data.usage.total_tokens,
              messages: [...messages, OpenAI_Message],
            })
          );

          // Update displayed messages and reset user input state
          setMessages([...messages, OpenAI_Message]);
          setUserInput("");
          console.log({ OpenAI_Message });
          console.log({ messages });
        }
      })
      .catch((e) => {
        console.log(e);
      });

    setInputActive(true);
  }

  useEffect(() => {
    // Change TopNav styles to fit GPT_Console Theme
    const Logo = document.getElementById("Logo");
    const Menu = document.querySelector(".Menu");
    const MenuLines = document.querySelectorAll(".Menu-Line");

    Logo.style.color = "white";
    Menu.style.border = "1px solid white";

    MenuLines.forEach((line) => {
      line.style.backgroundColor = "white";
      line.style.border = " 1px solid white";
    });

    // If EntryID has been passed through URL Params, load messages from localStorage
    if (localStorage.getItem(EntryID)) {
      const Entry = JSON.parse(localStorage.getItem(EntryID));
      setMessages(Entry.messages);
    }

    // Return TopNav colors to original theme
    return () => {
      Logo.style.color = "black";
      Menu.style.border = "1px solid black";

      MenuLines.forEach((line) => {
        line.style.backgroundColor = "black";
        line.style.border = "1px solid black";
      });
    };
  }, []);

  return (
    <div className="GPT_Console GridContainer">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="Side">
          <p>
            You will be presented with an unknown scenario. You decide how to
            advance the story.
          </p>
          <div className="SideButtons">
            <button className={`${messages.length > 0 ? "Inactive" : ""}`}>
              Start
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
        </div>

        <div
          className={`InputField ${
            inputActive || messages.length === 0 ? "" : "Inactive"
          }`}
        >
          <input
            type="text"
            placeholder="What do you do?"
            id="userResponse"
            name="userResponse"
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            value={userInput}
          />
          <button
            id="gptButton"
            className={`${userInput === "" ? "inactive" : "active"}`}
            onClick={() => {
              getStory();
            }}
          >
            {`Submit`}
          </button>
        </div>

        <div className="MessagesContainer">
          {messages.length === 0
            ? "No messages yet"
            : messages.map((m, index) => {
                if (index !== 0) {
                  return (
                    <div
                      className={`Message ${m.role === "user" ? "User" : ""}`}
                      key={index}
                    >
                      <div className={`role`}>{m.role}</div>
                      <div className="content">
                        <span>{m.content}</span>
                      </div>
                    </div>
                  );
                }
              })}
        </div>
      </form>

      {/* <button
        onClick={() => {
          console.log({ messages });
        }}
      >
        console.log(messages)
      </button> */}
    </div>
  );
}

export default GPT_Console;
