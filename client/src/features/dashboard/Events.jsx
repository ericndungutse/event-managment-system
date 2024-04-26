import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../services/eventsApis';
import EventsTable from '../../components/EventsTable';

export default function Events() {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  return (
    <div className='mt-4 mb-5'>
      <EventsTable events={events} isLoading={isLoading} />
    </div>
  );
}
