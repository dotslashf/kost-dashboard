import MainLayout from '@/app/components/Layouts/Main';
import ModalAddUser from './components/ModalAddUser';

export const generateMetadata = () => ({
  title: 'Dashboard/Users',
});

const UserDashboard = () => {
  return (
    <MainLayout>
      <ModalAddUser />
      <div className="flex flex-col">
        <div className="cursor-pointer flex flex-col bg-white border shadow-sm rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] hover:bg-slate-200 transition-colors">
          <button className="p-3" data-hs-overlay="#modal-new-user">
            <h3 className="flex items-center text-sm text-slate-700 dark:text-white">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-4 mr-2 stroke-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>{' '}
              New User
            </h3>
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserDashboard;
