import React from "react";
import "../CSS/GPT_Console.css";
import axios from "axios";

function GPT_Console(props) {
  const endpoint = "http://localhost:3001/gpt";
  const body = { message: null };

  async function handleSubmit(e) {
    e.preventDefault();
  }

  async function startStory() {
    await axios
      .post(endpoint, body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="GPT_Console">
      {/* <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="inputField">
          <label htmlFor="">Name</label>
          <input type="text" id="name_signUp" name="name" required />
        </div>
        <button>Submit</button>
      </form> */}
      <button
        onClick={() => {
          startStory();
        }}
      >
        GPT!
      </button>
    </div>
  );
}

export default GPT_Console;
