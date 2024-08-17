import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Trending.module.css";

const SpecialOffers = () => {
  const [productarray, setproductarray] = useState([]);
  const [error, seterror] = useState("");
  const [cart, setCart] = useState([]);
  const [wish, setWishlist] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/products`)
      .then((products) => {
        setproductarray(products.data);
      })
      .catch((error) => seterror(error.message));
    console.log("yes");
  }, []);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const addToWishlist = (item) => {
    let flag = false;
    wish.forEach((res) => {
      if (res.id == item.id) {
        flag = true;
      }
    });
    if (flag) return;
    setWishlist([...wish, item]);

    axios.post("http://localhost:7000/wish", item);
  };

  return (
    <div>
      <div id={styles["trend_head"]}>
        <h1 style={{ fontFamily: "serif", fontWeight: "bolder" }}>
          <img id={styles["trend_img"]} src="fire.gif" /> Special Offers
        </h1>
        <h5>Exclusive Deals Just for You</h5>
      </div>

      <div className={styles["container"]}>
        {productarray.slice(9, 12).map((post) => {
          const { title, MRP, image, Price, id, Company } = post;
          return (
            <Card
              id={styles["trend"]}
              style={{ width: "18rem", margin: "10px" }}
              key={post.id}
            >
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  {Company}
                  <br></br>
                  <sup>₹ </sup>
                  {Price} <s className={styles["MRP"]}>₹{MRP}</s>
                </Card.Text>
                {/* <Button>Add To Cart</Button> */}
                <div classNamel={styles["button"]}>
                  <Button
                    id="buttons"
                    variant="primary"
                    style={{ width: "200px", margin: "10px" }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    id="buttons"
                    onClick={() => addToWishlist(post)}
                    variant="primary"
                    style={{ width: "200px" }}
                  >
                    Add to wishlist
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialOffers;