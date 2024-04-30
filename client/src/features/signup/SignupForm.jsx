import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useUser } from '../../context/UserContex';
import toast from 'react-hot-toast';

async function signUpUserApi(userData) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/signup`,
      userData
    );

    return res.data;
  } catch (error) {
    if (error.response.status >= 400)
      throw new Error(error.response.data.message);
    else
      throw new Error(
        'Something went wrong! Please try again'
      );
  }
}

export default function SignUpForm() {
  const [signUpError, setSignUpError] = useState('');

  const navigate = useNavigate();

  const { isPending, mutate: signUp } = useMutation({
    mutationFn: async (userData) => {
      return await signUpUserApi(userData);
    },

    onSuccess: () => {
      toast.success(
        'You are successfully registered! Signin to get started'
      );
      navigate('/dashboard');
    },

    onError: (err) => {
      setSignUpError(err.message);
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signUp(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-2'
    >
      {signUpError && (
        <ErrorMessage>{signUpError}</ErrorMessage>
      )}
      <div className='flex flex-col  gap-2 justify-between items-start md:flex-row'>
        <InputGroup
          labelText='First Name'
          htmlFor='firstName'
          customClasses='w-full'
        >
          <input
            disabled={isPending}
            type='text'
            {...register('firstName', {
              required: 'First Name is required',
            })}
            className='bg-grey-200 px-3 py-2 rounded border outline-none valid:border-green-700'
            id='firstName'
            placeholder='First Name'
          />
          {errors['firstName'] && (
            <span className='text-red-600 -mt-1 text-xs'>
              {(errors.firstName.message &&
                errors.firstName.message) ||
                'Invalid first name'}
            </span>
          )}
        </InputGroup>

        <InputGroup
          labelText='Last Name'
          htmlFor='lastName'
          customClasses='w-full'
        >
          <input
            disabled={isPending}
            type='text'
            {...register('lastName', {
              required: 'Last Name is required',
            })}
            className='bg-grey-200 px-3 py-2 rounded border outline-none valid:border-green-700'
            id='lastName'
            placeholder='Last Name'
          />
          {errors['lastName'] && (
            <span className='text-red-600 -mt-1 text-xs'>
              {(errors.lastName.message &&
                errors.lastName.message) ||
                'Invalid last name'}
            </span>
          )}
        </InputGroup>
      </div>

      <div>
        <InputGroup labelText='Email' htmlFor='email'>
          <input
            disabled={isPending}
            type='email'
            {...register('email', {
              required: 'Email is required',
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
            className='bg-grey-200 px-3 py-2 rounded w-full border outline-none valid:border-green-700'
            id='email'
            placeholder='Email'
          />
        </InputGroup>

        {errors['email'] && (
          <span className='text-red-600 -mt-1 text-xs'>
            {(errors.email.message &&
              errors.email.message) ||
              'Invalid email address'}
          </span>
        )}
      </div>

      <InputGroup htmlFor='password' labelText='Password'>
        <input
          disabled={isPending}
          type='password'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message:
                'Password must have at least 6 characters',
            },
          })}
          className='bg-grey-200 px-3 py-2 rounded border outline-none valid:border-green-700'
          id='password'
          placeholder='Password'
        />
      </InputGroup>

      {errors['password'] && (
        <span className='text-red-600 -mt-1 text-xs'>
          {errors['password'].message}
        </span>
      )}

      <InputGroup
        htmlFor='confirmPassword'
        labelText='Confirm Password'
      >
        <input
          disabled={isPending}
          type='password'
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) =>
              value === getValues('password') ||
              'Passwords do not match',
          })}
          className='bg-grey-200 px-3 py-2 rounded border outline-none valid:border-green-700'
          id='confirmPassword'
          placeholder='Confirm Password'
        />
      </InputGroup>

      {errors['confirmPassword'] && (
        <span className='text-red-600 -mt-1 text-xs'>
          {errors['confirmPassword'].message}
        </span>
      )}

      <Button
        disabled={isPending}
        customClasses='mt-4 btn-primary'
      >
        {(isPending && <LoadingSpinner />) || 'Sign Up'}
      </Button>
    </form>
  );
}
