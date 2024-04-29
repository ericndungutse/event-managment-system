import React, { useState } from 'react';
import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlineStar,
  HiOutlineTicket,
  HiOutlineMail,
  HiArrowLeft,
} from 'react-icons/hi';
import { FcCancel } from 'react-icons/fc';
import { MdOutlineDirections } from 'react-icons/md';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchBooking } from '../../services/bookingsApi';
import { useUser } from '../../context/UserContex';
import dateFormatter from '../../utils/dateFormatter';
import SkeletonLoader from '../../components/SkeletonLoader';

import { cancelBooking as cancelBookingApi } from '../../services/bookingsApi';
import toast from 'react-hot-toast';
import Model from '../../components/Model';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

const Booking = ({ booking }) => {
  const {
    user: { token },
  } = useUser();

  const [isModelOpen, setIsModelOpen] = useState(false);

  const [bookingDetails, setBookingDetails] = useState({
    bookingId: '',
    event: '',
  });

  const queryClient = useQueryClient();

  const { isPending, mutate: cancelBooking } = useMutation({
    mutationFn: async (id) => {
      return await cancelBookingApi(id, token);
    },

    onSuccess: () => {
      setIsModelOpen(false);
      toast.success('Tickets canceled!');
      queryClient.invalidateQueries('bookings');
    },
  });

  function handleOnClick() {
    cancelBooking(bookingDetails.bookingId);
  }

  return (
    <div className='w-full border rounded overflow-hidden shadow'>
      {!isModelOpen ? null : (
        <Model
          title='Cancel booking'
          closeModel={setIsModelOpen}
        >
          <div className='w-[26rem] flex flex-col items-center px-4'>
            <p className='mb-4 text-gray-500 font-base dark:text-gray-300'>
              Are you sure you want to cancel this booking
              for{' '}
              <span className='font-bold'>
                {bookingDetails?.event}
              </span>{' '}
              event?
            </p>
            <div className='flex gap-2 justify-end'>
              <button
                className='align-middle transition-all ease-linear text-gray-600 border duration-100  border-primary-color py-0.5 px-3 rounded-full font-light disabled:opacity-60 disabled:shadow-inner'
                disabled={isPending}
                onClick={() => setIsModelOpen(false)}
              >
                Cancel
              </button>
              <Button
                disabled={isPending}
                onClick={handleOnClick}
                customClasses='transition-all'
              >
                {isPending ? (
                  <> {<LoadingSpinner />} Delete</>
                ) : (
                  'Delete'
                )}
              </Button>
            </div>
          </div>
        </Model>
      )}
      <div className='flex justify-between items-center p-4 bg-primary-color border-t-primary-color border-l-primary-color border-r-primary-color shadow'>
        <h2 className='text-lg flex items-center gap-2 font-normal text-gray-50'>
          <HiOutlineStar className='w-[1.4rem] h-[1.4rem] text-gry-600' />
          {booking.event.title}
        </h2>
        <p className=' text-gray-100 flex items-center gap-2 px-4 text-base font-normal'>
          <HiOutlineCalendar className='w-[1.4rem] h-[1.4rem]' />{' '}
          Date {dateFormatter.format(booking.event.data)}
        </p>
      </div>

      <div className='px-4 flex flex-col gap-4 py-4'>
        <div className='flex gap-8 items-center justify-between mb-4'>
          <div className=' basis-2/3'>
            <h2 className='text-gray-700 text-lg font-normal mb-1'>
              User
            </h2>
            <div className='flex gap-2 items-center'>
              <HiOutlineUser /> {booking.user.firstName}{' '}
              {booking.user.lastName}
            </div>
            <div className='flex gap-2 items-center'>
              <HiOutlineMail /> {booking.user.email}
            </div>
          </div>
          <div className='basis-1/3'>
            <h3 className='text-gray-700 text-lg font-normal mb-2'>
              Tickers booked
            </h3>

            <span className='bg-[#c5ffff] inline-flex gap-2 items-center text-primary-color font-medium me-2 px-2.5 text-base rounded dark:bg-blue-900 dark:text-blue-300'>
              <HiOutlineTicket /> {booking.nummberOfTickets}
            </span>
          </div>
        </div>

        <div className='flex flex-col'>
          <h2 className='text-lg font-normal mb-2'>
            Location Details
          </h2>

          <div className='flex gap-8'>
            <p className='font-light basis-2/3'>
              {booking.event.location.description}
            </p>

            <div className='flex basis-1/3 flex-col gap-4'>
              <p className='flex gap-2 items-center font-normal'>
                <HiOutlineLocationMarker className='w-[1.2rem] h-[1.2rem] color-500' />{' '}
                {booking.event.location.address}
              </p>
              <Link
                to={`https://www.google.com/maps?q=${booking.event.location.coordinates[0]},${booking.event.location.coordinates[1]}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 w-min cursor-pointer border-b font-normal border-b-transparent hover:border-b hover:border-b-primary-color'
              >
                <MdOutlineDirections className='w-[1.2rem] h-[1.2rem] color-500' />{' '}
                Direction
              </Link>
            </div>
          </div>
        </div>

        <div className='flex flex-col'>
          <h3 className=' text-gray-700 text-lg font-normal'>
            Status
          </h3>

          {booking.canceled ? (
            <span className='bg-red-300 inline-block w-min text-red-700 font-normal me-2 px-2.5 text-base rounded dark:bg-blue-900 dark:text-blue-300'>
              Canceled
            </span>
          ) : (
            <span className='bg-[#daffff] flex items-center justify-between text-primary-color font-medium me-2 px-2.5 py-2 text-base rounded dark:bg-blue-900 dark:text-blue-300'>
              Active
              <button
                className='bg-gray-50 text-gray-700 py-1 px-4 font-normal shadow-md drop-shadow-md  rounded-full flex gap-1 items-center hover:drop-shadow-2xl transition-all'
                onClick={() => {
                  setIsModelOpen(true);
                  setBookingDetails((cur) => {
                    return {
                      ...cur,
                      bookingId: booking.id,
                      event: booking.event.title,
                    };
                  });
                }}
              >
                <FcCancel className='w-[1.3rem] h-[1.3rem] !font-white' />
                Cancel
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    user: { token },
  } = useUser();

  const { data: booking, isLoading } = useQuery({
    queryKey: [`event-${id}`],
    queryFn: () => fetchBooking(id, token),
  });

  return (
    <div className='py-6 px-24'>
      <h2 className='text-gray-500 text-3xl font-bold mb-6'>
        Booking
        <hr className='w-full h-[1px] bg-primary-color max-auto my-2 border-0 rounded' />
      </h2>
      <button
        className='text-primary-color w-max mb-4 border-b font-normal border-b-transparent flex items-center hover:border-b hover:border-b-primary-color focus:outline-none'
        onClick={() => {
          navigate(-1);
        }}
      >
        <HiArrowLeft className='hover:underline mr-0.5' />{' '}
        <span>Go back</span>
      </button>

      {isLoading && <SkeletonLoader />}
      {!isLoading && booking && (
        <Booking booking={booking} />
      )}
    </div>
  );
}
