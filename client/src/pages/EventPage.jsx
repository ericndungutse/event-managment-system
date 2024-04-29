import React from 'react';

import EventDetails from '../features/events/EventDetail';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

export default function EventPage() {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <div className='mt-8 flex flex-col gap-4'>
        <button
          className='text-primary-color border-b font-normal border-b-transparent flex w-max items-center hover:border-b hover:border-b-primary-color focus:outline-none'
          onClick={() => {
            navigate(-1);
          }}
        >
          <HiArrowLeft className='hover:underline mr-0.5' />{' '}
          <span>Go back</span>
        </button>
        <EventDetails />
      </div>
    </PageLayout>
  );
}
