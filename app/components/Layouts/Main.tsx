import Sidebar from '../Layouts/Sidebar/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <div className="w-full px-4 pt-7 sm:px-6 md:px-8 lg:pl-72">
        <div className="flex h-full">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
