import Sidebar from '../components/Layouts/Sidebar';

export const generateMetadata = () => ({
  title: 'Dashboard',
});

const Dashboard = () => {
  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <div className="w-full px-4 pt-10 sm:px-6 md:px-8 lg:pl-72">
        <div className="flex">Content</div>
      </div>
    </div>
  );
};

export default Dashboard;
