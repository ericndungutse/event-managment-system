import React from 'react';
import PageLayout from '../ui/PageLayout';
import SignInForm from '../features/SignIn/SignInForm';

export default function SignIn() {
  return (
    <PageLayout>
      <h3 className='text-primary-color font-semibold'>
        Sign in
      </h3>
      <SignInForm />
    </PageLayout>
  );
}
