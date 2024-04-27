import React from 'react';

export default function Model({
  children,
  closeModel,
  title,
}) {
  return (
    <>
      <div className='overflow-y-auto flex backdrop-blur  bg-[rgba(0,0,0,0.2)] overflow-x-hidden fixed top-0 right-0 left-0 z-50 b-0 justify-center items-center w-full md:inset-0 max-h-full'>
        <div className='relative p-4 w-max -mt-5 '>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                {title}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModel(false);
                }}
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              >
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>

            <div className='py-5'>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
