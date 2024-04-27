import React from 'react';
import { useQuery } from '@tanstack/react-query';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';
import { fetchEvents } from '../../services/eventsApis';

export default function EventsList() {
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  return (
    <div className='grid grid-cols-3 gap-4 '>
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
              key={id}
              title={title}
              location={location}
              date={date}
              id={id}
            />
          ))}
        </>
      )}
    </div>
  );
}
