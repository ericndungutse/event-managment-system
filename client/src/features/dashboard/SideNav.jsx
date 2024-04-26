import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContex';

export default function SideNav() {
  const { user, signOut } = useUser();

  return (
    <ul className='flex flex-col w-40'>
      <div className='flex-1 flex flex-col gap-2'>
        {user.role === 'admin ' && (
          <li>
            <NavLink
              className='w-full block bg-[#e9ffff] text-primary-color font-normal hover:bg-gray-400 transition-all hover:text-white rounded px-2'
              to='events'
            >
              Events
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            className='w-full block bg-[#e9ffff] text-primary-color font-normal hover:bg-gray-400 transition-all hover:text-white rounded px-2'
            to='bookings'
          >
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
