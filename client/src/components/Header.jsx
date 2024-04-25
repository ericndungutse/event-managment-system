import React from 'react';

export default function Header() {
  return (
    <header className='py-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <h1 className='text-primary-color text-2xl font-mono font-extralight'>
          EtiteEvents
        </h1>
      </div>
      <div className='flex items-center gap-4'>
        <button className='text-primary-color border border-primary-color align-middle text-base py-0.5 px-4 rounded-full font-light'>
          Sign in
        </button>

        <button className='bg-primary-color hover:border-primary-color align-middle text-base text-white border border-primary-color py-0.5 px-4 rounded-full font-light'>
          Sign up
        </button>
      </div>
    </header>
  );
}
