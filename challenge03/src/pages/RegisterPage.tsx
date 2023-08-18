import React, { useState } from "react";
import Footer from "../components/Footer";
import styles from "./RegisterPage.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");

  const handleRegister = () => {
    if (fullName.length < 5) {
      setNameError("Name must be at least 5 characters long");
      return;
    }

    if (username.length < 5) {
      setUsernameError("Username must be at least 5 characters long");
      return;
    }

    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      return;
    }

    if (confirmpassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    // Reset the error messages if valid
    setNameError("");
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    setConfirmPasswordError("");

    const headers = {
      "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
      "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
      "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
      "Content-Type": "application/json",
    };

    const data = {
      query: `
        mutation SignUp($username: String!, $password: String!) {
          signUp(input: {
            fields: {
              username: $username
              password: $password
            }
          }) {
            viewer {
              user {
                id
                createdAt
              }
              sessionToken
            }
          }
        }
      `,
      variables: {
        username: username,
        password: password,
      },
    };

    axios
      .post("https://parseapi.back4app.com/graphql", data, { headers })
      .then((response) => {
        // Handle successful registration here
        console.log("User created:", response.data);
        alert(
          `Registration successful!\nResponse:\n${JSON.stringify(
            response.data,
            null,
            2
          )}`
        );
      })
      .catch((error) => {
        // Handle registration error here
        console.error("Registration error:", error);
        alert(`Registration failed: ${error.response.data.error}`);
      });
  };

  return (
    <div className={`container ${styles.pageContainer}`}>
      <div className={styles.divFirstLine}>
        <Link to="/" className={styles.linkNoDecoration}>
          <div className={styles.divLeftContent}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 4.27414C0 -0.00536072 5.35289 -0.948061 7.80629 2.55836C10.2648 6.07204 11.7134 10.3468 11.7301 14.9596C11.7301 10.3873 13.1371 6.14426 15.5409 2.64121C17.8898 -0.781849 23.0647 0.122685 23.0647 4.27415V9.76576C23.0647 16.1349 17.9015 21.2981 11.5324 21.2981C5.16321 21.2981 0 16.1349 0 9.76575V4.27414Z"
                fill="#FC8019"
              />
            </svg>
            <h1>FitMe</h1>
          </div>
        </Link>
      </div>
      <div className={styles.divSecondLine}>
        <h2>Register</h2>
      </div>
      <div className={styles.divFields}>
        <h4>Please Fill out form to Register!</h4>
        <h3>Full Name</h3>
        <input
          className={styles.inputField}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {nameError && <p className={styles.error}>{nameError}</p>}{" "}
        <h3>Username</h3>
        <input
          className={styles.inputField}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <p className={styles.error}>{usernameError}</p>}{" "}
        <h3>E-mail</h3>
        <input
          className={styles.inputField}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className={styles.error}>{emailError}</p>}{" "}
        <h3>Password</h3>
        <input
          className={styles.inputField}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className={styles.error}>{passwordError}</p>}{" "}
        <h3>Confirm Password</h3>
        <input
          className={styles.inputField}
          type="password"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmpasswordError && (
          <p className={styles.error}>{confirmpasswordError}</p>
        )}{" "}
        <h4>
          Already have an account?{" "}
          <Link to="/login" className={styles.linkText}>
            Login
          </Link>
        </h4>
        <button className={styles.buttonLogin} onClick={handleRegister}>
          Register
        </button>
      </div>
      <div className="divFooter">
        <Footer />
      </div>
    </div>
  );
}

export default RegisterPage;
