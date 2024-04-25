import React from 'react';

import {
  FaArrowRight,
  FaRegCalendarCheck,
  FaLocationArrow,
} from 'react-icons/fa6';
import dateFormatter from '../../utils/dateFormatter';

export default function EventCard({
  id,
  title,
  date,
  location,
}) {
  return (
    <div
      className='bg-primary-color text-white drop-shadow-md overflow-hidden max-w-[24rem] rounded'
      key={id}
    >
      <div className='p-4 flex flex-col'>
        <h3 className='tracking-wider text-xl font-semibold'>
          {title}
        </h3>

        <div className='mt-10 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs font-light flex gap-1 items-center'>
              <FaRegCalendarCheck className='inline-block text-xs' />{' '}
              {dateFormatter.format(new Date(date))}
            </p>

            <p className='text-xs font-light flex gap-1 items-center'>
              <FaLocationArrow className='inline-block text-xs' />{' '}
              {location.address}
            </p>
          </div>

          <div className='flex justify-between items-center'>
            <a
              href='/'
              className='text-white hover:underline font-normal py-2 text-xs flex items-center justify-center'
            >
              More Info{' '}
              <FaArrowRight className='ml-[2px]' />
            </a>
            <button className='bg-[#FD673A] text-white py-1 px-2 font-normal text-xs rounded-full flex gap-1 items-center'>
              Book your ticket <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
