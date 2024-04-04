import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

const Dashboard: React.FC = () => {

  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
}

export { Dashboard };
