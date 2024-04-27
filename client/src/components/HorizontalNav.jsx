import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContex';
import { CiLogin } from 'react-icons/ci';

export default function HorizontalNav() {
  const { user, signOut } = useUser();

  const navigate = useNavigate();
  return (
    <nav className='flex items-center gap-4'>
      {user ? (
        <>
          <Link
            to='/dashboard'
            className='text-white border bg-primary-color align-middle py-0.5 px-4 rounded-full font-light'
          >
            Dashboard
          </Link>
          <button
            className=' w-full text-gray-900 font-normal hover:bg-gray-200 transition-all hover:text-white rounded p-1 flex gap-2 items-center'
            onClick={() => {
              signOut();
              navigate('/');
            }}
          >
            <CiLogin className='w-[1.2rem] h-[1.2rem] text-gray-500' />
          </button>
        </>
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
    </nav>
  );
}
