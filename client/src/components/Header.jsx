import React from 'react';
import HorizontalNav from './HorizontalNav';
import Logo from './Logo';

export default function Header() {
  return (
    <header
      className={`py-1 flex justify-between items-center sticky top-0 z-10 mt-2 mb-8`}
    >
      <Logo />
      <HorizontalNav />
    </header>
  );
}
