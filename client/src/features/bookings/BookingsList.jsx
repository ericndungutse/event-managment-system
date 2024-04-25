import React from 'react';
import BookingCard from './BookingCard';

export default function BookingsList() {
  return (
    <div className='flex flex-wrap justify-between gap-8'>
      <BookingCard />
      <BookingCard />
      <BookingCard />
      <BookingCard />
      <BookingCard />
      <BookingCard />
      <BookingCard />
    </div>
  );
}
