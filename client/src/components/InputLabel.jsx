function InputLabel({ htmlFor, children }) {
  return (
    <label className='font-normal' htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default InputLabel;
