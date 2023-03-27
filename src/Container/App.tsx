import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer, Header } from '../Components/Layout';
import { Home, MenuItemDetails, NotFound } from '../Pages';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/menuItemDetails/:menuItemId' element={<MenuItemDetails />} />
      </Routes>    
      <Footer />
    </div>
  );
}

export default App;
