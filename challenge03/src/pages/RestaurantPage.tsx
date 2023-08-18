import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import styles from "./RestaurantPage.module.css";
import FoodImage4 from "../components/FoodImage4";
import { Link, useParams } from "react-router-dom";
import RestaurantComponent from "../components/RestaurantComponent";
import axios from "axios";
import FoodImage6 from "../components/FoodImage6";

interface RestaurantData {
  name: string;
  rating: number;
  deliveryTime: string;
}

interface DishData {
  name: string;
  price: number;
  description: string;
  quantity: number;
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

function RestaurantPage() {
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState<RestaurantData | null>(
    null
  );
  const [dishData, setDishData] = useState<DishData[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItemIndex >= 0) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity++;
      newCartItems[existingItemIndex].price += item.price;
      setCartItems(newCartItems);
    } else {
      const newItem = { ...item, quantity: 1 };
      setCartItems([...cartItems, newItem]);
    }

    // Calculando o total do carrinho
    const cartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price,
      0
    );
    setCartTotal(cartTotal);
  };

  const handleCheckoutClick = () => {
    alert("Checkout clicked! Your total is " + cartTotal);
  };

  useEffect(() => {
    const headers = {
      "X-Parse-Application-Id": "DSiIkHz2MVbCZutKS7abtgrRVsiLNNGcs0L7VsNL",
      "X-Parse-Master-Key": "0cpnqkSUKVkIDlQrNxameA6OmjxmrA72tsUMqVG9",
      "X-Parse-Client-Key": "zXOqJ2k44R6xQqqlpPuizAr3rs58RhHXfU7Aj20V",
      "Content-Type": "application/json",
    };

    const query = `

    query GetRestaurantById {
      fitMe(id: "${id}") {
        name
        image
        location
        rating
        deliveryTime
        topDishes {
          ...AllDishes
        }
      }
    }
    
    fragment AllDishes on Dish {
      name
      description
      image
      price
    }
    

  `;

    axios
      .post("https://parseapi.back4app.com/graphql", { query }, { headers })
      .then((response) => {
        console.log("Response data:", response.data);
        const restaurantData = response.data.data.fitMe;
        const dishData = response.data.data.fitMe.topDishes;
        setRestaurantData(response.data.data.fitMe);
        console.log("Restaurants:", restaurantData);
        console.log("NOME: ", restaurantData.name);

        setDishData(response.data.data.fitMe.topDishes);
        console.log("TopDishes: ", dishData);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("No response from server:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      });
  }, [id]);

  return (
    <div className="container">
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
      <div className={styles.divSecondLines}>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <FoodImage4 />
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.divDescription}>
                  {restaurantData && (
                    <h2 className={styles.cardTitle}>{restaurantData.name}</h2>
                  )}
                </div>
                <p className={styles.cardDescription}>Dish Description</p>
                <div className={styles.divInfo}>
                  <div className={styles.divRatings}>
                    {restaurantData && (
                      <p className={styles.cardRating}>
                        {restaurantData.rating}
                      </p>
                    )}

                    <p className={styles.cardNumberRatings}>100+ ratings</p>
                  </div>
                  <div className={styles.divDelivery}>
                    {restaurantData && (
                      <p className={styles.cardTime}>
                        {restaurantData.deliveryTime}
                      </p>
                    )}
                    <p className={styles.cardDeliveryTime}>Delivery Time</p>
                  </div>
                  <div className={styles.divPrice}>
                    <p className={styles.cardPrice}>200</p>
                    <p>Cost for two</p>
                  </div>
                </div>
              </div>

              <div className={styles.divOffer}>
                <p className={styles.cardOffer}>Offers</p>
                <div className={styles.divOfferText}>
                  <div className={styles.offerItem}>
                    {/* First SVG*/}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M18.7609 9.99999L19.8663 8.08969C19.9991 7.85986 20.0352 7.58667 19.9667 7.33021C19.8982 7.07374 19.7306 6.85499 19.5008 6.72205L17.5885 5.61672V3.41407C17.5885 3.14854 17.483 2.89388 17.2953 2.70612C17.1075 2.51835 16.8529 2.41287 16.5873 2.41287H14.3857L13.2813 0.501575C13.148 0.272216 12.9296 0.104604 12.6736 0.0350146C12.5466 0.000589099 12.4141 -0.00828766 12.2836 0.00889877C12.1532 0.0260852 12.0274 0.0689931 11.9137 0.135135L10.0014 1.24046L8.08911 0.134134C7.85915 0.00137182 7.58588 -0.034606 7.3294 0.0341144C7.07292 0.102835 6.85424 0.270625 6.72146 0.500574L5.61614 2.41287H3.41449C3.14896 2.41287 2.8943 2.51835 2.70654 2.70612C2.51877 2.89388 2.41329 3.14854 2.41329 3.41407V5.61572L0.500992 6.72105C0.386887 6.78668 0.286876 6.87421 0.206703 6.97862C0.126531 7.08302 0.0677781 7.20224 0.0338202 7.32942C-0.000137755 7.4566 -0.00863139 7.58923 0.00882726 7.71971C0.0262859 7.85018 0.0693526 7.97591 0.135553 8.08969L1.24088 9.99999L0.135553 11.9103C0.00338332 12.1403 -0.0324765 12.4133 0.0357919 12.6697C0.10406 12.9261 0.27092 13.1451 0.499991 13.2789L2.41229 14.3843V16.5859C2.41229 16.8514 2.51777 17.1061 2.70553 17.2939C2.8933 17.4816 3.14796 17.5871 3.41349 17.5871H5.61614L6.72146 19.4994C6.8101 19.6509 6.93666 19.7768 7.08868 19.8645C7.24071 19.9523 7.41296 19.999 7.58851 20C7.76272 20 7.93592 19.9539 8.09011 19.8648L10.0004 18.7595L11.9127 19.8648C12.1426 19.9974 12.4157 20.0334 12.6721 19.9649C12.9285 19.8964 13.1472 19.729 13.2803 19.4994L14.3847 17.5871H16.5863C16.8519 17.5871 17.1065 17.4816 17.2943 17.2939C17.482 17.1061 17.5875 16.8514 17.5875 16.5859V14.3843L19.4998 13.2789C19.6137 13.2131 19.7135 13.1255 19.7936 13.021C19.8736 12.9166 19.9322 12.7974 19.9662 12.6703C20.0001 12.5432 20.0087 12.4107 19.9914 12.2803C19.974 12.1498 19.9312 12.0241 19.8653 11.9103L18.7609 9.99999ZM7.4974 4.98396C7.89583 4.98409 8.2779 5.1425 8.55954 5.42433C8.84118 5.70616 8.99933 6.08833 8.9992 6.48677C8.99907 6.8852 8.84066 7.26727 8.55883 7.54891C8.277 7.83055 7.89483 7.9887 7.4964 7.98857C7.09796 7.98844 6.7159 7.83003 6.43425 7.5482C6.15261 7.26637 5.99446 6.8842 5.99459 6.48576C5.99472 6.08733 6.15313 5.70526 6.43496 5.42362C6.71679 5.14198 7.09896 4.98383 7.4974 4.98396ZM7.79776 14.5955L6.19583 13.3951L12.203 5.38544L13.805 6.58589L7.79776 14.5955ZM12.5034 14.996C12.3061 14.9959 12.1108 14.957 11.9285 14.8814C11.7463 14.8059 11.5807 14.6952 11.4413 14.5556C11.3018 14.4161 11.1912 14.2504 11.1158 14.0681C11.0403 13.8858 11.0015 13.6905 11.0016 13.4932C11.0017 13.2959 11.0406 13.1006 11.1162 12.9183C11.1917 12.7361 11.3024 12.5705 11.442 12.431C11.5815 12.2916 11.7472 12.181 11.9295 12.1055C12.1118 12.0301 12.3071 11.9913 12.5044 11.9914C12.9028 11.9915 13.2849 12.1499 13.5666 12.4317C13.8482 12.7136 14.0063 13.0957 14.0062 13.4942C14.0061 13.8926 13.8477 14.2747 13.5658 14.5563C13.284 14.838 12.9018 14.9961 12.5034 14.996Z"
                        fill="#FC8019"
                      />
                    </svg>
                    <p>50% off up to ₹100 | Use code TRYNEW</p>
                  </div>
                  <div className={styles.offerItem}>
                    {/* Second SVG*/}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M18.7609 9.99999L19.8663 8.08969C19.9991 7.85986 20.0352 7.58667 19.9667 7.33021C19.8982 7.07374 19.7306 6.85499 19.5008 6.72205L17.5885 5.61672V3.41407C17.5885 3.14854 17.483 2.89388 17.2953 2.70612C17.1075 2.51835 16.8529 2.41287 16.5873 2.41287H14.3857L13.2813 0.501575C13.148 0.272216 12.9296 0.104604 12.6736 0.0350146C12.5466 0.000589099 12.4141 -0.00828766 12.2836 0.00889877C12.1532 0.0260852 12.0274 0.0689931 11.9137 0.135135L10.0014 1.24046L8.08911 0.134134C7.85915 0.00137182 7.58588 -0.034606 7.3294 0.0341144C7.07292 0.102835 6.85424 0.270625 6.72146 0.500574L5.61614 2.41287H3.41449C3.14896 2.41287 2.8943 2.51835 2.70654 2.70612C2.51877 2.89388 2.41329 3.14854 2.41329 3.41407V5.61572L0.500992 6.72105C0.386887 6.78668 0.286876 6.87421 0.206703 6.97862C0.126531 7.08302 0.0677781 7.20224 0.0338202 7.32942C-0.000137755 7.4566 -0.00863139 7.58923 0.00882726 7.71971C0.0262859 7.85018 0.0693526 7.97591 0.135553 8.08969L1.24088 9.99999L0.135553 11.9103C0.00338332 12.1403 -0.0324765 12.4133 0.0357919 12.6697C0.10406 12.9261 0.27092 13.1451 0.499991 13.2789L2.41229 14.3843V16.5859C2.41229 16.8514 2.51777 17.1061 2.70553 17.2939C2.8933 17.4816 3.14796 17.5871 3.41349 17.5871H5.61614L6.72146 19.4994C6.8101 19.6509 6.93666 19.7768 7.08868 19.8645C7.24071 19.9523 7.41296 19.999 7.58851 20C7.76272 20 7.93592 19.9539 8.09011 19.8648L10.0004 18.7595L11.9127 19.8648C12.1426 19.9974 12.4157 20.0334 12.6721 19.9649C12.9285 19.8964 13.1472 19.729 13.2803 19.4994L14.3847 17.5871H16.5863C16.8519 17.5871 17.1065 17.4816 17.2943 17.2939C17.482 17.1061 17.5875 16.8514 17.5875 16.5859V14.3843L19.4998 13.2789C19.6137 13.2131 19.7135 13.1255 19.7936 13.021C19.8736 12.9166 19.9322 12.7974 19.9662 12.6703C20.0001 12.5432 20.0087 12.4107 19.9914 12.2803C19.974 12.1498 19.9312 12.0241 19.8653 11.9103L18.7609 9.99999ZM7.4974 4.98396C7.89583 4.98409 8.2779 5.1425 8.55954 5.42433C8.84118 5.70616 8.99933 6.08833 8.9992 6.48677C8.99907 6.8852 8.84066 7.26727 8.55883 7.54891C8.277 7.83055 7.89483 7.9887 7.4964 7.98857C7.09796 7.98844 6.7159 7.83003 6.43425 7.5482C6.15261 7.26637 5.99446 6.8842 5.99459 6.48576C5.99472 6.08733 6.15313 5.70526 6.43496 5.42362C6.71679 5.14198 7.09896 4.98383 7.4974 4.98396ZM7.79776 14.5955L6.19583 13.3951L12.203 5.38544L13.805 6.58589L7.79776 14.5955ZM12.5034 14.996C12.3061 14.9959 12.1108 14.957 11.9285 14.8814C11.7463 14.8059 11.5807 14.6952 11.4413 14.5556C11.3018 14.4161 11.1912 14.2504 11.1158 14.0681C11.0403 13.8858 11.0015 13.6905 11.0016 13.4932C11.0017 13.2959 11.0406 13.1006 11.1162 12.9183C11.1917 12.7361 11.3024 12.5705 11.442 12.431C11.5815 12.2916 11.7472 12.181 11.9295 12.1055C12.1118 12.0301 12.3071 11.9913 12.5044 11.9914C12.9028 11.9915 13.2849 12.1499 13.5666 12.4317C13.8482 12.7136 14.0063 13.0957 14.0062 13.4942C14.0061 13.8926 13.8477 14.2747 13.5658 14.5563C13.284 14.838 12.9018 14.9961 12.5034 14.996Z"
                        fill="#FC8019"
                      />
                    </svg>
                    <p>20% off | Use code PARTY</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.searchBoxContainer}>
              <input
                type="text"
                placeholder="Search for dish"
                className={styles.searchBox}
              />
            </div>
            <div className={styles.searchBoxContainer2}>
              <button className={styles.searchButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                >
                  <path
                    opacity="0.75"
                    d="M4.55113 19.8492L4.84496 19.4446C4.8011 19.4128 4.76705 19.3693 4.74666 19.3191C4.72627 19.2688 4.72036 19.2139 4.7296 19.1605L4.72971 19.1598L5.80291 12.9061L5.84737 12.647L5.65916 12.4635L1.11661 8.03472L1.11658 8.03468C1.06105 7.98056 1.02929 7.90661 1.02826 7.82908C1.02724 7.75185 1.0568 7.67735 1.11048 7.62185C1.15611 7.57557 1.21406 7.54639 1.27596 7.53755L1.27716 7.53737L7.55562 6.62491L7.81582 6.58709L7.93213 6.35129L10.7376 0.663776C10.7377 0.663467 10.7379 0.66316 10.738 0.662852C10.8114 0.517413 10.9877 0.459775 11.1299 0.529955L11.1304 0.530241C11.1872 0.558171 11.2332 0.604162 11.2611 0.660924L11.2613 0.661356L14.068 6.35129L14.1843 6.58709L14.4445 6.62491L20.7214 7.53714C20.7216 7.53717 20.7218 7.53721 20.722 7.53724C20.886 7.56197 20.9919 7.71124 20.9683 7.86396L20.9683 7.86395L20.9675 7.86949C20.9587 7.93149 20.9294 7.98953 20.883 8.03519C20.8829 8.03533 20.8827 8.03547 20.8826 8.03562L16.3409 12.4635L16.1527 12.647L16.1972 12.9061L17.2704 19.1598L17.2705 19.1602C17.2975 19.3171 17.1922 19.4675 17.0328 19.495L17.0321 19.4951C16.9687 19.5061 16.9038 19.4955 16.8507 19.4672L16.8485 19.466L11.2327 16.5135L11 16.3912L10.7674 16.5135L5.15162 19.466L5.15084 19.4664C5.10291 19.4917 5.04885 19.5031 4.99478 19.4993C4.94072 19.4954 4.88882 19.4765 4.84496 19.4446L4.55113 19.8492Z"
                    stroke="#404040"
                  />
                </svg>
                <span className={styles.searchText}>Favourite</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.divFields}>
        <div className={styles.fieldsContainer}>
          <div className={styles.divList}>
            <ul className={styles.dishList}>
              {dishData &&
                dishData.map((dish, index) => (
                  <li key={index} className={styles.listItem}>
                    {dish.name}
                  </li>
                ))}
            </ul>
          </div>

          <div className={styles.field}>
            <div className={styles.divDishes}>
              {/* DISH 1 */}
              <div className={styles.divDishContainer}>
                <div className={styles.divDishInfo}>
                  <div className={styles.divTitleDish}>
                    {dishData && dishData[0] && (
                      <h3 className={styles.listItem}>{dishData[0].name}</h3>
                    )}
                  </div>
                  <div className={styles.divPriceDish}>
                    {dishData && dishData[0] && (
                      <h4 className={styles.listItem}>$ {dishData[0].price}</h4>
                    )}
                  </div>
                  <div className={styles.divPriceDescription}>
                    {dishData && dishData[0] && (
                      <h4 className={styles.listItem}>
                        {dishData[0].description}
                      </h4>
                    )}
                  </div>
                </div>
                <div className={styles.divImageColumn}>
                  <div className={styles.divImageDish}>
                    <FoodImage6 />
                    {dishData && dishData[0] && (
                      <button
                        className={styles.imageButton}
                        onClick={() => addToCart(dishData[0])}
                      >
                        Add +
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* DISH 2 */}
              <div className={styles.divDishContainer}>
                <div className={styles.divDishInfo}>
                  <div className={styles.divTitleDish}>
                    {dishData && dishData[1] && (
                      <h3 className={styles.listItem}>{dishData[1].name}</h3>
                    )}
                  </div>
                  <div className={styles.divPriceDish}>
                    {dishData && dishData[1] && (
                      <h4 className={styles.listItem}>$ {dishData[1].price}</h4>
                    )}
                  </div>
                  <div className={styles.divPriceDescription}>
                    {dishData && dishData[1] && (
                      <h4 className={styles.listItem}>
                        {dishData[1].description}
                      </h4>
                    )}
                  </div>
                </div>
                <div className={styles.divImageColumn}>
                  <div className={styles.divImageDish}>
                    <FoodImage6 />
                    {dishData && dishData[0] && (
                      <button
                        className={styles.imageButton}
                        onClick={() => addToCart(dishData[1])}
                      >
                        Add +
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* DISH 3 */}
              <div className={styles.divDishContainer}>
                <div className={styles.divDishInfo}>
                  <div className={styles.divTitleDish}>
                    {dishData && dishData[2] && (
                      <h3 className={styles.listItem}>{dishData[2].name}</h3>
                    )}
                  </div>
                  <div className={styles.divPriceDish}>
                    {dishData && dishData[2] && (
                      <h4 className={styles.listItem}>$ {dishData[2].price}</h4>
                    )}
                  </div>
                  <div className={styles.divPriceDescription}>
                    {dishData && dishData[2] && (
                      <h4 className={styles.listItem}>
                        {dishData[2].description}
                      </h4>
                    )}
                  </div>
                </div>
                <div className={styles.divImageColumn}>
                  <div className={styles.divImageDish}>
                    <FoodImage6 />
                    {dishData && dishData[0] && (
                      <button
                        className={styles.imageButton}
                        onClick={() => addToCart(dishData[2])}
                      >
                        Add +
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.field2}>
            <h2>Cart</h2>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <p>{item.name}</p>
                <p>${item.price}</p>
              </div>
            ))}
            <div className={styles.cartTotal}>
              <p>Total</p>
              <p>${cartTotal}</p>
            </div>
            <div className={styles.divCartButton}>
              <button
                onClick={handleCheckoutClick}
                className={styles.cartButton}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="divFooter">{/* <Footer /> */}</div>
    </div>
  );
}

export default RestaurantPage;
