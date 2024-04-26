import React from 'react';
import HorizontalNav from './HorizontalNav';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='py-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <h1 className='text-primary-color text-2xl font-mono font-extralight'>
          <Link to='/'>EtiteEvents</Link>
        </h1>
      </div>
      <HorizontalNav />
    </header>
  );
}
