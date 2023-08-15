import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import axios from "axios";

function Card() {
  const [dishes, setDishes] = useState([]);
  const headers = {
    "X-Parse-Application-Id": "lrAPveloMl57TTby5U0S4rFPBrANkAhLUll8jFOh",
    "X-Parse-REST-API-Key": "8aqUBWOjOplfA6lstntyYsYVkt3RzpVtb8qU5x08",
    "content-type": "application/json",
  };

  const request = {
    method: "GET",
    url: "https://parseapi.back4app.com/classes/FitMe",
    headers: headers,
  };

  useEffect(() => {
    axios(request)
      .then(response => {
        setDishes(response.data.results);
      })
      .catch(error => {
        console.error("Erro ao obter os dados:", error);
      });
  }, []);

//   return (
// //     <div className={styles.cardContainer}>
   
// //     {dishes !== null && dishes.slice(0,8).map((dish, index) => {
// //     return (
// //         <div key={index} className={styles.card}>
// //           {/* <img src={dish.image.url} alt={dish.name} className={styles.cardImage} /> */}
// //           <h2 className={styles.cardTitle}>{dish.name}</h2>
// //           <p className={styles.cardDescription}>{dish.description}</p>
// //           <p className={styles.cardPrice}>Price: ${dish.price}</p>
// //         </div>
        
// //       ))} 
// //       </div>
// //   );
// }

return (
    <h1>card</h1>
    );}

export default Card;


    // <div className={styles.cardContainer}>
    //   {dishes.map((dish, index) => (
    //     <div key={index} className={styles.card}>
    //       <img src={dish.image.url} alt={dish.name} className={styles.cardImage} />
    //       <h2 className={styles.cardTitle}>{dish.name}</h2>
    //       <p className={styles.cardDescription}>{dish.description}</p>
    //       <p className={styles.cardPrice}>Price: ${dish.price}</p>
    //     </div>
    //   ))}
    // </div>