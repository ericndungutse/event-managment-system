import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <div className='flex items-center'>
      <h1 className='text-primary-color text-2xl font-mono font-extralight'>
        <Link to='/'>EtiteEvents</Link>
      </h1>
    </div>
  );
}
