import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from '../features/SignIn/SignInForm';
import PageLayout from '../components/PageLayout';

export default function SignIn() {
  return (
    <PageLayout>
      <div className='flex flex-col items-center justify-center py-12 -mt-3 w-full gap-6'>
        <div className='w-full md:max-w-80 flex justify-center flex-col items-center'>
          <h2 className='text-primary-color text-3xl font-normal text-center mb-8'>
            Sign in
            <hr className='w-full h-[1px] bg-primary-color max-auto my-4 border-0 rounded' />
          </h2>
          <SignInForm />
          <p className=''>
            Not registered?{' '}
            <Link
              to='/sign-up'
              className='text-primary-color hover:underline'
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
