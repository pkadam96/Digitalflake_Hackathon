// src/useCategoryData.tsx
import { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
}

export const useCategoryData = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return categories;
};
