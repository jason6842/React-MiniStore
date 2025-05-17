import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home.page";
import ProductsList from "./pages/ProductsList.page";
import Product from "./pages/ProductDetail.page";
import ProfilePage from "./pages/Profile.page";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/Login.page";
import NotFoundPage from "./pages/NotFound.page";
import { withAuth } from "./hoc/withAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import { Button } from "./components/ui/button";
import Modal from "./components/Modal";
import LoginModal from "./components/LoginModal";
import { ToastContainer } from "react-toastify";
import SearchAutoComplete from "./components/SearchAutoComplete";

const ProtectedProductsList = withAuth(ProductsList);

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <BrowserRouter>
      <nav className="flex items-center justify-between px-6 py-4 bg-white">
        <ul className="flex gap-10">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/products-list">ProductList</Link>
          </li>
          {/* <li>
            <Link to="/login">LogIn</Link>
          </li> */}
          <li>
            <Button onClick={() => setShowLoginModal(true)}>Login</Button>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
        <SearchAutoComplete />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products-list" element={<ProductsList />} />
          <Route path="/product/:id" element={<Product />} />
        </Route>
        <Route path="/products-list" element={<ProtectedProductsList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Login"
      >
        <LoginModal onClose={() => setShowLoginModal(false)} />
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} theme="dark"/>
    </BrowserRouter>
  );
}

export default App;
