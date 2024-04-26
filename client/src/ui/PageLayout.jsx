import React from 'react';
import Header from './Header';

export default function PageLayout({
  children,
  showHeader = true,
}) {
  return (
    <div className='px-40 pb-6'>
      {showHeader && <Header />}
      {children}
    </div>
  );
}
