import React from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import Model from '../../components/Model';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { bookTickets as bookTicketsApi } from '../../services/bookingsApi';
import { useUser } from '../../context/UserContex';
import toast from 'react-hot-toast';

export default function BookTicket({
  closeModel,
  eventId,
  maxTickets,
}) {
  const {
    user: { token },
  } = useUser();
  const queryClient = useQueryClient();
  const { isPending, mutate: bookTickets } = useMutation({
    mutationFn: async (tickets) => {
      return await bookTicketsApi(eventId, token, +tickets);
    },

    onSuccess: () => {
      closeModel(false);
      queryClient.invalidateQueries('events');
      toast.success('Tickets booked successfully!');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    bookTickets(data.tickets);
  };

  return (
    <Model title='Book tickets' closeModel={closeModel}>
      <div className='w-[24rem] px-4 '>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-3'
        >
          <InputGroup
            labelText='Number of Tickets'
            htmlFor='tickets'
          >
            <input
              disabled={isPending}
              type='number'
              max={maxTickets}
              {...register('tickets', {
                required: 'Number of tickets is required',
              })}
              className='bg-grey-200 px-3 py-2 rounded border outline-none valid:border-green-700'
              id='tickets'
              placeholder='Enter number of tickets'
            />
            <span className='text-[12px] flex items-center gap-1 w-max bg-yellow-100 text-yellow-800 rounded px-2'>
              <HiOutlineInformationCircle className='w-[1rem] h-[1rem]' />
              Available tickets: {maxTickets}
            </span>
          </InputGroup>

          {errors['tickets'] && (
            <span className='text-red-600 -mt-2'>
              {errors?.tickets?.message &&
                errors.tickets.message}
            </span>
          )}

          <div className='flex gap-2 justify-end'>
            <button
              className='align-middle transition-all ease-linear text-gray-600 border duration-100  border-primary-color py-0.5 px-4 rounded-full font-light disabled:opacity-60 disabled:shadow-inner'
              onClick={() => closeModel(false)}
              disabled={isPending}
            >
              Cancel
            </button>
            <Button disabled={isPending}>
              {(isPending && <LoadingSpinner />) ||
                'Submit'}{' '}
            </Button>
          </div>
        </form>
      </div>
    </Model>
  );
}
