import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBookings } from '../../services/bookingsApi';
import { useUser } from '../../context/UserContex';
import BookingsTable from '../../components/BookingsTable';

export default function Bookings() {
  const {
    user: { token },
  } = useUser();

  const { data: events, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => fetchBookings(token),
  });

  return (
    <div className='mt-4 mb-5'>
      <BookingsTable
        bookings={events}
        isLoading={isLoading}
      />
    </div>
  );
}
