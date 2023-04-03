import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useGetShoppingCartByIdQuery } from '../Apis/shoppingCartApi';
import { Footer, Header } from '../Components/Layout';
import { userModel } from '../Interfaces';
import { AccessDenied, AllOrders, Home, Login, MenuItemDetails, MenuItemList, MenuItemUpsert, MyOrders, NotFound, OrderConfirmed, OrderDetails, Payment, Register } from '../Pages';
import ShoppingCart from '../Pages/ShoppingCart';
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice';
import jwt_decode from "jwt-decode";
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { RootState } from '../Storage/Redux/store';

const App = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const [skip, setSkip] = useState(true);
  const { data, isLoading } = useGetShoppingCartByIdQuery(
    userData.id, {  skip: skip, }
  );

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data.result);
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (userData.id) setSkip(false);
  }, [userData]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/menuItemDetails/:menuItemId' element={<MenuItemDetails />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accessDenied" element={<AccessDenied />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="order/orderconfirmed/:id" element={<OrderConfirmed />} />
        <Route path="/order/myOrders" element={<MyOrders />} />
        <Route path="/order/orderDetails/:id" element={<OrderDetails />} />
        <Route path="/order/allOrders" element={<AllOrders />} />
        <Route path="/menuItem/menuitemlist" element={<MenuItemList />} />
        <Route path="/menuItem/menuItemUpsert/:id" element={<MenuItemUpsert />} />
        <Route path="/menuItem/menuItemUpsert" element={<MenuItemUpsert />} />
      </Routes>    
      <Footer />
    </div>
  );
}

export default App;
