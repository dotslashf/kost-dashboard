import MainLayout from '@/app/components/Layouts/Main';
import ModalAddUser from './components/ModalAddUser';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { ModalUser } from './components/ModalUser';

export const generateMetadata = () => ({
  title: 'Dashboard/Users',
});

const UserDashboard = () => {
  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className="cursor-pointer flex flex-col bg-white border shadow-sm rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] hover:bg-slate-200 transition-colors">
          <ModalUser />
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDashboard;
