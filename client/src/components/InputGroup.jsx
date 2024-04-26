import React from 'react';
import InputLabel from './InputLabel';

export default function InputGroup({
  htmlFor,
  labelText,
  children,
  customClasses,
}) {
  return (
    <div className={`flex flex-col gap-1 ${customClasses}`}>
      <InputLabel htmlFor={htmlFor}>{labelText}</InputLabel>
      {children}
    </div>
  );
}
