import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const root = createRoot(document.getElementById('root'));

function ConfigurationError() {
  return (
    <main className="min-h-screen grid place-items-center bg-gray-50 px-6 text-center text-gray-900">
      <section className="max-w-lg rounded-lg border border-red-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold">An error occured please reload the app or <a href="mailto:ilungagustave73@gmail.com" className='text-blue-600 hover:underline'>Contact admin</a></h1>
      </section>
    </main>
  );
}

root.render(
  <StrictMode>
    {publishableKey ? (
      <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    ) : (
      <ConfigurationError />
    )}
  </StrictMode>,
);
