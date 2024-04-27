import React, { useState } from 'react';

import { FcCancel } from 'react-icons/fc';
import { cancelBooking as cancelBookingApi } from '../services/bookingsApi';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useUser } from '../context/UserContex';
import toast from 'react-hot-toast';
import Model from './Model';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';

export default function BookingsTable({
  bookings,
  isLoading,
}) {
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
    <div className='flex flex-col'>
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
      <div className='overflow-x-auto'>
        <div className='w-full px-12 inline-block align-middle'>
          <h2 className='text-gray-500 text-3xl font-bold mb-8'>
            All Bookings
            <hr className='w-full h-[1px] bg-primary-color max-auto my-4 border-0 rounded' />
          </h2>

          <div className='overflow-hidden border rounded-lg mb-4'>
            {(isLoading && (
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr className='bg-gray-50'>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500 '
                    >
                      #
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500 '
                    >
                      Event
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500 '
                    >
                      Number of Tickets
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500 '
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500 '
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=''>
                    <td className='px-6 py-4 bg-red  font-medium text-gray-800 whitespace-nowrap'>
                      <div className='animate-pulse h-8 rounded w-[80%] bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 bg-red  text-gray-800 whitespace-nowrap '>
                      <div className='h-8 rounded w-[60%] bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 bg-red  text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[95%] bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 bg-red  text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 bg-red  font-medium text-left whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[50%] bg-gray-100'></div>
                    </td>
                  </tr>
                  <tr className='animate-pulse'>
                    <td className='px-6 py-4 font-medium text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[45%] bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[60%]  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 font-medium text-left whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[100%] bg-gray-100'></div>
                    </td>
                  </tr>
                  <tr className='animate-pulse'>
                    <td className='px-6 py-4 font-medium text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[45%] bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[60%]  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 font-medium text-left whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[100%] bg-gray-100'></div>
                    </td>
                  </tr>
                  <tr className='animate-pulse'>
                    <td className='px-6 py-4 font-medium text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[45%] bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[60%]  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 font-medium text-left whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[100%] bg-gray-100'></div>
                    </td>
                  </tr>
                  <tr className='animate-pulse'>
                    <td className='px-6 py-4 font-medium text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[45%] bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[60%]  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 text-gray-800 whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded  bg-gray-100'></div>
                    </td>
                    <td className='px-6 py-4 font-medium text-left whitespace-nowrap '>
                      <div className='animate-pulse h-8 rounded w-[100%] bg-gray-100'></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            )) || (
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500  '
                    >
                      #
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500  '
                    >
                      Event
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500  '
                    >
                      Number of Tickets
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500  '
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500  '
                    >
                      Cancel
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {bookings.map((booking, index) => {
                    return (
                      <tr key={booking.id}>
                        <td className='px-6 py-4 font-medium text-gray-800 whitespace-nowrap'>
                          {index + 1}
                        </td>
                        <td className='px-6 py-4 text-gray-800 whitespace-nowrap'>
                          {booking.event.title}
                        </td>

                        <td className='px-6 py-4 text-gray-800 whitespace-nowrap'>
                          {booking.nummberOfTickets}
                        </td>

                        <td className='px-6 py-4 text-gray-800 whitespace-nowrap'>
                          {booking.canceled ? (
                            <span className='bg-red-100 text-red-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400'>
                              Canceled
                            </span>
                          ) : (
                            <span className='bg-green-100 text-green-800 font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400'>
                              Active
                            </span>
                          )}
                        </td>

                        <td className='px-6 py-4 font-medium text-left whitespace-nowrap'>
                          <div className='c flex gap-1'>
                            <button
                              disabled={
                                isPending ||
                                booking.canceled
                              }
                              onClick={() => {
                                setIsModelOpen(true);
                                setBookingDetails((cur) => {
                                  return {
                                    ...cur,
                                    bookingId: booking.id,
                                    event:
                                      booking.event.title,
                                  };
                                });
                              }}
                              className='hover:bg-gray-200 rounded p-1 focus:outline-none transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-none'
                            >
                              <FcCancel className='text-xl w-[1.4rem] h-[1.4rem]' />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
