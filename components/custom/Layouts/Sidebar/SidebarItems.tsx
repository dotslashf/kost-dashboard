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
      title: 'Kamar',
      icon: <CubeIcon className="mr-4" />,
      link: '/dashboard/rooms',
    },
    {
      title: 'Penghuni',
      icon: <PersonIcon className="mr-4" />,
      link: '/dashboard/users',
    },
  ];
  return (
    <nav className="flex flex-col flex-wrap justify-between w-full h-full p-6">
      <div className="space-y-1.5">
        {items.map((item) => {
          let isActive = false;
          if (item.title === 'Dashboard') {
            isActive = pathname === item.link;
          } else {
            isActive = pathname.includes(item.link);
          }
          return (
            <SidebarItem
              key={item.title + '_' + new Date().toISOString()}
              title={item.title}
              icon={item.icon}
              link={item.link}
              isActive={isActive}
              type="link"
            />
          );
        })}
      </div>
      <SidebarItem
        title="Keluar"
        type="button"
        onClick={() => signOut()}
        icon={<ExitIcon className="mr-4" />}
      />
    </nav>
  );
};

export default SidebarItems;
