function LoadingSpinner() {
  return (
    <span
      className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_5s_linear_infinite]'
      role='status'
    ></span>
  );
}

export default LoadingSpinner;
