import React, { useState } from 'react';
import {
  HiArrowNarrowRight,
  HiOutlineStar,
} from 'react-icons/hi';
import dateFormatter from '../../utils/dateFormatter';
import { MdOutlineDirections } from 'react-icons/md';
import {
  HiOutlineTicket,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
} from 'react-icons/hi';
import { fetchEvent } from '../../services/eventsApis';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BookTicket from '../bookings/BookTicket';
import { useUser } from '../../context/UserContex';

const Loader = () => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='flex justify-between items-center p-4 bg-primary-color'>
        <h2 className='text-2xl animate-pulse flex items-center gap-2 font-semibold text-white'>
          <span className='w-[1.8rem] h-[1.8rem] bg-gray-200 rounded-full'></span>
          Reservation Summary
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
              Available Tickets:
            </span>
            <span className='bg-gray-200 w-16 h-8 rounded-full'></span>
          </span>
        </div>
      </div>
    </div>
  );
};

const Event = ({ event }) => {
  const [openBookingModel, setopenBookingModel] =
    useState(false);
  const { user, setRedirectRoute } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();

  function handleOnClick() {
    if (!user) {
      setRedirectRoute(`/events/${id}`);
      return navigate('/sign-in');
    }
    setopenBookingModel(true);
  }
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      {openBookingModel && (
        <BookTicket
          eventId={event.id}
          closeModel={setopenBookingModel}
          maxTickets={event.availableTickets}
        />
      )}
      <div className='flex justify-between items-center p-4 bg-primary-color'>
        <h2 className='text-2xl flex items-center gap-2 font-semibold text-white'>
          <HiOutlineStar className='w-[1.8rem] h-[1.8rem] text-white' />
          {event.title}
        </h2>
        <p className=' text-gray-100 flex items-center gap-2 px-4 text-base font-semibold'>
          <HiOutlineCalendar className='w-[1.4rem] h-[1.4rem]' />
          {dateFormatter.format(new Date(event.date))}
        </p>
      </div>
      <div className='p-6'>
        <h2 className='text-2xl font-semibold mb-2'>
          Location Details
        </h2>

        <div className='mb-4 flex gap-8'>
          <p className='font-light basis-2/3'>
            {event.location.description}
          </p>

          <div className='flex basis-1/3 flex-col gap-4'>
            <p className='flex gap-2 items-center font-normal'>
              <HiOutlineLocationMarker className='w-[1.2rem] h-[1.2rem] color-500' />{' '}
              {event.location.address}
            </p>
            <Link
              to={`https://www.google.com/maps?q=${event.location.coordinates[0]},${event.location.coordinates[1]}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 w-min cursor-pointer border-b font-normal border-b-transparent hover:border-b hover:border-b-primary-color'
            >
              <MdOutlineDirections className='w-[1.2rem] h-[1.2rem] color-500' />{' '}
              Direction
            </Link>
          </div>
        </div>

        <div className=''>
          <span className='bg-[#c5ffff] w-full flex justify-between items-center text-primary-color font-medium me-2 px-2.5 text-base rounded dark:bg-blue-900 dark:text-blue-300'>
            <span className='flex items-center gap-1 p-4'>
              <HiOutlineTicket className='w-[1.4rem] h-[1.4rem]' />
              Available Tickets: {event.availableTickets}
            </span>

            {event.availableTickets >= 1 && (
              <button
                className='bg-[#FD673A] text-white py-1 px-4 font-normal  rounded-full flex gap-1 items-center'
                onClick={handleOnClick}
              >
                Book your ticket{' '}
                <HiArrowNarrowRight className='mt-0.5' />
              </button>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

const EventDetails = () => {
  const { id } = useParams();

  const { data: event, isLoading } = useQuery({
    queryKey: [`event-${id}`],
    queryFn: () => fetchEvent(id),
  });

  return (
    <>{isLoading ? <Loader /> : <Event event={event} />}</>
  );
};

export default EventDetails;
