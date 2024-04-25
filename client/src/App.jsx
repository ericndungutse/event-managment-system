import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className='bg-[#f7fffe]'>
      <div className='px-40'>
        <Header />
        <div className='flex justify-center mb-10 mt-10'>
          <h1 className='flex flex-col items-center font-extralight text-3xl'>
            <span>Browse Our Upcoming </span>
            <span className=' text-primary-color font-semibold'>
              Events{' '}
            </span>
            In One Place
          </h1>
        </div>
        <Home />
      </div>
    </div>
  );
}

export default App;
