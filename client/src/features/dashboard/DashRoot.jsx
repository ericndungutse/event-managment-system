import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';
import Logo from '../../components/Logo';

function DashboardRoot() {
  return (
    <div className='w-full'>
      <header className='h-[8vh] border-b border-gray-300 px-2 flex items-center'>
        <Logo />
      </header>
      <main className='h-[92vh] flex'>
        <aside className='flex-autp px-2 py-4 overflow-auto border-r flex justify-center border-gray-300 bg-gray-50'>
          <SideNav />
        </aside>
        <section className='flex-1 flex flex-col overflow-auto'>
          <div className='flex-1'>
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardRoot;
