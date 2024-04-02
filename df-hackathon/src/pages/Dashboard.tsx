import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

const Dashboard: React.FC = () => {
  const isAuthenticated = localStorage.getItem('authenticated');

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
}

export { Dashboard };
