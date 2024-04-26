function InputLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className='text-base'>
      {children}
    </label>
  );
}

export default InputLabel;
