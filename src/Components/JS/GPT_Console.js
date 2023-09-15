import React, { useState } from "react";
import "../CSS/GPT_Console.css";
import axios from "axios";

function GPT_Console(props) {
  const endpoint = "http://localhost:3001";
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

  const [userInput, setUserInput] = useState("");
  const [buttonState, setButtonState] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
  }

  async function getStory() {
    if (messages.length - 1 !== 0) {
      messages.push({
        role: "user",
        content: `${userInput}. Tell me four more sentences of story.`,
      });
    }

    await axios
      .post(`${endpoint}/story`, { messages })
      .then((res) => {
        const newMessage = res.data.choices[0].message;
        setMessages([...messages, newMessage]);
        setUserInput("");
        console.log({ newMessage });
        console.log({ messages });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="GPT_Console">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="inputField">
          <label htmlFor="userResponse">What do you do?</label>
          <input
            type="text"
            id="userResponse"
            name="userResponse"
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            value={userInput}
          />
        </div>
        <button
          id="gptButton"
          className={`${userInput === "" ? "inactive" : "active"}`}
          onClick={() => {
            getStory();
          }}
        >
          {messages.length === 1 ? `Start` : `Submit`}
        </button>
      </form>

      <button
        onClick={() => {
          console.log({ messages });
        }}
      >
        console.log(messages)
      </button>

      <div className="messagesContainer">
        {messages.length === 0
          ? "No messages yet"
          : messages.map((m, index) => {
              if (index !== 0) {
                return (
                  <div className="message" key={index}>
                    <div className="role">{m.role}</div>
                    <div className="content">{m.content}</div>
                  </div>
                );
              }
            })}
      </div>
    </div>
  );
}

export default GPT_Console;
