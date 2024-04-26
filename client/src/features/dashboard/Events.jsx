import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../services/eventsApis';
import EventsTable from '../../components/EventsTable';
import Model from '../../components/Model';
import SignInForm from '../SignIn/SignInForm';
import AddEventForm from './AddEventForm';

export default function Events() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  return (
    <div className='mt-4 mb-5'>
      {isModelOpen && (
        <Model
          closeModel={setIsModelOpen}
          title='Add event'
        >
          <AddEventForm closeModel={setIsModelOpen} />
        </Model>
      )}
      <EventsTable
        events={events}
        isLoading={isLoading}
        openModel={setIsModelOpen}
      />
    </div>
  );
}
