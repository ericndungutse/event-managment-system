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
import SkeletonLoader from '../../components/SkeletonLoader';

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
      <div className='flex gap-2 flex-col items-start p-2 md:p-4 bg-primary-color md:flex-row md:justify-between md:gap-0'>
        <h2 className='text-xs md:text-2xl flex items-center gap-2 font-semibold text-white'>
          <HiOutlineStar className='w-[1.2rem] h-[1.2rem] md:w-[1.8rem] md:h-[1.8rem] text-white' />
          {event.title}
        </h2>
        <p className=' text-gray-100 flex items-center gap-2 md:px-4 text-xs md:text-base font-semibold'>
          <HiOutlineCalendar className='w-[1.2rem] h-[1.2rem] md:w-[1.8rem] md:h-[1.8rem]' />
          {dateFormatter.format(new Date(event.date))}
        </p>
      </div>
      <div className='p-2 md:p-6'>
        <h2 className='text-lg font-semibold mb-2 md:text-2xl'>
          Location Details
        </h2>

        <div className='mb-4 flex flex-col gap-3 md:gap-8 md:flex-row'>
          <p className='font-light basis-2/3'>
            {event.location.description}
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptate maiores culpa
            tempore natus! Perferendis suscipit repellat
            molestiae neque.
          </p>

          <div className='flex basis-1/3 flex-col gap-2 md:gap-4'>
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
                Book a ticket{' '}
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
    <>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <Event event={event} />
      )}
    </>
  );
};

export default EventDetails;
