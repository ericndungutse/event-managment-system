import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';

async function fetchEvents() {
  try {
    const res = await axios.get(
      'https://event-managment-system-sw2q.onrender.com/api/v1/events'
    );

    return res.data.events;
  } catch (error) {
    // TODO: HANDLE ERROR
  }
}

export default function EventsList() {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  return (
    <div className='grid grid-cols-3 gap-12 '>
      {isLoading && (
        <>
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </>
      )}

      {events && events.length && (
        <>
          {events.map(({ id, title, date, location }) => (
            <EventCard
              id={id}
              title={title}
              location={location}
              date={date}
            />
          ))}
        </>
      )}
    </div>
  );
}
