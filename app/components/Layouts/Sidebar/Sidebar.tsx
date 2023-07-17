import SidebarItems from './SidebarItems';

const Sidebar = () => {
  return (
    <>
      <div className="sticky inset-x-0 top-0 z-20 px-4 bg-white border-y sm:px-6 md:px-8 lg:hidden dark:bg-slate-800 dark:border-slate-700">
        <div className="flex items-center py-4">
          <button
            type="button"
            className="text-slate-500 hover:text-slate-600"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              className="w-5 h-5"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="application-sidebar"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[55] w-64 bg-white border-r border-slate-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-slate-800 dark:border-slate-700"
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
