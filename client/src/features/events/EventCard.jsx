import React from 'react';

import {
  FaRegCalendarCheck,
  FaLocationArrow,
} from 'react-icons/fa6';
import { HiArrowNarrowRight } from 'react-icons/hi';
import dateFormatter from '../../utils/dateFormatter';
import { Link } from 'react-router-dom';

export default function EventCard({
  title,
  date,
  location,
  id,
  availableTickets,
  openBookModel,
  setEventToBook,
}) {
  return (
    <div className='bg-primary-color text-white drop-shadow-md overflow-hidden max-w-[28rem] rounded'>
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
            <Link
              to={`/events/${id}`}
              className='text-white flex items-center justify-center border-b-[1.3px] font-normal border-b-transparent hover:border-b-[1.3px] hover:border-b-white'
            >
              More Info{' '}
              <HiArrowNarrowRight className='ml-[2px] mt-1' />
            </Link>
            <button
              className='bg-[#FD673A] text-white py-1 px-4 font-normal  rounded-full flex gap-1 items-center'
              onClick={() => {
                setEventToBook({
                  id,
                  maxTickets: availableTickets,
                });
                openBookModel(true);
              }}
            >
              Book your ticket{' '}
              <HiArrowNarrowRight className='mt-0.5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
