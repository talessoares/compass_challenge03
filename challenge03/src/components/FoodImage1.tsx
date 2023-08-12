import React from "react";
import foodImage1 from "../images/rectangle-1.png";
import styles from "../pages/HomePage.module.css";

function FoodImage1() {
  return <img src={foodImage1} alt="food" className={styles.FoodImage1} />;
}

export default FoodImage1;
