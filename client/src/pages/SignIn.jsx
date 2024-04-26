import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../ui/PageLayout';
import SignInForm from '../features/SignIn/SignInForm';

export default function SignIn() {
  return (
    <PageLayout>
      <div className='flex flex-col items-center justify-center py-12 -mt-3 w-full gap-6'>
        <div className='max-w-80 w-80 flex justify-center flex-col items-center bg-white rounded shadow-xl drop-shadow-xl p-4'>
          <h2 className='text-primary-color text-3xl font-normal text-center mb-8'>
            Sign in
            <hr className='w-56 h-[1px] bg-primary-color max-auto my-4 border-0 rounded' />
          </h2>
          <SignInForm />
          <p className=''>
            Not registered?{' '}
            <Link
              to='/signup'
              className='text-xs text-primary-color hover:underline'
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
