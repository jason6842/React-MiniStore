import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home.page";
import ProductsList from "./pages/ProductsList.page";
import Product from "./pages/ProductDetail.page";
import ProfilePage from "./pages/Profile.page";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/Login.page";
import NotFoundPage from "./pages/NotFound.page";


function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul style={{display: "flex", flexDirection: "row", gap:40}}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/products-list">ProductList</Link>
          </li>
          <li>
            <Link to="/login">LogIn</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products-list" element={<ProductsList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
