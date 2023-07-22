import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import Link from 'next/link';
import { title } from 'process';
import React from 'react';

interface SidebarItemProps {
  title?: string;
  icon?: React.ReactNode;
  link?: string;
  type: 'link' | 'button';
  onClick?: () => void;
  isActive?: boolean;
}

const SidebarItem = (props: SidebarItemProps) => {
  const className = clsx([
    'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md transition-colors',
    props.isActive ? 'bg-slate-100 text-sky-600' : 'bg-transparent',
    props.type === 'button'
      ? 'w-full hover:bg-rose-600 hover:text-white'
      : 'hover:bg-slate-200',
  ]);
  return props.type === 'link' ? (
    <Button
      asChild
      variant={props.isActive ? 'default' : 'outline'}
      className="justify-start w-full"
    >
      <Link href={props.link!}>
        {props.icon && props.icon}
        {props.title ? props.title : 'Sidebar Item'}
      </Link>
    </Button>
  ) : (
    <Button
      variant={'destructive'}
      onClick={props.onClick}
      className="justify-start"
    >
      {props.icon && props.icon}
      {props.title ? props.title : 'Sidebar Item'}
    </Button>
  );
};

export default SidebarItem;
