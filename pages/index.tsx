import React, {useState, useEffect} from "react";
import Header from "../components/header/header";
import Search from "../components/search/search";

export default function Home() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let sessionCart = sessionStorage.getItem('foodCart');
    if (!sessionCart) {
      sessionStorage.setItem('foodCart', '[]');
      sessionCart = '[]';
    }
    let parsedSessionCart = sessionCart.length === 0 ? [] : JSON.parse(sessionCart);
    setCart(parsedSessionCart);
  }, [])

  function handleCartChange(foodItemString) {
    const foodItem = JSON.parse(foodItemString);
    const sessionCart = sessionStorage.getItem('foodCart');
    let parsedSessionCart = sessionCart.length === 0 ? [] : JSON.parse(sessionCart);
    if (parsedSessionCart.find((cartItem) => cartItem.fdcId === foodItem.fdcId)) {
      parsedSessionCart = cart.filter((cartItem) => cartItem.fdcId !== foodItem.fdcId);
    } else {
      parsedSessionCart.push(foodItem);
    }
    sessionStorage.setItem('foodCart', JSON.stringify(parsedSessionCart));
    setCart(parsedSessionCart);
  }

  return (
    <div>
      <Header cart={JSON.stringify(cart)} onCartChange={handleCartChange}></Header>
      <Search cart={JSON.stringify(cart)} onCartChange={handleCartChange}></Search>
    </div>
  )
}
