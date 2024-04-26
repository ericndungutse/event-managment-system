import React from 'react';
import Header from './Header';

export default function PageLayout({ children }) {
  return (
    <div className='px-40 pb-6'>
      <Header />
      {children}
    </div>
  );
}
