import React from 'react';

import {
  FaRegCalendarCheck,
  FaLocationArrow,
} from 'react-icons/fa6';
import { HiArrowNarrowRight } from 'react-icons/hi';
import dateFormatter from '../../utils/dateFormatter';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContex';

export default function EventCard({
  title,
  date,
  location,
  id,
  availableTickets,
  openBookModel,
  setEventToBook,
}) {
  const { user, setRedirectRoute } = useUser();
  const navigate = useNavigate();

  function handleOnClick() {
    if (!user) {
      setRedirectRoute('/');
      return navigate('/sign-in');
    }
    setEventToBook({
      id,
      maxTickets: availableTickets,
    });
    openBookModel(true);
  }

  return (
    <div className='bg-primary-color text-white drop-shadow-md overflow-hidden rounded'>
      <div className='p-4 flex flex-col'>
        <h3 className='tracking-wider text-xl font-semibold'>
          {title}
        </h3>

        <div className='mt-10 flex flex-col gap-4'>
          <div className='flex flex-col gap-2 mb-4'>
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
              onClick={handleOnClick}
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
