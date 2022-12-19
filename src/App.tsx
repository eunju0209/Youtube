import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <section className='max-w-screen-2xl m-auto px-3 py-6'>
        <Outlet />
      </section>
    </QueryClientProvider>
  );
}

export default App;
