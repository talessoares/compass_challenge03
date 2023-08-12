import React from "react";
import Footer from "../components/Footer";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import FoodImage1 from "../components/FoodImage1";
import FoodImage2 from "../components/FoodImage2";

function HomePage() {
  return (
    <div className={`container ${styles.pageContainer}`}>
      <div className={styles.divFirstLine}>
        <Link to="/" className={styles.linkNoDecoration}>
          {" "}
          {/* Adicione a classe de estilo */}
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
        <div className={styles.divRightContent}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Enter item or restaurant you are looking for"
              className={styles.searchInput}
            />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="31"
            viewBox="0 0 30 31"
            fill="none"
          >
            <path
              d="M19.2857 14.4285V7.88092C19.2857 6.49169 18.7777 5.15936 17.8735 4.17702C16.9693 3.19469 15.743 2.64282 14.4643 2.64282C13.1855 2.64282 11.9592 3.19469 11.055 4.17702C10.1508 5.15936 9.64282 6.49169 9.64282 7.88092V14.4285"
              stroke="#202020"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect
              x="5.28577"
              y="10.0714"
              width="18.3571"
              height="18.3571"
              rx="3.6"
              stroke="#202020"
              stroke-width="2"
            />
          </svg>
          <Link to="/login">
            <button className={styles.signInButton}>Sign In</button>
          </Link>
        </div>
      </div>
      <div className={styles.divContent}>
        <div className={styles.divTexts}>
        <p>
            Premium <span> quality </span> food for your{" "}
            <span className={styles.emphasisBackground}>🍌</span>{" "}
            <span> healthy </span>{" "}
            <span className={styles.emphasisBackground2}>🍅</span>{" "}
            <span> & Daily Life </span>
          </p>
          <p className={styles.divSecondPara}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className={styles.divImage}>
          <FoodImage1 />
          <FoodImage2 />
        </div>
      </div>
      <div className="divFooter">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;