import React from 'react';
import { FiLogOut, FiBarChart } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContex';

import {
  HiOutlineBriefcase,
  HiOutlineStar,
  HiOutlineHome,
} from 'react-icons/hi';

export default function SideNav() {
  const { user, signOut } = useUser();

  return (
    <ul className='flex flex-col w-40 '>
      <div className='flex-1 flex flex-col gap-4'>
        <li>
          <NavLink
            className='w-full text-gray-600 font-normal hover:bg-gray-400 transition-all hover:text-white rounded flex gap-2 items-center'
            to='/'
          >
            <HiOutlineHome className='w-[1.4rem] h-[1.4rem] text-gray-400' />
            Home
          </NavLink>
        </li>
        {user.role === 'admin' && (
          <li>
            <NavLink
              className='w-full text-gray-900 font-normal hover:bg-gray-400 transition-all hover:text-white rounded flex gap-2 items-center'
              to='events'
            >
              <HiOutlineStar className='w-[1.4rem] h-[1.4rem] text-gray-400' />
              Events
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            className='w-full text-gray-900 font-normal hover:bg-gray-400 transition-all hover:text-white rounded flex gap-2 items-center'
            to='bookings'
          >
            <HiOutlineBriefcase className='w-[1.4rem] h-[1.4rem] text-gray-400' />{' '}
            Bookings
          </NavLink>
        </li>
      </div>
      <li>
        <button
          className=' text-gray-500 flex gap-2 items-center hover:text-gray-900'
          onClick={signOut}
        >
          <FiLogOut />
          Sign out
        </button>
      </li>
    </ul>
  );
}
