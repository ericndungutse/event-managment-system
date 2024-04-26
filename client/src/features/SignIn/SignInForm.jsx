import React from 'react';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

export default function SignInForm() {
  return (
    <form
      className='w-full flex flex-col gap-3'
      // onSubmit={handleSubmit}
    >
      {/* {errorMsg && (
        <InComponentError>{errorMsg}</InComponentError>
      )} */}

      <InputGroup
        htmlFor='email'
        type='email'
        id='email'
        placeholder='Email...'
        labelText='Email'
        required={true}
        // inputValueChangeHandler={{
        //   value: email,
        //   onChangeHandler: handleEmailOnChange,
        // }}
      />
      <InputGroup
        htmlFor='password'
        type='password'
        id='password'
        placeholder='Password...'
        labelText='Password'
        required={true}
        // inputValueChangeHandler={{
        //   value: password,
        //   onChangeHandler: handlePasswordOnChange,
        // }}
      />
      <Link
        href='#'
        className='text-xs block text-primary-color hover:underline -mt-2'
      >
        Forgot password?
      </Link>
      <Button
        customClasses='mt-4 btn-primary'
        // disabled={isLoading}
      >
        Signin
        {/* {' '}
        {(isLoading && <LoadingSpinner />) ||
          'Sign in'}{' '} */}
      </Button>
    </form>
  );
}
