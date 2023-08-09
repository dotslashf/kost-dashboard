import Sidebar from './Sidebar/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <div className="w-full px-4 py-7 sm:px-6 md:px-8 lg:pl-72">
        <div className="flex h-full">
          <div className="flex flex-col w-full h-full p-6 space-y-4 bg-white border rounded-lg shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
