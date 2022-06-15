import React, { useState, useEffect } from "react";
import CheckoutNotification from "../components/checkoutNotification/checkoutNotification";
import Header from "../components/header/header";
import Search from "../components/search/search";
import { FoodDetail } from "../interfaces/FoodDetail";

export default function Home() {
  const [cart, setCart] = useState<FoodDetail[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [lastCheckout, setLastCheckout] = useState<string>('');

  useEffect(() => {
    resetCart();
  }, []);

  function resetCart() {
    let sessionCart = sessionStorage.getItem('foodCart');
    if (!sessionCart) {
      sessionStorage.setItem('foodCart', '[]');
      sessionCart = '[]';
    }
    let parsedSessionCart = sessionCart.length === 0 ? [] : JSON.parse(sessionCart);
    setCart(parsedSessionCart);
  }

  function handleCartChange(foodItemString: string) {
    const foodItem: FoodDetail = JSON.parse(foodItemString);
    const sessionCart = sessionStorage.getItem('foodCart');
    let parsedSessionCart = sessionCart.length === 0 ? [] : JSON.parse(sessionCart);
    if (parsedSessionCart.find((cartItem: FoodDetail) => cartItem.fdcId === foodItem.fdcId)) {
      parsedSessionCart = cart.filter((cartItem: FoodDetail) => cartItem.fdcId !== foodItem.fdcId);
    } else {
      parsedSessionCart.push(foodItem);
    }
    sessionStorage.setItem('foodCart', JSON.stringify(parsedSessionCart));
    setCart(parsedSessionCart);
  }

  function handleCheckout() {
    buildLastCheckout();
    sessionStorage.setItem('foodCart', '[]');
    resetCart();
    setSnackbarOpen(true)
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 4000)
  }

  function buildLastCheckout() {
    const calorieList = cart.map((item) => item.foodNutrients.find((nut) => nut.nutrientNumber === '208'));
    const totalCalories = calorieList.map((nutrient) => nutrient.value).reduce((first, next) => first + next);
    setLastCheckout(`Checked out ${calorieList.length} item${calorieList.length > 1 ? 's' : ''}, totalling ${totalCalories} calories!`);
  }

  return (
    <div>
      <Header
        cart={JSON.stringify(cart)}
        onCartChange={handleCartChange}
        onCheckout={handleCheckout}
      />
      <Search
        cart={JSON.stringify(cart)}
        onCartChange={handleCartChange}
      />
      <CheckoutNotification
        checkoutText={lastCheckout}
        open={snackbarOpen}
      />
    </div>
  )
}
