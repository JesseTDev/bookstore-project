import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./shared/components/NavBar.component";
import AuthenticationPage from "./pages/sign-in/AuthenticationPage.component";
import LibraryPage from "./pages/library/LibraryPage.component";
import Account from "./pages/account/account.page.component";
import Checkout from "./pages/checkout/checkout.page.component";
import Cart from "./cart/cart.component";

const App = () => {
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};
 
export default App;