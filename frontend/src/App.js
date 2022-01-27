import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
// import Navbar from "./components/templates/Navbar";
import Profile from "./components/common/Profile";
import Login from "./components/common/login";
import Foodreg from "./components/common/foodreg";
import Food_edit_search from "./components/common/food_edit_search";
import Food_delete_search from "./components/common/food_delete_search";
import Food_edit from "./components/common/food_edit";
import Place_order from "./components/common/place_order";
import Buyer_list from "./components/users/buyerlist";
import Placesearch from "./components/common/placesearch";
import View from "./components/common/view_order";
import Cart from "./components/common/cart";
import Stats from "./components/common/stats";
import Wallet from "./components/common/wallet";

const Layout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="foodreg" element={<Foodreg />} />
          <Route path="food_edit_search" element={<Food_edit_search />} />
          <Route path="food_delete_search" element={<Food_delete_search />} />
          <Route path="food_edit" element={<Food_edit />} />
          <Route path="place_order" element={<Place_order />} />
          <Route path="placesearch" element={<Placesearch />} />
          <Route path="buyer" element={<Buyer_list />} />
          <Route path="view" element={<View />} />
          <Route path="cart" element={<Cart />} />
          <Route path="stats" element={<Stats />} />
          <Route path="wallet" element={<Wallet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
