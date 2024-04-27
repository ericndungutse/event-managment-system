import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import SignUpForm from '../features/signup/SignupForm';

export default function SignUp() {
  return (
    <PageLayout>
      <div className='flex flex-col items-center justify-center  -mt-3 w-full gap-6'>
        <div className='w-[50%] flex justify-center flex-col items-center px-4'>
          <h2 className='text-primary-color text-3xl font-normal text-center mb-4'>
            Register
            <hr className='w-56 h-[1px] bg-primary-color max-auto my-4 border-0 rounded' />
          </h2>
          <SignUpForm />
          <p className=''>
            Already registered
            <Link
              to='/sign-in'
              className='text-primary-color hover:underline'
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
