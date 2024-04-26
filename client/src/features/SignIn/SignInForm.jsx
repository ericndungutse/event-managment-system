import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useUser } from '../../context/UserContex';

async function signInUserApi(email, password) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/signin`,
      {
        email: email,
        password: password,
      }
    );

    return res.data;
  } catch (error) {
    if (error.response.status >= 400)
      throw new Error(error.response.data.message);
    else
      throw new Error(
        'Something whent wrong! Please try again'
      );
  }
}

export default function SignInForm() {
  const { onSignin } = useUser();
  const [signInError, setSigninError] = useState('');

  const navigate = useNavigate();

  const { isPending, mutate: signin } = useMutation({
    mutationFn: async ({ email, password }) => {
      return await signInUserApi(email, password);
    },

    onSuccess: (data) => {
      localStorage.setItem('token', data.token);

      onSignin({
        ...data.user,
        token: data.token,
      });

      // navigate('/dashboard', { replace: true });
    },

    onError: (err) => {
      setSigninError(err.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    signin({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-3'
    >
      {signInError && (
        <ErrorMessage>{signInError}</ErrorMessage>
      )}

      <InputGroup labelText='Email' htmlFor='email'>
        <input
          disabled={isPending}
          type='email'
          {...register('email', {
            required: 'Email is required',
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
          className='bg-grey-200 px-3 text-sm py-2 rounded border outline-none valid:border-green-700'
          id='email'
          placeholder='Email'
        />
      </InputGroup>

      {errors['email'] && (
        <span className='text-red-600 -mt-2 text-xs'>
          {(errors.email.message && errors.email.message) ||
            'Invalid email address'}
        </span>
      )}

      <InputGroup
        htmlFor='password'
        labelText='Password'
        id='password'
        register={{
          ...register('password', {
            required: 'This field is required',
          }),
        }}
      >
        <input
          disabled={isPending}
          type='password'
          {...register('password', {
            required: 'This field is required',
          })}
          className='bg-grey-200 px-3 text-sm py-2 rounded border outline-none focus:invalid:border-red-400 valid:border-green-700'
          id='password'
          placeholder='password'
        />
      </InputGroup>

      {errors['password'] &&
        errors['password']?.message && (
          <span className='text-red-600 -mt-2 text-xs'>
            {errors['password']?.message}
          </span>
        )}
      <Link
        href='#'
        className='text-xs block text-primary-color hover:underline -mt-2'
      >
        Forgot password?
      </Link>
      <Button
        disabled={isPending}
        customClasses='mt-4 btn-primary'
      >
        {(isPending && <LoadingSpinner />) || 'Sign in'}{' '}
      </Button>
    </form>
  );
}
