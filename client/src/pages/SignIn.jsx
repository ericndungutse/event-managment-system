import React from 'react';
import PageLayout from '../ui/PageLayout';
import SignInForm from '../features/SignIn/SignInForm';
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <PageLayout>
      <div className='flex flex-col items-center justify-center py-12 -mt-3 w-full md:w-3/4 gap-6'>
        <div className='max-w-80 w-80 flex justify-center flex-col items-center'>
          <h2 className='text-primary-color text-3xl font-light text-center mb-8'>
            Sign in
            <hr className='w-56 h-[0.5px] bg-primary-color max-auto my-4 border-0 rounded' />
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