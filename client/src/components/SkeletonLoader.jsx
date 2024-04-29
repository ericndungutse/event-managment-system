import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='flex justify-between items-center p-4 bg-primary-color'>
        <h2 className='text-2xl animate-pulse flex items-center gap-2 font-semibold text-white'>
          <span className='w-[1.8rem] h-[1.8rem] bg-gray-200 rounded-full'></span>
        </h2>
        <p className='text-gray-200 animate-pulse flex items-center gap-2 text-base font-semibold'>
          <span className='w-[1.4rem] h-[1.4rem] bg-gray-200 rounded-full'></span>
        </p>
      </div>
      <div className='p-6'>
        <h2 className='text-2xl font-semibold mb-2 animate-pulse'>
          <span className='bg-gray-200 w-full h-6 rounded-full'></span>
        </h2>

        <div className='mb-4 flex gap-8'>
          <p className='font-light basis-2/3 animate-pulse'>
            <span className='bg-gray-200 w-full h-16 rounded-lg'></span>
          </p>

          <div className='flex basis-1/3 flex-col gap-2'>
            <p className='flex gap-2 items-center animate-pulse'>
              <span className='w-[1.4rem] h-[1.4rem] bg-gray-200 rounded-full'></span>{' '}
            </p>
            <p className='flex items-center gap-2 animate-pulse'>
              <span className='w-[1.4rem] h-[1.4rem] bg-gray-200 rounded-full'></span>{' '}
            </p>
          </div>
        </div>

        <div className=''>
          <span className='bg-gray-200 w-full flex justify-between items-center text-primary-color font-medium me-2 px-2.5 text-base rounded animate-pulse'>
            <span className='flex items-center gap-1 p-4'>
              <span className='w-[1.4rem] h-[1.4rem] bg-gray-200 rounded-full'></span>
            </span>
            <span className='bg-gray-200 w-16 h-8 rounded-full'></span>
          </span>
        </div>
      </div>
    </div>
  );
}
