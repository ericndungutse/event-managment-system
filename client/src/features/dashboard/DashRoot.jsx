import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';
import Logo from '../../components/Logo';

function DashboardRoot() {
  return (
    <div className='w-full'>
      <header className='h-[10vh] border-b border-gray-300 px-4 flex items-center bg-white'>
        <Logo />
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
