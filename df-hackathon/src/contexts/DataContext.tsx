import React, { createContext, useContext, useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive'; 
}

interface Product {
  id: number;
  name: string;
  packsize: number;
  category: string;
  mrp: number;
  image: string;
  status: string;
}

interface DataContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('http://localhost:8080/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const productsResponse = await fetch('http://localhost:8080/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const contextValue: DataContextType = {
    categories,
    setCategories,
    products,
    setProducts,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
