import React from 'react';

import { Header } from './Header';
import { Footer } from './Footer';

const Layout = ({ children }) => (
  <div className="bg-gray-100">
    <div className='flex flex-col sm:max-w-screen-xl min-h-screen w-full h-full bg-white ml-auto mr-auto shadow-xl'>
      <div className='h-16 sm:h-20 p-6 shadow'>
        <Header />
      </div>
      <div className='max-auto h-auto flex-grow shadow px-6 py-4'>
        {children}
      </div>
      <div className='text-center shadow px-6 py-4'>
        <Footer />
      </div>
    </div>
  </div>
);

export { Layout };
