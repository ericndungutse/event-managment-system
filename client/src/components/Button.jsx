import React from 'react';

export default function Button({
  children,
  customClasses,
  disabled,
}) {
  return (
    <button
      className={`${customClasses} bg-primary-color hover:border-primary-color align-middle text-base text-white border border-primary-color py-0.5 px-4 rounded-full font-light`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
