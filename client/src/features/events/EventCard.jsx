import React from 'react';

import {
  FaArrowRight,
  FaRegCalendarCheck,
  FaLocationArrow,
} from 'react-icons/fa6';
import dateFormatter from '../../utils/dateFormatter';

export default function EventCard({
  title,
  date,
  location,
}) {
  return (
    <div className='bg-primary-color text-white drop-shadow-md overflow-hidden max-w-[24rem] rounded'>
      <div className='p-4 flex flex-col'>
        <h3 className='tracking-wider text-xl font-semibold'>
          {title}
        </h3>

        <div className='mt-10 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <p className=' font-light flex gap-1 items-center'>
              <FaRegCalendarCheck className='inline-block ' />{' '}
              {dateFormatter.format(new Date(date))}
            </p>

            <p className=' font-light flex gap-1 items-center'>
              <FaLocationArrow className='inline-block ' />{' '}
              {location.address}
            </p>
          </div>

          <div className='flex justify-between items-center'>
            <a
              href='/'
              className='text-white hover:underline font-normal py-2  flex items-center justify-center'
            >
              More Info{' '}
              <FaArrowRight className='ml-[2px]' />
            </a>
            <button className='bg-[#FD673A] text-white py-1 px-2 font-normal  rounded-full flex gap-1 items-center'>
              Book your ticket <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
