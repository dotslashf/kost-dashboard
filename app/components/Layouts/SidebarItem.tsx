import React from 'react';

interface SidebarItemProps {
  title?: string;
  icon?: React.ReactNode;
  link?: string;
  type: 'link' | 'button';
  onClick?: () => void;
}

const SidebarItem = (props: SidebarItemProps) => {
  const className =
    'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300';
  return props.type === 'link' ? (
    <div>
      <a className={className} href={props.link}>
        {props.icon ? (
          props.icon
        ) : (
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
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        )}
        {props.title ? props.title : 'Sidebar Item'}
      </a>
    </div>
  ) : (
    <div>
      <button className={className + ' w-full'} onClick={props.onClick}>
        {props.icon ? (
          props.icon
        ) : (
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
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        )}
        {props.title ? props.title : 'Sidebar Item'}
      </button>
    </div>
  );
};

export default SidebarItem;
