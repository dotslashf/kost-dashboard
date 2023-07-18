import MainLayout from '@/app/components/Layouts/Main';
import { ModalUser } from './components/ModalUser';
import Table from './components/Table';

export const generateMetadata = () => ({
  title: 'Dashboard/Users',
});

export default async function UserDashboard() {
  return (
    <MainLayout>
      <div className="flex flex-col w-full h-full p-6 space-y-4 bg-white border rounded-lg shadow-sm">
        <div>
          <ModalUser />
        </div>
        <Table />
      </div>
    </MainLayout>
  );
}
