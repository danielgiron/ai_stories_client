import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getPrompt } from "../../Prompts";

import "../CSS/GPT_Console.css";
import axios from "axios";

function GPT_Console(props) {
  const endpoint = "http://localhost:3001";

  const navigate = useNavigate();
  let { ID_Param } = useParams();
  let EntryID = ID_Param;

  // If no EntryID provided on launch (through URL parameters), assign new EntryID
  if (!EntryID) {
    EntryID = uuidv4();
  }

  // Used to control Side Panel visibility state on mobile devices
  const [mobileVisibility, setMobileVisibility] = useState(true);

  // SavedEntries is a "directory" of Entries saved in localStorage
  let SavedEntries = JSON.parse(localStorage.getItem("SavedEntries"));
  // userInput holds the value of html input element where user types responses
  const [userInput, setUserInput] = useState("");
  // inputActive is toggle on and off to control when user is able to use input element
  const [inputActive, setInputActive] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: getPrompt("P0"),
    },
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
  }

  async function getStory() {
    setInputActive(false); // Disable input to prevent re-submission while loading

    // {messages.length - 1 === 0} means "messages" is empty (story has not been started)
    //  if messages are not empty, and story has started, add user input to messages (as response to AI generated story)
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
        ToastAlert("Oops...something went wrong! Try again soon :(");
      });

    setInputActive(true);
  }

  // After confirmation, remove EntryID from SavedEntries ("directory") and remove Entry from localStorage
  function deleteStory() {
    window.confirm(`Are you sure you wish to delete this entry?`);
    localStorage.removeItem(EntryID);
    SavedEntries = SavedEntries.filter((id) => {
      return id !== EntryID;
    });
    localStorage.setItem("SavedEntries", JSON.stringify(SavedEntries));
    navigate("/");
  }

  const ToastAlert = (text) => {
    const ToastContainer = document.getElementById("ToastContainer");
    ToastContainer.innerText = text;

    ToastContainer.classList.add("Alert");
    setTimeout(() => {
      ToastContainer.classList.remove("Alert");
    }, 5000);
  };

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
          {/* Only display button when window is not mobile device */}
          {window.innerWidth >= 800 ? (
            ""
          ) : (
            <button
              type="button"
              id="Side_MobileVisibility"
              className={`${mobileVisibility ? "Active" : ""}`}
              onClick={() => {
                setMobileVisibility(!mobileVisibility);
              }}
            >
              {`${mobileVisibility ? "Hide" : "Show"} Options`}
            </button>
          )}

          <div className="SubGroup">
            <p>
              You will be presented with an unknown scenario. You decide how to
              advance the story.
            </p>
            <div className="ButtonGroup1">
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Exit
              </button>
              <button
                type="button"
                className={`${messages.length > 1 ? "Inactive" : ""} CTA`}
                onClick={() => {
                  getStory();
                }}
              >
                Start
              </button>

              <button
                type="button"
                className={`${messages.length > 1 ? "" : "Inactive"}`}
                onClick={() => {
                  deleteStory();
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="SubGroup">
            <p>Ready for an evaluation?</p>
            <div className="ButtonGroup2">
              <button
                type="button"
                className={`${messages.length === 1 ? "Inactive" : ""} CTA`}
              >
                Assess
              </button>
              {/* Used for testing error notifications */}
              {/* <button
                type="button"
                onClick={() => {
                  ToastAlert("Oops...There's been an error :(");
                }}
              >
                Toast
              </button> */}
            </div>
          </div>
        </div>

        <div
          className={`InputField ${
            inputActive || messages.length === 0 ? "" : "Inactive"
          }`}
        >
          <div id="ToastContainer">Oops...There's been an error</div>
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
            type="submit"
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
    </div>
  );
}

export default GPT_Console;
