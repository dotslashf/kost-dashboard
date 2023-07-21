import MainLayout from '@/app/components/Layouts/Main';
import ModalAddRoom from './components/ModalAddRooms';
// import Table from './components/Table';

export const generateMetadata = () => ({
  title: 'Dashboard/Rooms',
});

export default async function RoomsDashboard() {
  return (
    <MainLayout>
      <div className="flex flex-col w-full h-full p-6 space-y-4 bg-white border rounded-lg shadow-sm">
        <div>
          <ModalAddRoom />
        </div>
        {/* <Table /> */}
      </div>
    </MainLayout>
  );
}
