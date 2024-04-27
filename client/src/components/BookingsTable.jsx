import React from 'react';
import { FiTrash2, FiCheck, FiEdit3 } from 'react-icons/fi';
import dateFormatter from '../utils/dateFormatter';
import Button from './Button';

export default function BookingsTable({
  bookings,
  isLoading,
}) {
  return (
    <div className='flex flex-col'>
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
                    ></th>
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
                              type='button'
                              className='text-white  bg-green-700 hover:bg-green-800  rounded p-1 focus:outline-none '
                            >
                              <FiCheck className='text-xl' />
                            </button>

                            <button
                              type='button'
                              className='text-white  bg-red-700 hover:bg-red-800  rounded p-1 focus:outline-none '
                            >
                              <FiTrash2 className='text-xl' />
                            </button>

                            <button
                              type='button'
                              className='text-gray-900  bg-gray-200 hover:bg-gray-300  rounded p-1 focus:outline-none '
                            >
                              <FiEdit3 className='text-xl' />
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
