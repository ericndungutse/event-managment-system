import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useUser } from '../../context/UserContex';

async function addEventApi(eventData, token) {
  try {
    const res = await axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/events`,
      method: 'POST',
      data: {
        ...eventData,
      },
      headers: {
        'content-type': 'application/json',
        Authorization: token
          ? `Bearer ${token}`
          : `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    if (error.response.status >= 400)
      throw new Error(error.response.data.message);
    else
      throw new Error(
        'Something went wrong! Please try again'
      );
  }
}
async function updateApi(eventData, id, token) {
  try {
    const res = await axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/events/${id}`,
      method: 'PUT',
      data: {
        ...eventData,
      },
      headers: {
        'content-type': 'application/json',
        Authorization: token
          ? `Bearer ${token}`
          : `Bearer ${token}`,
      },
    });

    console.log(res);

    return res.data;
  } catch (error) {
    console.error(error);
    if (error.response.status >= 400)
      throw new Error(error.response.data.message);
    else
      throw new Error(
        'Something went wrong! Please try again'
      );
  }
}

export default function AddEventForm({
  closeModel,
  eventToEdit,
}) {
  const [addError, setAddError] = useState('');
  const queryClient = useQueryClient();
  const {
    user: { token },
  } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: eventToEdit ? eventToEdit : null,
  });
  console.log(eventToEdit);

  const { isPending, mutate: addEvent } = useMutation({
    mutationFn: async ({
      title,
      location,
      description,
      date,
      availableTickets,
    }) => {
      if (eventToEdit)
        return await await updateApi(
          {
            title,
            location,
            description,
            date,
            availableTickets,
          },
          eventToEdit.id,
          token
        );

      return await addEventApi(
        {
          title,
          location,
          description,
          date,
          availableTickets,
        },
        token
      );
    },
    onSuccess: (data) => {
      reset();
      closeModel(false);
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ['events'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = async (data) => {
    const requestBody = {
      title: data.title,
      location: {
        coordinates: [data.latitude, data.longitude],
        address: data.address,
        description: data.description,
      },
      date: new Date(`${data.date}T${data.time}:00+00:00`),
      availableTickets: data.availableTickets,
    };
    addEvent(requestBody);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-3 px-8'
    >
      {addError && <ErrorMessage>{addError}</ErrorMessage>}

      <div className='flex gap-3 w-full'>
        <InputGroup
          labelText='Title'
          htmlFor='title'
          customClasses='w-full'
        >
          <input
            disabled={isPending}
            type='text'
            {...register('title', {
              required: 'Title is required',
            })}
            className='bg-grey-200 px-3 py-1 rounded border outline-none valid:border-green-700 w-full'
            id='title'
            placeholder='Title'
          />
          {errors?.title && (
            <span className='text-red-600 -mt-1 text-sm'>
              {errors?.title.message || 'Title is required'}
            </span>
          )}
        </InputGroup>
      </div>

      <fieldset className='border border-primary-color p-3 rounded'>
        <legend className='font-semibold p-1'>
          Date and Time
        </legend>
        <div className='flex justify-between gap-2'>
          <InputGroup
            labelText='Date'
            htmlFor='date'
            customClasses='flex-1'
          >
            <input
              disabled={isPending}
              type='date'
              {...register('date', {
                required: 'Date is required',
              })}
              className='bg-grey-200 px-3 py-1 rounded border outline-none valid:border-green-700 w-full'
              id='date'
            />
            {errors?.date && (
              <span className='text-red-600 -mt-1 text-sm'>
                {errors?.date.message || 'Date is required'}
              </span>
            )}
          </InputGroup>

          <InputGroup
            labelText='Time'
            htmlFor='time'
            customClasses='flex-1/2'
          >
            <input
              disabled={isPending}
              type='time'
              {...register('time', {
                required: 'Time is required',
              })}
              className='bg-grey-200 px-3 py-1 rounded border outline-none valid:border-green-700 w-full'
              id='time'
            />
            {errors?.time && (
              <span className='text-red-600 -mt-1 text-sm'>
                {errors?.time.message || 'Time is required'}
              </span>
            )}
          </InputGroup>
        </div>
      </fieldset>

      <fieldset className='border border-primary-color p-3 rounded'>
        <legend className='font-semibold p-1'>
          Location
        </legend>

        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-center gap-2'>
            <InputGroup
              labelText='Address'
              htmlFor='address'
            >
              <input
                disabled={isPending}
                type='text'
                {...register('address', {
                  required: 'Address is required',
                })}
                className='bg-grey-200 px-3 py-1  w-full  rounded border outline-none valid:border-green-700'
                id='address'
                placeholder='Address'
              />
              {errors?.address && (
                <span className='text-red-600 -mt-1 text-sm'>
                  {errors?.address.message ||
                    'Address is required'}
                </span>
              )}
            </InputGroup>

            <InputGroup
              labelText='Latitude'
              htmlFor='latitude'
              customClasses=''
            >
              <input
                disabled={isPending}
                type='number'
                {...register('latitude', {
                  required: 'latitude is required',
                })}
                className='bg-grey-200 px-3 py-1 w-full rounded border outline-none valid:border-green-700'
                id='latitude'
                placeholder='Latitude'
              />
              {errors?.latitude && (
                <span className='text-red-600 -mt-1 text-sm'>
                  {errors?.latitude.message ||
                    'Latitude is required'}
                </span>
              )}
            </InputGroup>

            <InputGroup
              labelText='Longitude'
              htmlFor='longitude'
            >
              <input
                disabled={isPending}
                type='number'
                {...register('longitude', {
                  required: 'Longitude are required',
                })}
                className='bg-grey-200 px-3 py-1  w-full rounded border outline-none valid:border-green-700'
                id='longitude'
                placeholder='Longitude'
              />
              {errors?.longitude && (
                <span className='text-red-600 -mt-1 text-sm'>
                  {errors?.longitude.message ||
                    'Longitude are required'}
                </span>
              )}
            </InputGroup>
          </div>

          <InputGroup
            labelText='Description'
            htmlFor='description'
          >
            <textarea
              {...register('description', {
                required: 'Description is required',
              })}
              className='bg-grey-200 px-3 py-1 rounded border outline-none valid:border-green-700'
              id='description'
              placeholder='Description'
              rows={4}
            />
            {errors?.description && (
              <span className='text-red-600 -mt-1 text-sm'>
                {errors?.description.message ||
                  'Description is required'}
              </span>
            )}
          </InputGroup>
        </div>
      </fieldset>

      <InputGroup
        labelText='Available Tickets'
        htmlFor='availableTickets'
      >
        <input
          disabled={isPending}
          type='number'
          {...register('availableTickets', {
            required: 'Available Tickets is required',
            min: {
              value: 1,
              message: 'Minimum value should be 1',
            },
          })}
          className='bg-grey-200 px-3 py-1 rounded border outline-none valid:border-green-700'
          id='availableTickets'
          placeholder='Avalable tickets'
        />
        {errors?.availableTickets && (
          <span className='text-red-600 -mt-1 text-sm'>
            {errors?.availableTickets.message ||
              'Available Tickets is required'}
          </span>
        )}
      </InputGroup>

      <div className='flex'>
        <Button
          disabled={isPending}
          customClasses='mt-4 btn-primary text-base'
        >
          {(isPending && <LoadingSpinner />) || 'Save'}{' '}
        </Button>
      </div>
    </form>
  );
}
