import React from 'react';
import { Link } from 'react-router-dom';

export default function HorizontalNav() {
  return (
    <nav>
      <div className='flex items-center gap-4'>
        <Link
          to='/sign-in'
          className='text-primary-color border border-primary-color align-middle text-base py-0.5 px-4 rounded-full font-light'
        >
          Sign in
        </Link>

        <Link
          to='/sign-in'
          className='bg-primary-color hover:border-primary-color align-middle text-base text-white border border-primary-color py-0.5 px-4 rounded-full font-light'
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}
