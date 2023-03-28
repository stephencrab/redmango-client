import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useGetShoppingCartByIdQuery } from '../Apis/shoppingCartApi';
import { Footer, Header } from '../Components/Layout';
import { Home, MenuItemDetails, NotFound } from '../Pages';
import ShoppingCart from '../Pages/ShoppingCart';
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice';

const App = () => {

  const dispatch = useDispatch();

  const { data, isLoading } = useGetShoppingCartByIdQuery(
    "b7ae37bf-09b1-4b47-9ce1-c963031d2920"
  );

  useEffect(() => {
    if (!isLoading) {
      console.log(data.result);
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/menuItemDetails/:menuItemId' element={<MenuItemDetails />} />
        <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
      </Routes>    
      <Footer />
    </div>
  );
}

export default App;
