import React from "react";
import "../CSS/Landing.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Landing(props) {
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // const endpoint = `${backendBaseURL}/users/signup`;
    const endpoint = ``;
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    await axios
      .post(endpoint, body)
      .then((res) => {
        // localStorage.setItem("userID", JSON.stringify(res.data._id));
        // setUser(JSON.parse(localStorage.getItem("userID")));
        alert("Signed up!");
      })
      .catch((e) => {
        alert("No sign up yet...Coming Soon!");
      });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // const endpoint = `${backendBaseURL}/users/signin`;
    const endpoint = ``;
    const body = {
      username: e.target.email.value,
      password: e.target.password.value,
    };

    await axios
      .post(endpoint, body)
      .then((res) => {
        // localStorage.setItem("userID", JSON.stringify(res.data._id));
        // setUser(JSON.parse(localStorage.getItem("userID")));
        alert("Signed in!");
      })
      .catch((e) => {
        alert("No sign in yet...Coming Soon!");
      });
  };

  return (
    <div className="LandingContainer">
      <div className="HeroContainer SectionContainer">
        <div className="HeroSection GridLayout">
          <div className="HeroImageContainer">
            <img />
          </div>
          <div className="SectionText">
            <h3>
              The <span>Bugs</span>
            </h3>
            <p>
              I'm a Developer who loves exploring new technologies to bring
              creative solutions to life. Check out the technologies I use below
              to see how I can help bring your ideas to life.
            </p>
            <div className="ButtonsContainer">
              <button className="Primary">Start Today's Journal</button>
              <button className="Secondary">See Previous Journals</button>
            </div>
          </div>
        </div>
      </div>
      <div className="AboutContainer SectionContainer">
        <div className="AboutSection GridLayout">
          <div className="SectionText">
            <h3>
              What are <span>The Bugs?</span>
            </h3>
            <p>
              I'm a Developer who loves exploring new technologies to bring
              creative solutions to life. Check out the technologies I use below
              to see how I can help bring your ideas to life.
            </p>
          </div>
          <div className="AboutPanels">
            <div className="Panel">
              <h4>The First One</h4>
              <p>
                I'm a Developer who loves exploring new technologies to bring
                creative solutions to life. Check out the technologies I use
                below to see how I can help bring your ideas to life.
              </p>
              <div className="Card" />
            </div>
            <div className="Panel">
              <h4>The Second One</h4>
              <p>
                I'm a Developer who loves exploring new technologies to bring
                creative solutions to life. Check out the technologies I use
                below to see how I can help bring your ideas to life.
              </p>
              <div className="Card" />
            </div>
            <div className="Panel">
              <h4>The Third One</h4>
              <p>
                I'm a Developer who loves exploring new technologies to bring
                creative solutions to life. Check out the technologies I use
                below to see how I can help bring your ideas to life.
              </p>
              <div className="Card" />
            </div>
          </div>
        </div>
      </div>
      <div className="AuthContainer SectionContainer">
        <div className="AuthSection GridLayout">
          <div className="SectionText">
            <h3>
              Ready to join <span>The Bugs?</span>
            </h3>
            <p>
              I'm a Developer who loves exploring new technologies to bring
              creative solutions to life. Check out the technologies I use below
              to see how I can help bring your ideas to life.
            </p>
          </div>
          <div className="AuthModule">
            <div className="SignUpContainer">
              <div className="FormTitle">Not A Member?</div>
              <form onSubmit={handleSignUp}>
                <div className="inputField">
                  <label htmlFor="name_signUp">Name</label>
                  <input type="text" id="name_signUp" name="name" required />
                </div>

                <div className="inputField">
                  <label htmlFor="email_signUp">Email</label>
                  <input type="text" id="email_signUp" name="email" required />
                </div>

                <div className="inputField">
                  <label htmlFor="password_signUp">Password</label>
                  <input
                    type="password"
                    id="password_signUp"
                    name="password"
                    required
                  />
                </div>

                <button>Sign Up</button>
              </form>
            </div>
            <span className="divider" />
            <div className="SignInContainer">
              <div className="FormTitle">Already Joined?</div>
              <form onSubmit={handleSignIn}>
                <div className="inputField">
                  <label htmlFor="email_signIn">Email</label>
                  <input type="text" id="email_signIn" name="email" required />
                </div>

                <div className="inputField">
                  <label htmlFor="password_signIn">Password</label>
                  <input
                    type="password"
                    id="password_signIn"
                    name="password"
                    required
                  />
                </div>

                <button>Sign In</button>
              </form>
            </div>
            <Link className="DemoLink" to="/Home">
              Try the Demo Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
