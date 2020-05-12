import React from 'react';

import { Header } from './Header';
import { Footer } from './Footer';

const Layout = ({ children }) => (
  <div>
    <div className='flex flex-col sm:max-w-screen-lg min-h-screen w-full h-full bg-white ml-auto mr-auto'>
      <div className='h-16 sm:h-20'>
        <Header />
      </div>
      <div className='h-auto'>
        {children}
      </div>
      <div className='h-12 sm:h-16'>
        <Footer />
      </div>
      </div>
  </div>
);

export { Layout };
