import React from 'react';
import {Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { Category } from '../pages/Category';
import { AddCategory } from '../pages/AddCategory';
import { AddProduct } from '../pages/AddProducts';
import { Dashboard } from '../pages/Dashboard';

const AllRoutes: React.FC = () => {
  
  return (
    <>
      <Routes>
        <Route path="/dashboard/home" element={<Dashboard/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category" element={<Category/>} />
        <Route path="/category/add" element={<AddCategory/>}/>
        <Route path="/products/add" element={<AddProduct/>}/>
      </Routes>
    </>
  );
}

export {AllRoutes};
