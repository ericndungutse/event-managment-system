import React from 'react';

export default function Button({
  children,
  customClasses,
  disabled,
}) {
  return (
    <button
      className={`${customClasses} bg-primary-color hover:bg-primary-color-light hover:border-primary-color-light align-middle transition-all ease-linear text-white border duration-100 border-primary-color py-0.5 px-4 rounded-full font-light disabled:opacity-60 disabled:shadow-inner`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
