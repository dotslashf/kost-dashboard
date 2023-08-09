'use client';

import { useState } from 'react';
import SidebarItems from './SidebarItems';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-10 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          isSidebarOpen ? '' : 'hidden'
        )}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div className="sticky inset-x-0 top-0 z-20 px-4 bg-white border-y sm:px-6 md:px-8 lg:hidden dark:bg-slate-800 dark:border-slate-700">
        <div className="flex justify-end py-2">
          <Button
            variant={'secondary'}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <HamburgerMenuIcon className="mr-4" />
            <span className="no-underline">Menu</span>
          </Button>
        </div>
      </div>
      <div
        className={clsx(
          'fixed top-0 bottom-0 left-0 w-52 lg:w-64 pb-10 bg-white border-r hs-overlay border-slate-200 pt-7 lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-slate-800 dark:border-slate-700 transition z-30',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="px-6 text-sky-600">
          <a
            className="flex items-center text-xl font-semibold justify-evenly dark:text-white"
            href="#"
            aria-label="Brand"
          >
            kost-dashboard
          </a>
        </div>
        <SidebarItems />
      </div>
    </>
  );
};

export default Sidebar;
