import MainLayout from '@/components/custom/Layouts/Main';
import ModalAddUser from './components/ModalAddUser';
import Table from './components/Table';

export const generateMetadata = () => ({
  title: 'Dashboard/Users',
});

export default async function UserDashboard() {
  return (
    <MainLayout>
      <div>
        <ModalAddUser />
      </div>
      <Table />
    </MainLayout>
  );
}
