import React from 'react';
import HorizontalNav from './HorizontalNav';
import Logo from '../components/Logo';

export default function Header() {
  return (
    <header className='py-4 flex justify-between items-center'>
      <Logo />
      <HorizontalNav />
    </header>
  );
}
