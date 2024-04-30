import React from 'react';
import Header from './Header';

export default function PageLayout({
  children,
  showHeader = true,
}) {
  return (
    <div className='px-4 md:px-10 md:pb-6 lg:px-30 xl:px-40'>
      {showHeader && <Header />}
      {children}
    </div>
  );
}
