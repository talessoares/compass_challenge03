import React from "react";
import Footer from "../components/Footer";
import styles from "./RestaurantPage.module.css";
import { Link } from "react-router-dom";
import RestaurantComponent from "../components/RestaurantComponent";

function RegisterPage() {
  return (
    <div className="container">
      <div className={styles.divFirstLine}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 4.27414C0 -0.00536072 5.35289 -0.948061 7.80629 2.55836C10.2648 6.07204 11.7134 10.3468 11.7301 14.9596C11.7301 10.3873 13.1371 6.14426 15.5409 2.64121C17.8898 -0.781849 23.0647 0.122685 23.0647 4.27415V9.76576C23.0647 16.1349 17.9015 21.2981 11.5324 21.2981C5.16321 21.2981 0 16.1349 0 9.76575V4.27414Z"
            fill="#FC8019"
          />
        </svg>
        <h1>FitMe</h1>
      </div>
      <div className={styles.divSecondLines}>
        <RestaurantComponent />
      </div>
      <div className={styles.divFields}>
      </div>
      <div className="divFooter">
        <Footer />
      </div>
    </div>
  );
}

export default RegisterPage;
