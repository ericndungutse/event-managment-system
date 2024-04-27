import { Outlet, useNavigate } from 'react-router-dom';
import SideNav from './SideNav';
import Logo from '../../components/Logo';
import { HiOutlineLogout } from 'react-icons/hi';
import { useUser } from '../../context/UserContex';

function DashboardRoot() {
  const { signOut } = useUser();
  const navigate = useNavigate();
  return (
    <div className='w-full'>
      <header className='h-[10vh] border-b border-gray-300 px-4 flex items-center justify-between bg-white'>
        <Logo />

        <nav className='px-7'>
          <button
            className='p-1 hover:bg-slate-100 rounded'
            onClick={() => {
              signOut();
              navigate('/');
            }}
          >
            <HiOutlineLogout className='w-[1.2rem] h-[1.2rem] text-primary-color font-extralight' />
          </button>
        </nav>
      </header>
      <main className='h-[90vh] flex'>
        <aside className='flex-autp p-4 overflow-auto border-r flex justify-center border-gray-300 bg-white'>
          <SideNav />
        </aside>
        <section className='flex-1 flex flex-col overflow-auto'>
          <div className='flex-1 bg-white'>
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardRoot;
