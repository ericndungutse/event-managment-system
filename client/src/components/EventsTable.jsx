import React, { useState } from 'react';
import { FiTrash2, FiCheck, FiEdit3 } from 'react-icons/fi';
import {
  HiEye,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi';
import dateFormatter from '../utils/dateFormatter';
import Button from './Button';
import Model from './Model';
import axios from 'axios';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useUser } from '../context/UserContex';
import toast from 'react-hot-toast';
import AddEventForm from '../features/dashboard/AddEventForm';

export async function deleteEventApi(id, token) {
  try {
    const res = await axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/events/${id}`,
      method: 'DELETE',

      headers: {
        'content-type': 'application/json',
        Authorization: token
          ? `Bearer ${token}`
          : `Bearer ${token}`,
      },
    });

    console.log(res);

    // return res.data.bookings;
  } catch (error) {
    throw new Error('Error Deleting event');
  }
}

export default function EventsTable({
  events,
  isLoading,
  openModel,
}) {
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isDeleteModelOpen, setIsDeleteModelOpen] =
    useState(false);

  const [isEditModelOpen, setIsEditModelOpen] =
    useState(false);

  const [id, setId] = useState('');
  const queryClient = useQueryClient();

  const {
    user: { token },
  } = useUser();

  const { isPending, mutate: deleteEvent } = useMutation({
    mutationFn: async ({ id }) => {
      return await deleteEventApi(id, token);
    },

    onSuccess: () => {
      setIsDeleteModelOpen(false);
      toast.success('Event deleted');
      queryClient.invalidateQueries({
        queryKey: ['events'],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className='flex flex-col'>
      {isDeleteModelOpen && (
        <Model
          title='Delete Event'
          closeModel={setIsDeleteModelOpen}
        >
          <div className='px-4 flex flex-col gap-3 w-[24rem]'>
            <p>
              Are you sure you want to delete this RESOURCE
              NAME permanently? This action cannot be
              undone.
            </p>

            <div className='flex gap-2 justify-end'>
              <button
                className='align-middle transition-all ease-linear text-gray-600 border duration-100  border-primary-color py-0.5 px-4 rounded-full font-light disabled:opacity-60 disabled:shadow-inner'
                onClick={() => setIsDeleteModelOpen(false)}
                disabled={isPending}
              >
                Cancel
              </button>
              <Button
                onClick={() => {
                  deleteEvent({ id: id });
                }}
                disabled={isPending}
              >
                Delete
              </Button>
            </div>
          </div>
        </Model>
      )}

      {isEditModelOpen && (
        <Model
          closeModel={setIsEditModelOpen}
          title='Edit event'
        >
          <AddEventForm
            closeModel={setIsEditModelOpen}
            eventToEdit={{
              title: eventToEdit.title,
              address: eventToEdit.location.address,
              description: eventToEdit.location.description,
              latitude: eventToEdit.location.coordinates[1],
              longitude:
                eventToEdit.location.coordinates[0],
              availableTickets:
                eventToEdit.availableTickets,
              id: eventToEdit.id,
            }}
          />
        </Model>
      )}
      <div className='overflow-x-auto'>
        <div className='w-full px-12 inline-block align-middle'>
          <h2 className='text-gray-500 text-3xl font-bold mb-8 '>
            All Events
            <hr className='w-full h-[1px] bg-primary-color max-auto my-4 border-0 rounded' />
          </h2>

          <div className='overflow-hidden border rounded-lg mb-4'>
            {(isLoading && (
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr className='bg-gray-50'>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500'
                    >
                      #
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500'
                    >
                      Date
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500'
                    >
                      Available Tickets
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500'
                    ></th>
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
                      className='px-6 py-3 font-bold text-left text-gray-500 '
                    >
                      #
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500 '
                    >
                      Title
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500 '
                    >
                      Date
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500 '
                    >
                      Available Tickets
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 font-bold text-left text-gray-500 '
                    ></th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {events.map((event, index) => {
                    return (
                      <tr key={event.id}>
                        <td className='px-6 py-4 font-medium text-gray-800 whitespace-nowrap'>
                          {index + 1}
                        </td>
                        <td className='px-6 py-4 text-gray-800 whitespace-nowrap'>
                          {event.title}
                        </td>

                        <td className='px-6 py-4 text-gray-800 whitespace-nowrap'>
                          {dateFormatter.format(
                            new Date(event.date)
                          )}
                        </td>

                        <td className='px-6 py-4 text-gray-800 whitespace-nowrap'>
                          {event.availableTickets}
                        </td>

                        <td className='px-6 py-4 font-medium text-left whitespace-nowrap'>
                          <div className='c flex gap-1'>
                            <button
                              type='button'
                              className='rounded p-1 hover:bg-gray-100'
                            >
                              <HiEye className='w-[1.2rem] h-[1.2rem] text-gray-500' />
                            </button>
                            <button
                              type='button'
                              className='rounded p-1 hover:bg-gray-100'
                              onClick={() => {
                                setEventToEdit(event);
                                setIsEditModelOpen(true);
                              }}
                            >
                              <HiOutlinePencilAlt className='w-[1.2rem] h-[1.2rem] text-gray-500' />
                            </button>
                            <button
                              onClick={() => {
                                setId(event.id);
                                setIsDeleteModelOpen(true);
                              }}
                              type='button'
                              className='rounded p-1 hover:bg-gray-100'
                            >
                              <HiOutlineTrash className='w-[1.2rem] h-[1.2rem] text-gray-500' />
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
          <Button onClick={() => openModel(true)}>
            Add Event
          </Button>
        </div>
      </div>
    </div>
  );
}
