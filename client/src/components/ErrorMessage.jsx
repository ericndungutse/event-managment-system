import React from 'react';

export default function ErrorMessage({ children }) {
  return (
    <div className='bg-red-100 text-red-600 px-4 py-2 rounded border border-red-400'>
      {children}
    </div>
  );
}
