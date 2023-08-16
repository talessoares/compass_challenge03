import React, { useState } from "react";
import Footer from "../components/Footer";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevent the form from submitting

    if (username.length < 5) {
      setUsernameError("Username must be at least 5 characters long");
      return;
    }

    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      return;
    }

    setUsernameError("");

    const headers = {
      "X-Parse-Application-Id ": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
      "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
      "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
    };

    // Build the query parameters
    const data = {
      query: `
      mutation LogIn($username: String!, $password: String!) {
        logIn(input: {
          username: $username
          password: $password
        }) {
          viewer {
            user {
              id
              createdAt
              updatedAt
              username
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
        console.log("Logged in:", response.data);
        alert(
          `Login successful!\nResponse:\n${JSON.stringify(
            response.data,
            null,
            2
          )}`
        );
        navigate("/");
      })
      .catch((error) => {
        console.error("Login error:", error);

        // Verificar o tipo de erro e exibir um alerta informativo
        if (error.response) {
          // O servidor respondeu com um status de erro
          alert(`Login failed: ${error.response.data.error}`);
        } else if (error.request) {
          // A solicitação foi feita, mas nenhuma resposta foi recebida
          alert("Login request was made, but no response was received.");
        } else {
          // Ocorreu um erro ao configurar a solicitação
          alert("Error setting up the login request.");
        }
      });
  };


  return (
    <div className={`container ${styles.pageContainer}`}>
      <div className={styles.divFirstLine}>
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
      <div className={styles.divSecondLine}>
        <h2>Login</h2>
      </div>
      <div className={styles.divFields}>
        <form onSubmit={handleLogin}>
          {" "}
          <h3>Username</h3>
          <input
            className={styles.inputField}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <p className={styles.error}>{usernameError}</p>}
          <h3>Password</h3>
          <input
            className={styles.inputField}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
          <h4>
            Don't have an account?{" "}
            <Link to="/register" className={styles.linkText}>
              Register
            </Link>
          </h4>
          <button className={styles.buttonLogin} onClick={handleLogin}>
            Login
          </button>
        </form>
        {/* {error && <p className={styles.error}>{error}</p>} */}
      </div>
      <div className="divFooter">
        <Footer />
      </div>
    </div>
  );
}

export default LoginPage;
