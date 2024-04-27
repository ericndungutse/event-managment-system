import React from 'react';
import EventsList from '../features/events/EventsList';
import PageLayout from '../components/PageLayout';
import ShowCase from '../components/ShowCase';

export default function Home() {
  return (
    <PageLayout>
      <ShowCase />
      <EventsList />
    </PageLayout>
  );
}
