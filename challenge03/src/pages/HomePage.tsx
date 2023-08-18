import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import FoodImage1 from "../components/FoodImage1";
import FoodImage2 from "../components/FoodImage2";
import FoodImage3 from "../components/FoodImage3";
import Card from "../components/Card";
import RestaurantPage from "./RestaurantPage";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionToken, setSessionToken] = useState("");

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    setIsLoggedIn(false);
    setSessionToken("");
    alert("You have been logged out");
  };

  const carouselItems = [<FoodImage1 />, <FoodImage2 />, <FoodImage3 />];

  useEffect(() => {
    const storedSessionToken = localStorage.getItem("sessionToken");
    if (storedSessionToken) {
      setIsLoggedIn(true);
      setSessionToken(storedSessionToken);
    }

    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % carouselItems.length;
      setCurrentSlide(nextSlide);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide, carouselItems.length]);

  //RENDER THE RESTAURANTS
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const headers = {
      "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
      "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
      "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
      "Content-Type": "application/json",
    };

    const query = `
    query GetAllRestaurants {
      fitMes {
        count
        edges {
          node {
            objectId
            name
            rating
            deliveryTime
            image
            location
          }
        }
      }
    }
  `;

    axios
      .post("https://parseapi.back4app.com/graphql", { query }, { headers })
      .then((response) => {
        const restaurantData = response.data.data.fitMes.edges.map(
          (edge: { node: any }) => edge.node
        );
        setRestaurants(restaurantData);
        console.log("Restaurants:", restaurantData);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  }, []);

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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="5.28577"
              y="10.0714"
              width="18.3571"
              height="18.3571"
              rx="3.6"
              stroke="#202020"
              strokeWidth="2"
            />
          </svg>
          {isLoggedIn ? (
            // If user is logged in, show Logout button
            <button
              className={styles.signInButton}
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          ) : (
            // If user is not logged in, show Sign In button
            <Link to="/login">
              <button className={styles.signInButton}>Sign In</button>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.divContent}>
        <div className={styles.rectangle}></div>
        <div className={styles.divTexts}>
          <p>
            Premium quality food for your{" "}
            <span
              className={`${styles.emphasisBackground} ${styles.bananaEmoji}`}
            >
              🍌
            </span>{" "}
            <span>healthy</span>{" "}
            <span
              className={`${styles.emphasisBackground2} ${styles.tomatoEmoji}`}
            >
              🍅
            </span>{" "}
            <span>& Daily Life</span>
          </p>
          <p className={styles.divSecondPara}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className={`${styles.divImage} ${styles.carouselContainer}`}>
          <div
            className={styles.carousel}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {carouselItems.map((item, index) => (
              <div key={index} className={`${styles.carouselItem}`}>
                {item}
              </div>
            ))}
          </div>
          <div className={styles.carouselControls}>
            {carouselItems.map((_, index) => (
              <div
                key={index}
                className={`${styles.carouselControl} ${
                  currentSlide === index ? styles.active : ""
                }`}
                onClick={() => handleSlideChange(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={`${styles.divTexts2}`}>
        <p>Restaurants</p>
      </div>
      <div className={`${styles.divCards}`}>
        <div className={`${styles.row}`}>
          {restaurants.slice(0, 4).map((restaurant: any) => (
            <Link
              to={`/restaurant/${restaurant.objectId}`}
              className={styles.cardLink}
            >
              <Card key={restaurant.objectId} restaurant={restaurant} />
            </Link>
          ))}
        </div>
        <div className={`${styles.row}`}>
          {restaurants.slice(4, 8).map((restaurant: any) => (
            <Link
              to={`/restaurant/${restaurant.objectId}`}
              className={styles.cardLink}
            >
              <Card key={restaurant.objectId} restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
