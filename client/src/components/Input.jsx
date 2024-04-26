function Input({
  type,
  id,
  placeholder,
  required,
  inputValueChangeHandler,
}) {
  return (
    <input
      type={type}
      className='bg-grey-200 px-3 py-2 rounded border outline-none focus:invalid:border-red-400 valid:border-green-700'
      id={id}
      placeholder={placeholder}
      required={required}
      onChange={inputValueChangeHandler?.onChangeHandler}
      value={inputValueChangeHandler?.value}
    />
  );
}

export default Input;
