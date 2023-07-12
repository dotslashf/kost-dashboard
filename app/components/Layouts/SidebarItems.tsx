'use client';
import SidebarItem from './SidebarItem';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const SidebarItems = () => {
  const pathname = usePathname();

  const items = [
    {
      title: 'Dashboard',
      icon: <HomeIcon />,
      link: '/dashboard',
    },
    {
      title: 'Rooms',
      icon: <CubeIcon />,
      link: '/dashboard/rooms',
    },
    {
      title: 'Users',
      icon: <UsersIcon />,
      link: '/dashboard/users',
    },
  ];
  return (
    <nav
      className="flex flex-col flex-wrap justify-between w-full h-full p-6 hs-accordion-group"
      data-hs-accordion-always-open
    >
      <div className="space-y-1.5">
        {items.map((item) => {
          return (
            <SidebarItem
              key={item.title + '_' + new Date().toISOString()}
              title={item.title}
              icon={item.icon}
              link={item.link}
              isActive={item.link === pathname}
              type="link"
            />
          );
        })}
      </div>
      <SidebarItem
        title="Logout"
        type="button"
        onClick={() => signOut()}
        icon={<ArrowLeftOnRectangleIcon />}
      />
    </nav>
  );
};

const ArrowLeftOnRectangleIcon = () => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
      />
    </svg>
  );
};

const HomeIcon = () => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
};

const UsersIcon = () => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};

const CubeIcon = () => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
      />
    </svg>
  );
};

export default SidebarItems;
