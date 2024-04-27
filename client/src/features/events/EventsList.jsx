import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';
import { fetchEvents } from '../../services/eventsApis';
import BookTicket from '../bookings/BookTicket';

export default function EventsList() {
  const [isBookModelOpen, setIsBookModelOpen] =
    useState(false);
  const [eventToBook, setEventToBook] = useState({});
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  return (
    <div className='grid grid-cols-3 gap-4 '>
      {isBookModelOpen && (
        <BookTicket
          closeModel={setIsBookModelOpen}
          eventId={eventToBook.id}
          maxTickets={eventToBook.maxTickets}
        />
      )}
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
          {events.map(
            ({
              id,
              title,
              date,
              location,
              availableTickets,
            }) => (
              <EventCard
                key={id}
                title={title}
                location={location}
                date={date}
                id={id}
                availableTickets={availableTickets}
                openBookModel={setIsBookModelOpen}
                setEventToBook={setEventToBook}
              />
            )
          )}
        </>
      )}
    </div>
  );
}
