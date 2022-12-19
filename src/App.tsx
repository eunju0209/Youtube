import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SearchHeader />
      <section className='max-w-screen-2xl m-auto px-3 py-6'>
        <Outlet />
      </section>
    </QueryClientProvider>
  );
}

export default App;
