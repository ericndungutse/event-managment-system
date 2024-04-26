import React from 'react';
import EventsList from '../features/events/EventsList';
import ShowCase from '../ui/ShowCase';
import PageLayout from '../ui/PageLayout';

export default function Home() {
  return (
    <PageLayout>
      <ShowCase />
      <EventsList />
    </PageLayout>
  );
}
