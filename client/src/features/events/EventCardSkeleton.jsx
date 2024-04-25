import React from 'react';

export default function EventCardSkeleton() {
  return (
    <div className='bg-primary-color text-white flex-grow w-[16rem] max-w-[16rem] drop-shadow-md overflow-hidden rounded animate-pulse'>
      <div className='p-4 flex flex-col'>
        <div className='h-6 bg-gray-200 rounded mb-2 animate-pulse'></div>{' '}
        {/* Skeleton for Title */}
        <div className='mt-6 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='h-4 bg-gray-200 rounded w-1/3 animate-pulse'></div>{' '}
            {/* Skeleton for Date */}
            <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse'></div>{' '}
            {/* Skeleton for Address */}
          </div>
          <div className='flex justify-between items-center'>
            <div className='h-4 bg-gray-200 rounded w-1/2 animate-pulse'></div>{' '}
            {/* Skeleton for More Info */}
            <div className='h-4 bg-gray-200 rounded w-1/3 animate-pulse'></div>{' '}
            {/* Skeleton for Book Button */}
          </div>
        </div>
      </div>
    </div>
  );
}
