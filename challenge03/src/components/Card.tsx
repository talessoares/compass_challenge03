import React from "react";
import styles from "./Card.module.css";
import FoodImage5 from "./FoodImage5";

function Card({ restaurant }: { restaurant: any }) {
  const isLowRating = restaurant.rating <= 4.5;

  return (
    <div className={styles.container}>
      <div className={styles.divImage}>
        <FoodImage5 />
      </div>
      <div className={styles.divTitle}>
        <h4>{restaurant.name}</h4>
      </div>

      <div className={styles.divType}>
        <h4>{restaurant.location}</h4>
      </div>
      <div className={styles.divRating}>
        <div className={styles.ratingContainer}>
          {isLowRating ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                opacity="0.75"
                d="M20.3231 7.04257L14.0447 6.1301L11.238 0.440169C11.1614 0.284382 11.0353 0.158269 10.8795 0.0816118C10.4888 -0.111267 10.014 0.0494654 9.81863 0.440169L7.012 6.1301L0.733535 7.04257C0.560438 7.0673 0.402179 7.1489 0.281011 7.27254C0.134526 7.4231 0.0538061 7.62566 0.0565882 7.8357C0.0593702 8.04575 0.145427 8.24609 0.295848 8.39272L4.8384 12.8215L3.7652 19.0753C3.74003 19.2207 3.75613 19.3703 3.81167 19.5071C3.86721 19.6439 3.95996 19.7624 4.07941 19.8492C4.19887 19.9359 4.34024 19.9875 4.4875 19.998C4.63477 20.0085 4.78203 19.9775 4.91258 19.9086L10.5283 16.9561L16.1441 19.9086C16.2974 19.9902 16.4754 20.0174 16.6461 19.9877C17.0763 19.9135 17.3656 19.5055 17.2915 19.0753L16.2183 12.8215L20.7608 8.39272C20.8845 8.27156 20.9661 8.1133 20.9908 7.9402C21.0576 7.50746 20.7559 7.10686 20.3231 7.04257Z"
                fill="#FC8019"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                opacity="0.75"
                d="M20.323 7.04257L14.0445 6.1301L11.2379 0.440169C11.1612 0.284382 11.0351 0.158269 10.8793 0.0816118C10.4886 -0.111267 10.0139 0.0494654 9.81851 0.440169L7.01187 6.1301L0.733413 7.04257C0.560316 7.0673 0.402056 7.1489 0.280889 7.27254C0.134404 7.4231 0.053684 7.62566 0.0564661 7.8357C0.0592481 8.04575 0.145304 8.24609 0.295726 8.39272L4.83828 12.8215L3.76508 19.0753C3.73991 19.2207 3.75601 19.3703 3.81155 19.5071C3.86708 19.6439 3.95984 19.7624 4.07929 19.8492C4.19875 19.9359 4.34012 19.9875 4.48738 19.998C4.63465 20.0085 4.7819 19.9775 4.91246 19.9086L10.5282 16.9561L16.144 19.9086C16.2973 19.9902 16.4753 20.0174 16.6459 19.9877C17.0762 19.9135 17.3655 19.5055 17.2913 19.0753L16.2181 12.8215L20.7607 8.39272C20.8843 8.27156 20.9659 8.1133 20.9907 7.9402C21.0574 7.50746 20.7557 7.10686 20.323 7.04257Z"
                fill="#1AC84B"
              />
            </svg>
          )}
          <h4>{restaurant.rating}</h4>
        </div>
      </div>
      <div className={styles.divBlank}></div>
      <div className={styles.divTime}>
        <div className={styles.timeContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="20"
            viewBox="0 0 23 20"
            fill="none"
          >
            <g opacity="0.75">
              <path
                d="M9.40123 13.4568L12.3642 14.4445C12.3642 14.4445 19.7716 12.963 20.7593 12.963C21.7469 12.963 21.7469 13.9506 20.7593 14.9383C19.7716 15.9259 16.3148 18.8889 13.3519 18.8889C10.3889 18.8889 8.41358 17.4074 6.43827 17.4074H1.5"
                stroke="#FC8019"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.5 11.4815C2.48765 10.4938 4.46296 9.01235 6.43827 9.01235C8.41358 9.01235 13.1049 10.9877 13.8457 11.9753C14.5864 12.963 12.3642 14.4444 12.3642 14.4444M7.42593 6.04939V2.09877C7.42593 1.83683 7.52998 1.58561 7.7152 1.40039C7.90042 1.21517 8.15164 1.11111 8.41358 1.11111H20.2654C20.5274 1.11111 20.7786 1.21517 20.9638 1.40039C21.149 1.58561 21.2531 1.83683 21.2531 2.09877V10"
                stroke="#FC8019"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.8701 1.11111H16.8084V5.55556H11.8701V1.11111Z"
                stroke="#FC8019"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
          <h4>{restaurant.deliveryTime}</h4>
        </div>
      </div>
      <div className={styles.divBlank2}></div>
      <div className={styles.divBlank3}></div>
    </div>
  );
}

export default Card;
