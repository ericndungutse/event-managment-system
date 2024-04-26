import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContex';

export default function HorizontalNav() {
  const { user } = useUser();
  return (
    <nav>
      <div className='flex items-center gap-4'>
        {user ? (
          <Link
            to='/dashboard'
            className='text-primary-color border border-primary-color align-middle py-0.5 px-4 rounded-full font-light'
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              to='/sign-in'
              className='text-primary-color border border-primary-color align-middle py-0.5 px-4 rounded-full font-light'
            >
              Sign in
            </Link>

            <Link
              to='/sign-in'
              className='bg-primary-color hover:border-primary-color align-middle text-white border border-primary-color py-0.5 px-4 rounded-full font-light'
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
