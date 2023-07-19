'use client';
import {
  HomeIcon,
  CubeIcon,
  PersonIcon,
  ExitIcon,
} from '@radix-ui/react-icons';
import SidebarItem from './SidebarItem';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const SidebarItems = () => {
  const pathname = usePathname();

  const items = [
    {
      title: 'Dashboard',
      icon: <HomeIcon className="mr-4" />,
      link: '/dashboard',
    },
    {
      title: 'Rooms',
      icon: <CubeIcon className="mr-4" />,
      link: '/dashboard/rooms',
    },
    {
      title: 'Users',
      icon: <PersonIcon className="mr-4" />,
      link: '/dashboard/users',
    },
  ];
  return (
    <nav className="flex flex-col flex-wrap justify-between w-full h-full p-6">
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
        icon={<ExitIcon className="mr-4" />}
      />
    </nav>
  );
};

export default SidebarItems;
